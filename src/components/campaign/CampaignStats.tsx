import { Button, VStack } from "@chakra-ui/react";
import { useWriteContract } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { Campaign } from "../../ABI/Campaign";
import { Address } from "viem";
interface CampaignStatsProps {
  campaignAddress: string;
}
export const CampaignStats = ({ campaignAddress }: CampaignStatsProps) => {
  const { writeContractAsync } = useWriteContract();
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
        description: "Something wrong",
      },
      loading: { title: "Withdrawing...", description: "Please wait" },
    });
  };
  return (
    <VStack align="stretch" spacing={4}>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => {
          handleSubmit();
        }}
      >
        Withdraw Funds
      </Button>
    </VStack>
  );
};
