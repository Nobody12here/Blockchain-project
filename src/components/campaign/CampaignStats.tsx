import { Button, VStack } from "@chakra-ui/react";
import { useWriteContract } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { Campaign } from "../../ABI/Campaign";
import { Address } from "viem";
import { useAccount } from "wagmi";

interface CampaignStatsProps {
  campaignAddress: string;
  ownerAddress: string;
}

export const CampaignStats = ({ campaignAddress, ownerAddress }: CampaignStatsProps) => {
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const toast = useToast();

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
