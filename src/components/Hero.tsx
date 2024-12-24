import { Box, Button, Heading, Link } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Box textAlign="left" py={20} px={8}>
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        maxW="600px"
      >
        Crowdfunding using the powers of Crypto & Blockchain 😊
      </Heading>
      <Link href='/create-campaign'>
      <Button colorScheme="teal" size="lg">
        Create Campaign
      </Button>
      </Link>
    </Box>
  );
}