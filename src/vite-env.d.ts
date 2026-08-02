/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
  readonly NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?: string;
  readonly NEXT_PUBLIC_CHAIN_ID?: string;
  readonly NEXT_PUBLIC_RPC_URL?: string;
  readonly NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS?: string;
  readonly NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS?: string;
  readonly NEXT_PUBLIC_TREASURY_ADDRESS?: string;
  readonly NEXT_PUBLIC_BLOCK_EXPLORER_URL?: string;
  readonly GEMINI_API_KEY?: string;
  readonly APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
