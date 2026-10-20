import React, { useState } from 'react';
import { ConceptStudy } from '../../config/siteContent';
import { X, ArrowUpRight, Check, AlertCircle, ShoppingBag, Shield, Activity, Calendar, RefreshCw } from 'lucide-react';

interface ConceptPreviewModalProps {
  concept: ConceptStudy | null;
  onClose: () => void;
  onDiscussSimilar: (conceptTitle: string) => void;
}

export const ConceptPreviewModal: React.FC<ConceptPreviewModalProps> = ({
  concept,
  onClose,
  onDiscussSimilar,
}) => {
  if (!concept) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-[#181B15] border border-[#272B22] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="bg-[#141611] px-5 py-4 border-b border-[#272B22] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6F36A]" />
            <div>
              <div className="flex items-center gap-2">
                <h3 id="modal-title" className="text-base font-bold text-[#F5F3ED]">
                  {concept.title}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#D6F36A]/10 text-[#D6F36A] border border-[#D6F36A]/20">
                  {concept.badge}
                </span>
              </div>
              <p className="text-xs text-[#9E9E94]">{concept.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDiscussSimilar(concept.title)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors"
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#9E9E94] hover:text-[#F5F3ED] hover:bg-[#20241C] rounded-lg transition-colors border border-[#272B22]"
              aria-label="Close interactive preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable Viewport */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Honest Concept Disclaimer Notice */}
          <div className="p-3.5 bg-[#11130F] border border-[#272B22] rounded-lg flex items-start gap-3 text-xs text-[#9E9E94]">
            <AlertCircle className="w-4 h-4 text-[#D6F36A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F3ED]">Illustrative Concept Sandbox:</strong> This is a working prototype engineered to demonstrate UX flow, responsive state handling, and interface hierarchy for this business archetype. No actual client data is represented.
            </div>
          </div>

          {/* Interactive Prototype Sandbox based on Concept ID */}
          <div className="bg-[#11130F] border border-[#272B22] rounded-xl p-5 sm:p-7">
            {concept.id === 'northline-services' && <NorthlinePrototype />}
            {concept.id === 'ledgerly' && <LedgerlyPrototype />}
            {concept.id === 'form-and-field' && <FormFieldPrototype />}
          </div>

          {/* Specification Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#9E9E94]">
            <div className="space-y-3 p-5 bg-[#141611] rounded-xl border border-[#272B22]">
              <h4 className="text-sm font-bold text-[#F5F3ED] flex items-center gap-2">
                <span>The Business Scenario</span>
              </h4>
              <p className="leading-relaxed">{concept.businessScenario}</p>
              <div className="pt-2">
                <span className="font-mono text-[#D6F36A] uppercase tracking-wider text-[11px]">Primary User Need:</span>
                <p className="text-[#F5F3ED]/90 mt-1">{concept.userNeed}</p>
              </div>
            </div>

            <div className="space-y-3 p-5 bg-[#141611] rounded-xl border border-[#272B22]">
              <h4 className="text-sm font-bold text-[#F5F3ED]">
                Design &amp; Engineering Considerations
              </h4>
              <ul className="space-y-1.5">
                {concept.designConsiderations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D6F36A] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Call-to-action */}
        <div className="bg-[#141611] px-5 py-4 border-t border-[#272B22] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#9E9E94]">
            Interested in building a high-converting website with comparable functionality?
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#9E9E94] hover:text-[#F5F3ED] rounded-md transition-colors"
            >
              Close Preview
            </button>
            <button
              onClick={() => onDiscussSimilar(concept.title)}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PROTOTYPE 1: Northline Commercial HVAC
   ========================================================================= */
const NorthlinePrototype: React.FC = () => {
  const [mode, setMode] = useState<'emergency' | 'scheduled'>('emergency');
  const [facilitySqFt, setFacilitySqFt] = useState<number>(25000);
  const [systemType, setSystemType] = useState<string>('Rooftop VAV');

  const estimatedCost = Math.round((facilitySqFt / 1000) * 85);

  return (
    <div className="space-y-6">
      {/* Triage Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#272B22]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#9E9E94]">
            Northline Dispatch Simulator
          </div>
          <h4 className="text-xl font-bold text-[#F5F3ED] mt-1">
            Commercial HVAC &amp; Refrigeration Triage
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#181B15] rounded-lg border border-[#272B22]">
          <button
            onClick={() => setMode('emergency')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              mode === 'emergency'
                ? 'bg-red-950/80 text-red-300 border border-red-700/50'
                : 'text-[#9E9E94] hover:text-[#F5F3ED]'
            }`}
          >
            Emergency Dispatch
          </button>
          <button
            onClick={() => setMode('scheduled')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              mode === 'scheduled'
                ? 'bg-[#D6F36A] text-[#11130F] font-semibold'
                : 'text-[#9E9E94] hover:text-[#F5F3ED]'
            }`}
          >
            Planned Contract
          </button>
        </div>
      </div>

      {mode === 'emergency' ? (
        <div className="p-5 bg-red-950/20 border border-red-900/30 rounded-xl space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-red-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>24/7 Critical Response Active</span>
            </span>
            <span className="text-red-400 font-bold">&lt; 90-Min On-Site SLA</span>
          </div>
          <div className="text-sm text-[#F5F3ED] font-medium">
            Immediate technician dispatch for refrigeration loss, server room cooling failures, and boiler shutdowns.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22]">
              <div className="text-[#9E9E94]">Emergency Line:</div>
              <div className="text-lg font-mono font-bold text-[#F5F3ED] mt-0.5">1-800-555-HVAC</div>
            </div>
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22]">
              <div className="text-[#9E9E94]">Standby Fleet:</div>
              <div className="text-sm font-semibold text-[#D6F36A] mt-0.5">8 Mobile Units Deployed</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[#D6F36A]">
            Interactive Commercial Maintenance Estimator
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#9E9E94] mb-1">
                Facility Floor Area (Sq Ft): <strong className="text-[#F5F3ED]">{facilitySqFt.toLocaleString()} sq ft</strong>
              </label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={facilitySqFt}
                onChange={(e) => setFacilitySqFt(Number(e.target.value))}
                className="w-full accent-[#D6F36A] cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9E9E94] mb-1">Primary Mechanical System:</label>
              <select
                value={systemType}
                onChange={(e) => setSystemType(e.target.value)}
                className="w-full bg-[#181B15] border border-[#272B22] rounded p-2 text-xs text-[#F5F3ED]"
              >
                <option>Rooftop VAV Packaged Units</option>
                <option>Centrifugal Water Chiller</option>
                <option>VRF Multi-Split Heat Pump</option>
                <option>Commercial Hydronic Boiler</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-[#181B15] rounded-lg border border-[#272B22] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-[#9E9E94]">Estimated Annual Service Agreement</div>
              <div className="text-xl font-bold font-mono text-[#D6F36A] mt-0.5">
                ${estimatedCost.toLocaleString()} / year
              </div>
              <div className="text-[11px] text-[#9E9E94] mt-0.5">
                Includes 4 quarterly filter changes, EPA coil descaling, and priority emergency SLA.
              </div>
            </div>
            <button className="px-4 py-2 bg-[#272B22] hover:bg-[#383F32] text-[#F5F3ED] rounded text-xs font-medium transition-colors shrink-0">
              Download Scope Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   PROTOTYPE 2: Ledgerly SaaS Dashboard
   ========================================================================= */
const LedgerlyPrototype: React.FC = () => {
  const [view, setView] = useState<'runway' | 'invoices'>('runway');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#272B22]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#9E9E94]">
            Ledgerly Telemetry Sandbox
          </div>
          <h4 className="text-xl font-bold text-[#F5F3ED] mt-1">
            Agency Cashflow &amp; Retainer Intelligence
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#181B15] rounded-lg border border-[#272B22]">
          <button
            onClick={() => setView('runway')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              view === 'runway'
                ? 'bg-[#D6F36A] text-[#11130F] font-semibold'
                : 'text-[#9E9E94] hover:text-[#F5F3ED]'
            }`}
          >
            90-Day Runway
          </button>
          <button
            onClick={() => setView('invoices')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              view === 'invoices'
                ? 'bg-[#D6F36A] text-[#11130F] font-semibold'
                : 'text-[#9E9E94] hover:text-[#F5F3ED]'
            }`}
          >
            Invoice Aging
          </button>
        </div>
      </div>

      {view === 'runway' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22]">
              <div className="text-[10px] text-[#9E9E94] font-mono">Current Cash Buffer</div>
              <div className="text-lg font-mono font-bold text-[#F5F3ED] mt-0.5">$214,500</div>
              <div className="text-[10px] text-[#D6F36A] mt-0.5">+4.2 mos fixed payroll</div>
            </div>
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22]">
              <div className="text-[10px] text-[#9E9E94] font-mono">Retainer Inflows (Q4)</div>
              <div className="text-lg font-mono font-bold text-[#D6F36A] mt-0.5">$184,200</div>
              <div className="text-[10px] text-[#9E9E94] mt-0.5">14 active retainers</div>
            </div>
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22]">
              <div className="text-[10px] text-[#9E9E94] font-mono">Overhead Burn / Mo</div>
              <div className="text-lg font-mono font-bold text-[#F5F3ED] mt-0.5">$48,500</div>
              <div className="text-[10px] text-[#9E9E94] mt-0.5">12 team members</div>
            </div>
          </div>

          {/* Simulated chart bars */}
          <div className="p-4 bg-[#181B15] rounded border border-[#272B22] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#9E9E94]">
              <span>Projected Cash Balance (Next 3 Months)</span>
              <span className="text-[#D6F36A] font-mono">Runway Stable</span>
            </div>
            <div className="flex items-end gap-2 h-20 pt-4">
              <div className="flex-1 bg-[#272B22] hover:bg-[#D6F36A]/50 transition-colors rounded-t h-[65%] flex items-end justify-center pb-1 text-[10px] text-[#9E9E94]">
                Nov
              </div>
              <div className="flex-1 bg-[#272B22] hover:bg-[#D6F36A]/50 transition-colors rounded-t h-[78%] flex items-end justify-center pb-1 text-[10px] text-[#9E9E94]">
                Dec
              </div>
              <div className="flex-1 bg-[#D6F36A] rounded-t h-[92%] flex items-end justify-center pb-1 text-[10px] text-[#11130F] font-bold">
                Jan
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-[#9E9E94]">
            Actionable outstanding invoice alerts synchronized via QuickBooks &amp; Stripe.
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F3ED]">Vanguard Creative Ltd</span>
                <div className="text-[11px] text-[#9E9E94]">Invoice #1042 · Brand Strategy Sprint</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-amber-400">$12,500</div>
                <div className="text-[10px] text-amber-400/80">34 days overdue</div>
              </div>
            </div>
            <div className="p-3 bg-[#181B15] rounded border border-[#272B22] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F3ED]">Kinetix Media Group</span>
                <div className="text-[11px] text-[#9E9E94]">Invoice #1048 · Performance Retainer</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-[#F5F3ED]">$9,950</div>
                <div className="text-[10px] text-[#9E9E94]">Due in 6 days</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   PROTOTYPE 3: Form & Field Storefront
   ========================================================================= */
const FormFieldPrototype: React.FC = () => {
  const [selectedFinish, setSelectedFinish] = useState<'basalt' | 'terracotta' | 'mineral'>('basalt');
  const [bagCount, setBagCount] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const finishes = {
    basalt: { name: 'Basalt Smoked', price: 145, note: 'Studio batch of 50' },
    terracotta: { name: 'Raw Chamotte Terracotta', price: 130, note: 'Low stock (3 remaining)' },
    mineral: { name: 'Mineral Chalk Matte', price: 155, note: 'Numbered edition' },
  };

  const handleAddToBag = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#272B22]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#9E9E94]">
            Form &amp; Field Storefront Simulator
          </div>
          <h4 className="text-xl font-bold text-[#F5F3ED] mt-1">
            Architectural Objects &amp; Limited Ceramics
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#D6F36A]">
          <ShoppingBag className="w-4 h-4" />
          <span>Bag Items: {bagCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Ceramic visual mockup container */}
        <div className="sm:col-span-5 bg-[#181B15] border border-[#272B22] rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px]">
          <div
            className={`w-24 h-32 rounded-t-3xl rounded-b-lg border-2 transition-all duration-300 shadow-xl ${
              selectedFinish === 'basalt'
                ? 'bg-neutral-800 border-neutral-600 shadow-neutral-900'
                : selectedFinish === 'terracotta'
                ? 'bg-[#8B4513] border-[#A0522D] shadow-[#5c2e0b]'
                : 'bg-[#DCD7CA] border-[#F5F3ED] shadow-neutral-800 text-neutral-900'
            }`}
          />
          <span className="text-[11px] font-mono text-[#9E9E94] mt-4">
            Column Vessel No. 03 · 32cm
          </span>
        </div>

        {/* Product Variant Details */}
        <div className="sm:col-span-7 space-y-4 text-xs">
          <div>
            <div className="text-lg font-bold text-[#F5F3ED]">
              {finishes[selectedFinish].name}
            </div>
            <div className="text-xl font-mono font-bold text-[#D6F36A] mt-1">
              ${finishes[selectedFinish].price}
            </div>
            <div className="text-[11px] text-[#9E9E94] mt-0.5">
              {finishes[selectedFinish].note} · Ships carbon-neutral worldwide
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[#9E9E94] font-medium">Select Studio Finish:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['basalt', 'terracotta', 'mineral'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedFinish(key)}
                  className={`p-2 rounded border text-center transition-all ${
                    selectedFinish === key
                      ? 'border-[#D6F36A] bg-[#272B22] text-[#F5F3ED]'
                      : 'border-[#272B22] bg-[#181B15] text-[#9E9E94] hover:text-[#F5F3ED]'
                  }`}
                >
                  <div className="capitalize font-medium">{key}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setBagCount((prev) => prev + 1);
                handleAddToBag();
              }}
              className="flex-1 py-2.5 px-4 bg-[#D6F36A] hover:bg-[#c9e85e] text-[#11130F] font-semibold uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
            >
              {added ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
            <button
              onClick={() => setBagCount(0)}
              className="p-2.5 bg-[#181B15] border border-[#272B22] hover:border-[#9E9E94] text-[#9E9E94] hover:text-[#F5F3ED] rounded transition-colors"
              title="Reset Bag"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
