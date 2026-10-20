import React, { useState, useEffect } from 'react';
import { VarenoLogo } from '../brand/VarenoLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string, options?: { projectType?: string }) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'agency', label: 'Agency' },
    { id: 'process', label: 'Process' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#11130F]/90 backdrop-blur-md border-b border-[#272B22] py-3.5 shadow-lg shadow-black/20'
          : 'bg-[#11130F]/60 backdrop-blur-sm border-b border-[#272B22]/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element + icon lockup) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6F36A] rounded-md whitespace-nowrap shrink-0"
            aria-label="VARENO Home"
          >
            <VarenoLogo size="md" />
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9E9E94]"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`relative py-1 transition-colors duration-150 whitespace-nowrap shrink-0 hover:text-[#F5F3ED] ${
                    isActive ? 'text-[#F5F3ED] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D6F36A]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Exactly 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] active:scale-[0.98] transition-all duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-[#D6F36A]/10"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#9E9E94] hover:text-[#F5F3ED] hover:bg-[#181B15] border border-[#272B22] rounded-md transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#11130F]/98 backdrop-blur-xl border-b border-[#272B22] p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-4">
            <div className="text-xs uppercase font-mono tracking-widest text-[#9E9E94] pb-2 border-b border-[#272B22]">
              Navigation
            </div>
            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`text-lg font-medium py-2 px-3 rounded-md transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#181B15] text-[#D6F36A]'
                      : 'text-[#F5F3ED] hover:bg-[#181B15]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#272B22] space-y-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact', { projectType: 'Agency partnership' });
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-[#F5F3ED] bg-[#181B15] border border-[#272B22] hover:border-[#9E9E94] rounded-md transition-colors"
            >
              <span>Discuss an Agency Partnership</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
