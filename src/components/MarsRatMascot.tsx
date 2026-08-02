import React, { useState } from 'react';
import { PROJECT_CONFIG } from '../config/project';

interface MarsRatMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const MarsRatMascot: React.FC<MarsRatMascotProps> = ({
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    hero: 'w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96',
  }[size];

  return (
    <div className={`relative inline-block group ${className}`}>
      {/* Outer Neon Glow Aura */}
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-red-600 to-rose-500 rounded-full blur-xl opacity-65 group-hover:opacity-90 transition duration-500 animate-pulse" />

      {/* Container */}
      <div
        className={`relative ${sizeClasses} rounded-full overflow-hidden border-2 border-orange-500/50 bg-neutral-950 p-1 shadow-2xl flex items-center justify-center transition-transform duration-500 transform group-hover:scale-105`}
      >
        {!imgError ? (
          <img
            src={PROJECT_CONFIG.mascotImage}
            alt="MarsRat Space Mascot"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-red-900 to-neutral-950 flex flex-col items-center justify-center p-2 text-center border border-red-500/30">
            <span className="text-3xl">🚀🐀</span>
            <span className="text-xs font-bold text-orange-400 mt-1">MarsRat</span>
          </div>
        )}
      </div>
    </div>
  );
};
