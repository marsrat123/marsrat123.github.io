import React from 'react';
import { motion } from 'motion/react';
import { Coins, ShieldCheck, Flame, Percent, Lock, Layers } from 'lucide-react';
import { TokenomicsChart } from './TokenomicsChart';
import { ContractAddress } from './ContractAddress';
import { PROJECT_CONFIG } from '../config/project';
import { CONTRACT_CONFIG } from '../config/contracts';

export const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>Interplanetary Economy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Tokenomics & Specs
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Engineered for long-term sustainability, community rewards, and deep liquidity protection.
          </p>
        </motion.div>

        {/* Chart Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <TokenomicsChart />
        </motion.div>

        {/* Specs Grid Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              <Coins className="w-4 h-4 text-orange-400" />
              <span>Token & Supply</span>
            </div>
            <div className="text-xl font-black text-white font-mono">
              {PROJECT_CONFIG.name} <span className="text-orange-400">({PROJECT_CONFIG.symbol})</span>
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Supply: {PROJECT_CONFIG.totalSupply} (9 Decimals)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              <Percent className="w-4 h-4 text-emerald-400" />
              <span>Transfer Tax Recycling</span>
            </div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              10% Total Fee
            </div>
            <div className="text-[11px] text-neutral-300 font-mono mt-1">
              2% Reflected • 4% Auto LP • 4% Rewards
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4 text-rose-400" />
              <span>Pair & Exchange</span>
            </div>
            <div className="text-lg font-black text-white font-mono">
              PancakeSwap V2
            </div>
            <div className="text-[11px] text-orange-300 font-mono mt-1 truncate" title={PROJECT_CONFIG.partnerTokenAddress}>
              Partner: {PROJECT_CONFIG.partnerTokenAddress.slice(0, 8)}...{PROJECT_CONFIG.partnerTokenAddress.slice(-6)}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Transaction Limits</span>
            </div>
            <div className="text-base font-black text-amber-300 font-mono">
              0.01% Supply Cap
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-1">
              100B MRAT / Tx (Override: 2 BNB)
            </div>
          </div>
        </motion.div>


        {/* Contract Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 rounded-3xl bg-neutral-950/90 border border-orange-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-lg font-extrabold text-white">Verified Smart Contract Address</h3>
              <p className="text-xs text-neutral-400">
                Official BEP-20 token contract deployed on {CONTRACT_CONFIG.chainName}.
              </p>
            </div>
          </div>

          <ContractAddress address={CONTRACT_CONFIG.tokenAddress} label="Token Contract" />
        </motion.div>
      </div>
    </section>
  );
};

