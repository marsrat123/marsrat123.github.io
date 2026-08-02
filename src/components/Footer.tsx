import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECT_CONFIG } from '../config/project';
import { CONTRACT_CONFIG } from '../config/contracts';
import { SOCIAL_LINKS } from '../config/socials';
import { ContractAddress } from './ContractAddress';

interface FooterProps {
  onOpenWhitepaper?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhitepaper }) => {
  return (
    <footer className="relative z-20 bg-neutral-950 border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900"
        >
          {/* Col 1: Branding & Description */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-500/50 p-0.5 bg-neutral-900">
                <img
                  src={PROJECT_CONFIG.mascotImage}
                  alt="MarsRat Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-wider">
                Mars<span className="text-orange-500">Rat</span>
              </span>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              {PROJECT_CONFIG.tagline} {PROJECT_CONFIG.description}
            </p>

            <ContractAddress address={CONTRACT_CONFIG.tokenAddress} label="MRAT Token" />
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-bold text-white text-sm uppercase tracking-wider mb-1">
              Ecosystem Navigation
            </span>
            <a href="#hero" className="hover:text-orange-400 transition">
              Home
            </a>
            {onOpenWhitepaper && (
              <button
                type="button"
                onClick={onOpenWhitepaper}
                className="text-left font-bold text-orange-400 hover:text-orange-300 transition cursor-pointer"
              >
                Technical Whitepaper v1.0
              </button>
            )}
            <a href="#dashboard" className="hover:text-orange-400 transition">
              Mission Control Dashboard
            </a>
            <a href="#rewards" className="hover:text-orange-400 transition">
              Yield Rewards Vault
            </a>
            <a href="#treasury" className="hover:text-orange-400 transition">
              Transparent Treasury
            </a>
            <a href="#tokenomics" className="hover:text-orange-400 transition">
              Tokenomics & Specs
            </a>
            <a href="#roadmap" className="hover:text-orange-400 transition">
              Project Roadmap
            </a>
            <a href="#about" className="hover:text-orange-400 transition">
              About Mission
            </a>
          </div>

          {/* Col 3: Social & External Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-bold text-white text-sm uppercase tracking-wider mb-1">
              Community & DEX Hubs
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-orange-500/40 text-neutral-300 hover:text-white transition flex items-center justify-between"
              >
                <span>X / Twitter</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-orange-500/40 text-neutral-300 hover:text-white transition flex items-center justify-between"
              >
                <span>Telegram</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Risk Disclaimer Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-8 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-neutral-400 flex items-start gap-3"
        >
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong className="text-neutral-300 block mb-0.5">Cryptocurrency Risk Disclaimer:</strong>
            Cryptocurrency involves significant risk. MarsRat is a community-driven digital token and should not be considered financial advice. Always conduct your own research before interacting with any blockchain project. Never invest funds you cannot afford to lose.
          </div>
        </motion.div>

        {/* Bottom Copyright & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {PROJECT_CONFIG.name} Ecosystem. All rights reserved. Built for space exploration.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-neutral-400">Network: {CONTRACT_CONFIG.chainName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

