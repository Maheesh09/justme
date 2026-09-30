import React from 'react';
import { MAHEESHA_PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0d] border-t border-white/[0.06] mt-16 py-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column: Human identity */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-medium text-[#f4f4f7]">{MAHEESHA_PROFILE.name}</span>
          <span className="hidden sm:inline text-[#717182]">·</span>
          <span className="text-[#a1a1b2]">
            Computer Science @ SLIIT · Colombo, Sri Lanka
          </span>
        </div>

        {/* Center / Right: Genuine tech credits and links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-[#a1a1b2]">
          <a
            href={MAHEESHA_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-[#717182]">·</span>
          <a
            href={MAHEESHA_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-[#717182]">·</span>
          <a
            href={MAHEESHA_PROFILE.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Medium
          </a>
          <span className="text-[#717182]">·</span>
          <a
            href={`mailto:${MAHEESHA_PROFILE.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <span className="text-[#717182]">·</span>
          <button
            onClick={scrollToTop}
            className="hover:text-[#c084fc] transition-colors flex items-center gap-1 cursor-pointer"
            title="Back to top"
          >
            <span>Back to top</span>
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
