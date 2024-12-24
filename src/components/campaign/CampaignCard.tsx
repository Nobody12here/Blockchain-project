import { Box, Image, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { Copy } from 'lucide-react';
import { formatEther } from 'viem';
interface CampaignCardProps {
  title: string;
  image: string;
  address: string;
  raised: string;
  target: string;
}

export const CampaignCard = ({ title, image, address, raised, target }: CampaignCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)' }}
      bg="white"
      _dark={{ bg: 'gray.800' }}
    >
      <Image
        src={image}
        alt={title}
        height="200px"
        width="100%"
        objectFit="cover"
      />
      
      <VStack align="stretch" p={4} spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
            {title}
          </Text>
          <Copy size={16} className="cursor-pointer" />
        </HStack>

        <Text fontSize="sm" color="gray.500" noOfLines={1}>
          by {address.slice(0,10)}....
        </Text>

        <HStack justify="space-between" fontSize="sm">
          <Text>{formatEther(BigInt(raised))} ETH</Text>
          <Badge colorScheme="teal">Active</Badge>
        </HStack>

        <Text fontSize="xs" color="gray.500">
          Target of {formatEther(BigInt(target))} ETH
        </Text>
      </VStack>
    </Box>
  );
}