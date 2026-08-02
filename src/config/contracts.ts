export const CONTRACT_CONFIG = {
  chainId: Number(import.meta.env.NEXT_PUBLIC_CHAIN_ID || 56),
  chainName: 'BNB Smart Chain',
  rpcUrl: import.meta.env.NEXT_PUBLIC_RPC_URL || 'https://bsc-dataseed.binance.org',
  
  // Smart contract addresses on BNB Smart Chain (Technical Whitepaper v1.0 specifications)
  deadAddress: '0x000000000000000000000000000000000000dEaD' as `0x${string}`,
  partnerTokenAddress: (import.meta.env.NEXT_PUBLIC_SPCX_TOKEN_ADDRESS ||
    '0xbe9D156892E55e7154BcD3cB0FEA677F9D3103E1') as `0x${string}`,
  routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E' as `0x${string}`,
  tokenAddress: (import.meta.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ||
    '0xbe9D156892E55e7154BcD3cB0FEA677F9D3103E1') as `0x${string}`,
  rewardsAddress: (import.meta.env.NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS ||
    '0xbe9D156892E55e7154BcD3cB0FEA677F9D3103E1') as `0x${string}`,
  treasuryAddress: (import.meta.env.NEXT_PUBLIC_TREASURY_ADDRESS ||
    '0xbe9D156892E55e7154BcD3cB0FEA677F9D3103E1') as `0x${string}`,
    
  blockExplorerUrl:
    import.meta.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL || 'https://bscscan.com',
    
  // Protocol Specifications & Constants from Whitepaper
  compiler: 'Solidity 0.8.24',
  totalSupply: '1,000,000,000,000,000 MRAT',
  decimals: 9,
  transferFee: '10%',
  reflectionFee: '2%',
  liquidityFee: '4%',
  rewardsFee: '4%',
  maxTxCap: '100,000,000,000 MRAT (0.01% of supply)',
  disruptiveCoverageFee: '2 BNB',
  minTokenNumberToSell: '10,000,000,000 MRAT',
  rewardCycleBlock: '7 days (1 day easy launch week)',
  bonusRollChance: '6% probability (1.5x - 1.99x multiplier)',
  buyAndBurnThreshold: '20% market buy-and-burn on large claims',

  // Protocol Stats & Reserves
  treasuryStats: {
    partnerTokenBalance: 'Partner BEP20 Pool',
    mratBalance: '1,000,000,000,000,000 MRAT Total Supply',
    totalDistributedRewards: 'Partner BEP20 Tokens Claimed',
    totalHolders: 14280,
    totalClaimedByCommunity: 'Active Partner Token Rewards',
  },
};

