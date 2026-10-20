import React, { useState } from 'react';
import { X, Terminal, Check, Copy, ExternalLink, ShieldCheck, Mail, Globe, Server } from 'lucide-react';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const envSnippet = `# 1. Resend API Key (Server-side secret, NEVER expose to browser)
RESEND_API_KEY="re_your_api_key_here"

# 2. Receiving Email (Where client enquiries are delivered)
CONTACT_TO_EMAIL="varenowebdesignstudio@gmail.com"

# 3. Sending Address (Uses onboarding@resend.dev during testing/gmail; verified domain in production)
CONTACT_FROM_EMAIL="varenowebdesignstudio@gmail.com"

# 4 & 5. Site URL (Optional in preview; set to your assigned vercel.app domain in Vercel)
SITE_URL="https://your-assigned-name.vercel.app"
VITE_SITE_URL="https://your-assigned-name.vercel.app"`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="setup-guide-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-[#181B15] border border-[#272B22] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#141611] px-6 py-4 border-b border-[#272B22] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-[#D6F36A]" />
            <h3 id="setup-guide-title" className="text-base font-bold text-[#F5F3ED]">
              VARENO Deployment &amp; Environment Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9E9E94] hover:text-[#F5F3ED] hover:bg-[#20241C] rounded-lg transition-colors border border-[#272B22]"
            aria-label="Close setup guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#9E9E94] flex-1 leading-relaxed">
          {/* Quick summary */}
          <div className="p-4 bg-[#11130F] border border-[#272B22] rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D6F36A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F5F3ED]">Production Architecture Verified:</strong> This application is fully engineered with React 19, TypeScript, Tailwind CSS, an Express development server, and a dedicated Vercel Serverless Function under <code className="text-[#D6F36A] font-mono">/api/contact.ts</code>.
            </div>
          </div>

          {/* Step 1: Environment Variables */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F5F3ED] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6F36A]" />
                <span>1. Configuring Email Delivery (Resend API)</span>
              </h4>
              <button
                onClick={() => copySnippet('env', envSnippet)}
                className="flex items-center gap-1 text-[11px] font-mono text-[#D6F36A] hover:underline"
              >
                {copiedKey === 'env' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'env' ? 'Copied' : 'Copy Variables'}</span>
              </button>
            </div>
            <p>
              To receive project enquiries in your real inbox, sign up for a free account at{' '}
              <a
                href="https://resend.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#D6F36A] hover:underline inline-flex items-center gap-0.5"
              >
                resend.com <ExternalLink className="w-3 h-3" />
              </a>
              , generate an API key, and configure these variables in your deployment environment:
            </p>
            <pre className="p-4 bg-[#11130F] border border-[#272B22] rounded-lg font-mono text-[11px] text-[#F5F3ED] overflow-x-auto select-all">
              {envSnippet}
            </pre>
            <p className="text-[11px]">
              <em>Note:</em> In development or preview mode without these keys, submissions are safely validated and acknowledged with a clear configuration message rather than failing or faking delivery.
            </p>
          </div>

          {/* Step 2: Deploying to Vercel */}
          <div className="space-y-3 pt-4 border-t border-[#272B22]">
            <h4 className="text-sm font-bold text-[#F5F3ED] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D6F36A]" />
              <span>2. Deploying to Vercel (Free *.vercel.app Domain)</span>
            </h4>
            <ol className="space-y-2 list-decimal list-inside pl-1 text-[#F5F3ED]/85">
              <li>
                <strong>Push to GitHub:</strong> Commit this repository to your GitHub account.
              </li>
              <li>
                <strong>Import to Vercel:</strong> Visit <span className="text-[#D6F36A]">vercel.com/new</span> and select your repository.
              </li>
              <li>
                <strong>Framework Preset:</strong> Choose <strong>Vite</strong>. Build command is <code className="text-[#D6F36A] font-mono">npm run build</code>, and output directory is <code className="text-[#D6F36A] font-mono">dist</code>.
              </li>
              <li>
                <strong>Environment Variables:</strong> Paste the Resend variables above into Vercel Settings &gt; Environment Variables.
              </li>
              <li>
                <strong>Deploy:</strong> Vercel will build and assign you a free production URL (e.g., <code className="text-[#D6F36A] font-mono">https://vareno-xyz.vercel.app</code>). No purchased custom domain is required!
              </li>
            </ol>
          </div>

          {/* Step 3: Centralized Content */}
          <div className="space-y-3 pt-4 border-t border-[#272B22]">
            <h4 className="text-sm font-bold text-[#F5F3ED] flex items-center gap-2">
              <Server className="w-4 h-4 text-[#D6F36A]" />
              <span>3. Central Content &amp; Case Study Management</span>
            </h4>
            <p>
              To update your contact email, service descriptions, capabilities, or replace the illustrative concept studies with verified client case studies, edit the single centralized file:{' '}
              <code className="text-[#D6F36A] font-mono bg-[#11130F] px-1.5 py-0.5 rounded border border-[#272B22]">
                src/config/siteContent.ts
              </code>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#141611] px-6 py-4 border-t border-[#272B22] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded-md transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
