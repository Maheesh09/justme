import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { ACHIEVEMENTS, ARTICLES, PROFILE, PROJECTS, PROJECT_ORDER, STATS } from '../../data/portfolioData';
import { GitCommitHeatmap } from '../GitCommitHeatmap';
import { MetricCard } from '../MetricCard';
import { ProjectCard } from '../ProjectCard';
import { ResultBadge, SectionHeading, SmartImage } from '../ui';

interface HomeScreenProps {
  onSelectProject: (projectId: string) => void;
  onNavigateAchievements: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectProject, onNavigateAchievements }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <div className="flex w-full flex-col gap-16 pb-8">
      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-8 pt-6 lg:grid-cols-12" aria-labelledby="intro">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:col-span-6">
          <img
            src={PROFILE.avatar}
            alt={`Photo of ${PROFILE.name}`}
            className="h-32 w-32 shrink-0 rounded-2xl border border-line object-cover md:h-36 md:w-36"
          />
          <div>
            <h1 id="intro" className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
              {PROFILE.headline}
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">{PROFILE.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-md border border-line px-2.5 py-1 text-muted">{PROFILE.location}</span>
              <span className="rounded-md border border-ok/30 bg-ok/10 px-2.5 py-1 text-ok">{PROFILE.status}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <GitCommitHeatmap />
        </div>

        <p className="text-sm text-muted lg:col-span-12">{PROFILE.now}</p>
      </section>

      {/* Numbers */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="In numbers">
        <MetricCard value={STATS.mergedPRs} label="Merged pull requests" note="to WSO2 open source" href="#achievements" />
        <MetricCard value={STATS.placements} label="Competition placements" note="including one win" href="#achievements" />
        <MetricCard value={STATS.projects} label="Featured projects" note="three solo, one team" href="#projects" />
        <MetricCard value={STATS.articles} label="Articles" note="published on Medium" href="#writing" />
      </section>

      {/* Projects */}
      <section className="flex flex-col gap-6" aria-labelledby="projects">
        <SectionHeading id="projects" title="Projects" note="Open any project to see what I built and how." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECT_ORDER.map((id) => (
            <ProjectCard key={id} project={PROJECTS[id]} onSelect={onSelectProject} />
          ))}
        </div>
      </section>

      {/* Achievements preview */}
      <section className="flex flex-col gap-6" aria-labelledby="achievements-home">
        <SectionHeading
          id="achievements-home"
          title="Achievements"
          note="Competitions, open source and community work."
          action={
            <button type="button" onClick={onNavigateAchievements} className="text-sm text-brand-soft hover:text-ink">
              See all {ACHIEVEMENTS.length}
            </button>
          }
        />
        <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
          {ACHIEVEMENTS.slice(0, 5).map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={onNavigateAchievements}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-panel-2 sm:px-5"
              >
                <span className="hidden w-20 shrink-0 font-mono text-sm text-faint sm:block">{a.date}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink">{a.title}</span>
                    <ResultBadge result={a.result} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted sm:line-clamp-1">{a.description}</p>
                </div>
                <SmartImage
                  src={a.image}
                  alt={a.title}
                  label={a.title.charAt(0)}
                  className="hidden h-12 w-16 shrink-0 rounded-md border border-line sm:flex"
                />
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* Writing */}
      <section className="flex flex-col gap-6" aria-labelledby="writing">
        <SectionHeading
          id="writing"
          title="Writing"
          note="Things I learned the hard way, written down."
          action={
            <a href={PROFILE.medium} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-soft hover:text-ink">
              All posts on Medium
            </a>
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-line-strong hover:bg-panel-2"
            >
              <SmartImage src={a.cover} alt="" label="Medium" className="aspect-[2/1] w-full" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm text-faint">
                  {a.date}
                  {a.readTime ? `, ${a.readTime}` : ''}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-ink group-hover:text-brand-soft">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-brand-soft">
                  Read on Medium <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        className="rounded-2xl border border-line bg-panel px-6 py-12 text-center sm:px-12"
        aria-labelledby="contact"
      >
        <h2 id="contact" className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
          Let's talk.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
          I'm looking for a software engineering internship. If you have a role, a question or just want to say hi,
          email me.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm text-ink hover:bg-panel-2"
          >
            {copied ? <Check className="h-4 w-4 text-ok" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm text-ink hover:bg-panel-2"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};
