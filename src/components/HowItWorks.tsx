import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { PenLine, Share2, Wallet } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: PenLine,
      title: "Create a Campaign for Fundraising",
      description:
        "It'll take only 2 minutes. Just enter a few details about the funds you are raising for.",
    },
    {
      icon: Share2,
      title: "Share your Campaign",
      description:
        "All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in.",
    },
    {
      icon: Wallet,
      title: "Withdraw Funds",
      description:
        "The funds raised can be withdrawn directly to the owner of the campaign when the deadline has passed.",
    },
  ];

  return (
    <Box py={16} px={8}>
      <Heading as="h2" size="lg" mb={12}>
        How BetterFund Works
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
        {steps.map((step, index) => (
          <Flex key={index} direction="column" align="flex-start" p={6}>
            <Icon as={step.icon} boxSize={10} color="teal.500" mb={4} />
            <Heading size="md" mb={4}>
              {step.title}
            </Heading>
            <Text color="gray.600">{step.description}</Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};
