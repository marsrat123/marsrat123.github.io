import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  ArrowLeft,
  FileText,
  Shield,
  Zap,
  Lock,
  Layers,
  Award,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Code2,
  Cpu,
  BarChart2,
  RefreshCw,
  Flame,
  CheckCircle2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { CONTRACT_CONFIG } from '../config/contracts';
import { PROJECT_CONFIG } from '../config/project';

interface WhitepaperProps {
  onBack: () => void;
}

export const Whitepaper: React.FC<WhitepaperProps> = ({ onBack }) => {
  const [copiedContract, setCopiedContract] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState<string>('part-1');

  const handleCopyContract = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.tokenAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveNavSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-neutral-200 font-sans selection:bg-orange-500 selection:text-white relative">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-50 bg-[#0B0C12]/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" />
            <span>Back to Application</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Whitepaper v1.0
            </span>
            <button
              onClick={handleCopyContract}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-1.5"
            >
              {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-orange-400" />}
              <span className="hidden md:inline">0xbe9D...03E1</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Table of Contents Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-20 bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-4 text-xs space-y-3 font-mono">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] pb-2 border-b border-neutral-800 flex items-center justify-between">
            <span>Document Index</span>
            <span className="text-orange-500">v1.0</span>
          </div>

          <nav className="space-y-1 text-neutral-400">
            <button
              onClick={() => scrollToSection('part-1')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                activeNavSection === 'part-1' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'hover:text-white'
              }`}
            >
              <span>Part I: For Holders</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => scrollToSection('part-2')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                activeNavSection === 'part-2' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'hover:text-white'
              }`}
            >
              <span>Part II: Technical Specs</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => scrollToSection('part-3')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                activeNavSection === 'part-3' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'hover:text-white'
              }`}
            >
              <span>Part III: Risk Disclosure</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => scrollToSection('appendix-a')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                activeNavSection === 'appendix-a' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'hover:text-white'
              }`}
            >
              <span>Appendix A: Functions</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => scrollToSection('appendix-b')}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                activeNavSection === 'appendix-b' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'hover:text-white'
              }`}
            >
              <span>Appendix B: Launch</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </nav>

          <div className="pt-3 border-t border-neutral-800 text-[10px] text-neutral-500 leading-snug">
            BNB Smart Chain (Chain ID 56) · Reflection Protocol · Solidity 0.8.24
          </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-9 space-y-12">
          
          {/* TITLE & COVER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl relative overflow-hidden space-y-6"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest font-bold">
                <span>BNB SMART CHAIN</span>
                <span>•</span>
                <span>PancakeSwap V2</span>
                <span>•</span>
                <span>BEP20</span>
                <span>•</span>
                <span>Reflection Protocol</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                Mars<span className="text-orange-500">Rat</span>
              </h1>
              <div className="text-2xl font-bold text-orange-400 font-mono">
                MRAT
              </div>
              <p className="text-lg text-neutral-300 leading-relaxed font-sans max-w-2xl">
                A token-paired reflection asset on BNB Smart Chain. Holder redistribution, protocol-owned liquidity, and a claimable reward pool — all denominated in a partner BEP20 token instead of BNB.
              </p>
            </div>

            {/* KEY PARAMETERS SPECIFICATION TABLE */}
            <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950/80 font-mono text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">Field</th>
                    <th className="p-3.5">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Name / Ticker</td>
                    <td className="p-3.5 font-bold text-white">MarsRat / MRAT</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Standard</td>
                    <td className="p-3.5">BEP20 (BNB Smart Chain, chain ID 56)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Decimals</td>
                    <td className="p-3.5">9</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Total supply</td>
                    <td className="p-3.5">1,000,000,000,000,000 MRAT (fixed, no mint function)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Exchange</td>
                    <td className="p-3.5">PancakeSwap V2</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Liquidity pair</td>
                    <td className="p-3.5 text-orange-400">MRAT / partner token (not WBNB)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Partner token</td>
                    <td className="p-3.5 font-bold text-orange-400 break-all">{CONTRACT_CONFIG.tokenAddress}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Router</td>
                    <td className="p-3.5 text-neutral-400 break-all">{CONTRACT_CONFIG.routerAddress}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Transfer fee</td>
                    <td className="p-3.5 font-bold text-emerald-400">10% total — 2% reflected, 4% liquidity, 4% rewards</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Compiler</td>
                    <td className="p-3.5">Solidity 0.8.24</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-neutral-400">Document</td>
                    <td className="p-3.5">Version 1.0 — August 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 italic">
              This document describes software. It is not an offer, solicitation, or recommendation to buy or sell any asset. Read Part III (Risk Disclosure) in full before interacting with the contract.
            </div>
          </motion.div>

          {/* ABSTRACT */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-black text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <FileText className="w-6 h-6 text-orange-500" />
              <span>Abstract</span>
            </h2>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                <strong>MarsRat (MRAT)</strong> is a fixed-supply BEP20 token that charges a 10 percent fee on market transfers and recycles that fee three ways: 2 percent is redistributed pro rata to every holder without any action on their part, 4 percent is converted into permanent protocol-owned liquidity, and 4 percent accumulates in a reward pool that holders may claim on a timed cycle.
              </p>
              <p>
                The design descends from the 2021 reflection-token lineage, but changes one structural assumption. Those contracts hard-wired BNB as the unit of account: liquidity was paired against WBNB, fees were sold into BNB, and rewards were paid in BNB. MarsRat replaces that with an arbitrary partner BEP20 token, fixed at deployment to <code className="text-orange-400 bg-neutral-900 px-1.5 py-0.5 rounded font-mono text-xs">{CONTRACT_CONFIG.tokenAddress}</code>. Every economic flow in the protocol — the trading pair, the liquidity that gets added, the reward pool, and the buy-and-burn — is denominated in that token. No path in the contract touches WBNB.
              </p>
              <p>
                The practical consequence is that MRAT is economically downstream of its partner token rather than of BNB. Holding MRAT is a leveraged position on the partner asset's ecosystem: trading pressure on MRAT accrues rewards in the partner token, and the value of those rewards moves with it. This is a deliberate design choice with real trade-offs, and Section 16 discusses them without varnish.
              </p>
            </div>

            {/* Note on reflection tokens */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-2">
              <div className="font-extrabold text-amber-400 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>A note on what reflection tokens are and are not</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                A reflection fee redistributes tokens that already exist. It does not create value, generate revenue, or produce yield in the way a business or a lending protocol does. When you receive reflections, you are receiving a share of fees paid by people who traded — mostly people who bought or sold after you. Any honest description of this token has to say that plainly, and this one does.
              </p>
            </div>
          </motion.section>

          {/* PART I: FOR HOLDERS */}
          <motion.section
            id="part-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-2 border-b border-neutral-800 pb-3">
              <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest">PART I</span>
              <h2 className="text-3xl font-black text-white">For Holders</h2>
            </div>

            {/* Section 1: What MarsRat is */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-orange-400 font-mono">1 What MarsRat is</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                MarsRat is a token that lives on BNB Smart Chain and trades on PancakeSwap. There are one quadrillion MRAT and there will never be more — the contract has no mint function, and no function that can create a token out of nothing.
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                What makes it behave differently from a plain BEP20 is that it takes a fee on transfers and puts that fee to work. Send MRAT to a wallet, buy it on PancakeSwap, or sell it, and 10 percent of the amount is diverted. That 10 percent does three jobs at once:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-300">
                <li>
                  <strong className="text-white">2 percent evaporates into every wallet.</strong> It is not sent anywhere. It is removed from the transfer and every holder's balance grows to absorb it, in proportion to what they already hold. Your balance goes up while you do nothing.
                </li>
                <li>
                  <strong className="text-white">4 percent becomes liquidity.</strong> The contract periodically sells part of what it has collected, pairs the proceeds with the rest, and deposits both sides into the PancakeSwap pool. The pool gets deeper over time, which means large trades move the price less.
                </li>
                <li>
                  <strong className="text-white">4 percent fills a reward pool.</strong> This part is converted into the partner token and held by the contract. Holders can claim a share of it on a cycle.
                </li>
              </ul>
            </div>

            {/* Section 2: Why a token pair instead of BNB */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-orange-400 font-mono">2 Why a token pair instead of BNB</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Almost every reflection token from this lineage pairs against BNB. MarsRat does not. Its market is MRAT against the partner token at <code className="text-orange-400 font-mono">{CONTRACT_CONFIG.tokenAddress}</code>, and that address is a compile-time constant. It cannot be changed after deployment, not by the owner, not by anyone.
              </p>
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs font-sans">
                <div className="font-bold text-white">Three key consequences follow:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                  <li><strong>To buy MRAT you first need the partner token.</strong> A buyer holding only BNB has to make two hops: BNB into partner token, then partner token into MRAT. PancakeSwap's router will do this automatically if a route exists.</li>
                  <li><strong>Your rewards are paid in the partner token, not BNB.</strong> The reward pool is a balance of the partner token sitting in the MarsRat contract. When you claim, you receive that token.</li>
                  <li><strong>MRAT's price is quoted in the partner token.</strong> If the partner token falls 50 percent against BNB and MRAT holds its ratio, MRAT has also fallen 50 percent in BNB terms.</li>
                </ul>
              </div>
            </div>

            {/* Section 3: What happens when you trade */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-orange-400 font-mono">3 What happens when you trade</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                A worked example: Suppose you buy 1,000,000 MRAT on PancakeSwap and you are not on the fee-exempt list.
              </p>
              
              <div className="rounded-2xl border border-neutral-800 overflow-hidden font-mono text-xs bg-neutral-950/90">
                <table className="w-full text-left">
                  <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Step</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Where it goes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    <tr>
                      <td className="p-3 font-bold text-white">You receive</td>
                      <td className="p-3 text-emerald-400 font-bold">900,000 MRAT</td>
                      <td className="p-3">Credited to your wallet</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Reflected</td>
                      <td className="p-3 text-orange-400">20,000 MRAT</td>
                      <td className="p-3">Spread across all holders, including you</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Held by contract</td>
                      <td className="p-3 text-neutral-400">80,000 MRAT</td>
                      <td className="p-3">Queued for liquidity and rewards</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                <strong className="text-orange-400 block mb-1">Selling costs the same as buying:</strong>
                There is no separate sell tax and no penalty that rises with holding time. Buys, sells and plain wallet-to-wallet transfers are all charged the same 10 percent.
              </div>
            </div>

            {/* Sections 4, 5, 6, 7, 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h4 className="font-mono font-bold text-orange-400 text-sm">4 Reflections: the 2 percent</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Reflection works by bookkeeping rather than transfers, costing no gas and producing no Transfer event in wallet history. Internally, the contract shrinks the global conversion rate pool, causing every real balance to tick upward instantly.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h4 className="font-mono font-bold text-orange-400 text-sm">5 Liquidity: the first 4 percent</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  When the contract's collected balance crosses 10,000,000,000 MRAT, it sells 3/4 on PancakeSwap for partner tokens, pairs 1/3 of proceeds with the remaining 1/4 batch, and deposits into PancakeSwap LP.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h4 className="font-mono font-bold text-orange-400 text-sm">6 Rewards: the second 4 percent</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Partner tokens not spent on liquidity accumulate in the contract as the reward pool. Claimable share is proportional to MRAT held relative to circulating supply. The pool is finite and first-come.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <h4 className="font-mono font-bold text-orange-400 text-sm">7 Claiming, cycles, and bonus roll</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Manual claim call. Wait is 7 days (1 day during launch week). Receiving MRAT adds proportional timer delay. ~6% of claims win a 1.5x-2x bonus multiplier. Large claims burn 20% by market buying MRAT.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
              <h4 className="font-mono font-bold text-orange-400 text-sm">8 Transaction limits</h4>
              <p className="text-neutral-300 leading-relaxed">
                After launch, a single transfer is capped at 0.01 percent of supply — 100,000,000,000 MRAT. Calling <code className="text-orange-400 font-mono">disruptiveTransfer()</code> allows bypassing the cap if at least 2 BNB fee is attached to the call.
              </p>
            </div>
          </motion.section>

          {/* PART II: TECHNICAL SPECIFICATION */}
          <motion.section
            id="part-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-2 border-b border-neutral-800 pb-3">
              <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest">PART II</span>
              <h2 className="text-3xl font-black text-white">Technical Specification</h2>
            </div>

            {/* Section 9: Constants and deployment state */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-400 font-mono">9 Constants and deployment state</h3>
              <p className="text-xs text-neutral-400">
                All values below are read directly from the deployed source. Amounts marked base units are raw uint256 values; MRAT uses 9 decimals, so one whole token is 10⁹ base units.
              </p>

              <div className="rounded-2xl border border-neutral-800 overflow-x-auto bg-neutral-950 font-mono text-xs">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Identifier</th>
                      <th className="p-3">Value</th>
                      <th className="p-3">Mutable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">_name / _symbol</td>
                      <td className="p-3">MarsRat / MRAT</td>
                      <td className="p-3 text-neutral-500">No (constant)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">_decimals</td>
                      <td className="p-3">9</td>
                      <td className="p-3 text-neutral-500">No (constant)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">_tTotal</td>
                      <td className="p-3">1e24 base units = 1e15 MRAT</td>
                      <td className="p-3 text-neutral-500">No (constant)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">PAIRED_TOKEN</td>
                      <td className="p-3 text-xs break-all">{CONTRACT_CONFIG.tokenAddress}</td>
                      <td className="p-3 text-neutral-500">No (constant)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">ROUTER</td>
                      <td className="p-3 text-xs break-all">{CONTRACT_CONFIG.routerAddress}</td>
                      <td className="p-3 text-neutral-500">No (constant)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">DEAD</td>
                      <td className="p-3 text-xs break-all">{CONTRACT_CONFIG.deadAddress}</td>
                      <td className="p-3 text-neutral-500">No (constant)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">_taxFee</td>
                      <td className="p-3">2 (percent)</td>
                      <td className="p-3 text-amber-400">Owner, max 10</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">_liquidityFee</td>
                      <td className="p-3">8 (percent)</td>
                      <td className="p-3 text-amber-400">Owner, max 10</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">_maxTxAmount</td>
                      <td className="p-3">1e20 base units = 1e11 MRAT</td>
                      <td className="p-3 text-amber-400">Owner, 1 to 10000 bp</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">minTokenNumberToSell</td>
                      <td className="p-3">1e19 base units = 1e10 MRAT</td>
                      <td className="p-3 text-amber-400">Owner</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">rewardCycleBlock</td>
                      <td className="p-3">7 days</td>
                      <td className="p-3 text-amber-400">Owner</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">easyRewardCycleBlock</td>
                      <td className="p-3">1 day</td>
                      <td className="p-3 text-amber-400">Owner</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sections 10 - 14 Code & Formula Display */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-xs">
                <h4 className="font-bold text-orange-400 text-sm">10 Reflection Accounting Conversion Formula</h4>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-emerald-400 font-bold text-sm">
                  rate = rSupply / tSupply
                </div>
                <p className="text-neutral-400 font-sans text-xs">
                  Where rSupply and tSupply subtract the holdings of reward-excluded accounts. Visible balance is <code className="text-orange-400">_rOwned[account] / rate</code>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-xs">
                <h4 className="font-bold text-orange-400 text-sm">11 Fee Application Calculation</h4>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-emerald-400 font-bold text-xs break-all">
                  tFee = amount * _taxFee / 100 &nbsp;&nbsp;|&nbsp;&nbsp; tLiquidity = amount * _liquidityFee / 100
                </div>
                <p className="text-neutral-400 font-sans text-xs">
                  Hardcoded safety caps: <code className="text-orange-400">setTaxFeePercent</code> and <code className="text-orange-400">setLiquidityFeePercent</code> reject any value above 10%, capping total fee at 20% max.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-xs">
                <h4 className="font-bold text-orange-400 text-sm">13 Reward Computation Formula</h4>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-emerald-400 font-bold text-xs">
                  reward = pool * multiplier * balance / 100 / circulating
                </div>
                <p className="text-neutral-400 font-sans text-xs">
                  Multiplier is 100 normally, or between [150, 199] on a winning roll (~6% probability).
                </p>
              </div>
            </div>

            {/* Section 15: Administrative surface */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-orange-400 font-mono">15 Administrative surface</h3>
              <p className="text-xs text-neutral-300">
                This section exists so that nobody has to reverse-engineer what the owner can and cannot do.
              </p>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs font-sans">
                <div className="font-bold text-white text-sm">What the owner CANNOT do:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                  <li><strong>Mint tokens.</strong> There is no mint function and no code path that increases total supply.</li>
                  <li><strong>Blacklist or freeze.</strong> No address can be prevented from transferring.</li>
                  <li><strong>Set fees above 20%.</strong> Fee caps are code constants, not owner-settable.</li>
                  <li><strong>Withdraw the reward pool.</strong> No function transfers the partner token out except a holder's own claim and LP deposit.</li>
                  <li><strong>Change partner token, router, or pair.</strong> All three are constant or immutable.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* PART III: RISK DISCLOSURE */}
          <motion.section
            id="part-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2 border-b border-neutral-800 pb-3">
              <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest">PART III</span>
              <h2 className="text-3xl font-black text-white">16 Risk Disclosure</h2>
            </div>

            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
              This section is written to be read, not to be skipped. MRAT is an experimental token with no revenue, no assets, no claim on anything, and no mechanism that produces returns from outside its own trading activity.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-rose-400 block">Partner token dependency</span>
                <p className="text-neutral-400 leading-relaxed">
                  MarsRat's pair, reward pool, liquidity and buy-and-burn all run through one external contract. If that token loses liquidity or is exploited, MRAT swaps can fail.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-rose-400 block">Reward pool is not guaranteed</span>
                <p className="text-neutral-400 leading-relaxed">
                  Rewards are paid from a finite balance on a first-come basis. Concentrated claims can drain the pool until trading volume refills it.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-rose-400 block">Centralisation at launch</span>
                <p className="text-neutral-400 leading-relaxed">
                  At launch one address holds initial supply and owner controls. Buyers must verify LP token lock/burn and ownership renunciation on-chain.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-rose-400 block">No third-party audit</span>
                <p className="text-neutral-400 leading-relaxed">
                  Compiled and reviewed, but not formally verified by an external auditing firm. Treat any amount committed as capital you can afford to lose entirely.
                </p>
              </div>
            </div>
          </motion.section>

          {/* APPENDIX A: PUBLIC FUNCTION REFERENCE */}
          <motion.section
            id="appendix-a"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-black text-white font-mono border-b border-neutral-800 pb-3">
              Appendix A — Public function reference
            </h2>

            <div className="rounded-2xl border border-neutral-800 overflow-x-auto bg-neutral-950 font-mono text-xs">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Function</th>
                    <th className="p-3">Access</th>
                    <th className="p-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  <tr>
                    <td className="p-3 text-orange-400 font-bold">transfer / transferFrom</td>
                    <td className="p-3">Public</td>
                    <td className="p-3">Standard BEP20, fees applied</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-orange-400 font-bold">balanceOf / totalSupply</td>
                    <td className="p-3">View</td>
                    <td className="p-3">Standard BEP20 reads</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-orange-400 font-bold">claimReward</td>
                    <td className="p-3 text-emerald-400">Public, EOA only</td>
                    <td className="p-3">Claim partner-token rewards</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-orange-400 font-bold">disruptiveTransfer</td>
                    <td className="p-3 text-amber-400">Payable</td>
                    <td className="p-3">Exceed transfer cap for a BNB fee</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-orange-400 font-bold">activateContract</td>
                    <td className="p-3 text-rose-400">Owner</td>
                    <td className="p-3">One-shot launch configuration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* APPENDIX B: LAUNCH SEQUENCE */}
          <motion.section
            id="appendix-b"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-black text-white font-mono border-b border-neutral-800 pb-3">
              Appendix B — Launch sequence
            </h2>

            <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 font-mono text-xs space-y-2 text-neutral-300 leading-relaxed">
              <ol className="list-decimal pl-5 space-y-1.5 text-neutral-300">
                <li>Compile with solc 0.8.24, optimizer enabled, 200 runs.</li>
                <li>Deploy MarsRat. No constructor arguments; pair created automatically.</li>
                <li>Verify source code on BscScan with matching compiler settings.</li>
                <li>Call <code className="text-orange-400">activateContract()</code> (sets cap to 0.01%, enables auto-liquidity, approves router).</li>
                <li>Approve MRAT and partner token to router from deployer wallet.</li>
                <li>Add initial liquidity to MRAT / partner-token pair on PancakeSwap V2.</li>
                <li>Lock or burn resulting LP tokens. Publish transaction hash.</li>
                <li>Publish deployer's remaining balance and allocation schedule.</li>
                <li>Transfer ownership to a timelock / multisig, or renounce it.</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 text-center">
              MarsRat (MRAT) — Technical Whitepaper, Version 1.0, August 2026. Provided for information only.
            </div>
          </motion.section>

        </main>
      </div>
    </div>
  );
};
