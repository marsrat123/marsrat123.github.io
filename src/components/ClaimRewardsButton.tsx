import React from 'react';
import { Gift, Loader2, Sparkles } from 'lucide-react';

interface ClaimRewardsButtonProps {
  onClaim: () => void;
  isClaiming: boolean;
  isDisabled: boolean;
  numericPending: number;
}

export const ClaimRewardsButton: React.FC<ClaimRewardsButtonProps> = ({
  onClaim,
  isClaiming,
  isDisabled,
  numericPending,
}) => {
  return (
    <button
      onClick={onClaim}
      disabled={isDisabled || isClaiming}
      type="button"
      className={`relative w-full py-4 px-6 rounded-2xl font-black text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-300 border shadow-xl cursor-pointer ${
        isDisabled || isClaiming
          ? 'bg-neutral-800/80 text-neutral-500 border-neutral-700/50 cursor-not-allowed shadow-none'
          : 'bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white border-orange-400/60 shadow-orange-950/80 hover:shadow-orange-600/40 transform hover:-translate-y-0.5'
      }`}
    >
      {isClaiming ? (
        <>
          <Loader2 className="w-5 h-5 text-orange-200 animate-spin" />
          <span>Claiming Partner Token Rewards...</span>
        </>
      ) : (
        <>
          <Gift className="w-5 h-5 text-yellow-300" />
          <span>
            {numericPending > 0
              ? `Claim ${numericPending.toFixed(2)} Partner Tokens`
              : 'Claim Partner BEP20 Rewards'}
          </span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
        </>
      )}

    </button>
  );
};

