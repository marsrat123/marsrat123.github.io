import React from 'react';
import { motion } from 'motion/react';
import {
  Vault,
  Coins,
  DollarSign,
  Gift,
  Users,
  Award,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { TreasuryChart } from './TreasuryChart';
import { CopyButton } from './CopyButton';
import { useTreasuryBalance } from '../hooks/useTreasuryBalance';
import { CONTRACT_CONFIG } from '../config/contracts';

export const TreasuryDashboard: React.FC = () => {
  const treasury = useTreasuryBalance();

  const shortTreasuryAddress = `${treasury.treasuryAddress.slice(
    0,
    6
  )}...${treasury.treasuryAddress.slice(-4)}`;

  return (
    <section id="treasury" className="py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Vault className="w-3.5 h-3.5" />
              <span>Transparent Governance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Treasury Dashboard
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Real-time snapshot of the MarsRat multi-sig community reserve vault.
            </p>
          </div>

          {/* Treasury Address Badge */}
          <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-2xl bg-neutral-900 border border-neutral-800 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="text-neutral-400 font-sans block">Treasury Vault:</span>
              <span className="text-white font-mono font-bold">{shortTreasuryAddress}</span>
            </div>
            <CopyButton textToCopy={treasury.treasuryAddress} label="Copy" />
            <a
              href={`${CONTRACT_CONFIG.blockExplorerUrl}/address/${treasury.treasuryAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-orange-400 bg-neutral-950 hover:bg-neutral-800 transition"
              title="View Treasury on BscScan (BNB Explorer)"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Primary Treasury Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {/* Partner Reward Pool */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-orange-950/40 border border-orange-500/40 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Partner Reward Pool
              </span>
              <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Gift className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              4% Fee Stream
            </div>
            <span className="text-xs text-orange-300 font-semibold mt-2 inline-block">
              Claimable BEP20 Rewards Pool
            </span>
          </div>

          {/* Protocol Owned Liquidity */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800/80 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Protocol-Owned LP
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              4% Auto LP
            </div>
            <span className="text-xs text-neutral-400 mt-2 inline-block">
              Permanent PancakeSwap V2 Liquidity
            </span>
          </div>

          {/* Holder Reflections */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800/80 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Direct Reflections
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
              2% Reflections
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-2 inline-block">
              Auto-distributed to all holders
            </span>
          </div>

          {/* MarsRat Total Supply */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800/80 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Total Fixed Supply
              </span>
              <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <span className="text-xl">🐀</span>
              </div>
            </div>
            <div className="text-xl font-black text-white font-mono tracking-tight">
              1 Quadrillion MRAT
            </div>
            <span className="text-xs text-neutral-400 mt-2 inline-block">
              1,000,000,000,000,000 Total
            </span>
          </div>
        </motion.div>



        {/* Community Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase block">
                Total Distributed Rewards
              </span>
              <span className="text-lg font-black text-white font-mono">
                {treasury.totalDistributedRewards}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase block">
                Active On-Chain Holders
              </span>
              <span className="text-lg font-black text-white font-mono">
                {treasury.totalHolders.toLocaleString()} Holders
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase block">
                Claimed by Community
              </span>
              <span className="text-lg font-black text-white font-mono">
                {treasury.totalClaimedByCommunity}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Treasury Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
            <span>Treasury Allocation Breakdown</span>
          </h3>
          <TreasuryChart />
        </motion.div>
      </div>
    </section>
  );
};

