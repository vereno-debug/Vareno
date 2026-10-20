import React from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { Terminal, Check } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#141611] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
            VERIFIED CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
            Engineering capabilities organized by delivery area.
          </h2>
          <p className="text-base text-[#9E9E94] leading-relaxed">
            We focus on proven, maintainable technologies that deliver fast, accessible experiences and straightforward code handovers.
          </p>
        </div>

        {/* 6 Competency Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.technologyCapabilities.map((group) => (
            <div
              key={group.area}
              className="bg-[#181B15] border border-[#272B22] hover:border-[#383F32] rounded-xl p-6 space-y-4 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#272B22]">
                  <Terminal className="w-4 h-4 text-[#D6F36A]" />
                  <h3 className="text-base font-bold text-[#F5F3ED]">{group.area}</h3>
                </div>
                <p className="text-xs text-[#9E9E94] leading-relaxed">{group.description}</p>

                <ul className="space-y-1.5 pt-2">
                  {group.competencies.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#F5F3ED]/85">
                      <Check className="w-3.5 h-3.5 text-[#D6F36A] mt-0.5 shrink-0" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#272B22] text-[10px] font-mono text-[#9E9E94]">
                Production Tested · Maintainable
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
