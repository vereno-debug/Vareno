export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  problemSolved: string;
  typicalDeliverables: string[];
  timelineGuide: string;
  idealFor: string;
}

export interface ConceptStudy {
  id: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  businessScenario: string;
  userNeed: string;
  designConsiderations: string[];
  intendedJourney: string[];
  keyFeatures: string[];
  prototypeData: {
    heroHeadline: string;
    heroSubhead: string;
    metricsOrPillars: { label: string; value: string }[];
    sampleItems: { name: string; detail: string; tag: string }[];
  };
}

export interface AgencyEngagement {
  title: string;
  description: string;
  turnaroundNote: string;
  deliverableScope: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  keyActivities: string[];
}

export interface CapabilityGroup {
  area: string;
  description: string;
  competencies: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

import { getSiteUrl } from '../utils/siteUrl';

export const SITE_CONFIG = {
  brand: {
    name: "VARENO",
    tagline: "Web experiences built to move your business forward.",
    category: "Full-Stack Web Development & Digital Product Delivery",
    foundedNote: "Independent Technical Studio",
    siteUrl: getSiteUrl(),
    // Configurable contact details
    contactEmail: "varenowebdesignstudio@gmail.com",
    officeHours: "Monday – Friday, 9:00 AM – 6:00 PM (UTC/GMT)",
    responseTimeGoal: "Within 1 business day",
    locationNote: "Operating remotely with clients and agency partners worldwide",
  },

  hero: {
    eyebrow: "VARENO / FULL-STACK WEB DEVELOPMENT",
    headline: "Web experiences built to move your business forward.",
    supportingText:
      "I build thoughtful websites, landing pages and web applications for growing businesses and digital agencies that need clear thinking, dependable development and delivery they can trust.",
    primaryCta: "Discuss a Project",
    secondaryCta: "Explore Selected Work",
    agencyCta: "Discuss an Agency Partnership",
    supportingLine: "Business-focused development. Clear scope. Careful execution.",
  },

  businessValue: [
    {
      title: "Clear Information Architecture",
      subtitle: "Purpose-Driven User Journeys",
      description:
        "Every page and section is structured around what the visitor needs to understand and what action they should take next, removing friction between curiosity and enquiry.",
      focalOutcome: "Lower bounce rates & qualified inquiries",
    },
    {
      title: "Responsive, Accessible Layouts",
      subtitle: "Flawless Multi-Device Usability",
      description:
        "Interfaces engineered for high legibility, strict contrast standards, fast loading on mobile networks, and natural thumb-friendly navigation across all viewport widths.",
      focalOutcome: "Consistent experience on mobile, tablet & desktop",
    },
    {
      title: "Useful Functionality & Integrations",
      subtitle: "Server Logic That Serves Business Needs",
      description:
        "From validated multi-step enquiry flows and email routing to third-party APIs and content stores, functionality is selected to solve real operational bottlenecks.",
      focalOutcome: "Reduced manual administration & automated delivery",
    },
    {
      title: "Maintainable Code & Disciplined Testing",
      subtitle: "Built to Last & Easy to Hand Over",
      description:
        "Clean, documented TypeScript and modular component architecture. Rigorously tested across browsers and devices so teams can maintain or extend the site with confidence.",
      focalOutcome: "Zero lock-in & predictable maintenance costs",
    },
  ],

  services: [
    {
      id: "business-websites",
      title: "Business Website Development",
      category: "Direct Client Builds",
      description:
        "Responsive, high-converting websites designed to communicate your core commercial offer, establish trust immediately, and guide qualified prospects to enquire.",
      problemSolved:
        "Replaces outdated, sluggish, or confusing company websites with a fast, modern digital presence that accurately reflects your business caliber.",
      typicalDeliverables: [
        "Structured home, services, about, and conversion pages",
        "Responsive design tested across mobile, tablet, and desktop",
        "Validated lead enquiry forms with email and CRM notification",
        "On-page technical SEO, metadata, sitemaps, and Schema markup",
      ],
      timelineGuide: "Typically 3–5 weeks depending on scope and content readiness",
      idealFor: "Professional service firms, B2B consultancies, technical suppliers",
    },
    {
      id: "landing-pages",
      title: "Landing Page Development",
      category: "Campaigns & Offers",
      description:
        "Focused, high-impact landing pages built around a specific product, promotional campaign, paid traffic funnel, or regional service launch.",
      problemSolved:
        "Eliminates ad spend waste caused by directing traffic to generic homepages with competing links, unclear hierarchy, or slow load times.",
      typicalDeliverables: [
        "Single-objective conversion funnel layout",
        "Lightweight asset payload optimized for sub-second mobile loading",
        "Deep integration with tracking pixels, tag managers, and webhook leads",
        "A/B test-ready component architecture",
      ],
      timelineGuide: "Typically 1–2 weeks from final copy to deployment",
      idealFor: "Paid media campaigns, product launches, event registrations",
    },
    {
      id: "full-stack-apps",
      title: "Full-Stack Web Development",
      category: "Applications & Portals",
      description:
        "Front-end user interfaces backed by robust server-side logic, secure data handling, relational or document storage, and third-party API connectivity.",
      problemSolved:
        "Bridges the gap between static marketing websites and custom internal portals, client dashboards, or authenticated workflow tools.",
      typicalDeliverables: [
        "Modular React/TypeScript frontend with state management",
        "Secure serverless or Node.js route handlers with input sanitization",
        "API integration (Stripe, Resend, CRM webhooks, headless CMS)",
        "Automated deployment pipeline and staging preview environments",
      ],
      timelineGuide: "Scoping phase determines iterative milestone delivery",
      idealFor: "SaaS platforms, client portals, custom calculators, internal tools",
    },
    {
      id: "ecommerce-development",
      title: "E-commerce Development",
      category: "Storefronts & Catalogues",
      description:
        "Considered storefront improvements, curated catalogue displays, and shopping experiences engineered around speed, clarity, and mobile basket completion.",
      problemSolved:
        "Resolves cumbersome multi-step checkouts, unstyled product grids, and bloated theme code that slows customer journeys.",
      typicalDeliverables: [
        "Responsive product card grids and detailed showcase pages",
        "Accessible cart slide-outs and transparent order summaries",
        "Payment gateway integration (Stripe, Shopify Storefront API)",
        "Stock and variant selection with immediate tactile feedback",
      ],
      timelineGuide: "Typically 3–6 weeks depending on product catalogue depth",
      idealFor: "Boutique consumer brands, direct-to-consumer goods, digital downloads",
    },
    {
      id: "website-fixes",
      title: "Website Fixes & Improvements",
      category: "Targeted Remediation",
      description:
        "Precision troubleshooting for broken layouts, unresponsive navigation, failed form submissions, mobile usability bugs, and core web vital deficiencies.",
      problemSolved:
        "Quickly resolves urgent technical problems without the expense or delay of commissioning an entirely new website build.",
      typicalDeliverables: [
        "Diagnostic review identifying root cause of layout or script failure",
        "Targeted code patch and cross-browser regression testing",
        "Form submission verification and delivery logging",
        "Speed optimization report detailing payload reduction",
      ],
      timelineGuide: "Typically 2–5 business days under rapid scope agreement",
      idealFor: "Existing sites suffering from broken forms, mobile glitches, or slow speed",
    },
    {
      id: "agency-support",
      title: "Agency Development Support",
      category: "White-Label & Overflow",
      description:
        "Project-based technical execution for design, SEO, and performance marketing agencies requiring reliable external front-end and full-stack development capacity.",
      problemSolved:
        "Prevents agencies from turning down profitable client engagements or risking delivery delays when internal engineering bandwidth is constrained.",
      typicalDeliverables: [
        "Pixel-faithful implementation of Figma/Sketch design systems",
        "Clean, semantic markup optimized for the agency's SEO strategy",
        "White-label or direct technical partner representation",
        "Structured handover repository with clean documentation",
      ],
      timelineGuide: "Aligned strictly with agency client milestone schedules",
      idealFor: "Creative directors, SEO agency owners, digital marketing agencies",
    },
    {
      id: "ongoing-maintenance",
      title: "Ongoing Maintenance & Retainers",
      category: "Continuous Care",
      description:
        "Agreed technical care, regular dependency updates, security auditing, uptime checks, and small incremental feature enhancements under a predictable monthly scope.",
      problemSolved:
        "Guarantees your website remains secure, fast, and operational over time without relying on ad-hoc emergency troubleshooting.",
      typicalDeliverables: [
        "Scheduled library and dependency vulnerability patches",
        "Automated uptime and form delivery sanity checks",
        "Reserved monthly hours for content updates and minor features",
        "Priority email and ticket support with agreed SLAs",
      ],
      timelineGuide: "Monthly rolling agreement with 30-day notice period",
      idealFor: "Businesses requiring peace of mind and proactive site management",
    },
  ],

  conceptStudies: [
    {
      id: "northline-services",
      title: "Northline Services",
      tagline: "Commercial HVAC & Mechanical Systems",
      category: "Local Service Business / Lead Generation",
      badge: "ILLUSTRATIVE CONCEPT STUDY",
      businessScenario:
        "Explores a high-trust digital lead generation website for a regional commercial HVAC contractor. The business needed to separate urgent emergency dispatch from scheduled preventative maintenance bids while demonstrating technical certifications and commercial capacity.",
      userNeed:
        "Facility managers and property operators need rapid emergency contact details on mobile, transparent commercial service tiers, and a friction-free 3-step quote request system.",
      designConsiderations: [
        "High-contrast industrial typographic hierarchy for outdoor/field visibility",
        "Dual triage path: Urgent 24/7 service vs. planned commercial contracts",
        "Accessible touch targets for mobile inspection crews",
        "Prominent verified licensing and compliance trust cues",
      ],
      intendedJourney: [
        "1. Rapid Hero Triage: Select emergency repair or scheduled contract",
        "2. Service Scope Review: Technical specifications and compliance proof",
        "3. Step-by-Step Quote Estimator: Floor area, system type, service timeline",
        "4. Submission Confirmation: Immediate reference code and callback window",
      ],
      keyFeatures: [
        "Dual-action emergency hotline & scheduled booking switch",
        "Interactive HVAC scope and maintenance tier estimator",
        "Modular service cards with response-time SLAs",
        "Mobile-first sticky contact bar with tap-to-call",
      ],
      prototypeData: {
        heroHeadline: "Precision Climate Control for Commercial Facilities",
        heroSubhead:
          "24/7 critical response and planned mechanical maintenance for industrial warehouses, data centers, and multi-tenant offices.",
        metricsOrPillars: [
          { label: "Critical Response", value: "< 2 Hours" },
          { label: "Active Facilities", value: "140+ Sites" },
          { label: "EPA Certified", value: "Universal" },
          { label: "First-Visit Resolution", value: "94%" },
        ],
        sampleItems: [
          { name: "Emergency Chiller Repair", detail: "24/7 rapid dispatch for critical cooling loss", tag: "Emergency" },
          { name: "Preventative Maintenance", detail: "Quarterly filter, coil, and diagnostic service", tag: "Contract" },
          { name: "Building Automation (BMS)", detail: "Energy optimization and sensor telemetry retrofits", tag: "Engineering" },
        ],
      },
    },
    {
      id: "ledgerly",
      title: "Ledgerly",
      tagline: "Cashflow Intelligence for Service Agencies",
      category: "B2B Software Product & SaaS",
      badge: "ILLUSTRATIVE CONCEPT STUDY",
      businessScenario:
        "Explores a modern product marketing website for a specialized financial analytics tool aimed at design and digital agencies. The core objective is explaining complex invoice forecasting simply and driving qualified product demo requests.",
      userNeed:
        "Agency founders and financial directors need to see immediate evidence of real product workflows—not vague SaaS slogans—before booking a 20-minute product demonstration.",
      designConsiderations: [
        "High-fidelity interactive UI simulator showing realistic revenue curves",
        "Structured capability matrices comparing legacy spreadsheets with automated telemetry",
        "Clean, distraction-free demo booking journey with calendar integration cues",
        "Restrained dark-mode interface reflecting financial precision",
      ],
      intendedJourney: [
        "1. Concrete Value Proposition: Know your agency's cash runway in 3 clicks",
        "2. Interactive UI Sandbox: Toggle between Revenue Forecast and Invoice Aging",
        "3. Integration Architecture: Showcase bi-directional sync with Stripe & QuickBooks",
        "4. Demo Qualification: Collect agency headcount, billing software, and contact info",
      ],
      keyFeatures: [
        "Interactive dashboard sandbox with simulated cashflow forecasts",
        "Dynamic feature comparison tabs (Forecasting vs. Retainers vs. Payroll)",
        "Instant sample ROI calculator based on agency headcount",
        "Direct demo booking form with qualification criteria",
      ],
      prototypeData: {
        heroHeadline: "Never Wonder About Your Agency's 90-Day Runway Again",
        heroSubhead:
          "Automated cashflow forecasting, retainer realization, and contractor cost tracking engineered specifically for creative and digital studios.",
        metricsOrPillars: [
          { label: "Forecast Accuracy", value: "98.4%" },
          { label: "Sync Latency", value: "Real-time" },
          { label: "Time Saved/Mo", value: "18 Hours" },
          { label: "Data Encryption", value: "AES-256" },
        ],
        sampleItems: [
          { name: "Projected 90-Day Inflow", detail: "$184,200 (14 active client retainers)", tag: "Forecast" },
          { name: "Pending Invoices (>30 Days)", detail: "$22,450 across 3 accounts", tag: "Overdue" },
          { name: "Reserved Payroll Buffer", detail: "3.2 months of fixed team overhead", tag: "Safe" },
        ],
      },
    },
    {
      id: "form-and-field",
      title: "Form & Field",
      tagline: "Architectural Objects & Modular Ceramics",
      category: "E-Commerce & Digital Storefront",
      badge: "ILLUSTRATIVE CONCEPT STUDY",
      businessScenario:
        "Explores an artisanal e-commerce storefront for a design studio producing limited-run stoneware and architectural tabletop pieces. Focuses on tactile material storytelling, coherent product hierarchy, and effortless bag management.",
      userNeed:
        "Discerning buyers want to inspect material provenance, dimensions, and glazes quickly, with a frictionless bag slide-out and zero checkout distraction.",
      designConsiderations: [
        "Warm ivory canvas (#F5F3ED) highlighting organic terracotta and basalt textures",
        "Tactile swatch and finish selectors with instant photo switching",
        "Transparent shipping notes and edition run metadata",
        "Zero-clutter shopping bag drawer with subtotal calculations",
      ],
      intendedJourney: [
        "1. Editorial Drop Introduction: The Spring Architectural Vessels Series",
        "2. Interactive Product Grid: Filter by Material, Scale, and Availability",
        "3. Material Inspection: Detailed dimension diagrams, weight, and glaze origin",
        "4. Bag Drawer: Seamless review with instant shipping estimate calculation",
      ],
      keyFeatures: [
        "Interactive product card with finish switcher and edition status",
        "Slide-out shopping bag simulator with quantity adjustments",
        "Material provenance drawer detailing studio clay composition",
        "Responsive grid transitioning from 1-column mobile to 3-column desktop",
      ],
      prototypeData: {
        heroHeadline: "Architectural Vessels Engineered for Daily Ritual",
        heroSubhead:
          "Wheel-thrown stoneware and hand-finished basalt objects produced in numbered studio batches of 50.",
        metricsOrPillars: [
          { label: "Studio Edition", value: "Batch 04" },
          { label: "Firing Temp", value: "1,280°C" },
          { label: "Glaze Formula", value: "Mineral Matte" },
          { label: "Packaging", value: "100% Recycled" },
        ],
        sampleItems: [
          { name: "Column Vessel No. 03", detail: "Smoked basalt stoneware, 32cm height", tag: "$145 · In Stock" },
          { name: "Pedestal Catchall", detail: "Raw chamotte clay with chalk interior glaze", tag: "$85 · Low Stock" },
          { name: "Modular Planter Duo", detail: "Stackable terracotta with internal reservoir", tag: "$120 · In Stock" },
        ],
      },
    },
  ],

  agencyPartnership: {
    heading: "Extend your development capacity without adding permanent headcount.",
    subheading:
      "When a client project requires a new landing page, website build or defined technical improvement, VARENO can be considered as an external development partner. The fit, scope, timeline and responsibilities are agreed before work begins.",
    advantages: [
      {
        title: "Predictable Project Scopes",
        description:
          "Clear written proposals with defined milestone deliverables, zero surprise billing, and explicit boundaries so your agency margins remain protected.",
      },
      {
        title: "Clean, Documented Code",
        description:
          "Modern TypeScript, semantic HTML, and well-structured CSS that your internal team or client can easily maintain or extend in the future.",
      },
      {
        title: "Flexible Representation",
        description:
          "Available as a seamless white-label technical contractor behind your agency brand, or as an introduced engineering specialist in client meetings.",
      },
      {
        title: "Respect for Agency Deadlines",
        description:
          "We treat launch dates with professional rigor. Proactive communication, weekly staging updates, and immediate escalation of blockers.",
      },
    ],
    engagementModels: [
      {
        title: "Defined One-Off Website Build",
        description:
          "Turnkey development of an approved client design (Figma/Sketch) into a fully responsive, tested, and deployed website.",
        turnaroundNote: "Typically 3–5 weeks",
        deliverableScope: "Full frontend implementation, CMS/API hooks, cross-browser QA, and Vercel/Netlify launch.",
      },
      {
        title: "Landing Page or Campaign Microsite",
        description:
          "High-speed build of focused conversion pages for marketing campaigns, paid ad pushes, or regional promotions.",
        turnaroundNote: "Typically 1–2 weeks",
        deliverableScope: "Lightweight build, tracking pixel integration, form webhook routing, and sub-second load times.",
      },
      {
        title: "Specific Technical Improvement",
        description:
          "Targeted engineering intervention to solve a difficult client problem: mobile layout bugs, form failures, speed issues, or custom API logic.",
        turnaroundNote: "Typically 3–7 business days",
        deliverableScope: "Diagnostic audit, localized code patch, staging verification, and pull request review.",
      },
      {
        title: "Overflow Development Capacity",
        description:
          "Reserved sprint blocks during peak agency periods to absorb sudden spikes in client work without hiring permanent employees.",
        turnaroundNote: "Scheduled by sprint or weekly block",
        deliverableScope: "Dedicated engineering hours allocated under the agency project manager's task backlog.",
      },
    ],
    ctaText: "Discuss an Agency Partnership",
  },

  workingProcess: [
    {
      number: "01",
      title: "Discover",
      summary: "Understand the business, target users, requirement, constraints and intended outcome.",
      keyActivities: [
        "In-depth review of business objectives, user audience, and brand positioning",
        "Audit of existing technical stack, content assets, and external integrations",
        "Identification of technical constraints, target devices, and launch deadlines",
        "Alignment on primary conversion goals and success criteria",
      ],
    },
    {
      number: "02",
      title: "Define",
      summary: "Agree deliverables, assumptions, scope, timeline, responsibilities and commercial terms.",
      keyActivities: [
        "Itemized specification detailing included pages, features, and exclusions",
        "Technical architecture recommendation (framework, hosting, forms)",
        "Firm milestone schedule with review checkpoints and content deadlines",
        "Clear, binding commercial quotation with fixed or phased payments",
      ],
    },
    {
      number: "03",
      title: "Build",
      summary: "Design and implement the agreed experience while communicating progress and addressing relevant questions.",
      keyActivities: [
        "Component-driven frontend development using modern TypeScript and responsive CSS",
        "Server-side route implementation, secure form validation, and API wiring",
        "Private staging deployment updated regularly for transparent progress reviews",
        "Direct communication channel for prompt resolution of architectural questions",
      ],
    },
    {
      number: "04",
      title: "Test & Handover",
      summary: "Test important user journeys, supported devices and agreed functionality. Resolve agreed issues and provide an appropriate handover.",
      keyActivities: [
        "Cross-device and cross-browser visual and functional quality assurance",
        "Accessibility (WCAG AA) check, keyboard navigation, and contrast validation",
        "Form delivery sanity testing, error edge case simulation, and SSL verification",
        "Deployment to production hosting (e.g. Vercel) and repository/documentation handover",
      ],
    },
  ],

  technologyCapabilities: [
    {
      area: "Front-End Implementation",
      description: "Modern, component-driven user interfaces built with performance, accessibility, and responsiveness in mind.",
      competencies: [
        "TypeScript & JavaScript (ESNext)",
        "React & Modern Component Systems",
        "Tailwind CSS & Structured CSS Architectures",
        "Semantic, Accessible HTML5 (WCAG AA)",
        "Responsive Grid & Flexbox Layouts",
        "Subtle, Non-Blocking Micro-Interactions",
      ],
    },
    {
      area: "Back-End & Server-Side Development",
      description: "Clean server routes, serverless edge functions, and lightweight Node.js backends for data processing.",
      competencies: [
        "Node.js Runtime & Express Server Architecture",
        "Vercel Serverless Functions & API Route Handlers",
        "Server-Side Form Validation & Input Sanitization",
        "Transactional Email Delivery (Resend API / SMTP)",
        "Rate Limiting & Honeypot Anti-Spam Defenses",
        "Environment Variable Security Management",
      ],
    },
    {
      area: "API & Third-Party Integrations",
      description: "Connecting user interfaces with the external services your business relies on daily.",
      competencies: [
        "RESTful API Consumption & Error Handling",
        "Payment Processing (Stripe Checkout & Webhooks)",
        "Headless Content Stores & CMS Webhooks",
        "CRM & Lead Capture Endpoints",
        "Analytics, Event Tracking & Tag Managers",
      ],
    },
    {
      area: "Data Handling & Storage",
      description: "Structured data models, validation schemas, and secure transport between client and server.",
      competencies: [
        "JSON Schema & Strict TypeScript Type Contracts",
        "Client-Side State Synchronization",
        "Session Storage & Persistent Local State",
        "Document & Relational Database Integration (when required)",
        "Data Export (CSV/JSON) & Automated Reporting",
      ],
    },
    {
      area: "Responsive Interface Development",
      description: "Ensuring an identical high-standard experience across every screen size and input method.",
      competencies: [
        "Mobile-First Fluid Breakpoint Typography",
        "Touch-Friendly Target Sizes (minimum 44x44px)",
        "Orientation-Aware Form Layouts",
        "Cross-Browser Rendering (Chrome, Safari, Firefox, Edge)",
        "Dark Mode / High-Contrast Optical Compensation",
      ],
    },
    {
      area: "Testing, SEO & Deployment",
      description: "Disciplined pre-flight verification, search engine foundation, and reliable cloud hosting.",
      competencies: [
        "Vercel Cloud Deployment & Environment Promotion",
        "Technical SEO: Meta Tags, Open Graph, Sitemap & Robots.txt",
        "Schema.org Structured Data (JSON-LD)",
        "Performance Optimization & Asset Payload Trimming",
        "Git Version Control & Clean Branch Handover",
      ],
    },
  ],

  about: {
    heading: "A business-minded approach to website engineering.",
    paragraphs: [
      "VARENO was founded on a simple principle: a commercial website is an operational asset, not an abstract art experiment. While visual distinction is essential to capture attention, long-term commercial value is created through clear communication, intuitive user pathways, and dependable technical execution.",
      "Too many businesses find themselves caught between two extremes: heavyweight agencies with bloated overhead and slow delivery cycles, or low-cost page builders that produce bloated code, fragile layouts, and poor mobile experiences.",
      "VARENO occupies the middle ground: focused, high-caliber engineering delivered with direct, transparent communication. Every line of code is written to serve your agreed project scope, without unnecessary dependencies or unproven experimental gimmicks.",
    ],
    operatingPrinciples: [
      {
        title: "Direct Engineering Communication",
        description: "You work directly with the developer building your project, eliminating miscommunication through account layers.",
      },
      {
        title: "Transparent, Fixed Proposals",
        description: "Deliverables, exclusions, and payment milestones are agreed in writing before any development begins.",
      },
      {
        title: "No Artificial Vendor Lock-In",
        description: "You receive clean, documented source code deployed to standard platforms with complete administrative ownership.",
      },
      {
        title: "Commercial Purpose First",
        description: "Every layout, animation, and technical choice is evaluated against whether it helps your visitor understand and act.",
      },
    ],
  },

  faqs: [
    {
      question: "What kinds of websites and development projects does VARENO take on?",
      answer:
        "VARENO specializes in business websites, focused landing pages, custom full-stack web applications, boutique e-commerce storefronts, and targeted website fixes. We focus on projects where clean typography, fast performance, responsive layouts, and reliable functionality matter.",
      category: "Scope",
    },
    {
      question: "Does VARENO work with marketing agencies?",
      answer:
        "Yes, agency collaboration is a core part of our practice. We provide project-based or overflow development support for digital marketing, SEO, and design agencies that need reliable front-end and full-stack implementation capacity without adding full-time headcount. We can operate white-label or as an introduced technical partner.",
      category: "Agency",
    },
    {
      question: "Can VARENO improve or fix an existing website?",
      answer:
        "Yes. If your current website suffers from broken mobile layouts, failed form submissions, sluggish loading speeds, or outdated design, we can perform targeted remediation. We first conduct a rapid diagnostic review to confirm the root cause before agreeing to a fixed-scope repair.",
      category: "Scope",
    },
    {
      question: "How is a project priced?",
      answer:
        "Projects are typically priced as a fixed commercial quote based on a clearly agreed scope of deliverables, technical requirements, and timeline. Small fixes and focused landing pages generally range from $500 to $2,500, while multi-page business websites and custom web applications range upwards depending on complexity. We never charge surprise fees.",
      category: "Commercial",
    },
    {
      question: "How long does a website project take?",
      answer:
        "A focused landing page or technical repair is typically delivered within 1 to 2 weeks. A complete multi-page business website typically takes 3 to 5 weeks from scope sign-off and content readiness to final launch. Timelines are agreed upfront and tied to explicit milestone dates.",
      category: "Process",
    },
    {
      question: "What information is needed before work starts?",
      answer:
        "To provide an accurate proposal, we need an overview of your business, your target audience, the core goals of the website, any existing brand guidelines or content assets, and your ideal launch date. If you don't have all details finalized, we will guide you through our discovery process.",
      category: "Process",
    },
    {
      question: "Can a project start with a small, defined piece of work?",
      answer:
        "Absolutely. Many clients and agency partners begin with a single landing page, a technical audit, or a targeted UI improvement to experience our working style and delivery standard before committing to a larger engagement.",
      category: "Commercial",
    },
  ],

  enquiryForm: {
    projectTypes: [
      "Business website",
      "Landing page",
      "Full-stack web application",
      "E-commerce",
      "Website fix or improvement",
      "Agency partnership",
      "Ongoing maintenance",
      "Not sure yet",
    ],
    budgets: [
      "Under $500",
      "$500 to $1,000",
      "$1,000 to $2,500",
      "$2,500 to $5,000",
      "$5,000+",
      "Not sure yet",
    ],
    timelines: [
      "Urgent",
      "Within 2 to 4 weeks",
      "Within 1 to 2 months",
      "Flexible",
      "Not sure yet",
    ],
    contactMethods: [
      "Email (Default)",
      "Video call (Google Meet)",
      "Phone call",
    ],
  },
};
