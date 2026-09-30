import React from 'react';
import { Project, PORTFOLIO_PROJECTS } from '../../data/portfolioData';

interface ProjectDetailScreenProps {
  project: Project;
  onBackToProjects: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenLightbox: (image: string, title: string, subtitle?: string) => void;
}

export const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({
  project,
  onBackToProjects,
  onSelectProject,
  onOpenLightbox,
}) => {
  const nextProject = PORTFOLIO_PROJECTS[project.nextProjectId] || PORTFOLIO_PROJECTS['synkron'];

  const getStatusBadge = () => {
    switch (project.status) {
      case 'Live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#10b981]/10 text-[#10b981] font-mono text-xs border border-[#10b981]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            Live Deployment
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#10b981]/10 text-[#10b981] font-mono text-xs border border-[#10b981]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            Shipped to Production
          </span>
        );
      case 'Deployed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#8b5cf6]/10 text-[#c084fc] font-mono text-xs border border-[#8b5cf6]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]"></span>
            Deployed Service
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.06] text-[#e9d5ff] font-mono text-xs border border-white/[0.12]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e9d5ff]"></span>
            In Active Development
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-10 animate-fade-in">
      {/* Top Breadcrumb & Metadata Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={onBackToProjects}
            className="text-[#a1a1b2] hover:text-[#f4f4f7] transition-colors flex items-center gap-1 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
              arrow_back
            </span>
            <span>All Projects</span>
          </button>
          <span className="text-[#717182]">/</span>
          <span className="text-[#f4f4f7] font-medium">{project.title}</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#717182]">
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Header Title & Action Control Panel */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl lg:text-4xl text-[#f4f4f7] font-semibold tracking-tight font-sans">
              {project.title}
            </h1>
            {getStatusBadge()}
          </div>
          <p className="text-base text-[#a1a1b2] max-w-2xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[#f4f4f7] transition text-xs font-medium"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                fillRule="evenodd"
              />
            </svg>
            <span>GitHub Repository</span>
          </a>

          <button
            onClick={() => onOpenLightbox(project.image, `${project.title} Interface`, project.category)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition text-xs font-medium shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Interactive Preview</span>
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Visual Container */}
      <div className="relative w-full rounded-2xl bg-[#131318] border border-white/[0.08] overflow-hidden shadow-sm group">
        {/* Subtle Frame Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181820] border-b border-white/[0.06] text-xs font-mono text-[#717182]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.15]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.15]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.15]"></span>
            <span className="ml-2 text-[#a1a1b2] font-sans">{project.title} System Console</span>
          </div>
          <span className="hidden sm:inline">Click image to inspect high-resolution</span>
        </div>

        {/* Visual Slot */}
        <div
          onClick={() => onOpenLightbox(project.image, `${project.title} Console`, project.category)}
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#0a0a0d] cursor-zoom-in"
        >
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12]/70 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Case Study Overview Prose */}
      <div className="bg-[#131318] border border-white/[0.08] rounded-xl p-6 lg:p-8 space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#c084fc] font-semibold">
          Project Context & Background
        </h2>
        <p className="text-sm md:text-base text-[#a1a1b2] leading-relaxed">
          {project.overview}
        </p>
      </div>

      {/* Engineering Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#a1a1b2]">
            <span>Benchmark Accuracy</span>
            <span className="font-mono text-[#10b981]">{project.metrics.accuracy.sub}</span>
          </div>
          <div className="my-3">
            <span className="text-3xl font-semibold text-[#f4f4f7] font-mono">
              {project.metrics.accuracy.value}
            </span>
            <div className="text-xs text-[#717182] mt-0.5">{project.metrics.accuracy.label}</div>
          </div>
          <div className="text-xs text-[#a1a1b2] border-t border-white/[0.06] pt-3">
            {project.metrics.accuracy.note}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#a1a1b2]">
            <span>Unit Economics</span>
            <span className="font-mono text-[#c084fc]">{project.metrics.economics.badge}</span>
          </div>
          <div className="my-3">
            <span className="text-3xl font-semibold text-[#f4f4f7] font-mono">
              {project.metrics.economics.value}
            </span>
            <div className="text-xs text-[#717182] mt-0.5">{project.metrics.economics.label}</div>
          </div>
          <div className="text-xs text-[#a1a1b2] border-t border-white/[0.06] pt-3">
            {project.metrics.economics.note}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#a1a1b2]">
            <span>Engineering Scope</span>
            <span className="material-symbols-outlined text-[16px] text-[#c084fc]">engineering</span>
          </div>
          <div className="my-3">
            <span className="text-2xl font-semibold text-[#f4f4f7]">
              {project.metrics.ownership.value}
            </span>
            <div className="text-xs text-[#717182] mt-0.5">{project.metrics.ownership.label}</div>
          </div>
          <div className="text-xs text-[#a1a1b2] border-t border-white/[0.06] pt-3">
            {project.metrics.ownership.note}
          </div>
        </div>
      </div>

      {/* Natural Human Architecture Breakdown (4 Cards) */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#f4f4f7]">
          Architecture & Engineering Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 01 */}
          <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-[#f87171] block mb-1">01. THE PROBLEM</span>
              <h3 className="text-base font-semibold text-[#f4f4f7]">
                {project.cards.problem.title}
              </h3>
              <p className="text-sm text-[#a1a1b2] mt-2 leading-relaxed">
                {project.cards.problem.text}
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#a1a1b2]">{project.cards.problem.highlight}</span>
              <span className="text-[#f87171] font-mono">{project.cards.problem.metric}</span>
            </div>
          </div>

          {/* Section 02 */}
          <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-[#c084fc] block mb-1">02. ARCHITECTURE & PIPELINE</span>
              <h3 className="text-base font-semibold text-[#f4f4f7]">
                {project.cards.solution.title}
              </h3>
              <p className="text-sm text-[#a1a1b2] mt-2 leading-relaxed">
                {project.cards.solution.text}
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#a1a1b2]">{project.cards.solution.highlight}</span>
              <span className="text-[#10b981] font-mono">{project.cards.solution.metric}</span>
            </div>
          </div>

          {/* Section 03 */}
          <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-[#d8b4fe] block mb-1">03. SECURITY & CREDENTIALS</span>
              <h3 className="text-base font-semibold text-[#f4f4f7]">
                {project.cards.security.title}
              </h3>
              <p className="text-sm text-[#a1a1b2] mt-2 leading-relaxed">
                {project.cards.security.text}
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#a1a1b2]">{project.cards.security.highlight}</span>
              <span className="text-[#d8b4fe] font-mono">{project.cards.security.metric}</span>
            </div>
          </div>

          {/* Section 04 */}
          <div className="rounded-xl bg-[#131318] border border-white/[0.08] p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-[#10b981] block mb-1">04. TECH STACK SPECIFICATION</span>
              <h3 className="text-base font-semibold text-[#f4f4f7]">
                {project.cards.stack.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.cards.stack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-white/[0.05] text-xs font-mono text-[#f4f4f7] border border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[#a1a1b2]">{project.cards.stack.highlight}</span>
              <span className="text-[#10b981] font-mono">{project.cards.stack.metric}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Human Architectural Takeaways */}
      <div className="bg-[#131318] border border-white/[0.08] rounded-xl p-6 lg:p-8 space-y-4">
        <h3 className="text-base font-semibold text-[#f4f4f7] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#c084fc]">tips_and_updates</span>
          <span>Key Production Takeaways</span>
        </h3>
        <ul className="space-y-2.5 text-sm text-[#a1a1b2]">
          {project.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] mt-2 shrink-0"></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-[#f4f4f7]">
            Screenshots & Pipeline Visuals
          </h2>
          <span className="text-xs font-mono text-[#717182]">
            {project.gallery.length} views
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.gallery.map((view, index) => (
            <div
              key={index}
              onClick={() => onOpenLightbox(view.image, view.title, view.desc)}
              className="rounded-xl bg-[#131318] border border-white/[0.08] overflow-hidden group hover:border-white/[0.2] transition-all flex flex-col cursor-pointer shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-[#0a0a0d] overflow-hidden">
                <img
                  src={view.image}
                  alt={view.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#0a0a0d]/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-[#f4f4f7] border border-white/[0.1]">
                  {view.label}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-sm font-semibold text-[#f4f4f7] group-hover:text-[#c084fc] transition-colors block">
                  {view.title}
                </span>
                <span className="text-xs text-[#717182] block leading-snug">
                  {view.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Up Next in Pipeline Navigation */}
      <div className="pt-4 border-t border-white/[0.08]">
        <div className="text-xs font-mono text-[#717182] mb-3">
          NEXT CASE STUDY
        </div>

        <div
          onClick={() => onSelectProject(nextProject.id)}
          className="group rounded-xl bg-[#131318] border border-white/[0.08] p-5 hover:border-white/[0.2] hover:bg-[#16161d] transition-all cursor-pointer flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-full md:w-64 h-36 rounded-lg overflow-hidden bg-[#0a0a0d] flex-shrink-0 relative border border-white/[0.06]">
            <img
              src={nextProject.image}
              alt={nextProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col justify-between w-full h-full space-y-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#717182]">
                <span>{nextProject.category}</span>
                <span>·</span>
                <span>{nextProject.status}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#f4f4f7] group-hover:text-[#c084fc] transition-colors mt-1">
                {nextProject.title}
              </h3>
              <p className="text-sm text-[#a1a1b2] line-clamp-2 leading-relaxed">
                {nextProject.tagline}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-[#c084fc] group-hover:text-[#e9d5ff]">
              <span>Read {nextProject.title} case study</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
