import React from 'react';
import { Project } from '../data/portfolioData';
import { SmartImage, StatusBadge } from './ui';

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(project.id)}
    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel text-left transition-colors hover:border-line-strong hover:bg-panel-2"
  >
    <div className="relative">
      <SmartImage
        src={project.cover}
        alt={`${project.title} screenshot`}
        label={project.title}
        className="aspect-[16/9] w-full"
      />
      <div className="absolute right-3 top-3">
        <StatusBadge status={project.status} />
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-center justify-between text-sm text-faint">
        <span>{project.kind}</span>
        <span>{project.year}</span>
      </div>
      <h3 className="mt-1 text-xl font-semibold text-ink group-hover:text-brand-soft">{project.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.tagline}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.stack.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-panel-2 px-2 py-0.5 text-xs text-muted group-hover:bg-bg">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </button>
);
