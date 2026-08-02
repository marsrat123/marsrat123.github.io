import React, { useState } from 'react';

interface TokenomicsAllocation {
  label: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
}

const TOKENOMICS_DATA: TokenomicsAllocation[] = [
  {
    label: 'Initial Fair Launch LP & Circulating',
    percentage: 60,
    amount: '600,000,000,000,000 MRAT',
    color: '#FF4500',
    description: 'PancakeSwap V2 liquidity pair (MRAT / Partner Token).',
  },
  {
    label: 'Protocol Reward Pool Reserve',
    percentage: 20,
    amount: '200,000,000,000,000 MRAT',
    color: '#FF2A55',
    description: '4% transfer fee recycling fills the partner token reward pool.',
  },
  {
    label: 'Holder Reflections Vault',
    percentage: 10,
    amount: '100,000,000,000,000 MRAT',
    color: '#FFD700',
    description: '2% transfer fee auto-redistributed pro-rata across all wallets.',
  },
  {
    label: 'Protocol-Owned Liquidity (Auto LP)',
    percentage: 10,
    amount: '100,000,000,000,000 MRAT',
    color: '#00F2FE',
    description: '4% transfer fee converted & deposited permanently into PancakeSwap V2 LP.',
  },
];

export const TokenomicsChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let cumulativePercent = 0;
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950/80 p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-2xl">
      {/* Ring Chart */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72">
          <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full transform -rotate-90">
            {TOKENOMICS_DATA.map((item, index) => {
              const startPercent = cumulativePercent;
              cumulativePercent += item.percentage / 100;
              const endPercent = cumulativePercent;

              const [startX, startY] = getCoordinatesForPercent(startPercent);
              const [endX, endY] = getCoordinatesForPercent(endPercent);

              const largeArcFlag = item.percentage / 100 > 0.5 ? 1 : 0;

              const pathData = [
                `M ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L 0 0`,
              ].join(' ');

              const isSelected = hoveredIndex === index;

              return (
                <path
                  key={item.label}
                  d={pathData}
                  fill={item.color}
                  opacity={hoveredIndex === null || isSelected ? 1 : 0.4}
                  className="transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
            <circle cx="0" cy="0" r="0.68" fill="#090A0F" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
            {hoveredIndex !== null ? (
              <>
                <span className="text-3xl font-black text-white font-mono">
                  {TOKENOMICS_DATA[hoveredIndex].percentage}%
                </span>
                <span className="text-xs font-bold text-orange-400 mt-1">
                  {TOKENOMICS_DATA[hoveredIndex].label}
                </span>
                <span className="text-[11px] text-neutral-300 font-mono mt-0.5">
                  {TOKENOMICS_DATA[hoveredIndex].amount}
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-black text-white font-mono">1 Quadrillion</span>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mt-1">
                  MRAT Total Supply
                </span>
                <span className="text-[10px] text-neutral-400 mt-1">Hover allocation to inspect</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Allocation Cards Grid */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {TOKENOMICS_DATA.map((item, index) => {
          const isSelected = hoveredIndex === index;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900 border-orange-500/60 shadow-lg shadow-orange-950/50 scale-[1.02]'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-bold text-white">{item.label}</span>
                </div>
                <span className="text-sm font-extrabold text-orange-400 font-mono">
                  {item.percentage}%
                </span>
              </div>
              <div className="text-xs font-bold text-neutral-300 font-mono mb-1">
                {item.amount}
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
