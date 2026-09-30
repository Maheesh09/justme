import React, { useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
  ACHIEVEMENTS_DATA,
  ARTICLES_DATA,
  MAHEESHA_PROFILE,
  Article,
  getAchievementBadgeStyle,
} from '../../data/portfolioData';
import { GitCommitHeatmap } from '../GitCommitHeatmap';
import { MetricCard } from '../MetricCard';
import { ProjectCard } from '../ProjectCard';

interface HomeScreenProps {
  onSelectProject: (projectId: string) => void;
  onNavigateAchievements: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenContact: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProject,
  onNavigateAchievements,
  onSelectArticle,
  onOpenContact,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const projectsList = Object.values(PORTFOLIO_PROJECTS);
  const achievementsPreview = ACHIEVEMENTS_DATA.slice(0, 5);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MAHEESHA_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-12 animate-fade-in">
      {/* SECTION 1: HERO PANEL */}
      <section className="w-full bg-[#131318] border border-white/[0.08] rounded-2xl p-6 lg:p-8 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left side: Human Identity Profile */}
          <div className="lg:col-span-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative shrink-0">
              <img
                src={MAHEESHA_PROFILE.avatarUrl}
                alt="Maheesha headshot"
                referrerPolicy="no-referrer"
                className="w-28 h-28 md:w-36 md:h-36 rounded-xl object-cover shadow-md bg-[#1a1a24] border border-white/[0.12]"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#0e0e12] border border-white/[0.12] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm text-xs font-mono text-[#10b981]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>Active</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[#a1a1b2]">
                <span>SOFTWARE ENGINEER</span>
                <span className="text-[#717182]">·</span>
                <span className="text-[#c084fc]">BACKEND & DISTRIBUTED</span>
              </div>

              <h1 className="text-3xl lg:text-4xl text-[#f4f4f7] font-semibold tracking-tight font-sans">
                {MAHEESHA_PROFILE.headline}
              </h1>

              <p className="text-sm md:text-base text-[#a1a1b2] mt-2.5 leading-relaxed max-w-lg">
                {MAHEESHA_PROFILE.bio}
              </p>

              {/* Context & Availability Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#a1a1b2]">
                  {MAHEESHA_PROFILE.educationShort}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[#a1a1b2]">
                  {MAHEESHA_PROFILE.location}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                  {MAHEESHA_PROFILE.status}
                </span>
              </div>
            </div>
          </div>

          {/* Right side: GitHub Contribution Matrix */}
          <div className="lg:col-span-6">
            <GitCommitHeatmap />
          </div>
        </div>

