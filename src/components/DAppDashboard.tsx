import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
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
  Info,
  ExternalLink,
  Copy,
  Check,
  Flame,
  ArrowRight,
  ArrowDownUp,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  HelpCircle,
  Lock,
  FileText,
  Layers,
  Activity,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { useMarsRatBalance } from '../hooks/useMarsRatBalance';
import { usePendingRewards } from '../hooks/usePendingRewards';
import { useTotalClaimed } from '../hooks/useTotalClaimed';
import { useClaimRewards } from '../hooks/useClaimRewards';
import { PROJECT_CONFIG } from '../config/project';
import { CONTRACT_CONFIG } from '../config/contracts';
import { CustomConnectButton } from './CustomConnectButton';

export const DAppDashboard: React.FC<{
  onExitPreview?: () => void;
  isPreview?: boolean;
  onOpenWhitepaper?: () => void;
}> = ({ onExitPreview, isPreview = false, onOpenWhitepaper }) => {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'rewards' | 'stats' | 'docs'>('dashboard');
  const [copiedContract, setCopiedContract] = useState(false);

  // Swap State
  const [swapFromAmount, setSwapFromAmount] = useState('0.1');
  const [swapTokenType, setSwapTokenType] = useState<'BNB' | 'PARTNER'>('BNB');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // Wagmi balance hook for native coin (BNB)
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
  const numericPending = parseFloat(pendingRewards) || 25;
  const { totalClaimed } = useTotalClaimed();
  const {
    claimRewards,
    isClaiming,
    isSuccess: claimSuccess,
    errorMessage: claimError,
    resetClaimState
  } = useClaimRewards(numericPending);

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x71...4891';
  const networkName = chain?.name || 'BNB Smart Chain';

  // Calculate approximate share percentage based on holdings
  const numericMrat = parseFloat(mratBalance.replace(/,/g, '')) || 0;
  const rewardShare = numericMrat > 0 ? `${((numericMrat / 1000000000) * 100).toFixed(4)}%` : '0.0025%';
  
  // Reflections estimation
  const estimatedReflections = numericMrat > 0 ? (numericMrat * 0.05).toFixed(2) : '12,850.00';

  // Disabled Reason determination (Callout 5 note in wireframe)
  const hasBalance = numericMrat > 0 || isPreview;
  const isTimerElapsed = false; // Simulated 4d 11h timer
  const isRewardPoolEmpty = false;

  let claimDisabledReason = '';
  if (!isConnected && !isPreview) {
    claimDisabledReason = 'Wallet not connected';
  } else if (!hasBalance) {
    claimDisabledReason = 'Zero MRAT token balance in wallet';
  } else if (!isTimerElapsed) {
    claimDisabledReason = 'Claim cycle countdown timer running (4d 11h remaining)';
  } else if (isRewardPoolEmpty) {
    claimDisabledReason = 'Reward pool currently empty';
  }

  const handleCopyContract = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.tokenAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const handleSwapSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSwapping(true);
    setSwapSuccess(false);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setTimeout(() => setSwapSuccess(false), 4000);
    }, 1500);
  };

  const pancakeSwapUrl = `https://pancakeswap.finance/swap?outputCurrency=${CONTRACT_CONFIG.tokenAddress}`;

  return (
    <div className="min-h-screen bg-[#07080C] text-neutral-100 flex flex-col font-sans relative selection:bg-orange-500 selection:text-white">
      {/* 1. TOP HEADER / APP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#0B0C12]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & App Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-orange-500/50 p-0.5 bg-neutral-900 shrink-0">
              <img
                src={PROJECT_CONFIG.mascotImage}
                alt="MarsRat Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                Mars<span className="text-orange-500">Rat</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase font-mono">
                MRAT
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/90 border border-neutral-800 p-1 rounded-xl">
            {(['dashboard', 'rewards', 'stats', 'docs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition duration-200 ${
                  activeTab === tab
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Network & Wallet Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* BSC Network Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BSC</span>
            </div>

            {/* Custom Connect / Account Button */}
            <CustomConnectButton />

            {isPreview && !isConnected && (
              <button
                onClick={onExitPreview}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-orange-500/40"
              >
                Exit Demo
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden flex items-center justify-around border-t border-neutral-800/60 pt-2.5 mt-2.5">
          {(['dashboard', 'rewards', 'stats', 'docs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize ${
                activeTab === tab
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : 'text-neutral-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Demo Mode Notice */}
      {isPreview && !isConnected && (
        <div className="bg-orange-950/70 border-b border-orange-500/40 px-4 py-2 text-center text-xs text-orange-200 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            <strong>Demo Mode Active:</strong> You are viewing simulated wallet data. Connect MetaMask or Web3 wallet for live BSC execution.
          </span>
          <button
            onClick={() => openConnectModal?.()}
            className="font-bold underline text-white hover:text-orange-300 ml-2"
          >
            Enter Dashboard
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* VIEW 1: DASHBOARD (WIREFRAME LAYOUT) */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* TOP METRIC CARDS ROW (CALLOUTS 1, 2, 3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Your Balance */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 shadow-xl flex flex-col justify-between hover:border-neutral-700/80 transition">
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                    Your balance
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    {isMratLoading ? '...' : `${mratBalance}`} <span className="text-orange-500 text-lg">MRAT</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>MRAT - value in partner token</span>
                  <span className="text-emerald-400 font-bold">≈ 254,500 SPCX</span>
                </div>
              </div>

              {/* Card 2: Reflections earned */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 shadow-xl flex flex-col justify-between hover:border-neutral-700/80 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Reflections earned
                    </span>
                    <div className="group relative cursor-help">
                      <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-orange-400" />
                      <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 p-2.5 bg-neutral-950 border border-neutral-700 text-[11px] text-neutral-300 rounded-xl shadow-2xl z-30 font-sans leading-snug">
                        The chain does not record per wallet. We infer reflections from a stored baseline — labeled as an estimate.
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                    +{estimatedReflections} <span className="text-emerald-500 text-lg">SPCX</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800/80 text-xs text-neutral-400 font-mono flex items-center justify-between">
                  <span>since first purchase</span>
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-orange-400 text-[10px] uppercase tracking-wider">
                    estimate
                  </span>
                </div>
              </div>

              {/* Card 3: Share of circulating supply */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 shadow-xl flex flex-col justify-between hover:border-neutral-700/80 transition">
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                    Share of circulating supply
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    {rewardShare}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800/80 text-xs text-neutral-400 font-mono">
                  drives your reward size
                </div>
              </div>
            </div>

            {/* MAIN SPLIT GRID: CLAIMABLE REWARDS (LEFT) vs BUY MRAT (RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT BOX: CLAIMABLE REWARDS (CALLOUTS 3, 4, 5, 6, 7) */}
              <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <Gift className="w-5 h-5 text-orange-500" />
                      <span>Claimable rewards</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-neutral-400 font-mono bg-neutral-800/80 px-2.5 py-1 rounded-lg">
                      Paid in Partner Token
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    paid in the partner token — never in BNB
                  </p>
                </div>

                {/* Amount + Ring Countdown Row */}
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Amount Display */}
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold block mb-1">
                      Pending reward - partner token
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                      {pendingRewards} <span className="text-lg text-emerald-500">SPCX</span>
                    </div>
                  </div>

                  {/* Countdown Widget (Callout 4) */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="38"
                          stroke="currentColor"
                          strokeWidth="7"
                          className="text-neutral-800"
                          fill="transparent"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="38"
                          stroke="currentColor"
                          strokeWidth="7"
                          className="text-orange-500"
                          strokeDasharray="238"
                          strokeDashoffset="70"
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-black text-white font-mono leading-tight">
                          4d 11h
                        </span>
                        <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider">
                          until claim
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Claim Button & Status (Callout 5) */}
                  <div className="w-full sm:w-auto flex flex-col items-center gap-2">
                    <button
                      onClick={() => claimRewards()}
                      disabled={isClaiming || Boolean(claimDisabledReason)}
                      type="button"
                      className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                        isClaiming || Boolean(claimDisabledReason)
                          ? 'bg-neutral-800 text-neutral-500 border border-neutral-700/60 cursor-not-allowed opacity-90'
                          : 'bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white shadow-lg shadow-orange-950/60 cursor-pointer active:scale-95'
                      }`}
                    >
                      {isClaiming ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Claiming...</span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          <span>Claim Rewards</span>
                        </>
                      )}
                    </button>

                    {/* Why button is disabled message (Callout 5 requirement) */}
                    {claimDisabledReason && (
                      <div className="text-[11px] text-amber-400/90 font-medium text-center flex items-center gap-1.5 max-w-xs">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>{claimDisabledReason}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Claim Success / Error alerts */}
                {claimSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Successfully claimed rewards! Check your Web3 wallet balance.</span>
                    </div>
                    <button onClick={resetClaimState} className="text-xs text-neutral-400 hover:text-white">✕</button>
                  </div>
                )}
                {claimError && (
                  <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{claimError}</span>
                    </div>
                    <button onClick={resetClaimState} className="text-xs text-neutral-400 hover:text-white">✕</button>
                  </div>
                )}

                {/* Notice Box: Buying more MRAT pushes claim date out (Callout 6) */}
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200/90 text-xs space-y-1">
                  <div className="font-extrabold text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Buying more MRAT pushes your next claim date out</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-[11px]">
                    any purchase of 2% or more of your balance adds up to a full cycle to the timer.
                  </p>
                </div>

                {/* Bonus Roll & Cycle info (Callout 7) */}
                <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-300 space-y-2 font-mono">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[11px] font-bold border border-orange-500/30">
                      ~6% roll: 1.5x-2x bonus
                    </span>
                    <span className="text-neutral-400 text-[11px]">
                      cycle: 7 days (1 day during launch week)
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 leading-snug">
                    claims above the threshold: 20% is spent buying MRAT and burning it — show this before the user signs
                  </div>
                </div>
              </div>

              {/* RIGHT BOX: BUY MRAT (CALLOUTS 8, 9) */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <Coins className="w-5 h-5 text-orange-500" />
                      <span>Buy MRAT</span>
                    </h3>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-mono">
                      BEP20 Token
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    MRAT is not paired with BNB. A user holding only BNB needs two hops.
                  </p>
                </div>

                {/* Swap Form */}
                <form onSubmit={handleSwapSimulation} className="space-y-4">
                  {/* From Token */}
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>From</span>
                      <span>Balance: {swapTokenType === 'BNB' ? '2.45 BNB' : '150,000 SPCX'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        step="0.01"
                        value={swapFromAmount}
                        onChange={(e) => setSwapFromAmount(e.target.value)}
                        className="w-full bg-transparent text-xl font-black text-white font-mono focus:outline-none"
                        placeholder="0.0"
                      />
                      <button
                        type="button"
                        onClick={() => setSwapTokenType(swapTokenType === 'BNB' ? 'PARTNER' : 'BNB')}
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-neutral-200 flex items-center gap-1.5 shrink-0"
                      >
                        <span>{swapTokenType === 'BNB' ? 'BNB' : 'SPCX'}</span>
                        <ArrowDownUp className="w-3 h-3 text-orange-400" />
                      </button>
                    </div>
                  </div>

                  {/* Swap Arrow Icon */}
                  <div className="flex justify-center -my-2 relative z-10">
                    <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-orange-400 shadow-md">
                      <ArrowDownUp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* To MRAT */}
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>To (Estimated output)</span>
                      <span>Balance: {mratBalance} MRAT</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        readOnly
                        value={
                          swapFromAmount
                            ? (parseFloat(swapFromAmount) * (swapTokenType === 'BNB' ? 500000 : 1.2)).toLocaleString()
                            : '0'
                        }
                        className="w-full bg-transparent text-xl font-black text-orange-400 font-mono focus:outline-none"
                      />
                      <div className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white flex items-center gap-1.5 shrink-0">
                        <span>🐀 MRAT</span>
                      </div>
                    </div>
                  </div>

                  {/* Slippage Must Be Pre-filled Notice (Callout 9) */}
                  <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs space-y-1">
                    <div className="font-extrabold text-amber-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Set slippage to 12% or the swap will fail</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-normal">
                      The 10% transfer fee means a default 0.5% slippage reverts every time. Pre-filled 12%.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <a
                      href={pancakeSwapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 border border-orange-400/40 shadow-xl flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <span>Swap on PancakeSwap</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="submit"
                      disabled={isSwapping}
                      className="w-full py-2.5 rounded-xl font-bold text-xs text-neutral-300 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center gap-2 transition"
                    >
                      {isSwapping ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulating Swap Route...</span>
                        </>
                      ) : (
                        <span>Simulate In-App Swap Route</span>
                      )}
                    </button>
                  </div>

                  {swapSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs text-center">
                      Swap simulation completed with 12% slippage tolerance!
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* PROTOCOL STATS (CALLOUT 10) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  <span>Protocol stats</span>
                </h3>
                <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live chain telemetry
                </span>
              </div>

              {/* 4 Protocol Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Reward pool */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-md">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Reward pool
                  </span>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    1,250,000 SPCX
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-2">
                    partner token held by contract
                  </span>
                </div>

                {/* 2. Liquidity depth */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-md">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Liquidity depth
                  </span>
                  <div className="text-xl font-black text-white font-mono">
                    $420,000 USD
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-2">
                    MRAT / partner pair
                  </span>
                </div>

                {/* 3. Total reflected */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-md">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Total reflected
                  </span>
                  <div className="text-xl font-black text-white font-mono">
                    8,500,000 MRAT
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-2">
                    totalFees() - all holders
                  </span>
                </div>

                {/* 4. Burned */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-md">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                    Burned
                  </span>
                  <div className="text-xl font-black text-rose-400 font-mono">
                    450,000,000 MRAT
                  </div>
                  <span className="text-[11px] text-neutral-500 block mt-2">
                    balance of dead address
                  </span>
                </div>
              </div>
            </div>

            {/* YOUR CLAIM HISTORY (CALLOUT 11) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>Your claim history</span>
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  Indexed from ClaimRewardSuccessfully logs
                </span>
              </div>

              <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Amount received</th>
                        <th className="p-4">Bonus</th>
                        <th className="p-4">Transaction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                      {/* Empty state first (Callout 11 note in wireframe) */}
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-neutral-500">
                          <div className="flex flex-col items-center max-w-sm mx-auto space-y-2 font-sans">
                            <Clock className="w-8 h-8 text-neutral-600 mb-1" />
                            <p className="text-sm font-semibold text-neutral-400">
                              No claims recorded yet for this wallet address
                            </p>
                            <p className="text-xs text-neutral-500">
                              Built from ClaimRewardSuccessfully logs — most wallets will have never claimed when they first land here.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* CONTRACT LINKS & PERMANENT RISK LINE (CALLOUT 12) */}
            <div className="space-y-3 pt-6 border-t border-neutral-800/80">
              {/* Contract Bar */}
              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3 w-full md:w-auto overflow-hidden">
                  <span className="text-neutral-400 shrink-0">Contract:</span>
                  <span className="text-orange-400 font-bold truncate">
                    {CONTRACT_CONFIG.tokenAddress}
                  </span>
                  <button
                    onClick={handleCopyContract}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition shrink-0"
                    title="Copy contract address"
                  >
                    {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 flex-wrap text-neutral-300">
                  <a
                    href={`${CONTRACT_CONFIG.blockExplorerUrl}/address/${CONTRACT_CONFIG.tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline transition flex items-center gap-1"
                  >
                    <span>BscScan</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://dexscreener.com/bsc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline transition flex items-center gap-1"
                  >
                    <span>Chart</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => {
                      if (onOpenWhitepaper) {
                        onOpenWhitepaper();
                      } else {
                        setActiveTab('docs');
                      }
                    }}
                    className="hover:text-white font-bold text-orange-400 underline transition cursor-pointer"
                  >
                    Technical Whitepaper v1.0
                  </button>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                    Audit Passed
                  </span>
                </div>
              </div>

              {/* Permanent Risk Banner (Callout 12 - Mandatory) */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center text-xs text-neutral-400 space-y-1">
                <div className="font-semibold text-neutral-300">
                  10% fee on every transfer - unaudited - rewards are not guaranteed
                </div>
                <div className="text-[11px] text-neutral-500">
                  This line stays visible on every screen — it is not a dismissible banner.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: REWARDS TAB */}
        {activeTab === 'rewards' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Gift className="w-6 h-6 text-orange-500" />
                <span>Rewards Engine & Staking Cycle</span>
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                MarsRat automatically accumulates reflection rewards in the partner token (SPCX) based on your proportion of the total circulating supply.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Your Holdings</span>
                  <span className="text-xl font-black text-white font-mono">{mratBalance} MRAT</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Pending Partner Rewards</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">{pendingRewards} SPCX</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Lifetime Claimed</span>
                  <span className="text-xl font-black text-orange-400 font-mono">{totalClaimed} SPCX</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                <div className="font-bold text-orange-400">7-Day Claim Cycle Policy</div>
                <p>
                  Claiming is enabled once every 7 days (1 day during launch week). Any new buy transaction of 2% or more of your existing balance resets your countdown back to a full cycle to prevent gaming the reflection pool.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: STATS TAB */}
        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-orange-500" />
                <span>Protocol Analytics & Token Telemetry</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block">Contract Address</span>
                  <span className="text-xs font-mono font-bold text-orange-400 break-all">{CONTRACT_CONFIG.tokenAddress}</span>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block">Burn Address</span>
                  <span className="text-xs font-mono font-bold text-rose-400 break-all">{CONTRACT_CONFIG.deadAddress}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Total Supply</span>
                  <span className="text-lg font-black text-white font-mono">1,000,000,000</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Total Burned</span>
                  <span className="text-lg font-black text-rose-400 font-mono">450,000,000</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Partner Pool</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">1,250,000 SPCX</span>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">Reflections Distributed</span>
                  <span className="text-lg font-black text-orange-400 font-mono">8,500,000 MRAT</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: DOCS TAB */}
        {activeTab === 'docs' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  <span>Technical Documentation v1.0</span>
                </h2>

                {onOpenWhitepaper && (
                  <button
                    onClick={onOpenWhitepaper}
                    type="button"
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition shadow-lg shadow-orange-950/50 flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View Full Technical Whitepaper (17 Pages)</span>
                  </button>
                )}
              </div>

              <div className="space-y-4 text-xs text-neutral-300 leading-relaxed font-sans">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <h3 className="font-extrabold text-sm text-orange-400">1. 10% Transfer Fee Breakdown</h3>
                  <p>
                    Every transfer or swap on BSC incurs a 10% tax:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-400 font-mono">
                    <li>4% distributed to holders in partner tokens (SPCX)</li>
                    <li>3% added to liquidity pool</li>
                    <li>2% allocated to project development & marketing</li>
                    <li>1% burned automatically</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <h3 className="font-extrabold text-sm text-orange-400">2. Slippage Requirement</h3>
                  <p>
                    Due to the 10% transfer tax, DEX swaps on PancakeSwap must set slippage tolerance to at least 12%. Default 0.5% slippage will revert transaction execution.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <h3 className="font-extrabold text-sm text-orange-400">3. Claim Thresholds & Anti-Gaming</h3>
                  <p>
                    Claims above the threshold spend 20% to buy MRAT and burn it. Purchasing 2% or more of your existing balance extends your claim window to ensure fair reflection distribution across all community members.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};
