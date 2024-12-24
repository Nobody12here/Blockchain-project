import {
  Box,
  VStack,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftElement,
  Button,
  FormControl,
  FormLabel,
  Tooltip,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { Info, DollarSign } from 'lucide-react';
import { Address, formatEther, parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { Campaign } from '../../ABI/Campaign';
import { useState } from 'react';

interface CampaignContributionProps {
  raised: string;
  target: string;
  campaignAddress: string;
}

export const CampaignContribution = ({ raised, target, campaignAddress }: CampaignContributionProps) => {
  const [contributionAmount, setContributionAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toaster = useToast();
  const {writeContractAsync} = useWriteContract();
  const handleSubmit = async () => {
    try {
      if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
        toaster({
          title: 'Invalid Contribution',
          description: 'Please enter a valid contribution amount.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setIsLoading(true);

      await writeContractAsync({
        abi: Campaign,
        address: campaignAddress as Address,
        functionName: 'contibute',
        args: [],
        value: parseEther(contributionAmount),
      });

      toaster({
        title: 'Transaction Sent',
        description: 'Your contribution is being processed.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      setContributionAmount(''); // Reset the input field after success
    } catch (error) {
      console.error('Contribution error:', error);

      toaster({
        title: 'Transaction Failed',
        description: 'There was an issue with your contribution.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      _dark={{ bg: 'gray.800' }}
    >
      <VStack align="stretch" spacing={6}>
        <Box>
          <Text mb={1}>Campaign Balance</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {formatEther(BigInt(raised))} ETH
          </Text>
          <Text fontSize="sm" color="gray.500">
            Target of {formatEther(BigInt(target))} ETH
          </Text>
        </Box>

        <FormControl>
          <FormLabel display="flex" alignItems="center" gap={2}>
            Contribution Amount
            <Tooltip label="Enter the amount you want to contribute in ETH" placement="top">
              <span><Icon as={Info} boxSize={4} color="gray.500" /></span>
            </Tooltip>
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={DollarSign} boxSize={4} color="gray.500" />
            </InputLeftElement>
            <Input
              pl={10}
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
            />
            <InputRightAddon children="ETH" />
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="Processing"
        >
          Contribute Now!
        </Button>

        <Text fontSize="xs" color="gray.500">
          * You can see where these funds are being used & if you have contributed you can also approve these Withdrawal Requests!
        </Text>
      </VStack>
    </Box>
  );
};
