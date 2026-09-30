import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { LocalTime } from './LocalTime';

interface HeaderProps {
  currentScreen: 'home' | 'project' | 'achievements';
  onNavigateHome: (section?: string) => void;
  onNavigateAchievements: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigateHome, onNavigateAchievements }) => {
  const [open, setOpen] = useState(false);

  const links: { label: string; action: () => void; active: boolean }[] = [
    { label: 'Projects', action: () => onNavigateHome('projects'), active: currentScreen === 'project' },
    { label: 'Achievements', action: onNavigateAchievements, active: currentScreen === 'achievements' },
    { label: 'Writing', action: () => onNavigateHome('writing'), active: false },
    { label: 'Contact', action: () => onNavigateHome('contact'), active: false },
  ];

  const go = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <button type="button" onClick={() => onNavigateHome()} className="font-semibold text-ink hover:text-brand-soft">
            {PROFILE.handle}
          </button>
          <div className="hidden border-l border-line pl-5 lg:block">
            <LocalTime />
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={l.action}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                l.active ? 'bg-panel-2 text-brand-soft' : 'text-muted hover:bg-panel hover:text-ink'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PROFILE.cvUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
          >
            <Download className="h-4 w-4" aria-hidden />
            CV
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-muted hover:bg-panel hover:text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-b border-line bg-panel px-4 pb-4 pt-2 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={() => go(l.action)}
              className="rounded-lg px-3 py-2.5 text-left text-base text-muted hover:bg-panel-2 hover:text-ink"
            >
              {l.label}
            </button>
          ))}
          <div className="mt-2 border-t border-line px-3 pt-3">
            <LocalTime />
          </div>
        </nav>
      )}
    </header>
  );
};
