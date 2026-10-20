import React from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { VarenoLogo } from '../brand/VarenoLogo';

interface AboutSectionProps {
  onDiscussProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscussProject }) => {
  const { about, brand } = SITE_CONFIG;

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#11130F] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Brand Statement & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
              ABOUT THE STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
              {about.heading}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#9E9E94] leading-relaxed">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Operating Principles Grid */}
            <div className="pt-6 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#9E9E94]">
                Operating Principles
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.operatingPrinciples.map((op) => (
                  <div
                    key={op.title}
                    className="p-4 bg-[#181B15] border border-[#272B22] rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D6F36A]" />
                      <h3 className="text-xs font-bold text-[#F5F3ED]">{op.title}</h3>
                    </div>
                    <p className="text-[11px] text-[#9E9E94] leading-relaxed">
                      {op.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Studio Profile & Operating Model */}
          <div className="lg:col-span-5 bg-[#181B15] border border-[#272B22] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="pb-6 border-b border-[#272B22] flex items-center justify-between">
              <VarenoLogo size="md" withTagline={true} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6F36A] px-2 py-0.5 rounded bg-[#D6F36A]/10 border border-[#D6F36A]/20">
                Independent Practice
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-[#272B22]/50">
                <span className="text-[#9E9E94]">Category:</span>
                <span className="text-[#F5F3ED] font-medium text-right">{brand.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#272B22]/50">
                <span className="text-[#9E9E94]">Operating Model:</span>
                <span className="text-[#F5F3ED] font-medium text-right">{brand.locationNote}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#272B22]/50">
                <span className="text-[#9E9E94]">Response Goal:</span>
                <span className="text-[#D6F36A] font-mono font-medium text-right">{brand.responseTimeGoal}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#272B22]/50">
                <span className="text-[#9E9E94]">Client Working Hours:</span>
                <span className="text-[#F5F3ED] font-medium text-right">{brand.officeHours}</span>
              </div>
            </div>

            {/* Configurable Founder Introduction Card */}
            <div className="p-4 bg-[#11130F] border border-[#272B22] rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#9E9E94] text-[10px] font-mono uppercase tracking-wider">
                <span>Direct Lead Developer</span>
                <span className="text-[#D6F36A]">Direct Communication</span>
              </div>
              <p className="text-[#9E9E94] leading-relaxed">
                When you initiate a project with VARENO, you communicate directly with the software engineer architecting your code, ensuring prompt answers and accurate technical scoping.
              </p>
            </div>

            <button
              type="button"
              onClick={onDiscussProject}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
