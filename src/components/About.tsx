import React from 'react';
import { motion } from 'motion/react';
import { Users, Vault, Gift, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Mission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            About MarsRat
          </h2>
          <p className="text-lg text-neutral-300 leading-relaxed font-medium">
            “MarsRat (MRAT) is a token-paired reflection asset on BNB Smart Chain. Every transaction recycles a 10% transfer fee: 2% is redistributed pro rata to holders, 4% becomes permanent protocol-owned liquidity, and 4% fills a claimable partner BEP20 token reward pool.”
          </p>

        </motion.div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/50 transition duration-300 shadow-xl backdrop-blur-md flex flex-col items-start group"
          >
            <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-6 group-hover:scale-110 transition duration-300">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Community Powered</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Every major decision, proposal, and expansion initiative is voted on by the decentralized MarsRat community. No corporate bosses — just space rats exploring together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/50 transition duration-300 shadow-xl backdrop-blur-md flex flex-col items-start group"
          >
            <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-6 group-hover:scale-110 transition duration-300">
              <Vault className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Transparent Treasury</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              100% on-chain multi-sig vault visible to all holders. Track reserve liquidity, stablecoin holdings, marketing allocations, and reward distributions in real time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/50 transition duration-300 shadow-xl backdrop-blur-md flex flex-col items-start group"
          >
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6 group-hover:scale-110 transition duration-300">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Automated Rewards</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Hold MRAT tokens in your connected Web3 wallet and earn yield automatically. Claim your accumulated rewards whenever you want with one single click.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

