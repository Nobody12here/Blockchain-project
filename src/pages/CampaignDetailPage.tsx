import { useReadContract } from "wagmi";
import { CampaignDetail } from "../components/campaign/CampaignDetail";
import { useEffect, useState } from "react";
import { CampaignFactory, CampaignFactoryAddress } from "../ABI/CampaignFactory";
import { readContract } from "@wagmi/core";
import { config } from "../config";
import { Campaign, } from "../ABI/Campaign";
import { Address } from "viem";
import { useParams } from "react-router-dom";

export const CampaignDetailPage = () => {
  const [CampaignsAddresses, setCampaignAddresses] = useState<string[]>();
  const [Summaries, setSummaries] = useState<[]>();
  const params = useParams<{ id: string }>();

  const result = useReadContract({
    abi: CampaignFactory,
    address: CampaignFactoryAddress,
    functionName: "getDeployedCampaigns",
  });
  
  useEffect(() => {
    const fetchCampaignSummary = async () => {
      if (CampaignsAddresses && CampaignsAddresses.length > 0) {
        const fetchedSummaries = await Promise.all(
          CampaignsAddresses.map((campaign) =>
            readContract(config, {
              address: campaign as Address,
              functionName: "getSummary",
              abi: Campaign,
            })
          )
        );
        setSummaries(fetchedSummaries as []);
      }
    };
    fetchCampaignSummary();
  }, [CampaignsAddresses]);
  useEffect(() => {
    if (result.status === "success") {
      setCampaignAddresses(result.data as string[]);
    }
  }, [result.status]);
  console.log(Summaries);
  if (params.id && Summaries && CampaignsAddresses) {
    const index = parseInt(params.id);
    const summary = Summaries[index];
    return (
      <CampaignDetail
        title={summary[4]}
        description={summary[5]}
        raised={summary[1]}
        target={summary[7]}
        minimumAmount={summary[0]}
        address={summary[3]}
        deadline={summary[2]}
        campaignAddress = {CampaignsAddresses[index]}
      />
    );
  }
  else{
    return <>Loaiding</>
  }
};
