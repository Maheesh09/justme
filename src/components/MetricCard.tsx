import React from 'react';

interface MetricCardProps {
  value: number | string;
  label: string;
  note: string;
  href: string;
}

// A plain number with a label. No fake trend lines: every value here is real and countable.
export const MetricCard: React.FC<MetricCardProps> = ({ value, label, note, href }) => (
  <a
    href={href}
    className="group flex flex-col rounded-xl border border-line bg-panel p-5 transition-colors hover:border-line-strong hover:bg-panel-2"
  >
    <span className="font-mono text-3xl font-semibold tracking-tight text-ink">{value}</span>
    <span className="mt-1 text-sm font-medium text-ink group-hover:text-brand-soft">{label}</span>
    <span className="mt-0.5 text-sm text-faint">{note}</span>
  </a>
);
