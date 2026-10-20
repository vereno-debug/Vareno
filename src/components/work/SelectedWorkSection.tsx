import React, { useState } from 'react';
import { SITE_CONFIG, ConceptStudy } from '../../config/siteContent';
import { ArrowUpRight, Play, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ConceptPreviewModal } from './ConceptPreviewModal';

interface SelectedWorkSectionProps {
  onDiscussProject: (conceptTitle?: string) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onDiscussProject }) => {
  const [activeConceptModal, setActiveConceptModal] = useState<ConceptStudy | null>(null);

  return (
    <section id="work" className="py-20 lg:py-28 bg-[#11130F] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
            SELECTED WORK &amp; CONCEPT STUDIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
            Tangible demonstrations of architecture, UX journeys, and engineering.
          </h2>
          <p className="text-base text-[#9E9E94] leading-relaxed">
            The projects below are dedicated concept studies built to showcase real interface design, responsive layouts, and technical execution across distinct commercial sectors.
          </p>

          {/* Mandatory Honest Disclaimer */}
          <div className="p-4 bg-[#181B15] border border-[#272B22] rounded-lg flex items-start gap-3 text-xs text-[#9E9E94]">
            <AlertCircle className="w-4 h-4 text-[#D6F36A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F3ED]">Honest Persuasion Standard:</strong> Because VARENO does not publish unverified client logos or invented testimonials, these works are explicitly labelled as concept studies. Each study solves an authentic commercial problem using production-grade code.
            </div>
          </div>
        </div>

        {/* Concept Cards Stack */}
        <div className="space-y-12">
          {SITE_CONFIG.conceptStudies.map((concept, index) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              index={index}
              onLaunchPreview={() => setActiveConceptModal(concept)}
              onDiscussSimilar={() => onDiscussProject(concept.title)}
            />
          ))}
        </div>

        {/* Bottom invitation */}
        <div className="mt-16 p-8 bg-[#181B15] border border-[#272B22] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#F5F3ED]">
              Ready to create a custom website for your business?
            </h3>
            <p className="text-xs text-[#9E9E94]">
              We evaluate your audience, business model, and operational needs before writing a line of code.
            </p>
          </div>
          <button
            onClick={() => onDiscussProject()}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Modal Sandbox */}
      <ConceptPreviewModal
        concept={activeConceptModal}
        onClose={() => setActiveConceptModal(null)}
        onDiscussSimilar={(title) => {
          setActiveConceptModal(null);
          onDiscussProject(title);
        }}
      />
    </section>
  );
};

interface ConceptCardProps {
  concept: ConceptStudy;
  index: number;
  onLaunchPreview: () => void;
  onDiscussSimilar: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  concept,
  index,
  onLaunchPreview,
  onDiscussSimilar,
}) => {
  return (
    <div className="bg-[#181B15] border border-[#272B22] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#383F32]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left/Main Column: Concept Details & Architecture */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header / Badging */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#D6F36A]/10 text-[#D6F36A] border border-[#D6F36A]/20">
                {concept.badge}
              </span>
              <span className="text-xs font-mono text-[#9E9E94]">
                Study 0{index + 1} · {concept.category}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F3ED] mb-1">
                {concept.title}
              </h3>
              <p className="text-sm font-medium text-[#D6F36A]">
                {concept.tagline}
              </p>
            </div>

            {/* Business Scenario */}
            <div className="text-xs text-[#9E9E94] leading-relaxed">
              <strong className="text-[#F5F3ED]">Scenario: </strong>
              {concept.businessScenario}
            </div>

            {/* Key Design Considerations */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#9E9E94]">
                Design &amp; Engineering Focus
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#9E9E94]">
                {concept.designConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6F36A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intended User Journey */}
            <div className="p-4 bg-[#11130F] rounded-xl border border-[#272B22] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#D6F36A]">
                Intended Conversion Journey
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#9E9E94]">
                {concept.intendedJourney.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#F5F3ED]/90">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#272B22] flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onLaunchPreview}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Interactive Prototype</span>
            </button>
            <button
              type="button"
              onClick={onDiscussSimilar}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#F5F3ED] bg-[#11130F] hover:bg-[#20241C] border border-[#272B22] hover:border-[#9E9E94] rounded-md transition-colors cursor-pointer"
            >
              <span>Discuss a Comparable Build</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Preview Card */}
        <div className="lg:col-span-5 bg-[#141611] border-t lg:border-t-0 lg:border-l border-[#272B22] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9E9E94] pb-3 border-b border-[#272B22]">
              <span>Sample Viewport Preview</span>
              <span className="text-[#D6F36A]">Live Interactive Sandbox</span>
            </div>

            {/* Prototype Headline & Subhead Preview */}
            <div className="p-5 bg-[#181B15] rounded-xl border border-[#272B22] space-y-3">
              <div className="text-sm font-bold text-[#F5F3ED] leading-snug">
                "{concept.prototypeData.heroHeadline}"
              </div>
              <p className="text-xs text-[#9E9E94] leading-relaxed">
                {concept.prototypeData.heroSubhead}
              </p>

              {/* Sample Metrics / Indicators */}
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
                {concept.prototypeData.metricsOrPillars.map((item, idx) => (
                  <div key={idx} className="p-2 bg-[#11130F] rounded border border-[#272B22]">
                    <div className="text-[10px] text-[#9E9E94]">{item.label}</div>
                    <div className="font-semibold text-[#D6F36A] mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample items list */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9E9E94]">
                Sample Interactive Modules
              </div>
              {concept.prototypeData.sampleItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#181B15] rounded-lg border border-[#272B22] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-medium text-[#F5F3ED]">{item.name}</div>
                    <div className="text-[11px] text-[#9E9E94]">{item.detail}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#11130F] text-[#D6F36A] border border-[#272B22] shrink-0">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#272B22]">
            <button
              onClick={onLaunchPreview}
              className="w-full py-2.5 px-3 bg-[#181B15] hover:bg-[#20241C] border border-[#272B22] hover:border-[#D6F36A] rounded-lg text-xs font-mono text-[#D6F36A] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Click to test interactive prototype</span>
              <Play className="w-3 h-3 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
