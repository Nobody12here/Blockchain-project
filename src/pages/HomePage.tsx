import { VStack } from '@chakra-ui/react';
import { Hero } from '../components/Hero';
import { CampaignGrid } from '../components/CampaignGrid';
import { HowItWorks } from '../components/HowItWorks';


export const HomePage = () => {
  return (
    <VStack spacing={0} align="stretch">
      <Hero />
      <CampaignGrid />
      <HowItWorks />
    </VStack>
  );
}