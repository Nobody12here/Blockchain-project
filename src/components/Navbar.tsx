import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { Link } from "@chakra-ui/react";
import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { status } = useAccount();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow="sm"
    >
      <Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
        <Heading
          textAlign="left"
          fontFamily={"heading"}
          color={colorMode === "light" ? "teal.800" : "white"}
          as="h2"
          size="lg"
        >
          Tokenized Crowdfunding
        </Heading>
      </Flex>

      <Flex gap="4" align="center">
        <Link href="/create-campaign">
          <Button variant="ghost">Create Campaign</Button>
        </Link>
        <Button variant="ghost">How It Works</Button>
        {status === "disconnected" && (
          <Button
            colorScheme="teal"
            onClick={() => {
              connect({
                connector: injected(),
              });
            }}
          >
            Connect Wallet
          </Button>
        )}
        {status === "connected" && (
          <Button
            colorScheme="teal"
            onClick={() => {
              disconnect();
            }}
          >
            Disconnect Wallet
          </Button>
        )}
        <Button onClick={toggleColorMode} variant="ghost">
          {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </Flex>
    </Flex>
  );
};
