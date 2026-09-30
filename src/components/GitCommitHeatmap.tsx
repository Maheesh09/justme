import React, { useEffect, useMemo, useState } from 'react';
import { Github } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface Day {
  date: string;
  count: number;
  level: number;
}

interface ContributionData {
  total: number;
  days: Day[];
  source: 'live' | 'snapshot';
  fetchedAt?: string;
}

const LEVEL_COLORS = ['#1a1820', '#3c1466', '#5a189a', '#8a3fd1', '#c9a2f2'];
const LIVE_URL = `https://github-contributions-api.jogruber.de/v4/${PROFILE.githubUser}?y=last`;

async function loadSnapshot(): Promise<ContributionData | null> {
  try {
    const res = await fetch('/contributions.json', { cache: 'no-cache' });
    if (!res.ok) return null;
    const json = await res.json();
    if (!Array.isArray(json.days) || json.days.length === 0) return null;
    return { total: json.total, days: json.days, source: 'snapshot', fetchedAt: json.fetchedAt };
  } catch {
    return null;
  }
}

async function loadLive(): Promise<ContributionData | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(LIVE_URL, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    const days: Day[] = (json.contributions || []).map((d: Day) => ({
      date: d.date,
      count: d.count,
      level: d.level,
    }));
    if (days.length === 0) return null;
    const total = json.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
    return { total, days, source: 'live' };
  } catch {
    return null;
  }
}

function stats(days: Day[]) {
  let longest = 0;
  let run = 0;
  let busiest: Day | null = null;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (!busiest || d.count > busiest.count) busiest = d;
  }
  // Current streak counts back from today. Today with zero does not break it yet.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  const activeDays = days.filter((d) => d.count > 0).length;
  return { longest, current, busiest, activeDays };
}

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', opts);

export const GitCommitHeatmap: React.FC = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState<Day | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const snapshot = await loadSnapshot();
      if (!cancelled && snapshot) setData(snapshot);
      const live = await loadLive();
      if (cancelled) return;
      if (live) setData(live);
      else if (!snapshot) setFailed(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Pad the start so the first column begins on a Sunday, like GitHub does.
  const cells = useMemo(() => {
    if (!data) return [];
    const firstDay = new Date(`${data.days[0].date}T00:00:00`).getDay();
    return [...Array(firstDay).fill(null), ...data.days] as (Day | null)[];
  }, [data]);

  const weeks = Math.ceil(cells.length / 7);

  const monthLabels = useMemo(() => {
    const labels: { col: number; text: string }[] = [];
    let last = '';
    cells.forEach((c, i) => {
      if (!c || i % 7 !== 0) return;
      const m = fmt(c.date, { month: 'short' });
      if (m !== last) {
        labels.push({ col: Math.floor(i / 7), text: m });
        last = m;
      }
    });
    return labels.filter((l, i) => (i === 0 || l.col - labels[i - 1].col >= 3) && l.col <= weeks - 3);
  }, [cells, weeks]);

  const s = data ? stats(data.days) : null;

  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Github className="h-4 w-4 text-brand-soft" aria-hidden />
          <span>GitHub activity, last 12 months</span>
        </div>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-soft hover:text-ink"
        >
          @{PROFILE.githubUser}
        </a>
      </div>

      {failed && (
        <p className="mt-6 text-sm text-muted">
          Couldn't load contributions right now. You can see them on{' '}
          <a className="text-brand-soft underline" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            my GitHub profile
          </a>
          .
        </p>
      )}

      {!data && !failed && <div className="mt-6 h-32 animate-pulse rounded-lg bg-panel-2" aria-label="Loading contributions" />}

      {data && s && (
        <>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold tracking-tight text-ink">
              {data.total.toLocaleString('en-US')}
            </span>
            <span className="text-sm text-muted">contributions</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[520px]">
              <div
                className="mb-1 grid text-[11px] text-faint"
                style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
                aria-hidden
              >
                {monthLabels.map((l) => (
                  <span key={`${l.col}-${l.text}`} style={{ gridColumnStart: l.col + 1 }} className="col-span-3">
                    {l.text}
                  </span>
                ))}
              </div>
              <div
                className="grid grid-flow-col grid-rows-7 gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
                role="img"
                aria-label={`${data.total} GitHub contributions in the last year`}
                onMouseLeave={() => setHovered(null)}
              >
                {cells.map((c, i) =>
                  c ? (
                    <div
                      key={c.date}
                      title={`${c.count} on ${fmt(c.date, { month: 'short', day: 'numeric', year: 'numeric' })}`}
                      onMouseEnter={() => setHovered(c)}
                      className="heat-cell aspect-square rounded-[2px]"
                      style={{
                        backgroundColor: LEVEL_COLORS[Math.min(c.level, 4)],
                        animationDelay: `${Math.floor(i / 7) * 12}ms`,
                      }}
                    />
                  ) : (
                    <div key={`pad-${i}`} className="aspect-square" />
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex min-h-5 flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-muted">
            <span>
              {hovered
                ? `${hovered.count} contribution${hovered.count === 1 ? '' : 's'} on ${fmt(hovered.date, { weekday: 'short', month: 'short', day: 'numeric' })}`
                : `Active on ${s.activeDays} days. Longest streak ${s.longest} days.`}
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              Less
              {LEVEL_COLORS.map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
              ))}
              More
            </span>
          </div>
        </>
      )}
    </div>
  );
};
