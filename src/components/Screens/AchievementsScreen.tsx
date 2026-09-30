import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ACHIEVEMENTS, Achievement } from '../../data/portfolioData';
import { ResultBadge, SmartImage } from '../ui';

interface AchievementsScreenProps {
  onBackToOverview: () => void;
  onOpenLightbox: (image: string, title: string) => void;
}

type Filter = 'All' | Achievement['category'];
const FILTERS: Filter[] = ['All', 'Competitions', 'Open source', 'Community'];

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBackToOverview, onOpenLightbox }) => {
  const [filter, setFilter] = useState<Filter>('All');

  const items = useMemo(
    () => (filter === 'All' ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.category === filter)),
    [filter],
  );

  const count = (f: Filter) => (f === 'All' ? ACHIEVEMENTS.length : ACHIEVEMENTS.filter((a) => a.category === f).length);

  return (
    <div className="flex w-full flex-col gap-8 pb-8 pt-4">
      <button
        type="button"
        onClick={onBackToOverview}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Home
      </button>

      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-ink">Achievements</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Competitions I've placed in, open source work and the communities I help out with.
        </p>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter achievements">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-lg px-3.5 py-1.5 text-sm transition-colors ${
              filter === f ? 'bg-brand text-white' : 'border border-line text-muted hover:bg-panel hover:text-ink'
            }`}
          >
            {f} ({count(f)})
          </button>
        ))}
      </div>

      <ol className="flex flex-col gap-4">
        {items.map((a) => (
          <li key={a.id} className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-5 md:flex-row md:p-6">
            {a.image ? (
              <button
                type="button"
                onClick={() => onOpenLightbox(a.image!, a.title)}
                className="shrink-0 overflow-hidden rounded-lg border border-line md:w-72"
                aria-label={`Enlarge photo from ${a.title}`}
              >
                <SmartImage src={a.image} alt={a.title} label={a.title} className="aspect-[16/10] w-full" />
              </button>
            ) : (
              <SmartImage alt="" label={a.title} className="hidden aspect-[16/10] shrink-0 rounded-lg border border-line md:flex md:w-72" />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-wrap items-center gap-2 text-sm text-faint">
                <span className="font-mono">{a.date}</span>
                <span aria-hidden>/</span>
                <span>{a.org}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-ink">{a.title}</h2>
                <ResultBadge result={a.result} />
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.description}</p>
              {a.link && (
                <a
                  href={a.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1 text-sm text-brand-soft hover:text-ink"
                >
                  {a.link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
