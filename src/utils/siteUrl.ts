/**
 * Safe site URL resolver for VARENO:
 * 1. Checks VITE_SITE_URL if configured (production).
 * 2. Falls back to window.location.origin in client runtime (e.g. AI Studio preview or Vercel).
 * 3. Never requires or assumes a hardcoded URL.
 */
export function getSiteUrl(): string {
  // Check client-injected Vite env variable
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) {
    const val = String(import.meta.env.VITE_SITE_URL).trim();
    if (val && !val.includes('your-app-name') && !val.includes('your-project')) {
      return val.replace(/\/$/, '');
    }
  }

  // Runtime browser origin fallback (always accurate for current deployment or preview)
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return '';
}