        {/* Human "Now" strip */}
        <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#a1a1b2]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#c084fc] font-medium">NOW:</span>
            <span>{MAHEESHA_PROFILE.now.focus}</span>
          </div>
          <button
            onClick={onOpenContact}
            className="text-xs text-[#c084fc] hover:text-[#e9d5ff] transition-colors flex items-center gap-1 cursor-pointer shrink-0 font-medium"
          >
            <span>Let's talk about 2026 roles</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: METRICS ROW (Natural Human Engineering Accomplishments) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Merged Pull Requests"
          count={MAHEESHA_PROFILE.stats.mergedPRs.count}
          sub="WSO2 open-source repos"
          icon="call_merge"
          sparklineColor="primary"
          sparklinePath="M2 26 L18 20 L34 22 L50 12 L66 16 L78 4"
          sparklineDot={{ cx: 78, cy: 4 }}
          onClick={onNavigateAchievements}
        />
        <MetricCard
          label="Competition Podiums"
          count={MAHEESHA_PROFILE.stats.competitions.count}
          sub="National hackathons & algos"
          icon="emoji_events"
          sparklineColor="tertiary"
          sparklinePath="M2 24 L20 18 L38 19 L54 10 L68 11 L78 3"
          sparklineDot={{ cx: 78, cy: 3 }}
          onClick={onNavigateAchievements}
        />
        <MetricCard
          label="Engineered Systems"
          count={MAHEESHA_PROFILE.stats.projectsBuilt.count}
          sub="Distributed & developer tools"
          icon="hub"
          sparklineColor="primary"
          sparklinePath="M2 18 L16 25 L32 10 L48 20 L64 6 L78 8"
          sparklineDot={{ cx: 78, cy: 8 }}
          onClick={() => {
            const el = document.getElementById('projects');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <MetricCard
          label="Technical Writeups"
          count={MAHEESHA_PROFILE.stats.articles.count}
          sub="Architecture & concurrency"
          icon="edit_note"
          sparklineColor="secondary"
          sparklinePath="M2 15 L22 15 L38 8 L54 12 L66 6 L78 6"
          sparklineDot={{ cx: 78, cy: 6 }}
          onClick={() => {
            const el = document.getElementById('writing');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* SECTION 3: FEATURED PROJECTS */}
      <section className="space-y-4 pt-4" id="projects">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-[#f4f4f7] tracking-tight">
              Featured Projects
            </h2>
            <span className="text-xs text-[#717182] font-mono">
              ({projectsList.length} systems)
            </span>
          </div>
          <p className="text-xs text-[#a1a1b2]">
            Detailed case studies with real architectural decisions & trade-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {projectsList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: ACHIEVEMENTS / REPUTATION LOG */}
      <section className="space-y-4 pt-4" id="achievements">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-[#f4f4f7] tracking-tight">
              Milestones & Achievements
            </h2>
            <span className="text-xs text-[#717182] font-mono">
              ({ACHIEVEMENTS_DATA.length} verified records)
            </span>
          </div>
          <button
            onClick={onNavigateAchievements}
            className="text-xs font-mono text-[#c084fc] hover:text-[#e9d5ff] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View full audit log</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="bg-[#131318] border border-white/[0.08] rounded-xl overflow-hidden divide-y divide-white/[0.06]">
          {/* Column Header for Desktop Table View */}
          <div className="hidden md:flex items-center justify-between px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] text-[11px] font-mono text-[#717182] uppercase tracking-wider">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <span className="w-32 shrink-0">Date</span>
              <span className="w-32 shrink-0 text-center">Recognition</span>
              <span className="min-w-0 flex-1">Milestone & Impact</span>
            </div>
            <div className="flex items-center gap-4 shrink-0 pr-7">
              <span className="hidden xl:inline text-right w-48">Role</span>
              <span className="w-14 text-center">Media</span>
            </div>
          </div>

          {achievementsPreview.map((item) => (
            <div
              key={item.id}
              onClick={onNavigateAchievements}
              className="group p-4 sm:px-5 hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              {/* Desktop / Tablet View (>= md) */}
              <div className="hidden md:flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Date column: fixed width w-32 (128px), prevents wrapping like 'September 2025' */}
                  <span className="font-mono text-xs text-[#717182] w-32 shrink-0 whitespace-nowrap">
                    {item.date}
                  </span>

                  {/* Recognition Badge: fixed container w-32 (128px) so subsequent titles always align */}
                  <div className="w-32 shrink-0 flex items-center justify-center">
                    <span
                      className={`w-full text-center px-2 py-0.5 rounded text-[10.5px] font-mono font-medium tracking-wide whitespace-nowrap ${getAchievementBadgeStyle(
                        item.badgeType
                      )}`}
                    >
                      {item.badgeType}
                    </span>
                  </div>

                  {/* Title & Description: starts at identical horizontal position across all rows */}
                  <div className="min-w-0 flex-1 pr-2">
                    <h3 className="text-sm font-medium text-[#f4f4f7] truncate group-hover:text-[#c084fc] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a1a1b2] mt-0.5 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right side: Team info, preview thumbnail, and navigation arrow */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-[#717182] font-mono hidden xl:inline text-right w-48 truncate">
                    {item.teamInfo}
                  </span>
                  <div className="w-14 h-10 rounded-md overflow-hidden bg-[#0a0a0d] border border-white/[0.08] shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#717182] group-hover:text-[#c084fc] group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Mobile View (< md) */}
              <div className="md:hidden flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#717182] whitespace-nowrap">
                      {item.date}
                    </span>
                    <span className="text-[#717182]">·</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-medium tracking-wide whitespace-nowrap ${getAchievementBadgeStyle(
                        item.badgeType
                      )}`}
                    >
                      {item.badgeType}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#717182] group-hover:text-[#c084fc] transition-colors">
                    arrow_forward
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-[#f4f4f7] group-hover:text-[#c084fc] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a1a1b2] mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-12 h-9 rounded overflow-hidden bg-[#0a0a0d] border border-white/[0.08] shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: WRITING & TECHNICAL INSIGHTS */}
      <section className="space-y-4 pt-4" id="writing">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-[#f4f4f7] tracking-tight">
              Technical Writing
            </h2>
            <span className="text-xs text-[#717182] font-mono">
              ({ARTICLES_DATA.length} essays)
            </span>
          </div>
          <p className="text-xs text-[#a1a1b2]">
            Detailed retrospective notes from production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {ARTICLES_DATA.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-[#131318] border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.2] hover:bg-[#16161d] transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#717182] font-mono mb-2">
                  <span className="text-[#c084fc]">{article.category}</span>
                  <span>{article.readTime} · {article.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#f4f4f7] group-hover:text-[#c084fc] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-[#a1a1b2] mt-2.5 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-[#c084fc] group-hover:text-[#e9d5ff] transition-colors">
                <span>Read article</span>
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CONTACT & OPPORTUNITIES */}
      <section
        className="w-full bg-[#131318] border border-white/[0.08] rounded-2xl p-8 lg:p-12 relative overflow-hidden text-center"
        id="contact"
      >
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#10b981] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>AVAILABLE FOR INTERNSHIPS · 2026</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-semibold text-[#f4f4f7] tracking-tight">
            Let's build something together.
          </h2>
          <p className="text-sm md:text-base text-[#a1a1b2] mt-3 leading-relaxed">
            I'm currently seeking a Software Engineering Internship in backend systems, distributed architectures, or developer tooling. Feel free to reach out directly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
            {/* Quick Copy Email with Toast */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition text-xs font-medium cursor-pointer shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedEmail ? 'done' : 'mail'}
              </span>
              <span>{copiedEmail ? 'Email Copied!' : MAHEESHA_PROFILE.email}</span>
            </button>

            {/* Direct Dispatch Message */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[#f4f4f7] transition text-xs font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Send Message</span>
            </button>

            {/* LinkedIn */}
            <a
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[#f4f4f7] transition text-xs font-medium"
              href={MAHEESHA_PROFILE.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#c084fc]" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5V10.13H5.07V18.5h2.79z"></path>
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[#f4f4f7] transition text-xs font-medium"
              href={MAHEESHA_PROFILE.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#c084fc]" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          <div className="mt-8 text-xs font-mono text-[#717182]">
            Response time: typically within 24 hours · Based in Sri Lanka (UTC+5:30)
          </div>
        </div>
      </section>
    </div>
  );
};
