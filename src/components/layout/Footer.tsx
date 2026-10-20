import React from 'react';
import { VarenoLogo } from '../brand/VarenoLogo';
import { ArrowUp, Terminal, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteContent';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSetupGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSetupGuide }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141611] border-t border-[#272B22] text-xs text-[#9E9E94]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <VarenoLogo size="md" withTagline={true} />
            <p className="text-xs text-[#9E9E94] leading-relaxed max-w-sm">
              Business-minded website engineering and digital product delivery. Thoughtful architecture, clear commercial scopes, and dependable code handovers.
            </p>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#D6F36A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6F36A]" />
              <span>{SITE_CONFIG.brand.category}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#F5F3ED]">
              Direct Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('work')}
                className="text-left text-[#9E9E94] hover:text-[#F5F3ED] transition-colors cursor-pointer"
              >
                Selected Work
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-[#9E9E94] hover:text-[#F5F3ED] transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => onNavigate('agency')}
                className="text-left text-[#9E9E94] hover:text-[#F5F3ED] transition-colors cursor-pointer"
              >
                Agency Partnership
              </button>
              <button
                onClick={() => onNavigate('process')}
                className="text-left text-[#9E9E94] hover:text-[#F5F3ED] transition-colors cursor-pointer"
              >
                Working Process
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left text-[#9E9E94] hover:text-[#F5F3ED] transition-colors cursor-pointer"
              >
                About Studio
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left text-[#9E9E94] hover:text-[#D6F36A] font-semibold transition-colors cursor-pointer"
              >
                Project Enquiry
              </button>
            </div>
          </div>

          {/* Quick Support & Setup Information */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#F5F3ED]">
              Deployment &amp; Handover
            </div>
            <p className="text-[11px] text-[#9E9E94] leading-relaxed">
              Configured for zero-lock-in Vercel deployment and standard Git repository synchronization.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenSetupGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#181B15] hover:bg-[#20241C] border border-[#272B22] hover:border-[#D6F36A] rounded text-[11px] text-[#D6F36A] font-mono transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>View Vercel &amp; Resend Setup Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Commercial & Honest Disclosure Banner */}
        <div className="mt-12 pt-6 border-t border-[#272B22] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-[#9E9E94]">
          <div className="flex items-center gap-2 max-w-2xl">
            <Shield className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
            <span>
              <strong>Authenticity statement:</strong> VARENO does not publish unverified client logos, fabricated reviews, or speculative conversion guarantees. All portfolio entries are explicitly identified as illustrative concept studies.
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span>© {currentYear} VARENO</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-[#181B15] border border-[#272B22] hover:border-[#F5F3ED] text-[#F5F3ED] rounded transition-colors"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
