import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { config } from './config'
import theme from './theme';
const queryClient = new QueryClient()
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-campaign" element={<CreateCampaignPage />} />
          <Route path="/campaign/:id" element={<CampaignDetailPage />} />
        </Routes>
        <Footer />
        </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;