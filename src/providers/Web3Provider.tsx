import React, { useMemo } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http, fallback } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { bsc, bscTestnet, mainnet, polygon, arbitrum } from 'wagmi/chains';
import { SUPPORTED_CHAINS, WALLET_CONNECT_PROJECT_ID } from '../config/chains';

// Create Wagmi config with fallback RPC transports from Chainlist to prevent rate limit (429) errors
const wagmiConfig = getDefaultConfig({
  appName: 'MarsRat Space Colony',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: SUPPORTED_CHAINS as any,
  transports: {
    [bsc.id]: fallback(
      [
        http('https://bsc-mainnet.public.blastapi.io', { batch: true, timeout: 10000 }),
        http('https://binance.llamarpc.com', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed1.binance.org', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed2.binance.org', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed3.binance.org', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed.binance.org', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed1.defibit.io', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed2.defibit.io', { batch: true, timeout: 10000 }),
        http('https://bsc-dataseed1.ninicoin.io', { batch: true, timeout: 10000 }),
        http('https://bscrpc.com', { batch: true, timeout: 10000 }),
        http('https://1rpc.io/bnb', { batch: true, timeout: 10000 }),
        http('https://rpc.ankr.com/bsc', { batch: true, timeout: 10000 }),
        http('https://bsc-rpc.publicnode.com', { batch: true, timeout: 10000 }),
      ],
      { rank: true, retryCount: 2 }
    ),
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
    [mainnet.id]: http('https://cloudflare-eth.com'),
    [polygon.id]: http('https://polygon-rpc.com'),
    [arbitrum.id]: http('https://arb1.arbitrum.io/rpc'),
  },
  ssr: false,
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchInterval: false,
            refetchIntervalInBackground: false,
            retry: 1,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
            staleTime: 300000, // 5 minutes stale time to avoid excessive RPC polling
            gcTime: 600000, // 10 minutes cache retention
          },
        },
      }),
    []
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#FF4500', // Mars Orange/Red
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

