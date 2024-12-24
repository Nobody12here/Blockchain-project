import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { Github, Globe, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <Box as="footer" py={10} px={8}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="container.xl"
        mx="auto"
        gap={4}
      >
        <Text>
          Made while 💖 by Muhammad Auzair, Sidra Ishfaq & Aiza Tahir
        </Text>
        <Flex gap={4}>
          <Link href="#"><Globe size={20} /></Link>
          <Link href="#"><Twitter size={20} /></Link>
          <Link href="#"><Github size={20} /></Link>
          <Link href="#"><Instagram size={20} /></Link>
        </Flex>
      </Flex>
    </Box>
  );
}