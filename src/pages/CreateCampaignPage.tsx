import { Box, Container, Heading, Icon } from '@chakra-ui/react';
import { Megaphone } from 'lucide-react';
import { CampaignForm } from '../components/forms/CampaignForm';
import { BackButton } from '../components/navigation/BackButton';

export const CreateCampaignPage = () => {
  return (
    <Container maxW="container.md" py={8}>
      <BackButton />
      
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" display="flex" alignItems="center" justifyContent="center" gap={2}>
          Create a New Campaign <Icon as={Megaphone} />
        </Heading>
      </Box>

      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="sm"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <CampaignForm />
      </Box>
    </Container>
  );
};