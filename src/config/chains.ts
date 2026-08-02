import { bsc, bscTestnet, mainnet, polygon, arbitrum } from 'wagmi/chains';

export const SUPPORTED_CHAINS = [bsc, bscTestnet, mainnet, polygon, arbitrum] as const;

export const DEFAULT_CHAIN = bsc;

export const WALLET_CONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ||
  import.meta.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  '3a8170812b534d0ff9d794f19a901d64';

