import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 border bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-700/60 hover:border-orange-500/50 cursor-pointer ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span className="text-emerald-400">{label ? 'Copied!' : 'Copied'}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-300" />
          <span>{label || 'Copy'}</span>
        </>
      )}
    </button>
  );
};
