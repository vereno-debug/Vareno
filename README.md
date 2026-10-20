# VARENO — Full-Stack Web Development & Digital Product Studio

> Business-focused website development, custom web applications, and technical delivery partnerships for growing companies and digital marketing agencies.

---

## Brand Foundation & System

- **Brand Name**: VARENO
- **Palette**:
  - Graphite Black: `#11130F` (Dominant canvas & surfaces)
  - Warm Ivory: `#F5F3ED` (Primary text & contrast elements)
  - Restrained Lime: `#D6F36A` (Primary actions, subtle indicators, and highlights)
  - Supporting Greys: `#181B15`, `#20241C`, `#272B22`, `#9E9E94`
- **Typography**: Plus Jakarta Sans (Headlines and body prose) with JetBrains Mono (Tabular numerals, code, metrics).
- **Brand Mark**: Custom geometric architectural `V` vector mark with chamfered beams, deliberate negative space, and forward cantilever accent.

---

## Architecture Overview

VARENO is built with modern, maintainable technologies engineered for frictionless local development and zero-lock-in Vercel production deployment:

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide icons, responsive layout system.
- **Server-Side API**:
  - **Local Development**: Node.js & Express server (`server.ts`) mounting Vite in middleware mode on port 3000.
  - **Vercel Production**: Native Vercel Serverless Function under `/api/contact.ts` invoking the shared `src/server/contactHandler.ts` controller.
- **Form Delivery Service**: Resend API integration with server-side validation, length limits, anti-abuse in-memory rate limiting, and an anti-spam honeypot.
- **HonestPersuasion Standards**: Zero fabricated client names, reviews, or vanity outcome numbers. Portfolio entries are explicitly labelled as **Concept Studies** (`ILLUSTRATIVE CONCEPT STUDY`).

---

## Getting Started Locally

### 1. Prerequisites
- Node.js 18+ or Bun
- npm or pnpm or bun

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/vareno.git
cd vareno

# Install dependencies
npm install
```

### 3. Environment Variables Configuration Matrix

| Variable | Scope / Secret | Required in AI Studio Preview | Required in Vercel Production | Description & Configuration Location |
| :--- | :--- | :--- | :--- | :--- |
| `RESEND_API_KEY` | **Server-side Secret** (Never exposed to browser) | **Yes** (if sending real emails) | **Yes** | API key from Resend dashboard. In preview: `.env`. In production: Vercel Settings > Environment Variables. |
| `CONTACT_TO_EMAIL` | **Server-side Config** | **Yes** | **Yes** | Destination inbox (e.g. `varenowebdesignstudio@gmail.com`). In preview: `.env`. In production: Vercel Settings. |
| `CONTACT_FROM_EMAIL` | **Server-side Config** | **Optional** (defaults to `onboarding@resend.dev`) | **Yes** | Sending address. For testing / `@gmail.com` accounts, server uses `VARENO <onboarding@resend.dev>`. For production with custom domain, set to your verified sender (e.g. `enquiries@yourdomain.com`). |
| `SITE_URL` | **Server / Canonical** | **No** (safe runtime fallback to current request origin) | **Recommended** | Production site URL (e.g. `https://your-assigned-name.vercel.app`). Set in Vercel after deployment. |
| `VITE_SITE_URL` | **Client-side Public** | **No** (safe runtime fallback to `window.location.origin`) | **Recommended** | Injected into client metadata for OpenGraph/canonical tags once Vercel assigns your URL. |

Configure the following variables in `.env`:
```env
# 1. Resend API Key (Server-side secret, NEVER exposed in client bundles)
RESEND_API_KEY="re_your_api_key_here"

# 2. Receiving Email (Where client enquiries are delivered)
CONTACT_TO_EMAIL="varenowebdesignstudio@gmail.com"

# 3. Sending Address (Uses onboarding@resend.dev for test/gmail; verified domain in production)
CONTACT_FROM_EMAIL="varenowebdesignstudio@gmail.com"

# 4 & 5. Site URL (Optional in preview; uses runtime origin fallback)
SITE_URL=""
VITE_SITE_URL=""
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Running Production Build Check
```bash
npm run build
```

---

## Deploying to Vercel (Free *.vercel.app Domain)

No purchased custom domain is required for launch. Vercel automatically assigns a free, secure `*.vercel.app` subdomain with SSL.

### Step-by-Step Deployment:

1. **Commit & Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete VARENO website build"
   git push origin main
   ```

