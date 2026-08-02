import React, { useState, useEffect } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { CustomConnectButton } from './CustomConnectButton';
import { MobileMenu } from './MobileMenu';
import { PROJECT_CONFIG } from '../config/project';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Whitepaper', href: '#whitepaper', isWhitepaper: true },
  { name: 'Rewards', href: '#rewards' },
  { name: 'Treasury', href: '#treasury' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'About', href: '#about' },
  { name: 'Socials', href: '#socials' },
];

interface NavbarProps {
  onOpenWhitepaper?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhitepaper }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/85 backdrop-blur-md border-b border-orange-500/20 py-3 shadow-2xl shadow-neutral-950/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Branding & Mascot */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-orange-500/50 p-0.5 bg-neutral-900 group-hover:border-orange-400 transition">
              <img
                src={PROJECT_CONFIG.mascotImage}
                alt="MarsRat Logo"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white">
                  Mars<span className="text-orange-500">Rat</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase">
                  <Sparkles className="w-2.5 h-2.5" />
                  Live
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/80 p-1.5 rounded-2xl backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={(e) => {
                  if (link.isWhitepaper && onOpenWhitepaper) {
                    e.preventDefault();
                    onOpenWhitepaper();
                  } else {
                    window.location.hash = link.href;
                  }
                }}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer ${
                  link.isWhitepaper
                    ? 'text-orange-400 font-bold bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right: Connect Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <CustomConnectButton />
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white bg-neutral-900/80 border border-neutral-800 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        onOpenWhitepaper={onOpenWhitepaper}
      />
    </>
  );
};
