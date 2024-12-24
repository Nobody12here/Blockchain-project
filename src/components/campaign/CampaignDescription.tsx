import {
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { Info, Wallet, FileText, Users } from 'lucide-react';
import { formatEther } from 'viem';
interface CampaignDescriptionProps{
  description:string;
  creatorAddress:string;
  deadline:string;
  minimumAmount :string;
}
export const CampaignDescription = ({description,creatorAddress,deadline,minimumAmount}:CampaignDescriptionProps) => {
  
  return (
    <VStack align="stretch" spacing={4}>
      <Text color="gray.600" _dark={{ color: 'gray.300' }}>
        {description}
      </Text>

      <FormControl>
        <FormLabel fontSize="sm" display="flex" alignItems="center" gap={2}>
          Campaign Creator
          <Tooltip label="Ethereum wallet address of the campaign creator" placement="top">
            <span><Icon as={Info} boxSize={4} color="gray.500" /></span>
          </Tooltip>
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftElement>
            <Icon as={Wallet} boxSize={4} color="gray.500" />
          </InputLeftElement>
          <Input
            pl={10}
            value={creatorAddress.slice(0,10).concat("...")}
            isReadOnly
            bg="gray.50"
            _dark={{ bg: 'gray.700' }}
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" display="flex" alignItems="center" gap={2}>
          Deadline
          <Tooltip label="Ending date for this campaign" placement="top">
            <span><Icon as={Info} boxSize={4} color="gray.500" /></span>
          </Tooltip>
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftElement>
            <Icon as={FileText} boxSize={4} color="gray.500" />
          </InputLeftElement>
          <Input
            pl={10}
            value={new Date(parseInt(deadline)*1000).toDateString()}
            isReadOnly
            bg="gray.50"
            _dark={{ bg: 'gray.700' }}
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" display="flex" alignItems="center" gap={2}>
          Minimum Contribution Amount
          <Tooltip label="Minimum Amount that a user can contribute to this campaign" placement="top">
            <span><Icon as={Info} boxSize={4} color="gray.500" /></span>
          </Tooltip>
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftElement>
            <Icon as={Users} boxSize={4} color="gray.500" />
          </InputLeftElement>
          <Input
            pl={10}
            value={formatEther(BigInt(minimumAmount))}
            isReadOnly
            bg="gray.50"
            _dark={{ bg: 'gray.700' }}
          />
        </InputGroup>
      </FormControl>
    </VStack>
  );
};