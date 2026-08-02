import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import {
  Wallet,
  Coins,
  Gift,
  Award,
  Network,
  PieChart,
  Clock,
  Shield,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { WalletMetricCard } from './WalletStatus';
import { PendingRewardsCard } from './PendingRewardsCard';
import { useMarsRatBalance } from '../hooks/useMarsRatBalance';
import { usePendingRewards } from '../hooks/usePendingRewards';
import { useTotalClaimed } from '../hooks/useTotalClaimed';
import { PROJECT_CONFIG } from '../config/project';
import { CONTRACT_CONFIG } from '../config/contracts';

export const WalletDashboard: React.FC = () => {
  const { address, isConnected, chain } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Wagmi balance hook for native coin (ETH/MATIC/BNB)
  const { data: nativeBalanceData, isLoading: isNativeLoading } = useBalance({
    address,
    query: {
      enabled: Boolean(address && isConnected),
      staleTime: 300000,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  });

  const { balance: mratBalance, isLoading: isMratLoading } = useMarsRatBalance();
  const { pendingRewards, lastClaimDate } = usePendingRewards();
  const { totalClaimed } = useTotalClaimed();

  const formattedNativeBalance = nativeBalanceData
    ? `${Number(formatUnits(nativeBalanceData.value, nativeBalanceData.decimals)).toFixed(4)} ${nativeBalanceData.symbol}`
    : '2.45 BNB';

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x71...4891';
  const networkName = chain?.name || 'BNB Smart Chain';

  // Calculate approximate share percentage based on holdings
  const numericMrat = parseFloat(mratBalance.replace(/,/g, '')) || 0;
  const rewardShare = numericMrat > 0 ? `${((numericMrat / 1000000000) * 100).toFixed(4)}%` : '0.0025%';

  const showActiveDashboard = isConnected || isPreviewMode;

  return (
    <section id="dashboard" className="py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Mission Control</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Wallet Dashboard
            </h2>
          </div>

          {!isConnected && (
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-orange-500/40 transition cursor-pointer self-start md:self-auto"
            >
              <Eye className="w-4 h-4 text-orange-400" />
              <span>{isPreviewMode ? 'Exit Demo Preview' : 'Preview Connected Dashboard'}</span>
            </button>
          )}
        </motion.div>

        {/* State 1: Wallet Not Connected & Not Preview */}
        {!showActiveDashboard ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-neutral-800 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="max-w-xl mx-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/40 flex items-center justify-center mb-6 text-orange-400 shadow-xl">
                <Wallet className="w-10 h-10" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Connect your wallet to access the MarsRat mission dashboard.
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base mb-8 leading-relaxed">
                Track your live token balances, claim pending MRAT staking rewards, check treasury allocations, and view real-time holder share percentage.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => openConnectModal?.()}
                  type="button"
                  className="px-8 py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 shadow-xl shadow-orange-950/80 border border-orange-400/50 transition duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Enter Dashboard</span>
                </button>

                <button
                  onClick={() => setIsPreviewMode(true)}
                  type="button"
                  className="px-6 py-4 rounded-2xl font-bold text-sm text-neutral-300 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-orange-500/40 transition flex items-center gap-2"
                >
                  <span>Preview Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* State 2: Wallet Connected or Preview Mode Active */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {isPreviewMode && !isConnected && (
              <div className="p-4 rounded-2xl bg-orange-950/80 border border-orange-500/50 text-orange-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>
                    <strong>Demo Preview Mode:</strong> Connect your Web3 wallet to interact with live blockchain contracts on BNB Smart Chain (BSC).
                  </span>
                </div>
                <button
                  onClick={() => openConnectModal?.()}
                  className="font-bold text-white underline hover:text-orange-300 shrink-0 ml-2"
                >
                  Connect Real Wallet
                </button>
              </div>
            )}

            {/* 8 Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <WalletMetricCard
                title="1. Wallet Address"
                value={shortAddress}
                subValue={isConnected ? 'Connected' : 'Demo Account'}
                icon={<Wallet className="w-5 h-5" />}
                copyText={address || CONTRACT_CONFIG.tokenAddress}
                explorerAddress={address}
                accentColor="orange"
              />

              <WalletMetricCard
                title="2. Native Coin Balance"
                value={formattedNativeBalance}
                subValue="Gas Token"
                icon={<Coins className="w-5 h-5" />}
                isLoading={isNativeLoading}
                accentColor="amber"
              />

              <WalletMetricCard
                title="3. MarsRat Token Balance"
                value={`${mratBalance} MRAT`}
                subValue="BEP20 Token"
                icon={<span className="text-lg">🐀</span>}
                isLoading={isMratLoading}
                accentColor="rose"
              />

              <WalletMetricCard
                title="4. Pending Rewards"
                value={`${pendingRewards} Partner Tokens`}
                subValue="Ready to claim"
                icon={<Gift className="w-5 h-5" />}
                accentColor="emerald"
              />

              <WalletMetricCard
                title="5. Total Claimed"
                value={`${totalClaimed} Partner Tokens`}
                subValue="Lifetime claimed"
                icon={<Award className="w-5 h-5" />}
                accentColor="orange"
              />


              <WalletMetricCard
                title="6. Current Network"
                value={networkName}
                subValue={`Chain ID: ${chain?.id || CONTRACT_CONFIG.chainId}`}
                icon={<Network className="w-5 h-5" />}
                accentColor="blue"
              />

              <WalletMetricCard
                title="7. Reward Pool Share"
                value={rewardShare}
                subValue="Percentage of pool"
                icon={<PieChart className="w-5 h-5" />}
                accentColor="emerald"
              />

              <WalletMetricCard
                title="8. Last Claim Time"
                value={lastClaimDate}
                subValue="Eligible for next claim"
                icon={<Clock className="w-5 h-5" />}
                accentColor="amber"
              />
            </div>

            {/* Pending Rewards Panel */}
            <PendingRewardsCard />
          </motion.div>
        )}
      </div>
    </section>
  );
};
