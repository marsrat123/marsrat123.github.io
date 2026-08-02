import React from 'react';
import { motion } from 'motion/react';
import { Rocket, ShieldCheck, Flame, ChevronRight, BookOpen } from 'lucide-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { PROJECT_CONFIG } from '../config/project';
import { ContractAddress } from './ContractAddress';
import { SOCIAL_LINKS } from '../config/socials';

interface HeroProps {
  onOpenWhitepaper?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhitepaper }) => {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Mars Planet Banner */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <img
          src={PROJECT_CONFIG.heroBannerImage}
          alt="Mars Surface Landscape"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/60 to-neutral-950" />
      </div>

      {/* Floating Animated Particles & Space Dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-orange-500/60 blur-xs animate-bounce" />
        <div className="absolute top-1/3 right-12 w-4 h-4 rounded-full bg-rose-500/50 blur-xs animate-pulse" />
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 rounded-full bg-yellow-400/70 blur-xs animate-ping" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg shadow-orange-950/60 animate-pulse"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>{PROJECT_CONFIG.missionStatus}</span>
        </motion.div>

        {/* Hero Video Display in Middle Section (Replacing Hero Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative inline-block group">
            {/* Outer Neon Glow Aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-red-600 to-rose-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

            {/* Circular Video Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-orange-500/80 bg-neutral-950 p-1 shadow-2xl flex items-center justify-center transition-transform duration-500 transform group-hover:scale-105">
              <video
                src={PROJECT_CONFIG.heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-2xl"
        >
          Mars<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-rose-500">Rat</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl sm:text-3xl font-extrabold text-orange-200 tracking-wide max-w-3xl mx-auto mb-4 drop-shadow-md"
        >
          {PROJECT_CONFIG.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {PROJECT_CONFIG.description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => {
              if (isConnected) {
                const el = document.getElementById('dashboard');
                el?.scrollIntoView({ behavior: 'smooth' });
              } else if (openConnectModal) {
                openConnectModal();
              }
            }}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 shadow-xl shadow-orange-950/70 hover:shadow-orange-600/40 border border-orange-400/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-3"
          >
            <Rocket className="w-5 h-5 text-orange-200" />
            <span>{isConnected ? 'Open Mission Dashboard' : 'Enter Dashboard'}</span>
            <ChevronRight className="w-4 h-4 text-orange-200" />
          </button>

          {onOpenWhitepaper && (
            <button
              onClick={onOpenWhitepaper}
              type="button"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-base text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-orange-400" />
              <span>Read Whitepaper v1.0</span>
            </button>
          )}
        </motion.div>

        {/* Contract Address Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <ContractAddress label="MRAT Contract" />
        </motion.div>

        {/* Quick Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex items-center justify-center gap-5 text-neutral-400"
        >
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/50 hover:text-orange-400 transition"
            title="X / Twitter"
          >
            <span className="font-bold text-sm">𝕏</span>
          </a>
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/50 hover:text-orange-400 transition"
            title="Telegram"
          >
            <span className="font-bold text-sm">✈️</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

