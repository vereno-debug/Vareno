import React from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#11130F] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
            DELIVERY METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
            A structured, four-stage delivery process.
          </h2>
          <p className="text-base text-[#9E9E94] leading-relaxed">
            Predictable outcomes require disciplined execution. We eliminate guesswork by agreeing on deliverables, assumptions, and milestones before code is deployed.
          </p>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.workingProcess.map((step) => (
            <div
              key={step.number}
              className="bg-[#181B15] border border-[#272B22] hover:border-[#383F32] rounded-xl p-6 flex flex-col justify-between space-y-6 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#272B22]">
                  <span className="font-mono text-2xl font-bold text-[#D6F36A]">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E9E94]">
                    Stage {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F5F3ED] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#9E9E94] leading-relaxed">{step.summary}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#9E9E94]">
                    Key Activities
                  </div>
                  <ul className="space-y-2 text-xs text-[#9E9E94]">
                    {step.keyActivities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D6F36A] mt-0.5 shrink-0" />
                        <span className="text-[#F5F3ED]/80">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#272B22] text-[11px] font-mono text-[#9E9E94]">
                Stage Output: <span className="text-[#D6F36A]">Documented &amp; Agreed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Realistic timeline commitment note */}
        <div className="mt-10 p-4 bg-[#141611] border border-[#272B22] rounded-lg text-xs text-[#9E9E94] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6F36A] shrink-0" />
          <span>
            <strong>Scheduling note:</strong> Specific project timelines and milestone deadlines are confirmed only after the Discovery and Definition phases are complete and your content readiness is assessed.
          </span>
        </div>
      </div>
    </section>
  );
};
