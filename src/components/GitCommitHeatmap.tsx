import React, { useState, useMemo } from 'react';

const RECENT_COMMITS = [
  'refactor(auth): migrate to asymmetric JWKS in-memory key cache',
  'feat(diff-engine): add AST visitor for python class signature mutations',
  'fix(gateway): resolve SSE stream buffer leak under high concurrency',
  'docs: document WSO2 multi-tenant deployment topology and scopes',
  'perf(db): add partial indices for active tenant queries',
  'test(archguard): verify circular dependency detection in Spring Boot controllers',
  'feat(incidentiq): integrate OpenTelemetry trace span correlation DAG',
];

export const GitCommitHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    commitMsg?: string;
  } | null>(null);

  // 52 columns x 7 rows
  const weeks = useMemo(() => {
    const data: number[][] = [];
    const pattern = [
      0, 2, 3, 1, 0, 4, 2, 1, 3, 0, 2, 4, 1, 3, 2, 0, 4, 3, 1, 2,
      0, 1, 4, 2, 3, 1, 0, 2, 4, 3, 1, 0, 2, 4, 3, 1, 0, 3, 4, 2,
      1, 2, 0, 4, 3, 1, 2, 0, 3, 4, 2, 1, 0, 4, 3, 2, 1, 0, 2, 4
    ];

    for (let c = 0; c < 52; c++) {
      const col: number[] = [];
      for (let r = 0; r < 7; r++) {
        const seedIndex = (c * 7 + r) % pattern.length;
        let count = pattern[seedIndex];
        // Give realistic weekly rhythm (higher Tue-Thu, lighter Sun)
        if (r === 0) count = Math.max(0, count - 1);
        if (r === 2 || r === 3) count = Math.min(4, count + 1);
        col.push(count);
      }
      data.push(col);
    }
    return data;
  }, []);

  const getColorClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-white/[0.05] hover:bg-white/[0.12]';
      case 1:
        return 'bg-[#6b21a8] hover:bg-[#7e22ce]';
      case 2:
        return 'bg-[#9333ea] hover:bg-[#a855f7]';
      case 3:
        return 'bg-[#c084fc] hover:bg-[#d8b4fe]';
      case 4:
        return 'bg-[#e9d5ff] hover:bg-white';
      default:
        return 'bg-white/[0.05]';
    }
  };

  const getDayDate = (col: number, row: number) => {
    const dayOfYear = col * 7 + row + 1;
    const date = new Date(2026, 0, dayOfYear);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-[#131318] border border-white/[0.08] rounded-xl p-5 shadow-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#c084fc] fill-current" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-wider text-[#a1a1b2] font-medium">
            GitHub Contributions
          </span>
        </div>
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/[0.04] text-[#10b981] border border-[#10b981]/20">
          842 ops this year
        </span>
      </div>

      {/* Primary Metric with human breakdown */}
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl lg:text-3xl text-[#f4f4f7] font-semibold tracking-tight">
            842
          </span>
          <span className="text-xs text-[#717182]">commits & PRs across repositories</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#a1a1b2]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> Go 38%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Java 29%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#eab308]"></span> Python 21%
          </span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-1 relative">
        <div className="flex flex-col gap-1 min-w-[500px]">
          {/* Months Header */}
          <div className="flex justify-between font-mono text-[11px] text-[#717182] px-1 mb-0.5">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>

          {/* Grid */}
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {weeks.map((col, colIdx) =>
              col.map((level, rowIdx) => {
                const count = level === 0 ? 0 : level * 2 + ((colIdx + rowIdx) % 3);
                return (
                  <div
                    key={`${colIdx}-${rowIdx}`}
                    onMouseEnter={() =>
                      setHoveredCell({
                        date: getDayDate(colIdx, rowIdx),
                        count,
                        commitMsg:
                          count > 0
                            ? RECENT_COMMITS[(colIdx * 7 + rowIdx) % RECENT_COMMITS.length]
                            : undefined,
                      })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-2 h-2 rounded-[2px] cursor-pointer transition-colors duration-150 ${getColorClass(
                      level
                    )}`}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Hover Tooltip with commit message simulation */}
        {hoveredCell && (
          <div className="absolute top-0 right-2 pointer-events-none z-10 bg-[#0a0a0d] border border-white/[0.12] px-3 py-1.5 rounded-lg text-xs font-mono text-[#f4f4f7] shadow-xl flex flex-col gap-0.5 max-w-xs">
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-[#c084fc] font-semibold">
                {hoveredCell.count} contribution{hoveredCell.count === 1 ? '' : 's'}
              </span>
              <span className="text-[#717182]">{hoveredCell.date}</span>
            </div>
            {hoveredCell.commitMsg && (
              <span className="text-[10px] text-[#a1a1b2] truncate font-sans">
                {hoveredCell.commitMsg}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend & human notes */}
      <div className="flex items-center justify-between mt-3 text-xs text-[#717182]">
        <span className="font-mono text-[11px]">Active streak: 26 days</span>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span>Less</span>
          <span className="w-2 h-2 rounded-[2px] bg-white/[0.05]"></span>
          <span className="w-2 h-2 rounded-[2px] bg-[#6b21a8]"></span>
          <span className="w-2 h-2 rounded-[2px] bg-[#9333ea]"></span>
          <span className="w-2 h-2 rounded-[2px] bg-[#c084fc]"></span>
          <span className="w-2 h-2 rounded-[2px] bg-[#e9d5ff]"></span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
