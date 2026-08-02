import React from 'react';
import { motion } from 'motion/react';
import { Wallet, Coins, TrendingUp, Gift, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    stepNumber: '01',
    title: 'Connect Your Wallet',
    description:
      'Link your Web3 wallet (MetaMask, Coinbase Wallet, Rainbow, or WalletConnect) on BNB Smart Chain.',
    icon: Wallet,
    color: 'from-orange-500 to-amber-500',
  },
  {
    stepNumber: '02',
    title: 'Hold MRAT Tokens',
    description:
      'Hold MRAT in your non-custodial wallet. 2% of every transfer is automatically reflected to every balance with zero gas fees.',
    icon: Coins,
    color: 'from-rose-500 to-red-500',
  },
  {
    stepNumber: '03',
    title: 'Accumulate Partner Yield',
    description:
      '4% of all trading volume is converted into the partner BEP20 token (0xbe9D...3103E1) and added directly to the claimable reward pool.',
    icon: TrendingUp,
    color: 'from-amber-400 to-emerald-400',
  },
  {
    stepNumber: '04',
    title: 'Claim Rewards on Cycle',
    description:
      'Call claimReward() on your 7-day cycle to collect your proportional share of the partner token pool directly to your wallet.',
    icon: Gift,
    color: 'from-emerald-400 to-teal-400',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 relative z-20 bg-neutral-950/60 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800/80 hover:border-orange-500/40 transition duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}
                    >
                      {step.stepNumber}
                    </span>
                    <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300 group-hover:text-orange-400 transition">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

