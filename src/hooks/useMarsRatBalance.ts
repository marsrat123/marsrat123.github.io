import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACT_CONFIG } from '../config/contracts';
import { marsRatAbi } from '../contracts/marsRatAbi';

export function useMarsRatBalance() {
  const { address, isConnected } = useAccount();
  const [demoBalance, setDemoBalance] = useState<string>('254500.50');

  const {
    data: contractBalance,
    isError,
    isLoading,
    refetch,
  } = useReadContract({
    address: CONTRACT_CONFIG.tokenAddress,
    abi: marsRatAbi,
    functionName: 'balanceOf',
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
    // Generate deterministic demo balance based on address if needed
    if (address) {
      const num = parseInt(address.slice(-4), 16) || 1234;
      const calc = (num * 123.456).toFixed(2);
      setDemoBalance(calc);
    }
  }, [address]);

  let formattedBalance = demoBalance;
  if (contractBalance !== undefined && contractBalance !== null) {
    try {
      formattedBalance = Number(formatUnits(contractBalance as bigint, 18)).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
    } catch (e) {
      formattedBalance = demoBalance;
    }
  }

  return {
    balance: isConnected ? formattedBalance : '0.00',
    rawBalance: contractBalance,
    isLoading: isConnected ? isLoading : false,
    isError: isConnected ? isError : false,
    refetch,
  };
}
