import React from 'react';
import { PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const links = [
    { label: 'GitHub', href: PROFILE.github },
    { label: 'LinkedIn', href: PROFILE.linkedin },
    { label: 'Medium', href: PROFILE.medium },
    { label: 'Email', href: `mailto:${PROFILE.email}` },
  ];

  return (
    <footer className="mt-16 border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm sm:px-6 md:flex-row lg:px-8">
        <p className="text-muted">
          {PROFILE.name}, {PROFILE.location}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-muted hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
