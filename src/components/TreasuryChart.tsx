import React, { useState } from 'react';

interface AllocationItem {
  category: string;
  percentage: number;
  amountUsd: string;
  color: string;
}

const ALLOCATIONS: AllocationItem[] = [
  { category: 'Partner BEP20 Reward Pool', percentage: 40, amountUsd: '4% Transfer Tax Stream', color: '#FF4500' },
  { category: 'Protocol-Owned LP Pair', percentage: 40, amountUsd: '4% Permanent Liquidity', color: '#FF2A55' },
  { category: 'Pro-Rata Holder Reflections', percentage: 20, amountUsd: '2% Direct Redistribution', color: '#FFD700' },
];



export const TreasuryChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Calculate SVG Donut slice paths
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-neutral-950/80 p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-2xl">
      {/* Interactive Donut SVG */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 shrink-0 flex items-center justify-center">
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full transform -rotate-90">
          {ALLOCATIONS.map((slice, index) => {
            const startPercent = cumulativePercent;
            cumulativePercent += slice.percentage / 100;
            const endPercent = cumulativePercent;

            const [startX, startY] = getCoordinatesForPercent(startPercent);
            const [endX, endY] = getCoordinatesForPercent(endPercent);

            const largeArcFlag = slice.percentage / 100 > 0.5 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(' ');

            const isSelected = activeIndex === index;

            return (
              <path
                key={slice.category}
                d={pathData}
                fill={slice.color}
                opacity={activeIndex === null || isSelected ? 1 : 0.4}
                className="transition-all duration-300 cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
          {/* Inner Donut cutout */}
          <circle cx="0" cy="0" r="0.65" fill="#090A0F" />
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
          {activeIndex !== null ? (
            <>
              <span className="text-2xl font-black text-white font-mono">
                {ALLOCATIONS[activeIndex].percentage}%
              </span>
              <span className="text-xs font-bold text-neutral-300 mt-1">
                {ALLOCATIONS[activeIndex].category}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono mt-0.5">
                {ALLOCATIONS[activeIndex].amountUsd}
              </span>
            </>
          ) : (
            <>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Fee Breakdown
              </span>
              <span className="text-2xl font-extrabold text-white font-mono mt-1">
                10% Tax
              </span>
              <span className="text-[10px] text-orange-400 font-semibold mt-0.5">
                Hover slice to inspect
              </span>

            </>
          )}
        </div>
      </div>

      {/* Legend & Breakdown Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ALLOCATIONS.map((item, index) => {
          const isSelected = activeIndex === index;
          return (
            <div
              key={item.category}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900 border-orange-500/60 shadow-lg shadow-orange-950/50'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold text-neutral-200">
                    {item.category}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-white font-mono">
                  {item.percentage}%
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono pl-5">
                Valuation: <span className="text-emerald-400 font-semibold">{item.amountUsd}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
