import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import "@fontsource/space-grotesk";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Space Grotesk',
    body: 'Space Grotesk',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
      },
    },
  },
});

export default theme;