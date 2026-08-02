import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQItem } from '../types/web3';
import { CONTRACT_CONFIG } from '../config/contracts';

const FAQS: FAQItem[] = [
  {
    id: '1',
    category: 'general',
    question: 'What is MarsRat (MRAT)?',
    answer:
      'MarsRat is a fixed-supply BEP20 token on BNB Smart Chain with 1 Quadrillion total supply. It charges a 10% fee on market transfers: 2% is reflected directly to holders, 4% becomes permanent liquidity, and 4% accumulates in a claimable partner token reward pool.',
  },
  {
    id: '2',
    category: 'tokenomics',
    question: 'What is the partner token pairing?',
    answer:
      'Unlike traditional reflection tokens that pair against WBNB, MarsRat trades on PancakeSwap V2 directly against a partner BEP20 token at contract 0xbe9D156892E55e7154BcD3cB0FEA677F9D3103E1. All liquidity, reward pool holdings, and market buy-and-burns are denominated in this partner asset.',
  },
  {
    id: '3',
    category: 'rewards',
    question: 'How do reflections work?',
    answer:
      '2% of every transaction is removed from the transfer and distributed pro rata to every holder. Your MRAT balance ticks upward automatically in your wallet without needing any transaction, gas cost, or staking deposit.',
  },
  {
    id: '4',
    category: 'rewards',
    question: 'How do I claim partner token rewards?',
    answer:
      'Holding MRAT entitles you to claim a share of the partner token reward pool on a 7-day cycle (1-day cycle in launch week). Call claimReward() from your wallet. Note that each claim rolls a pseudo-random bonus with a ~6% chance of a 1.5x–1.99x reward multiplier.',
  },
  {
    id: '5',
    category: 'tokenomics',
    question: 'What are the transaction limits?',
    answer:
      'Single transfers are capped at 0.01% of supply (100,000,000,000 MRAT). To move larger amounts, holders can call disruptiveTransfer() with an attached 2 BNB fee.',
  },
  {
    id: '6',
    category: 'tokenomics',
    question: 'Where can I find contract addresses?',
    answer: `The official MRAT contract and partner reward pool address is ${CONTRACT_CONFIG.tokenAddress}, and the PancakeSwap V2 router address is ${CONTRACT_CONFIG.routerAddress}.`,
  },
  {
    id: '7',
    category: 'rewards',
    question: 'What is the top-up rule on claims?',
    answer:
      'Receiving an incoming transfer of at least 2% of your existing balance pushes your next claim date further out (up to 1 full cycle). This prevents traders from buying right before a claim and dumping immediately after.',
  },
  {
    id: '8',
    category: 'general',
    question: 'How can I join the community?',
    answer:
      'Join our official Telegram group and follow us on X (Twitter) via the links in the Socials section. Read Part III of the technical whitepaper for full risk disclosures.',
  },
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl bg-neutral-900/80 border border-neutral-800/80 hover:border-orange-500/40 transition overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  type="button"
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-extrabold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

