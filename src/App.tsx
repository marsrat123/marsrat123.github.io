import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Web3Provider } from './providers/Web3Provider';
import { StarfieldBackground } from './components/StarfieldBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { TreasuryDashboard } from './components/TreasuryDashboard';
import { Tokenomics } from './components/Tokenomics';
import { Roadmap } from './components/Roadmap';
import { About } from './components/About';
import { SocialLinks } from './components/SocialLinks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { DAppDashboard } from './components/DAppDashboard';
import { Whitepaper } from './components/Whitepaper';

function MainApp() {
  const { isConnected } = useAccount();
  const [isPreview, setIsPreview] = useState(false);
  const [showWhitepaper, setShowWhitepaper] = useState(false);

  if (showWhitepaper) {
    return <Whitepaper onBack={() => setShowWhitepaper(false)} />;
  }

  const showDApp = isConnected || isPreview;

  if (showDApp) {
    return (
      <DAppDashboard
        isPreview={isPreview && !isConnected}
        onExitPreview={() => setIsPreview(false)}
        onOpenWhitepaper={() => setShowWhitepaper(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090A0F] text-white font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      {/* Animated Background */}
      <StarfieldBackground />

      {/* Navigation */}
      <Navbar
        onOpenWhitepaper={() => setShowWhitepaper(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero
          onOpenWhitepaper={() => setShowWhitepaper(true)}
        />
        <HowItWorks />
        <TreasuryDashboard />
        <Tokenomics />
        <Roadmap />
        <About />
        <SocialLinks />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenWhitepaper={() => setShowWhitepaper(true)} />
    </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <MainApp />
    </Web3Provider>
  );
}
