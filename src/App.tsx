import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS, Article } from './data/portfolioData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/Screens/HomeScreen';
import { ProjectDetailScreen } from './components/Screens/ProjectDetailScreen';
import { AchievementsScreen } from './components/Screens/AchievementsScreen';
import { CvModal } from './components/CvModal';
import { ArticleModal } from './components/ArticleModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'project' | 'achievements'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('synkron');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    image: string;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    image: '',
    title: '',
    subtitle: '',
  });

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'achievements') {
        setCurrentScreen('achievements');
      } else if (PORTFOLIO_PROJECTS[hash]) {
        setSelectedProjectId(hash);
        setCurrentScreen('project');
      } else if (['projects', 'writing', 'contact', ''].includes(hash)) {
        setCurrentScreen('home');
        if (hash) {
          setTimeout(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut listener for Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxData.isOpen) setLightboxData((prev) => ({ ...prev, isOpen: false }));
        else if (selectedArticle) setSelectedArticle(null);
        else if (isCvModalOpen) setIsCvModalOpen(false);
        else if (isContactModalOpen) setIsContactModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData.isOpen, selectedArticle, isCvModalOpen, isContactModalOpen]);

  const handleNavigateHome = (targetSectionId?: string) => {
    setCurrentScreen('home');
    if (targetSectionId) {
      window.location.hash = targetSectionId;
      setTimeout(() => {
        document.getElementById(targetSectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentScreen('project');
    window.location.hash = projectId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAchievements = () => {
    setCurrentScreen('achievements');
    window.location.hash = 'achievements';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (image: string, title: string, subtitle?: string) => {
    setLightboxData({
      isOpen: true,
      image,
      title,
      subtitle,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
  };

  const currentProject = PORTFOLIO_PROJECTS[selectedProjectId] || PORTFOLIO_PROJECTS['synkron'];

  return (
    <div className="min-h-screen bg-[#0e0e12] text-[#f4f4f7] flex flex-col font-sans selection:bg-[#8b5cf6]/30 selection:text-[#e9d5ff]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigateHome={handleNavigateHome}
        onNavigateAchievements={handleNavigateAchievements}
        onOpenCv={() => setIsCvModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Main Container */}
      <main className="w-full pt-20 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentScreen === 'home' && (
          <HomeScreen
            onSelectProject={handleSelectProject}
            onNavigateAchievements={handleNavigateAchievements}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onOpenContact={() => setIsContactModalOpen(true)}
          />
        )}

        {currentScreen === 'project' && (
          <ProjectDetailScreen
            project={currentProject}
            onBackToProjects={() => handleNavigateHome('projects')}
            onSelectProject={handleSelectProject}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {currentScreen === 'achievements' && (
          <AchievementsScreen
            onBackToOverview={() => handleNavigateHome()}
            onOpenLightbox={handleOpenLightbox}
          />
        )}
      </main>

      {/* Human Footer */}
      <Footer />

      {/* Modals */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        image={lightboxData.image}
        title={lightboxData.title}
        subtitle={lightboxData.subtitle}
        onClose={handleCloseLightbox}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
