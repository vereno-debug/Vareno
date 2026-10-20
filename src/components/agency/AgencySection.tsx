import React from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { ArrowUpRight, Check, Shield, Users, Layers, Zap } from 'lucide-react';

interface AgencySectionProps {
  onDiscussAgency: () => void;
}

const advantageIcons = [Shield, Layers, Users, Zap];

export const AgencySection: React.FC<AgencySectionProps> = ({ onDiscussAgency }) => {
  const { agencyPartnership } = SITE_CONFIG;

  return (
    <section id="agency" className="py-20 lg:py-28 bg-[#141611] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
            AGENCY PARTNERSHIP PATHWAY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
            {agencyPartnership.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#9E9E94] leading-relaxed">
            {agencyPartnership.subheading}
          </p>
        </div>

        {/* 4 Strategic Advantages for Marketing Agencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {agencyPartnership.advantages.map((adv, idx) => {
            const Icon = advantageIcons[idx % advantageIcons.length];
            return (
              <div
                key={adv.title}
                className="bg-[#181B15] border border-[#272B22] rounded-xl p-6 flex flex-col justify-between space-y-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#11130F] border border-[#272B22] flex items-center justify-center text-[#D6F36A]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F3ED] mb-1.5">{adv.title}</h3>
                  <p className="text-xs text-[#9E9E94] leading-relaxed">{adv.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Specific Engagement Models */}
        <div className="space-y-4 mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-[#9E9E94]">
            Structured Engagement Models
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agencyPartnership.engagementModels.map((model) => (
              <div
                key={model.title}
                className="bg-[#181B15] border border-[#272B22] hover:border-[#383F32] rounded-xl p-6 sm:p-7 space-y-4 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-[#F5F3ED]">{model.title}</h4>
                  <span className="text-[11px] font-mono text-[#D6F36A] bg-[#11130F] px-2.5 py-1 rounded border border-[#272B22]">
                    {model.turnaroundNote}
                  </span>
                </div>
                <p className="text-xs text-[#9E9E94] leading-relaxed">{model.description}</p>

                <div className="pt-3 border-t border-[#272B22] flex items-start gap-2 text-xs text-[#F5F3ED]/90">
                  <Check className="w-3.5 h-3.5 text-[#D6F36A] mt-0.5 shrink-0" />
                  <span>
                    <strong>Scope &amp; Deliverables:</strong> {model.deliverableScope}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agency CTA Card */}
        <div className="bg-[#181B15] border border-[#272B22] rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold text-[#F5F3ED]">
              Need dependable development capacity for an upcoming client project?
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9E94] leading-relaxed">
              We discuss client requirements, review Figma files, confirm technical feasibility, and agree on turnaround dates before any contract is signed.
            </p>
          </div>

          <button
            type="button"
            onClick={onDiscussAgency}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] active:scale-[0.98] rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-[#D6F36A]/10"
          >
            <span>{agencyPartnership.ctaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