2. **Import Repository in Vercel**:
   - Navigate to [vercel.com/new](https://vercel.com/new).
   - Authorize GitHub and select your `vareno` repository.
   - **Framework Preset**: Select **Vite**.
   - **Root Directory**: `./` (Default).
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist`.

3. **Configure Environment Variables in Vercel**:
   In the Vercel Project Settings > **Environment Variables** panel, add:
   - `RESEND_API_KEY`: Your real Resend API key (from [resend.com/api-keys](https://resend.com/api-keys)).
   - `CONTACT_TO_EMAIL`: The email address where you want to receive project inquiries.
   - `CONTACT_FROM_EMAIL`: Your verified sending email or domain in Resend.
   - `SITE_URL`: Leave blank or set after initial deploy.

4. **Deploy**:
   - Click **Deploy**. Vercel will build the frontend assets and automatically wire `/api/contact.ts` as a serverless function.
   - Once deployed, Vercel will display your live URL (e.g., `https://vareno-omega.vercel.app`).

5. **Update Production Site URL**:
   - Copy your assigned Vercel URL.
   - In Vercel Project Settings > Environment Variables, set `SITE_URL` and `VITE_SITE_URL` to your assigned URL.
   - Update `sitemap.xml` and `index.html` canonical URLs with this address if desired.

---

## Centralized Content Configuration

All core copy, services, concept studies, capabilities, FAQs, and contact parameters are centralized in a single configuration file:

```
src/config/siteContent.ts
```

To update any content:
1. **Brand Details & Office Hours**: Edit `SITE_CONFIG.brand`.
2. **Services & Deliverables**: Edit `SITE_CONFIG.services`.
3. **Concept Studies**: Edit `SITE_CONFIG.conceptStudies` (or replace with real client case studies as you complete engagements).
4. **Agency Models**: Edit `SITE_CONFIG.agencyPartnership`.
5. **Technical Capabilities**: Edit `SITE_CONFIG.technologyCapabilities`.
6. **FAQs**: Edit `SITE_CONFIG.faqs`.

---

## Pre-Launch Verification Checklist

- [x] **Top Bar Contract**: Exactly 3 zones (Single-line brand wordmark + icon, 5 clean single-line nav links, 1 primary action button).
- [x] **Distinctive Logo**: Architectural geometric `V` vector symbol + precision kerning. Light, dark, and SVG favicon variants created.
- [x] **Honest Persuasion**: All 3 portfolio items explicitly labelled as **Concept Studies** (`ILLUSTRATIVE CONCEPT STUDY`). Zero fabricated reviews, fake client logos, or false conversion guarantees.
- [x] **Agency Pathway**: Dedicated agency partnership section explaining 4 engagement models and direct CTA pre-selecting the agency project type.
- [x] **Interactive Concept Sandboxes**: Live interactive prototypes for Northline Services (HVAC estimator & emergency triage), Ledgerly (agency cashflow & invoice aging sandbox), and Form & Field (artisan ceramic store & bag simulator).
- [x] **Server-Side Contact Form**: POST endpoint at `/api/contact` with email regex validation, minimum character length checks, honeypot anti-spam defense, abuse rate limiting, and Resend API forwarding.
- [x] **Unconfigured Safe State**: If Resend environment variables are missing, the server returns an honest notice explaining configuration requirements instead of falsely claiming an email was sent.
- [x] **Technical SEO & Standards**: Open Graph tags, Twitter cards, SVG favicon, robots.txt, sitemap.xml, Schema.org JSON-LD structured data, WCAG AA contrast, and reduced-motion support.

---

## License

MIT License. Designed and engineered for VARENO.
