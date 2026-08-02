import { CONTRACT_CONFIG } from '../config/contracts';

export function useTreasuryBalance() {
  return {
    treasuryAddress: CONTRACT_CONFIG.treasuryAddress,
    partnerTokenAddress: CONTRACT_CONFIG.partnerTokenAddress,
    routerAddress: CONTRACT_CONFIG.routerAddress,
    partnerTokenBalance: CONTRACT_CONFIG.treasuryStats.partnerTokenBalance,
    mratBalance: CONTRACT_CONFIG.treasuryStats.mratBalance,
    totalDistributedRewards: CONTRACT_CONFIG.treasuryStats.totalDistributedRewards,
    totalHolders: CONTRACT_CONFIG.treasuryStats.totalHolders,
    totalClaimedByCommunity: CONTRACT_CONFIG.treasuryStats.totalClaimedByCommunity,
  };
}

