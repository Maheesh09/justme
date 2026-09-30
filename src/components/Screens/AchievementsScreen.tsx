import React, { useState, useMemo } from 'react';
import { ACHIEVEMENTS_DATA, Achievement, getAchievementBadgeStyle } from '../../data/portfolioData';

interface AchievementsScreenProps {
  onBackToOverview: () => void;
  onOpenLightbox: (image: string, title: string, subtitle?: string) => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  onBackToOverview,
  onOpenLightbox,
}) => {
  const [currentFilter, setCurrentFilter] = useState<'all' | 'COMPETITION' | 'OPEN_SOURCE' | 'COMMUNITY'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAchievements = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return ACHIEVEMENTS_DATA.filter((item) => {
      const matchesCategory =
        currentFilter === 'all' || item.category === currentFilter;

      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = `${item.title} ${item.organization} ${item.description} ${item.tags.join(' ')} ${item.date} ${item.badgeType} ${item.teamInfo}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [currentFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: ACHIEVEMENTS_DATA.length,
      competition: ACHIEVEMENTS_DATA.filter((a) => a.category === 'COMPETITION').length,
      openSource: ACHIEVEMENTS_DATA.filter((a) => a.category === 'OPEN_SOURCE').length,
      community: ACHIEVEMENTS_DATA.filter((a) => a.category === 'COMMUNITY').length,
    };
  }, []);

  return (
    <div className="flex flex-col w-full pb-16 space-y-8 animate-fade-in">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={onBackToOverview}
            className="text-[#a1a1b2] hover:text-[#f4f4f7] transition-colors flex items-center gap-1 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span>maheesh.me</span>
          </button>
          <span className="text-[#717182]">/</span>
          <span className="text-[#f4f4f7] font-medium">Achievements</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#717182]">
          <span>Audit Period: 2025 – 2026</span>
          <span>·</span>
          <span>Verified University Track Record</span>
        </div>
      </div>

      {/* Header Block */}
      <div className="space-y-3">
        <h1 className="text-3xl lg:text-4xl text-[#f4f4f7] font-semibold tracking-tight font-sans">
          Milestones & Recognition
        </h1>
        <p className="text-sm md:text-base text-[#a1a1b2] max-w-2xl leading-relaxed">
          Competitions, hackathon championships, open-source PRs to WSO2, and community leadership roles at SLIIT.
        </p>

        {/* 4 Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3">
          <div className="p-4 rounded-xl bg-[#131318] border border-white/[0.08]">
            <span className="text-xs text-[#a1a1b2]">Total Milestones</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-2xl font-semibold text-[#f4f4f7]">7</span>
              <span className="text-xs text-[#717182]">verified</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#131318] border border-white/[0.08]">
            <span className="text-xs text-[#a1a1b2]">First Place</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-2xl font-semibold text-[#c084fc]">1</span>
              <span className="text-xs text-[#c084fc]">Championship</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#131318] border border-white/[0.08]">
            <span className="text-xs text-[#a1a1b2]">Podium Finishes</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-2xl font-semibold text-[#d8b4fe]">2</span>
              <span className="text-xs text-[#717182]">Runner Ups</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#131318] border border-white/[0.08]">
            <span className="text-xs text-[#a1a1b2]">WSO2 PRs Merged</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-2xl font-semibold text-[#10b981]">4</span>
              <span className="text-xs text-[#10b981]">Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-2 bg-[#131318] border border-white/[0.08] rounded-xl shadow-sm">
        {/* Segmented Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          <button
            onClick={() => setCurrentFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentFilter === 'all'
                ? 'bg-[#8b5cf6] text-white font-medium shadow-sm'
                : 'text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setCurrentFilter('COMPETITION')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentFilter === 'COMPETITION'
                ? 'bg-[#8b5cf6] text-white font-medium shadow-sm'
                : 'text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            Competitions ({counts.competition})
          </button>
          <button
            onClick={() => setCurrentFilter('OPEN_SOURCE')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentFilter === 'OPEN_SOURCE'
                ? 'bg-[#8b5cf6] text-white font-medium shadow-sm'
                : 'text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            Open Source ({counts.openSource})
          </button>
          <button
            onClick={() => setCurrentFilter('COMMUNITY')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentFilter === 'COMMUNITY'
                ? 'bg-[#8b5cf6] text-white font-medium shadow-sm'
                : 'text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            Community ({counts.community})
          </button>
        </div>

        {/* Real-time Search Input */}
        <div className="flex items-center gap-2 bg-[#0e0e12] border border-white/[0.08] px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-[16px] text-[#717182]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milestones, tech, or year..."
            className="bg-transparent text-[#f4f4f7] text-xs focus:outline-none w-56 placeholder:text-[#717182]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#717182] hover:text-[#f4f4f7] text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Chronological Milestone Entries */}
      <div className="space-y-4">
        {filteredAchievements.length === 0 ? (
          <div className="p-12 text-center bg-[#131318] border border-white/[0.08] rounded-xl text-xs text-[#717182]">
            No milestones matched your search query "{searchQuery}".
          </div>
        ) : (
          filteredAchievements.map((item) => {
            const badgeClass = getAchievementBadgeStyle(item.badgeType);

            return (
              <article
                key={item.id}
                className="group relative p-5 md:p-6 rounded-xl bg-[#131318] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#16161d] transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Image Slot with zoom affordance */}
                  <div
                    onClick={() => onOpenLightbox(item.image, item.title, `${item.date} · ${item.badgeType}`)}
                    className="w-full md:w-72 lg:w-80 h-44 flex-shrink-0 rounded-lg overflow-hidden bg-[#0a0a0d] relative border border-white/[0.08] cursor-zoom-in group/img"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0a0a0d]/80 backdrop-blur-md text-[11px] font-mono text-[#f4f4f7] border border-white/[0.1] shadow">
                      {item.statusBadge}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col justify-between flex-grow w-full min-w-0 space-y-3">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#c084fc] font-semibold">{item.date}</span>
                          <span className="text-[#717182]">·</span>
                          <span className="text-[#a1a1b2]">{item.organization}</span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${badgeClass}`}>
                          {item.badgeType}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold text-[#f4f4f7] group-hover:text-[#c084fc] transition-colors">
                        {item.title}
                      </h2>

                      <p className="text-sm text-[#a1a1b2] mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      <p className="text-xs text-[#d8b4fe] mt-2 font-sans bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                        {item.impact}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-white/[0.04] text-[#a1a1b2] font-mono text-[11px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#717182] font-mono">
                        {item.teamInfo}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* End of Stream Indicator */}
      <div className="p-4 rounded-xl bg-[#131318] border border-white/[0.06] flex items-center justify-between text-xs text-[#717182]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
          <span>Verified records archive</span>
        </div>
        <span>
          Showing {filteredAchievements.length} of {ACHIEVEMENTS_DATA.length} milestones
        </span>
      </div>
    </div>
  );
};
