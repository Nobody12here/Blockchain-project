import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useReadContract, useWriteContract } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { Campaign } from "../../ABI/Campaign";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { ContributorsTable } from "./ContributorsTable";
import { useEffect, useState } from "react";
import { Contributor } from "../../types/campaign";

interface CampaignStatsProps {
  campaignAddress: string;
  ownerAddress: string;
}

export const CampaignStats = ({
  campaignAddress,
  ownerAddress,
}: CampaignStatsProps) => {
  const [Contributions, setContributions] = useState<Contributor[]>([]);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const toast = useToast();
  const result = useReadContract({
    abi: Campaign,
    address: campaignAddress as Address,
    functionName: "getContributions",
  });
  console.log("Contributions = ",Contributions)
  useEffect(() => {
    if (result.data) {
      setContributions(result.data as Contributor[]);
    }
  });
  const handleSubmit = async () => {
    const response = writeContractAsync({
      abi: Campaign,
      address: campaignAddress as Address,
      functionName: "withdraw",
    });
    toast.promise(response, {
      success: {
        title: "Successfully Withdrawed Funds!",
      },
      error: {
        title: "Error while Withdrawing Funds",
        description: "Something went wrong",
      },
      loading: { title: "Withdrawing...", description: "Please wait" },
    });
  };
 
  const isOwner = address?.toLowerCase() === ownerAddress.toLowerCase();

  return (
    <VStack align="stretch" spacing={4}>
      <Box>
        <Heading size="md" mb={4}>
          Recent Contributors
        </Heading>
        <ContributorsTable contributors={Contributions} />
      </Box>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={handleSubmit}
        isDisabled={!isOwner}
      >
        {isOwner ? "Withdraw Funds" : "Only for the Owner"}
      </Button>
    </VStack>
  );
};
