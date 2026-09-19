import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AndroidWebViewCompanion } from './components/AndroidWebViewCompanion';
import { ResumeModal } from './components/ResumeModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [isAndroidCompanionOpen, setIsAndroidCompanionOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [companionProfileId, setCompanionProfileId] = useState<string>('youtube_com');

  // Synchronize history state for Android back-stack behavior (onBackPressed)
  useEffect(() => {
    const handlePopState = () => {
      if (isAndroidCompanionOpen) {
        setIsAndroidCompanionOpen(false);
      }
      if (isResumeOpen) {
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAndroidCompanionOpen, isResumeOpen]);

  const handleOpenCompanion = (profileId: string = 'youtube_com') => {
    // Push state so Android onBackPressed can navigate back within the WebView
    setCompanionProfileId(profileId);
    window.history.pushState({ modal: 'android-companion' }, '');
    setIsAndroidCompanionOpen(true);
  };

  const handleCloseCompanion = () => {
    setIsAndroidCompanionOpen(false);
    if (window.history.state?.modal === 'android-companion') {
      window.history.back();
    }
  };

  const handleOpenResume = () => {
    window.history.pushState({ modal: 'resume-modal' }, '');
    setIsResumeOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
    if (window.history.state?.modal === 'resume-modal') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navigation */}
      <Navbar
        onOpenAndroidCompanion={() => handleOpenCompanion('vercel_com')}
        onOpenResume={handleOpenResume}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenAndroidCompanion={() => handleOpenCompanion('youtube_com')}
          onOpenResume={handleOpenResume}
        />
        <ProjectsSection onOpenAndroidCompanion={handleOpenCompanion} />
        <SkillsSection onOpenAndroidCompanion={() => handleOpenCompanion('youtube_com')} />
        <ExperienceSection />
        <ContactSection onOpenResume={handleOpenResume} />
      </main>

      {/* Footer */}
      <Footer onOpenAndroidCompanion={() => handleOpenCompanion('youtube_com')} />

      {/* Android WebView & Smali Companion Modal */}
      <AndroidWebViewCompanion
        isOpen={isAndroidCompanionOpen}
        onClose={handleCloseCompanion}
        initialProfileId={companionProfileId}
      />

      {/* Interactive Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={handleCloseResume}
      />

      {/* PWA Offline Mode Toast */}
      <OfflineIndicator />
    </div>
  );
}
