import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/home/HeroSection';
import { BusinessValueSection } from './components/home/BusinessValueSection';
import { ServicesSection } from './components/services/ServicesSection';
import { SelectedWorkSection } from './components/work/SelectedWorkSection';
import { AgencySection } from './components/agency/AgencySection';
import { ProcessSection } from './components/process/ProcessSection';
import { CapabilitiesSection } from './components/capabilities/CapabilitiesSection';
import { AboutSection } from './components/about/AboutSection';
import { FAQSection } from './components/faq/FAQSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { SetupGuideModal } from './components/common/SetupGuideModal';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Business website');
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState<boolean>(false);

  // Sync with window hash on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const sections = ['home', 'work', 'services', 'agency', 'process', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string, options?: { projectType?: string }) => {
    setActiveSection(sectionId);
    if (options?.projectType) {
      setSelectedProjectType(options.projectType);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#');
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedProjectType(serviceTitle);
    handleNavigate('contact');
  };

  const handleDiscussAgency = () => {
    setSelectedProjectType('Agency partnership');
    handleNavigate('contact');
  };

  const handleDiscussConcept = (conceptTitle?: string) => {
    if (conceptTitle) {
      if (conceptTitle.toLowerCase().includes('northline')) {
        setSelectedProjectType('Business website');
      } else if (conceptTitle.toLowerCase().includes('ledgerly')) {
        setSelectedProjectType('Full-stack web application');
      } else if (conceptTitle.toLowerCase().includes('form')) {
        setSelectedProjectType('E-commerce');
      } else {
        setSelectedProjectType('Business website');
      }
    }
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#11130F] text-[#F5F3ED] flex flex-col font-sans selection:bg-[#D6F36A] selection:text-[#11130F]">
      {/* Top Navigation */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onDiscussProject={() => handleNavigate('contact')}
          onExploreWork={() => handleNavigate('work')}
        />

        <BusinessValueSection />

        <SelectedWorkSection onDiscussProject={handleDiscussConcept} />

        <ServicesSection onSelectService={handleSelectService} />

        <AgencySection onDiscussAgency={handleDiscussAgency} />

        <ProcessSection />

        <CapabilitiesSection />

        <AboutSection onDiscussProject={() => handleNavigate('contact')} />

        <FAQSection onAskQuestion={() => handleNavigate('contact')} />

        <ContactSection initialProjectType={selectedProjectType} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSetupGuide={() => setIsSetupGuideOpen(true)}
      />

      {/* Deployment & Environment Setup Guide Modal */}
      <SetupGuideModal
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
      />
    </div>
  );
};

export default App;
