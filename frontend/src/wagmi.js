import { http, createConfig } from '@wagmi/vue'
import { base, mainnet } from '@wagmi/vue/chains'
import { injected, metaMask } from '@wagmi/vue/connectors'

export const config = createConfig({
  multiInjectedProviderDiscovery: false, 
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
