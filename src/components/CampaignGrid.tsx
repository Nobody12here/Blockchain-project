import { Box, Grid, Heading } from "@chakra-ui/react";
import { CampaignCard } from "./campaign/CampaignCard";
import { useReadContract } from "wagmi";
import { CampaignFactory, CampaignFactoryAddress } from "../ABI/CampaignFactory";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { config } from "../config";
import { Campaign } from "../ABI/Campaign";
import { Address } from "viem";
import { useNavigate } from "react-router-dom";
export const CampaignGrid = () => {
  const [CampaignsAddresses, setCampaignAddresses] = useState<string[]>();
  const [Summaries, setSummaries] = useState<[]>();
  const navigate = useNavigate();
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

  // const campaigns = [
  //   {
  //     title: "Covid Relief Fund",
  //     image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5",
  //     address: "0x6f3f76c88f6f3f76c88...",
  //     raised: "3.12",
  //     target: "10.00",
  //   },
  //   {
  //     title: "Oxygen Crisis in India",
  //     image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5",
  //     address: "0x7f3f76c88f6f3f76c88...",
  //     raised: "4.1",
  //     target: "8.00",
  //   },
  //   {
  //     title: "Forest Conservation Fund",
  //     image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
  //     address: "0x8f3f76c88f6f3f76c88...",
  //     raised: "2",
  //     target: "5.00",
  //   },
  //   {
  //     title: "Support NIT Jalandhar",
  //     image: "https://images.unsplash.com/photo-1562774053-701939374585",
  //     address: "0x9f3f76c88f6f3f76c88...",
  //     raised: "3.47",
  //     target: "5.00",
  //   },
  //   {
  //     title: "Breathe India",
  //     image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5",
  //     address: "0x5f3f76c88f6f3f76c88...",
  //     raised: "2.5",
  //     target: "5.00",
  //   },
  // ];

  return (
    <Box py={10} px={8}>
      <Heading as="h2" size="lg" mb={8}>
        Open Campaigns
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={8}
      >
        {Summaries?.map((campaign, index) => (
          <Box
          key={index}
          cursor="pointer"
          onClick={() => navigate(`/campaign/${index}`)}
        >
          <CampaignCard
            key={index}
            title={campaign[4]}
            image={campaign[6]}
            address={campaign[3] as string}
            raised={campaign[1] as string}
            target={campaign[7] as string}
          />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
