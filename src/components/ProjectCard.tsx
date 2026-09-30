import React from 'react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getStatusBadge = () => {
    switch (project.status) {
      case 'Live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0a0a0d]/80 backdrop-blur-md text-[#10b981] font-mono text-[11px] border border-[#10b981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            Live
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0a0a0d]/80 backdrop-blur-md text-[#10b981] font-mono text-[11px] border border-[#10b981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            Shipped
          </span>
        );
      case 'Deployed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0a0a0d]/80 backdrop-blur-md text-[#c084fc] font-mono text-[11px] border border-[#c084fc]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]"></span>
            Deployed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0a0a0d]/80 backdrop-blur-md text-[#e9d5ff] font-mono text-[11px] border border-white/[0.15]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e9d5ff]"></span>
            In Progress
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(project.id)}
      className="bg-[#131318] border border-white/[0.08] rounded-xl overflow-hidden shadow-sm group hover:border-white/[0.2] hover:bg-[#16161d] transition duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="relative overflow-hidden h-52 bg-[#1a1a24]">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-transparent"></div>
          <div className="absolute top-3 right-3">{getStatusBadge()}</div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-2 text-xs text-[#717182] font-mono mb-2">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-xl font-semibold text-[#f4f4f7] group-hover:text-[#c084fc] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[#a1a1b2] mt-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/[0.04] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-mono text-[#a1a1b2]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[11px] font-mono text-[#717182] self-center">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <span className="text-xs font-medium text-[#c084fc] group-hover:text-[#e9d5ff] transition-colors inline-flex items-center gap-1 shrink-0">
          Case study <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </span>
      </div>
    </div>
  );
};
