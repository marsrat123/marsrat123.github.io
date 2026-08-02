import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { CONTRACT_CONFIG } from '../config/contracts';

interface ContractAddressProps {
  address?: string;
  label?: string;
  showExplorer?: boolean;
  className?: string;
}

export const ContractAddress: React.FC<ContractAddressProps> = ({
  address = CONTRACT_CONFIG.tokenAddress,
  label = 'Contract Address',
  showExplorer = true,
  className = '',
}) => {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 p-2 px-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-orange-500/40 backdrop-blur-md transition duration-300 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-xs text-orange-400 font-mono font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-neutral-400 font-sans hidden sm:inline">{label}:</span>
        <span className="text-neutral-200 font-semibold font-mono" title={address}>
          {shortAddress}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <CopyButton textToCopy={address} label="Copy" />

        {showExplorer && (
          <a
            href={`${CONTRACT_CONFIG.blockExplorerUrl}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-neutral-400 hover:text-orange-400 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 hover:border-orange-500/40 transition duration-200"
            title="View on Block Explorer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Explorer</span>
          </a>
        )}
      </div>
    </div>
  );
};
