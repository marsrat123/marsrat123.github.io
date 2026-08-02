import React from 'react';
import { useAccount } from 'wagmi';
import { Gift, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';
import { usePendingRewards } from '../hooks/usePendingRewards';
import { useTotalClaimed } from '../hooks/useTotalClaimed';
import { useClaimRewards } from '../hooks/useClaimRewards';
import { ClaimRewardsButton } from './ClaimRewardsButton';
import { PROJECT_CONFIG } from '../config/project';
import { CONTRACT_CONFIG } from '../config/contracts';

export const PendingRewardsCard: React.FC = () => {
  const { isConnected } = useAccount();

  const {
    pendingRewards,
    numericPending,
    lastClaimDate,
    nextClaimEligibleTime,
    resetRewardsOnClaim,
    simulateEarnMore,
  } = usePendingRewards();

  const { addClaimedAmount } = useTotalClaimed();

  const {
    claimRewards,
    isClaiming,
    isSuccess,
    isError,
    errorMessage,
    txHash,
    resetClaimState,
  } = useClaimRewards(numericPending, (claimedAmount) => {
    resetRewardsOnClaim();
    addClaimedAmount(claimedAmount);
  });

  const estimatedValueUsd = (numericPending * 1.0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


  return (
    <section id="rewards" className="scroll-mt-24">
      <div className="relative p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-orange-500/40 shadow-2xl shadow-orange-950/40 backdrop-blur-xl overflow-hidden">
        {/* Glow Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>Partner Reward Pool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Claimable Partner BEP20 Rewards
            </h2>
          </div>

          {isConnected && (
            <button
              onClick={simulateEarnMore}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-300 bg-orange-950/60 hover:bg-orange-900/80 border border-orange-500/40 transition cursor-pointer"
              title="Simulate earning partner reward yield"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>Simulate +25 Partner Tokens</span>
            </button>
          )}
        </div>

        {/* Big Reward Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-8">
          <div className="lg:col-span-2 bg-neutral-950/80 p-6 rounded-2xl border border-neutral-800/80 flex flex-col justify-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
              Available Partner Tokens to Claim
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">
                {pendingRewards}
              </span>
              <span className="text-xl font-bold text-orange-400 font-mono">
                {PROJECT_CONFIG.rewardSymbol}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-900 text-xs text-neutral-400">
              <span>
                Partner Address: <span className="text-orange-400 font-bold font-mono">0xbe9D...3103E1</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Claim Cycle: 7 Days (1 Day Launch Week)</span>
            </div>
          </div>

          <div className="bg-neutral-950/60 p-5 rounded-2xl border border-neutral-800/80 flex flex-col gap-3 text-xs text-neutral-300">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-400" /> Last Claim:
              </span>
              <span className="font-mono text-neutral-200">{lastClaimDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> Next Claim Status:
              </span>
              <span className="font-bold text-emerald-400">{nextClaimEligibleTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Partner Contract:</span>
              <span className="font-mono text-orange-400">
                {CONTRACT_CONFIG.rewardsAddress.slice(0, 6)}...
                {CONTRACT_CONFIG.rewardsAddress.slice(-4)}
              </span>
            </div>
          </div>
        </div>


        {/* Claim Rewards Action Button */}
        <ClaimRewardsButton
          onClaim={claimRewards}
          isClaiming={isClaiming}
          isDisabled={!isConnected || numericPending <= 0}
          numericPending={numericPending}
        />

        {/* Transaction Result Messages */}
        {isSuccess && txHash && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Claim Transaction Confirmed Successfully!
              </span>
              <button
                onClick={resetClaimState}
                className="text-emerald-400 hover:underline text-[11px]"
              >
                Dismiss
              </button>
            </div>
            <p className="text-neutral-300">
              Your SPCX treasury rewards have been safely transferred from the treasury vault to your connected Web3 wallet.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-neutral-400">Tx Hash: {txHash.slice(0, 16)}...</span>
              <a
                href={`${CONTRACT_CONFIG.blockExplorerUrl}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:underline"
              >
                <span>View on BscScan</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {isError && errorMessage && (
          <div className="mt-6 p-4 rounded-2xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm text-red-300 block">Claim Transaction Error</span>
                <span className="text-neutral-300">{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={resetClaimState}
              className="text-red-400 hover:underline text-[11px] shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
