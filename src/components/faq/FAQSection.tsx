import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';

interface FAQSectionProps {
  onAskQuestion: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onAskQuestion }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First FAQ open by default

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-[#141611] border-t border-[#272B22]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
            COMMERCIAL CLARITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
            Frequently asked questions.
          </h2>
          <p className="text-base text-[#9E9E94] leading-relaxed">
            Direct answers to common commercial, timeline, and scoping questions before initiating a project.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {SITE_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={faq.question}
                className="bg-[#181B15] border border-[#272B22] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6F36A]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#F5F3ED] pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`p-1.5 rounded bg-[#11130F] border border-[#272B22] text-[#9E9E94] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#D6F36A]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#9E9E94] leading-relaxed border-t border-[#272B22]/60 pt-4 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-12 p-6 bg-[#181B15] border border-[#272B22] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9E9E94]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D6F36A] shrink-0" />
            <span>
              Have a specific question about your technical requirements or timeline constraints?
            </span>
          </div>
          <button
            type="button"
            onClick={onAskQuestion}
            className="text-[#D6F36A] hover:underline font-semibold whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Ask in Project Enquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
