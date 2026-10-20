import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteContent';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Shield,
  RefreshCw,
  Copy,
  Check,
  Info,
} from 'lucide-react';

interface ContactSectionProps {
  initialProjectType?: string;
}

interface FormState {
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  preferredContactMethod: string;
  consent: boolean;
  _website_hp: string; // Honeypot
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialProjectType }) => {
  const { enquiryForm, brand } = SITE_CONFIG;

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    companyName: '',
    websiteUrl: '',
    projectType: initialProjectType || 'Business website',
    budget: '$1,000 to $2,500',
    timeline: 'Within 2 to 4 weeks',
    description: '',
    preferredContactMethod: 'Email (Default)',
    consent: false,
    _website_hp: '',
  });

  // Sync when initialProjectType changes from outside (e.g. clicking "Discuss an Agency Partnership")
  useEffect(() => {
    if (initialProjectType) {
      setForm((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    configured: boolean;
    message: string;
    enquiryReference?: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(brand.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validateClient = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errors.email = 'Please enter a valid work email address.';
    }

    if (!form.projectType) {
      errors.projectType = 'Please select a project type.';
    }

    if (!form.budget) {
      errors.budget = 'Please select a budget range.';
    }

    if (!form.timeline) {
      errors.timeline = 'Please select a timeline.';
    }

    if (!form.description.trim() || form.description.trim().length < 15) {
      errors.description = 'Please provide at least 15 characters describing your project requirements.';
    }

    if (!form.consent) {
      errors.consent = 'You must agree to receive a follow-up response regarding this enquiry.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateClient()) {
      return;
    }

    setLoading(true);
    setSubmissionResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult({
          success: true,
          configured: data.configured,
          message: data.message,
          enquiryReference: data.enquiryReference,
        });
      } else {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setSubmissionResult({
          success: false,
          configured: data.configured ?? false,
          message: data.message || 'Submission failed. Please check the form and try again.',
        });
      }
    } catch (err) {
      console.error('[VARENO Client] Contact submission error:', err);
      setSubmissionResult({
        success: false,
        configured: false,
        message: 'Could not connect to the enquiry endpoint. Please verify server connectivity or email directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setForm({
      fullName: '',
      email: '',
      companyName: '',
      websiteUrl: '',
      projectType: 'Business website',
      budget: '$1,000 to $2,500',
      timeline: 'Within 2 to 4 weeks',
      description: '',
      preferredContactMethod: 'Email (Default)',
      consent: false,
      _website_hp: '',
    });
    setFieldErrors({});
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#11130F] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Commercial Qualification Context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
                START A CONVERSATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
                Tell us about your project or agency requirement.
              </h2>
              <p className="text-base text-[#9E9E94] leading-relaxed">
                Whether you need a new business website, a campaign landing page, or external development capacity for client projects, submit the enquiry below for a thoughtful review.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 bg-[#181B15] border border-[#272B22] rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9E9E94]">
                  Direct Contact
                </span>
                <span className="text-[11px] font-mono text-[#D6F36A] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{brand.responseTimeGoal}</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-[#11130F] rounded-lg border border-[#272B22]">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-[#D6F36A] shrink-0" />
                  <span className="text-sm font-mono text-[#F5F3ED] truncate">
                    {brand.contactEmail}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[#9E9E94] hover:text-[#F5F3ED] hover:bg-[#181B15] rounded transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#D6F36A]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-xs text-[#9E9E94] space-y-1">
                <div>Client Office Hours: <strong className="text-[#F5F3ED]">{brand.officeHours}</strong></div>
                <div>{brand.locationNote}</div>
              </div>
            </div>

            {/* Privacy & Anti-Spam Guarantee */}
            <div className="space-y-2 text-xs text-[#9E9E94]">
              <div className="flex items-center gap-2 text-[#F5F3ED] font-medium">
                <Shield className="w-4 h-4 text-[#D6F36A]" />
                <span>Zero Sales Spam Policy</span>
              </div>
              <p className="leading-relaxed">
                Your email and project details are kept strictly confidential. We do not sell data, subscribe you to promotional newsletters, or pressure you with unsolicited follow-up calls.
              </p>
            </div>
          </div>

          {/* Right Column: The Qualified Project Enquiry Form */}
          <div className="lg:col-span-7 bg-[#181B15] border border-[#272B22] rounded-2xl p-6 sm:p-10 shadow-xl">
            {submissionResult?.success ? (
              /* Success State - Only shown when server confirmed delivery */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#D6F36A]/10 border border-[#D6F36A]/20 flex items-center justify-center text-[#D6F36A]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#F5F3ED]">
                    Project Enquiry Delivered Directly
                  </h3>
                  <div className="text-xs font-mono text-[#D6F36A]">
                    Reference: {submissionResult.enquiryReference}
                  </div>
                  <p className="text-sm text-[#9E9E94] leading-relaxed pt-1">
                    Your enquiry has been delivered directly to VARENO's inbox (<span className="text-[#F5F3ED]">{brand.contactEmail}</span>). We will review your project brief and reply to <span className="text-[#F5F3ED]">{form.email}</span> within one business day.
                  </p>
                </div>

                <div className="p-4 bg-[#141611] border border-[#272B22] rounded-xl text-xs text-[#9E9E94] space-y-1">
                  <div className="text-[#F5F3ED] font-medium font-mono text-[11px] uppercase tracking-wider">Delivery Confirmation</div>
                  <div>Direct inbox dispatch confirmed by server · Reference #{submissionResult.enquiryReference}</div>
                </div>

                <div className="pt-4 border-t border-[#272B22] flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#F5F3ED] bg-[#11130F] hover:bg-[#20241C] border border-[#272B22] rounded-md transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : submissionResult && !submissionResult.configured ? (
              /* Honest Unconfigured State - Provides Direct Alternative Contact */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Mail className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Live Delivery Pending Configuration
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F3ED]">
                    Enquiry Validated &amp; Ready to Send
                  </h3>
                  <div className="text-xs font-mono text-[#9E9E94]">
                    Reference: {submissionResult.enquiryReference}
                  </div>
                  <p className="text-sm text-[#9E9E94] leading-relaxed pt-1">
                    Your enquiry details were validated successfully. However, automated inbox forwarding is not yet configured on this instance. Please use the button below to send your pre-filled enquiry directly to our studio inbox.
                  </p>
                </div>

                {/* Direct Mailto Action with Pre-populated Subject and Body */}
                <div className="p-5 bg-[#141611] border border-amber-900/40 rounded-xl space-y-3">
                  <div className="text-xs font-medium text-[#F5F3ED]">Direct Delivery Alternative:</div>
                  <a
                    href={`mailto:${brand.contactEmail}?subject=${encodeURIComponent(`[VARENO Project Enquiry ${submissionResult.enquiryReference}] ${form.projectType} from ${form.fullName}`)}&body=${encodeURIComponent(`Name: ${form.fullName}\nEmail: ${form.email}\nCompany: ${form.companyName || 'N/A'}\nProject Type: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\nPreferred Contact: ${form.preferredContactMethod}\n\nProject Scope:\n${form.description}\n\nReference: ${submissionResult.enquiryReference}`)}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#D6F36A] hover:bg-[#c9e85e] text-[#11130F] font-semibold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send via Email App to {brand.contactEmail}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const text = `Name: ${form.fullName}\nEmail: ${form.email}\nCompany: ${form.companyName || 'N/A'}\nProject Type: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nBrief:\n${form.description}`;
                      navigator.clipboard.writeText(text);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2500);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#181B15] border border-[#272B22] hover:border-[#9E9E94] text-xs text-[#F5F3ED] font-medium rounded-md transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#D6F36A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Enquiry Text Copied to Clipboard!' : 'Copy Enquiry Brief to Clipboard'}</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-[#9E9E94] hover:text-[#F5F3ED] underline transition-colors cursor-pointer"
                  >
                    Return to Form
                  </button>
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-[#272B22] pb-4">
                  <h3 className="text-xl font-bold text-[#F5F3ED]">Project Specification &amp; Scope</h3>
                  <p className="text-xs text-[#9E9E94] mt-1">
                    Fields marked with <span className="text-[#D6F36A]">*</span> are required to prepare an accurate proposal.
                  </p>
                </div>

                {submissionResult && !submissionResult.success && (
                  <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-lg flex items-start gap-3 text-xs text-red-300 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>{submissionResult.message}</div>
                  </div>
                )}

                {/* Honeypot field (hidden from legitimate users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_website_hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="_website_hp"
                    name="_website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form._website_hp}
                    onChange={(e) => setForm({ ...form, _website_hp: e.target.value })}
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-[#F5F3ED] mb-1.5">
                      Full Name <span className="text-[#D6F36A]">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className={`w-full bg-[#11130F] border rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] placeholder:text-[#9E9E94]/60 focus:border-[#D6F36A] focus:outline-none transition-colors ${
                        fieldErrors.fullName ? 'border-red-500' : 'border-[#272B22]'
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#F5F3ED] mb-1.5">
                      Work Email <span className="text-[#D6F36A]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full bg-[#11130F] border rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] placeholder:text-[#9E9E94]/60 focus:border-[#D6F36A] focus:outline-none transition-colors ${
                        fieldErrors.email ? 'border-red-500' : 'border-[#272B22]'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Company & Current Website Row (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-medium text-[#9E9E94] mb-1.5">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="e.g. Acme Studio"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-[#11130F] border border-[#272B22] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] placeholder:text-[#9E9E94]/60 focus:border-[#D6F36A] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="websiteUrl" className="block text-xs font-medium text-[#9E9E94] mb-1.5">
                      Current Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      id="websiteUrl"
                      placeholder="https://yoursite.com"
                      value={form.websiteUrl}
                      onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                      className="w-full bg-[#11130F] border border-[#272B22] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] placeholder:text-[#9E9E94]/60 focus:border-[#D6F36A] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type & Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-medium text-[#F5F3ED] mb-1.5">
                      Project Type <span className="text-[#D6F36A]">*</span>
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full bg-[#11130F] border border-[#272B22] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] focus:border-[#D6F36A] focus:outline-none transition-colors cursor-pointer"
                    >
                      {enquiryForm.projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs font-medium text-[#F5F3ED] mb-1.5">
                      Estimated Budget <span className="text-[#D6F36A]">*</span>
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[#11130F] border border-[#272B22] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] focus:border-[#D6F36A] focus:outline-none transition-colors cursor-pointer"
                    >
                      {enquiryForm.budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline & Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timeline" className="block text-xs font-medium text-[#F5F3ED] mb-1.5">
                      Desired Timeline <span className="text-[#D6F36A]">*</span>
                    </label>
                    <select
                      id="timeline"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className="w-full bg-[#11130F] border border-[#272B22] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] focus:border-[#D6F36A] focus:outline-none transition-colors cursor-pointer"
                    >
                      {enquiryForm.timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contactMethod" className="block text-xs font-medium text-[#9E9E94] mb-1.5">
                      Preferred Follow-up Method
                    </label>
                    <select
                      id="contactMethod"
                      value={form.preferredContactMethod}
                      onChange={(e) => setForm({ ...form, preferredContactMethod: e.target.value })}
                      className="w-full bg-[#11130F] border border-[#272B22] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] focus:border-[#D6F36A] focus:outline-none transition-colors cursor-pointer"
                    >
                      {enquiryForm.contactMethods.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-medium text-[#F5F3ED] mb-1.5">
                    Project Brief &amp; Scope Summary <span className="text-[#D6F36A]">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    required
                    placeholder="Briefly describe your goals, required pages, integrations, design assets ready, or target launch date..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`w-full bg-[#11130F] border rounded-lg px-3.5 py-2.5 text-xs text-[#F5F3ED] placeholder:text-[#9E9E94]/60 focus:border-[#D6F36A] focus:outline-none transition-colors leading-relaxed ${
                      fieldErrors.description ? 'border-red-500' : 'border-[#272B22]'
                    }`}
                  />
                  {fieldErrors.description && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.description}</p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-[#272B22] bg-[#11130F] text-[#D6F36A] focus:ring-[#D6F36A] accent-[#D6F36A]"
                    />
                    <span className="text-xs text-[#9E9E94] leading-relaxed">
                      I agree to be contacted by VARENO regarding this project enquiry. We respect your privacy and never distribute contact details to third parties.
                    </span>
                  </label>
                  {fieldErrors.consent && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.consent}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#D6F36A]/10"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Validating &amp; Registering Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
