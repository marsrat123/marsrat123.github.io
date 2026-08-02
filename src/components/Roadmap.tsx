import React from 'react';
import { motion } from 'motion/react';
import { Rocket, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface PhaseData {
  phase: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  items: string[];
}

const PHASES: PhaseData[] = [
  {
    phase: 'Phase 1',
    title: 'Launch Preparation',
    status: 'completed',
    items: [
      'Interactive Web3 Portal Launch',
      'Smart Contract Security Verification',
      'Community Channels Setup (X & Telegram)',
      'Initial MarsRat Explorer Seed Army',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Mars Landing',
    status: 'in-progress',
    items: [
      'Fair DEX Liquidity Deployment',
      'Yield Rewards Vault Activation',
      'Global Meme Marketing Campaign',
      'Coingecko & CMC Indexing',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Colony Expansion',
    status: 'upcoming',
    items: [
      'Interplanetary Brand Partnerships',
      'Community Meme & Creation Contests',
      'MarsRat Space Cadet NFT Collectibles',
      'Tier-2 Centralized Exchange Listings',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Interplanetary Growth',
    status: 'upcoming',
    items: [
      'MarsRat DAO Community Governance',
      'Advanced Multi-Token Staking Pools',
      'Play-to-Earn Mars Colony Mini-Game',
      'Cross-Chain Wormhole Bridge',
    ],
  },
];

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5" />
            <span>Mission Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            MarsRat Roadmap
          </h2>
          <p className="text-neutral-400 text-base">
            Our strategic flight plan for conquering the red planet and building long-term ecosystem value.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PHASES.map((phase, idx) => {
            const isCompleted = phase.status === 'completed';
            const isInProgress = phase.status === 'in-progress';

            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`p-6 rounded-3xl border transition duration-300 flex flex-col justify-between shadow-2xl relative ${
                  isInProgress
                    ? 'bg-neutral-900 border-orange-500 shadow-orange-950/50 ring-1 ring-orange-500/50'
                    : isCompleted
                    ? 'bg-neutral-900/80 border-emerald-500/40'
                    : 'bg-neutral-950/80 border-neutral-800'
                }`}
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400 font-mono">
                      {phase.phase}
                    </span>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}

                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 animate-pulse">
                        <Clock className="w-3 h-3" /> Active Mission
                      </span>
                    )}

                    {!isCompleted && !isInProgress && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-neutral-400 border border-neutral-700">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-white mb-4">{phase.title}</h3>

                  <ul className="space-y-3 text-xs text-neutral-300">
                    {phase.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 leading-relaxed">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-400'
                              : isInProgress
                              ? 'bg-orange-400'
                              : 'bg-neutral-600'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

