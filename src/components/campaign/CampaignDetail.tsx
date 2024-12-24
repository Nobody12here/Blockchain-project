import { Box, Container, VStack, Link, Icon } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { CampaignHeader } from "./CampaignHeader";
import { CampaignDescription } from "./CampaignDescription";
import { CampaignContribution } from "./CampaignContribution";
import { CampaignStats } from "./CampaignStats";

interface CampaignDetailProps {
  title: string;
  address: string;
  minimumAmount: string;
  deadline: string;
  description: string;
  raised:string;
  target:string;
  campaignAddress:string;
}

export const CampaignDetail = ({
  campaignAddress,
  title,
  address,
  minimumAmount,
  deadline,
  raised,
  target,
  description,
}: CampaignDetailProps) => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={4}>
        <Link href="#" color="teal.500" fontSize="sm">
          <Icon as={ExternalLink} mr={1} />
          View on Etherscan
        </Link>
      </Box>

      <Box
        display={{ md: "grid" }}
        gridTemplateColumns={{ md: "1fr 400px" }}
        gap={8}
      >
        {/* Left Column */}
        <VStack align="stretch" spacing={6}>
          <CampaignHeader title={title} />
          <CampaignDescription
            minimumAmount={minimumAmount}
            description={description}
            creatorAddress={address}
            deadline={deadline}
          />
          <CampaignStats campaignAddress={campaignAddress} />
        </VStack>

        {/* Right Column */}
        <CampaignContribution campaignAddress={campaignAddress} raised={raised} target={target} />
      </Box>
    </Container>
  );
};
