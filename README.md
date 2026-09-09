# Novixa — Software Engineering & Digital Products

Novixa (نوڤيكسا) is a modern software engineering and digital products company serving enterprise clients across the Middle East and GCC. This repository contains the official company platform engineered with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**, delivering high-concurrency architectures, bilingual Arabic (RTL) / English (LTR) parity, and comprehensive SEO optimization.

---

## 1. Technology Stack

- **Framework**: Next.js 15.5 (App Router, Static Site Generation [SSG] & Server Components)
- **UI & Runtime**: React 19, TypeScript 5.8, Lucide React Icons, Motion (Framer Motion)
- **Styling**: Tailwind CSS v4, Architectural Precision dark-only design system
- **Typography**: `next/font/google` (Alexandria for display headings, IBM Plex Sans Arabic for Arabic body, Inter for English body)
- **Email Engine**: Resend API (`resend`) via Next.js Route Handler `POST /api/contact` with XSS sanitization and fallback logging
- **SEO & Social**: Dynamic Open Graph generation (`next/og`), JSON-LD structured organization schemas, multi-language `sitemap.xml` (65 routes), and crawler `robots.txt`
- **Security**: Strict-Transport-Security (HSTS), X-Content-Type-Options, X-Frame-Options, Permissions-Policy, Referrer-Policy

---

## 2. Directory Structure & Architecture

```
├── DEPLOYMENT_GUIDE.md                    # Turnkey deployment operations manual
├── Dockerfile                             # Multi-stage production container
├── NOVIXA_PRODUCTION_AND_DEPLOYMENT_REPORT.md # Comprehensive production audit report
├── docs/                                  # Engineering & brand documentation
│   ├── DESIGN_SYSTEM.md                   # Design tokens, color palette, anti-AI guidelines
│   ├── LAUNCH_READINESS_REPORT.md         # Production readiness audit & route verification
│   ├── LAUNCH_IMPROVEMENT_PLAN.md         # Priority task tracking (P0-P3)
│   ├── IMPLEMENTATION_PROGRESS.md         # Milestone progress log
│   └── DESIGN_AND_ARCHITECTURE_DECISIONS.md # Architectural decisions & rationale
├── public/                                # Static public assets
│   ├── icon.svg                           # Brand SVG favicon
│   └── assets/                            # Brand assets and graphics
├── src/
│   ├── app/
│   │   ├── [lang]/                        # Localized bilingual route tree (ar/en)
│   │   │   ├── page.tsx                   # Streamlined Homepage (Hero, Services, Work, CTA)
│   │   │   ├── team/                      # Engineering Core & Leadership team page
│   │   │   ├── contact/                   # Dual-column interactive contact & advisory page
│   │   │   ├── solutions/                 # Solutions & services catalogue
│   │   │   ├── products/                  # Digital products directory & [slug] pages
│   │   │   ├── industries/                # Vertical industry solutions & [slug] pages
│   │   │   ├── work/                      # Selected work & architectural case studies
│   │   │   ├── about/                     # About Novixa, values, leadership, trajectory
│   │   │   ├── insights/                  # Engineering lab articles & [slug] reader
│   │   │   └── start-project/             # Architectural discovery wizard
│   │   ├── api/contact/route.ts           # Resend email contact API endpoint
│   │   ├── fonts.ts                       # Google Fonts optimization via next/font
│   │   ├── globals.css                    # Tailwind CSS v4 design tokens & utilities
│   │   ├── layout.tsx                     # Root layout, inline SVG favicon & font variables
│   │   ├── opengraph-image.tsx            # Dynamic 1200x630 OG social preview generator
│   │   ├── robots.ts                      # Search engine crawl directives (/admin & /api/ disallowed)
│   │   └── sitemap.ts                     # Dynamic multi-language sitemap (65 routes)
│   ├── components/
│   │   ├── common/                        # CommandMenu (Cmd+K global search)
│   │   ├── layout/                        # Navbar (Header), Footer with social channels
│   │   ├── sections/                      # Section components (Hero, ServicesSummary, CaseStudies, etc.)
│   │   ├── ui/                            # Logo (3D isometric cube/hexagon SVG), Skeleton
│   │   ├── TeamCard.tsx                   # Interactive motion team member card
│   │   └── views/                         # Route view wrappers
│   ├── content/data.ts                    # Bilingual structured content catalogue
│   ├── context/LanguageContext.tsx        # Arabic / English language state provider
│   ├── data/                              # Centralized Data Layer
│   │   ├── navigation.ts                  # Header, footer, and social media links
│   │   ├── services.ts                    # Specialized engineering services catalog
│   │   └── team.ts                        # Engineering team members repository
│   └── lib/                               # Environment & metadata utility helpers
```

---

## 3. Getting Started

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (redirects permanently to `/ar`).

### Production Validation & Build
```bash
npm run typecheck    # Run TypeScript checks (0 errors)
npm run build        # Build all 65 static pages & routes for production
npm run start        # Start the production server locally
```

---

## 4. Environment Variables

Create `.env.local` for local development (see `.env.example`):
```env
NEXT_PUBLIC_SITE_URL=https://novixa.dev
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=notifications@novixa.dev
NOVIXA_CONTACT_EMAIL=hello@novixa.dev
```
*Note: If `RESEND_API_KEY` is omitted in development, contact submissions will be safely logged to the console without breaking runtime flows.*

---

## 5. Deployment Options

Refer to [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for step-by-step instructions.

### Option A: Vercel (Recommended)
1. Import repository into Vercel.
2. Preset: **Next.js**.
3. Add Environment Variables (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, etc.).
4. Click **Deploy**.

### Option B: Docker Container
```bash
docker build -t novixa-web:latest .
docker run -d --name novixa-app -p 3000:3000 --env-file .env.local novixa-web:latest
```

### Option C: Linux VPS (PM2 & Nginx)
```bash
npm ci
npm run build
pm2 start npm --name "novixa-web" -- start -- -p 3000
```

---

## 6. Documentation & Audits

- [`NOVIXA_PRODUCTION_AND_DEPLOYMENT_REPORT.md`](./NOVIXA_PRODUCTION_AND_DEPLOYMENT_REPORT.md) — Comprehensive production readiness & security audit
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) — Production operations & deployment manual
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — Design tokens & typography rules
- [`docs/LAUNCH_READINESS_REPORT.md`](./docs/LAUNCH_READINESS_REPORT.md) — Route verification & checks

---

## 7. License & Copyright

© 2026 Novixa (نوڤيكسا). All rights reserved.
