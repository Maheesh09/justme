import React from 'react';

interface MetricCardProps {
  label: string;
  count: number;
  sub: string;
  icon: string;
  sparklineColor?: 'primary' | 'tertiary' | 'secondary';
  sparklinePath: string;
  sparklineDot: { cx: number; cy: number };
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  count,
  sub,
  icon,
  sparklineColor = 'primary',
  sparklinePath,
  sparklineDot,
  onClick,
}) => {
  const colorClass =
    sparklineColor === 'tertiary'
      ? 'text-[#10b981]'
      : sparklineColor === 'secondary'
      ? 'text-[#d8b4fe]'
      : 'text-[#c084fc]';

  return (
    <div
      onClick={onClick}
      className={`bg-[#131318] border border-white/[0.08] rounded-xl p-5 shadow-sm flex flex-col justify-between hover:bg-[#181820] hover:border-white/[0.18] transition-all group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#a1a1b2] font-medium tracking-wide">
          {label}
        </span>
        <span className="material-symbols-outlined text-[#a1a1b2] text-lg group-hover:text-white transition-colors">
          {icon}
        </span>
      </div>

      <div className="flex items-end justify-between mt-3">
        <div>
          <span className="font-mono text-2xl lg:text-3xl font-semibold text-[#f4f4f7] tracking-tight">
            {count}
          </span>
          <div className="text-xs text-[#717182] mt-0.5">{sub}</div>
        </div>

        {/* Micro SVG Sparkline */}
        <svg
          className={`w-20 h-8 ${colorClass} overflow-visible group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100`}
          fill="none"
          viewBox="0 0 80 30"
        >
          <path
            d={sparklinePath}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <circle cx={sparklineDot.cx} cy={sparklineDot.cy} fill="currentColor" r="2.5" />
        </svg>
      </div>
    </div>
  );
};
