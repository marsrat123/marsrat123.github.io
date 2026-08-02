import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { CustomConnectButton } from './CustomConnectButton';
import { SOCIAL_LINKS } from '../config/socials';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; isWhitepaper?: boolean }[];
  onOpenWhitepaper?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  onOpenWhitepaper,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-neutral-950/95 border-l border-neutral-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀🐀</span>
              <span className="font-extrabold text-xl text-white tracking-wider">
                Mars<span className="text-orange-500">Rat</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => {
                  onClose();
                  if (link.isWhitepaper && onOpenWhitepaper) {
                    onOpenWhitepaper();
                  } else {
                    window.location.hash = link.href;
                  }
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-neutral-300 hover:text-white bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/60 hover:border-orange-500/40 transition cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col gap-4">
          <CustomConnectButton />

          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-orange-400 text-xs flex items-center gap-1"
            >
              X / Twitter <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-orange-400 text-xs flex items-center gap-1"
            >
              Telegram <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
