import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Project, PROJECTS } from '../../data/portfolioData';
import { SmartImage, StatusBadge } from '../ui';

interface ProjectDetailScreenProps {
  project: Project;
  onBackToProjects: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenLightbox: (image: string, title: string) => void;
}

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-xl border border-line bg-panel p-6">
    <h2 className="text-lg font-semibold text-ink">{title}</h2>
    <div className="mt-3 text-[15px] leading-relaxed text-muted">{children}</div>
  </section>
);

export const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({
  project,
  onBackToProjects,
  onSelectProject,
  onOpenLightbox,
}) => {
  const next = PROJECTS[project.next] ?? PROJECTS.synkron;

  return (
    <article className="flex w-full flex-col gap-10 pb-8 pt-4">
      <button
        type="button"
        onClick={onBackToProjects}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All projects
      </button>

      {/* Title */}
      <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-ink">{project.title}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-2 text-sm text-faint">
            {project.kind}, {project.year}
          </p>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((l, i) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium ${
                  i === 0 ? 'bg-brand text-white hover:bg-brand-hover' : 'border border-line-strong text-ink hover:bg-panel-2'
                }`}
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main image. Hidden until a real screenshot is added in portfolioData.ts */}
      {project.cover && (
        <button
          type="button"
          onClick={() => onOpenLightbox(project.cover!, project.title)}
          className="overflow-hidden rounded-2xl border border-line"
          aria-label={`Enlarge ${project.title} screenshot`}
        >
          <SmartImage src={project.cover} alt={`${project.title} screenshot`} label={project.title} className="aspect-[16/9] w-full" />
        </button>
      )}

      {/* Numbers, only when there are real ones */}
      {project.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-panel p-5">
              <div className="font-mono text-3xl font-semibold tracking-tight text-ink">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Block title="The problem">
          <p>{project.problem}</p>
        </Block>
        <Block title={project.kind === 'Solo project' ? 'What I built' : 'What we built'}>
          <p>{project.built}</p>
        </Block>
      </div>

      <Block title={project.status === 'In progress' ? "What I'm working on" : 'How it works'}>
        <ul className="space-y-2.5">
          {project.details.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft" aria-hidden />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Block>

      {project.lessons && project.lessons.length > 0 && (
        <Block title="What I learned">
          <ul className="space-y-2.5">
            {project.lessons.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Block>
      )}

      <Block title="Built with">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="rounded-md border border-line bg-panel-2 px-2.5 py-1 text-sm text-ink">
              {t}
            </span>
          ))}
        </div>
      </Block>

      {project.gallery.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-ink">Screenshots</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.gallery.map((g) => (
              <button
                key={g.src}
                type="button"
                onClick={() => onOpenLightbox(g.src, g.caption)}
                className="overflow-hidden rounded-xl border border-line bg-panel text-left hover:border-line-strong"
              >
                <SmartImage src={g.src} alt={g.caption} className="aspect-[16/10] w-full" />
                <p className="p-3 text-sm text-muted">{g.caption}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onSelectProject(next.id)}
        className="group flex flex-col items-start gap-5 rounded-xl border border-line bg-panel p-5 text-left hover:border-line-strong hover:bg-panel-2 md:flex-row md:items-center"
      >
        <SmartImage src={next.cover} alt={next.title} label={next.title} className="aspect-[16/9] w-full rounded-lg md:w-56" />
        <div>
          <p className="text-sm text-faint">Next project</p>
          <h3 className="mt-1 text-xl font-semibold text-ink group-hover:text-brand-soft">{next.title}</h3>
          <p className="mt-1 text-[15px] text-muted">{next.tagline}</p>
        </div>
      </button>
    </article>
  );
};
