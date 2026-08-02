import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, ChevronDown, Network, LogOut, ExternalLink } from 'lucide-react';
import { CONTRACT_CONFIG } from '../config/contracts';

export const CustomConnectButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={() => openConnectModal?.()}
                    type="button"
                    className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 shadow-lg shadow-orange-950/50 hover:shadow-orange-600/30 border border-orange-400/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Wallet className="w-4 h-4 text-orange-200 group-hover:scale-110 transition-transform" />
                    <span>Enter Dashboard</span>
                    <div className="absolute -inset-0.5 rounded-xl bg-orange-500/20 blur group-hover:opacity-100 opacity-0 transition" />
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={() => openChainModal?.()}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-200 bg-red-950/80 border border-red-500/80 hover:bg-red-900 transition cursor-pointer animate-pulse"
                  >
                    <Network className="w-4 h-4 text-red-400" />
                    <span>Wrong Network</span>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {/* Network Switch Button */}
                  <button
                    onClick={() => openChainModal?.()}
                    type="button"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-orange-500/40 transition cursor-pointer"
                  >
                    {chain.hasIcon && (
                      <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                    <span>{chain.name}</span>
                    <ChevronDown className="w-3 h-3 text-neutral-400" />
                  </button>

                  {/* Account Button */}
                  <button
                    onClick={() => openAccountModal?.()}
                    type="button"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-neutral-900 to-neutral-950 border border-orange-500/40 hover:border-orange-400 shadow-md shadow-neutral-950 hover:shadow-orange-950 transition cursor-pointer group"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-neutral-200 group-hover:text-orange-300">
                      {account.displayName}
                    </span>
                    {account.displayBalance ? (
                      <span className="hidden md:inline text-neutral-400 text-[11px] font-normal border-l border-neutral-800 pl-2">
                        {account.displayBalance}
                      </span>
                    ) : null}
                    <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-white" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
