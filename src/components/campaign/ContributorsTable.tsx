import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Link,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { formatAddress, formatTimestamp } from "../../utils";
import { Contributor } from "../../types/campaign";
import { formatEther } from "viem";
interface ContributorsTableProps {
  contributors: Contributor[];
}

export const ContributorsTable = ({ contributors }: ContributorsTableProps) => {
  console.log("Contributins inside the table = ", contributors);
  if (!contributors.length) {
    return (
      <Text color="gray.500" py={4} textAlign="center">
        No contributions yet. Be the first to contribute!
      </Text>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Contributor</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contributors.map((contributor, index) => (
            <Tr key={index}>
              <Td whiteSpace="nowrap">
                {formatTimestamp(new Date(parseInt(contributor.timestamp)*1000).toString())}
              </Td>
              <Td>
                <Tooltip label={contributor.contributor}>
                  <Link
                    href={`https://holesky.etherscan.io/address/${contributor.contributor}`}
                    isExternal
                    display="inline-flex"
                    alignItems="center"
                    gap={1}
                    color="teal.500"
                  >
                    {formatAddress(contributor.contributor)}
                    <Icon as={ExternalLink} boxSize={3} />
                  </Link>
                </Tooltip>
              </Td>
              <Td isNumeric>
                <Text fontFamily="mono">
                  {formatEther(BigInt(contributor.amount))} ETH
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
