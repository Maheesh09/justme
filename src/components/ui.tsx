import React, { useState } from 'react';
import type { Achievement, ProjectStatus } from '../data/portfolioData';

/**
 * Shows a real image when one exists. If the path is empty or the file is missing,
 * it shows a quiet placeholder with the name instead of a fake stock picture.
 */
export const SmartImage: React.FC<{
  src?: string;
  alt: string;
  label?: string;
  className?: string;
}> = ({ src, alt, label, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-panel-2 bg-[radial-gradient(circle_at_30%_20%,#2a1440_0%,transparent_60%)] ${className}`}
      >
        <span className="text-lg font-semibold text-brand-soft/80">{label || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};

const statusStyles: Record<ProjectStatus, string> = {
  Live: 'text-ok border-ok/30 bg-ok/10',
  Completed: 'text-brand-soft border-brand-soft/30 bg-brand-tint',
  'In progress': 'text-warn border-warn/30 bg-warn/10',
};

export const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
    {status}
  </span>
);

export const ResultBadge: React.FC<{ result: Achievement['result'] }> = ({ result }) => {
  const style =
    result === 'Winner'
      ? 'bg-brand text-white border-brand'
      : result === 'First runner up' || result === 'Second runner up'
        ? 'bg-brand-tint text-brand-soft border-brand/60'
        : 'bg-panel-2 text-muted border-line-strong';
  return (
    <span className={`inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium ${style}`}>
      {result}
    </span>
  );
};

export const SectionHeading: React.FC<{
  title: string;
  note?: string;
  action?: React.ReactNode;
  id?: string;
}> = ({ title, note, action, id }) => (
  <div className="flex flex-col justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-end">
    <div>
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {note && <p className="mt-1 text-sm text-muted">{note}</p>}
    </div>
    {action}
  </div>
);
