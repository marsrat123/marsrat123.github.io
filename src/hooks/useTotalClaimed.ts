import { useState, useEffect, useCallback } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACT_CONFIG } from '../config/contracts';
import { rewardsAbi } from '../contracts/rewardsAbi';

export function useTotalClaimed() {
  const { address, isConnected } = useAccount();
  const [demoTotalClaimed, setDemoTotalClaimed] = useState<number>(1280.5);

  const {
    data: contractClaimed,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_CONFIG.rewardsAddress,
    abi: rewardsAbi,
    functionName: 'totalClaimed',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && isConnected),
      staleTime: 300000,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  });

  useEffect(() => {
    if (address) {
      const seed = parseInt(address.slice(-2), 16) || 50;
      setDemoTotalClaimed(800 + seed * 12);
    }
  }, [address]);

  const addClaimedAmount = useCallback((amount: number) => {
    setDemoTotalClaimed((prev) => prev + amount);
  }, []);

  let displayClaimed = demoTotalClaimed.toFixed(2);
  if (contractClaimed !== undefined && contractClaimed !== null) {
    try {
      displayClaimed = Number(formatUnits(contractClaimed as bigint, 18)).toFixed(2);
    } catch {
      displayClaimed = demoTotalClaimed.toFixed(2);
    }
  }

  return {
    totalClaimed: isConnected ? displayClaimed : '0.00',
    numericTotalClaimed: isConnected ? Number(displayClaimed) : 0,
    isLoading: isConnected ? isLoading : false,
    addClaimedAmount,
    refetch,
  };
}
