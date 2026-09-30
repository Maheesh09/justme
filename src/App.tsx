import React, { useEffect, useState } from 'react';
import { PROJECTS } from './data/portfolioData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/Screens/HomeScreen';
import { ProjectDetailScreen } from './components/Screens/ProjectDetailScreen';
import { AchievementsScreen } from './components/Screens/AchievementsScreen';
import { ImageLightboxModal } from './components/ImageLightboxModal';

type Screen = 'home' | 'project' | 'achievements';
const HOME_SECTIONS = ['projects', 'writing', 'contact'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [projectId, setProjectId] = useState('synkron');
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  // The URL hash decides what is on screen, so links like maheesh.me/#sellora can be shared.
  useEffect(() => {
    const route = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'achievements') {
        setScreen('achievements');
        window.scrollTo({ top: 0 });
      } else if (PROJECTS[hash]) {
        setProjectId(hash);
        setScreen('project');
        window.scrollTo({ top: 0 });
      } else {
        setScreen('home');
        if (HOME_SECTIONS.includes(hash)) {
          setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 60);
        }
      }
    };
    route();
    window.addEventListener('hashchange', route);
    return () => window.removeEventListener('hashchange', route);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const titles: Record<Screen, string> = {
      home: 'Maheesha Pramuditha',
      project: `${PROJECTS[projectId]?.title ?? 'Project'} | Maheesha Pramuditha`,
      achievements: 'Achievements | Maheesha Pramuditha',
    };
    document.title = titles[screen];
  }, [screen, projectId]);

  const goHome = (section?: string) => {
    if (section) {
      if (window.location.hash === `#${section}`) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = section;
      }
    } else {
      history.pushState(null, '', window.location.pathname);
      setScreen('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Header
        currentScreen={screen}
        onNavigateHome={goHome}
        onNavigateAchievements={() => (window.location.hash = 'achievements')}
      />

      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 pt-20 sm:px-6 lg:px-8">
        {screen === 'home' && (
          <HomeScreen
            onSelectProject={(id) => (window.location.hash = id)}
            onNavigateAchievements={() => (window.location.hash = 'achievements')}
          />
        )}
        {screen === 'project' && (
          <ProjectDetailScreen
            project={PROJECTS[projectId] ?? PROJECTS.synkron}
            onBackToProjects={() => goHome('projects')}
            onSelectProject={(id) => (window.location.hash = id)}
            onOpenLightbox={(image, title) => setLightbox({ image, title })}
          />
        )}
        {screen === 'achievements' && (
          <AchievementsScreen
            onBackToOverview={() => goHome()}
            onOpenLightbox={(image, title) => setLightbox({ image, title })}
          />
        )}
      </main>

      <Footer />

      <ImageLightboxModal
        isOpen={lightbox !== null}
        image={lightbox?.image ?? ''}
        title={lightbox?.title ?? ''}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
