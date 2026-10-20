import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import { ArrowUpRight, ArrowDown, Monitor, Tablet, Smartphone, Code2, Layers, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onDiscussProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDiscussProject, onExploreWork }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'specs'>('preview');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const viewportWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[480px]',
    mobile: 'max-w-[320px]',
  };

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#F5F3ED 1px, transparent 1px), linear-gradient(90deg, #F5F3ED 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Commercial Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean Unboxed Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-[0.25em] text-[#D6F36A]">
              <span>{SITE_CONFIG.hero.eyebrow}</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#F5F3ED] leading-[1.12] tracking-tight [text-wrap:balance]">
              {SITE_CONFIG.hero.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#9E9E94] leading-relaxed max-w-xl">
              {SITE_CONFIG.hero.supportingText}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onDiscussProject}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] active:scale-[0.98] transition-all rounded-md shadow-sm shadow-[#D6F36A]/10 cursor-pointer"
              >
                <span>{SITE_CONFIG.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-[#F5F3ED] bg-[#181B15] hover:bg-[#20241C] border border-[#272B22] hover:border-[#9E9E94] transition-all rounded-md cursor-pointer"
              >
                <span>{SITE_CONFIG.hero.secondaryCta}</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#9E9E94]" aria-hidden="true" />
              </button>
            </div>

            {/* Supporting line with quiet lime bullet */}
            <div className="pt-3 flex items-center gap-2 text-xs text-[#9E9E94] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6F36A] shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.hero.supportingLine}</span>
            </div>
          </div>

          {/* Right Column: Layered Precision Interface Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-[#181B15] border border-[#272B22] rounded-xl overflow-hidden shadow-2xl transition-all">
              {/* Browser / Sandbox Chrome Header */}
              <div className="bg-[#141611] px-4 py-3 border-b border-[#272B22] flex items-center justify-between gap-4">
                {/* Traffic lights / OS controls */}
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#272B22]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#272B22]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#272B22]" />
                  <span className="ml-2 font-mono text-[11px] text-[#9E9E94]">vareno-production.app</span>
                </div>

                {/* Viewport switch controls */}
                <div className="hidden sm:flex items-center gap-1 bg-[#11130F] p-1 rounded-md border border-[#272B22]">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`p-1 rounded text-xs transition-colors ${
                      viewportMode === 'desktop' ? 'bg-[#181B15] text-[#D6F36A]' : 'text-[#9E9E94] hover:text-[#F5F3ED]'
                    }`}
                    title="Desktop Preview"
                    aria-label="Desktop preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`p-1 rounded text-xs transition-colors ${
                      viewportMode === 'tablet' ? 'bg-[#181B15] text-[#D6F36A]' : 'text-[#9E9E94] hover:text-[#F5F3ED]'
                    }`}
                    title="Tablet Preview"
                    aria-label="Tablet preview"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`p-1 rounded text-xs transition-colors ${
                      viewportMode === 'mobile' ? 'bg-[#181B15] text-[#D6F36A]' : 'text-[#9E9E94] hover:text-[#F5F3ED]'
                    }`}
                    title="Mobile Preview"
                    aria-label="Mobile preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mode toggle tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-[#272B22] text-[#F5F3ED]'
                        : 'text-[#9E9E94] hover:text-[#F5F3ED]'
                    }`}
                  >
                    Interface
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                      activeTab === 'specs'
                        ? 'bg-[#272B22] text-[#D6F36A]'
                        : 'text-[#9E9E94] hover:text-[#F5F3ED]'
                    }`}
                  >
                    Architecture
                  </button>
                </div>
              </div>

              {/* Viewport Canvas */}
              <div className="p-4 sm:p-6 bg-[#11130F] flex justify-center min-h-[360px] items-start transition-all">
                {activeTab === 'preview' ? (
                  <div
                    className={`${viewportWidths[viewportMode]} transition-all duration-300 bg-[#181B15] border border-[#272B22] rounded-lg p-5 space-y-4`}
                  >
                    {/* Simulated App Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#272B22]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D6F36A]" />
                        <span className="text-xs font-semibold text-[#F5F3ED] tracking-wider">PROJECT ENVIRONMENT</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D6F36A] bg-[#D6F36A]/10 px-2 py-0.5 rounded">
                        PRODUCTION READY
                      </span>
                    </div>

                    {/* Simulated Content Block */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-[#F5F3ED]">
                        Engineered for High-Intent Business Journeys
                      </div>
                      <p className="text-xs text-[#9E9E94] leading-relaxed">
                        Component modularity, validated API contracts, and responsive layout fidelity without fragile dependencies.
                      </p>
                    </div>

                    {/* Simulated Performance Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                      <div className="bg-[#11130F] p-2.5 rounded border border-[#272B22]">
                        <div className="text-[10px] text-[#9E9E94]">First Paint</div>
                        <div className="text-[#D6F36A] font-semibold mt-0.5">0.3s</div>
                      </div>
                      <div className="bg-[#11130F] p-2.5 rounded border border-[#272B22]">
                        <div className="text-[10px] text-[#9E9E94]">Accessibility</div>
                        <div className="text-[#F5F3ED] font-semibold mt-0.5">100 / AA</div>
                      </div>
                      <div className="bg-[#11130F] p-2.5 rounded border border-[#272B22]">
                        <div className="text-[10px] text-[#9E9E94]">Bundle Size</div>
                        <div className="text-[#F5F3ED] font-semibold mt-0.5">&lt; 45 kB</div>
                      </div>
                    </div>

                    {/* Simulated Code/Workflow Hook */}
                    <div className="bg-[#141611] p-3 rounded border border-[#272B22] space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-[#9E9E94]">
                        <span className="font-mono">Delivery Checklist</span>
                        <span className="text-[#D6F36A]">Verified</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#F5F3ED]">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
                          <span>Mobile Viewport AA</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
                          <span>Server Route Tested</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
                          <span>Honeypot Shielded</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6F36A] shrink-0" />
                          <span>Vercel Deploy Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Technical Specs Tab */
                  <div className="w-full bg-[#181B15] border border-[#272B22] rounded-lg p-5 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-[#9E9E94] border-b border-[#272B22] pb-2">
                      <span className="flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-[#D6F36A]" />
                        <span>System Architecture Blueprint</span>
                      </span>
                      <span className="text-[10px] text-[#9E9E94]">TypeScript 5+</span>
                    </div>

                    <div className="space-y-2 text-[#9E9E94]">
                      <div className="text-[#F5F3ED]">
                        <span className="text-[#D6F36A]">Frontend:</span> React 19 + Tailwind CSS + Accessible Semantics
                      </div>
                      <div className="text-[#F5F3ED]">
                        <span className="text-[#D6F36A]">Backend Route:</span> Node.js / Express + Vercel Serverless Function
                      </div>
                      <div className="text-[#F5F3ED]">
                        <span className="text-[#D6F36A]">Form Dispatch:</span> Resend API with Sanitization &amp; Honeypot
                      </div>
                      <div className="text-[#F5F3ED]">
                        <span className="text-[#D6F36A]">Hosting Target:</span> Vercel Cloud (No custom domain required initially)
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#272B22] text-[11px] text-[#9E9E94]">
                      Every project is scoped to your actual requirements. Clean repository handover with zero lock-in.
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom status bar */}
              <div className="bg-[#141611] px-4 py-2.5 border-t border-[#272B22] flex items-center justify-between text-[11px] font-mono text-[#9E9E94]">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#D6F36A]" />
                  <span>VARENO Design System</span>
                </span>
                <span>Graphite / Ivory / Lime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
