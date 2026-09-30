import React, { useState } from 'react';
import { LocalTime } from './LocalTime';

interface HeaderProps {
  currentScreen: 'home' | 'project' | 'achievements';
  onNavigateHome: (hash?: string) => void;
  onNavigateAchievements: () => void;
  onOpenCv: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigateHome,
  onNavigateAchievements,
  onOpenCv,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0e0e12]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => onNavigateHome()}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            title="Maheesha's Portfolio Home"
          >
            <span className="font-mono text-sm tracking-tight text-[#f4f4f7] font-semibold group-hover:text-[#c084fc] transition-colors">
              maheesh.me
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>online</span>
            </span>
          </button>

          {/* Colombo local time display on desktop */}
          <div className="hidden lg:block border-l border-white/[0.08] pl-5">
            <LocalTime />
          </div>
        </div>

        {/* Clean Typography Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <button
            onClick={() => onNavigateHome('projects')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'home'
                ? 'text-[#f4f4f7] hover:bg-white/[0.06]'
                : 'text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            Projects
          </button>
          <button
            onClick={onNavigateAchievements}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentScreen === 'achievements'
                ? 'bg-white/[0.08] text-[#c084fc] font-medium'
                : 'text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04]'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => onNavigateHome('writing')}
            className="px-3 py-1.5 rounded-lg text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            Writing
          </button>
          <button
            onClick={() => onNavigateHome('contact')}
            className="px-3 py-1.5 rounded-lg text-[#a1a1b2] hover:text-[#f4f4f7] hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCv}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#f4f4f7] font-mono text-xs border border-white/[0.1] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px] text-[#c084fc]">description</span>
            <span>Download CV</span>
          </button>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Get in Touch</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#a1a1b2] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-[#131318] border-b border-white/[0.08] flex flex-col gap-2">
          <button
            onClick={() => handleNavClick(() => onNavigateHome('projects'))}
            className="text-left py-2 px-3 rounded-lg text-sm text-[#a1a1b2] hover:text-white hover:bg-white/[0.05]"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick(onNavigateAchievements)}
            className="text-left py-2 px-3 rounded-lg text-sm text-[#a1a1b2] hover:text-white hover:bg-white/[0.05]"
          >
            Achievements
          </button>
          <button
            onClick={() => handleNavClick(() => onNavigateHome('writing'))}
            className="text-left py-2 px-3 rounded-lg text-sm text-[#a1a1b2] hover:text-white hover:bg-white/[0.05]"
          >
            Writing
          </button>
          <button
            onClick={() => handleNavClick(() => onNavigateHome('contact'))}
            className="text-left py-2 px-3 rounded-lg text-sm text-[#a1a1b2] hover:text-white hover:bg-white/[0.05]"
          >
            Contact
          </button>
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#717182]">
            <LocalTime />
          </div>
        </div>
      )}
    </header>
  );
};
