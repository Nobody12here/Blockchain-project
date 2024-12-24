import { Heading } from '@chakra-ui/react';
interface CampaignHeaderProps {
  title:string;
}
export const CampaignHeader = ({title}:CampaignHeaderProps) => {
  return (
    <Heading as="h1" size="xl">
      {title}
    </Heading>
  );
};