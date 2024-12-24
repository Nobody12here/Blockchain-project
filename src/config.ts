import { http, createConfig } from "wagmi";
import { mainnet, holesky } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, holesky],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  },
});
