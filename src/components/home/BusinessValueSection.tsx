import React from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { Compass, Smartphone, Cpu, ShieldCheck } from 'lucide-react';

const icons = [Compass, Smartphone, Cpu, ShieldCheck];

export const BusinessValueSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#11130F] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
            COMMERCIAL FOUNDATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
            Websites designed to do more than look attractive.
          </h2>
          <p className="text-base sm:text-lg text-[#9E9E94] leading-relaxed">
            A website only generates commercial value when it communicates clearly, functions reliably on every device, and makes taking the next step effortless. We build around four operational disciplines.
          </p>
        </div>

        {/* 4 Architectural Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SITE_CONFIG.businessValue.map((pillar, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={pillar.title}
                className="bg-[#181B15] border border-[#272B22] hover:border-[#383F32] rounded-xl p-7 lg:p-8 flex flex-col justify-between transition-colors duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#11130F] border border-[#272B22] flex items-center justify-center text-[#D6F36A]">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-[#9E9E94]">0{index + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#F5F3ED] mb-1">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono text-[#D6F36A] tracking-wider uppercase mb-3">
                      {pillar.subtitle}
                    </div>
                    <p className="text-sm text-[#9E9E94] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Practical Target Outcome */}
                <div className="pt-6 mt-6 border-t border-[#272B22] flex items-center justify-between text-xs">
                  <span className="text-[#9E9E94]">Target Outcome</span>
                  <span className="font-medium text-[#F5F3ED] font-mono">{pillar.focalOutcome}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
