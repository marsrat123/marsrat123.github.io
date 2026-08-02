export interface TokenomicsItem {
  label: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
}

export interface TreasuryAllocation {
  category: string;
  percentage: number;
  amountUsd: string;
  color: string;
  iconName: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  items: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'rewards' | 'tokenomics' | 'wallet';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;
  featured?: boolean;
}

export interface UserWalletData {
  address: string | undefined;
  isConnected: boolean;
  chainName: string;
  chainId: number;
  nativeBalance: string;
  marsRatBalance: string;
  pendingRewards: string;
  totalClaimed: string;
  rewardSharePercent: string;
  lastClaimTime: string;
}

export interface ClaimState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  txHash: string | null;
}
