import React from 'react';
import { CopyButton } from './CopyButton';
import { ExternalLink } from 'lucide-react';
import { CONTRACT_CONFIG } from '../config/contracts';

interface WalletMetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  copyText?: string;
  explorerAddress?: string;
  isLoading?: boolean;
  isError?: boolean;
  accentColor?: 'orange' | 'rose' | 'emerald' | 'amber' | 'blue';
}

export const WalletMetricCard: React.FC<WalletMetricCardProps> = ({
  title,
  value,
  subValue,
  icon,
  copyText,
  explorerAddress,
  isLoading = false,
  isError = false,
  accentColor = 'orange',
}) => {
  const borderAccents = {
    orange: 'hover:border-orange-500/50',
    rose: 'hover:border-rose-500/50',
    emerald: 'hover:border-emerald-500/50',
    amber: 'hover:border-amber-500/50',
    blue: 'hover:border-blue-500/50',
  }[accentColor];

  const iconBg = {
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }[accentColor];

  if (isLoading) {
    return (
      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-24 bg-neutral-800 rounded" />
          <div className="w-8 h-8 rounded-xl bg-neutral-800" />
        </div>
        <div className="h-7 w-32 bg-neutral-800 rounded mb-2" />
        <div className="h-3 w-20 bg-neutral-800 rounded" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-red-500/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-neutral-400">{title}</span>
          <span className="text-xs text-red-400 font-medium">RPC Delay</span>
        </div>
        <div className="text-sm text-red-300 font-mono">Data unavailable</div>
      </div>
    );
  }

  return (
    <div
      className={`p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 ${borderAccents} transition-all duration-300 backdrop-blur-md shadow-lg shadow-neutral-950 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-xl border ${iconBg}`}>{icon}</div>
      </div>

      <div className="mt-1">
        <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight flex items-center gap-2">
          <span className="truncate">{value}</span>
        </div>

        {subValue && (
          <div className="text-xs text-neutral-400 font-medium mt-1">{subValue}</div>
        )}
      </div>

      {(copyText || explorerAddress) && (
        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center gap-2">
          {copyText && <CopyButton textToCopy={copyText} label="Copy Address" />}
          {explorerAddress && (
            <a
              href={`${CONTRACT_CONFIG.blockExplorerUrl}/address/${explorerAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-orange-400"
            >
              <span>BscScan (BNB Explorer)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
