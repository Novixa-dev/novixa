# Novixa — Software Engineering & Digital Products

Novixa (نوڤيكسا) is a modern software engineering and digital products company serving enterprise clients across the Middle East and GCC. This repository contains the official company platform engineered with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**, delivering high-concurrency architectures, bilingual Arabic (RTL) / English (LTR) parity, and comprehensive SEO optimization.

---

## 1. Technology Stack

- **Framework**: Next.js 15.5 (App Router, Static Site Generation [SSG] & Server Components)
- **UI & Runtime**: React 19, TypeScript 5.8, Lucide React Icons, Motion (Framer Motion)
- **Styling**: Tailwind CSS v4, Architectural Precision dark-only design system
- **Typography**: self-hosted via `next/font/local` — Alexandria (display), IBM Plex Sans Arabic (Arabic body), Inter (English body); no runtime Google Fonts request
- **Email Engine**: Resend API via `POST /api/contact` — honeypot, in-process rate limit, HTML escaping, and a truthful `delivered` flag when no provider is configured
- **Testing**: Vitest (94 unit tests) · Playwright + axe-core (144 browser tests across desktop, tablet and mobile) · ESLint 9 (0 errors, 0 warnings) · GitHub Actions
- **SEO & Social**: Dynamic Open Graph generation (`next/og`), JSON-LD structured organization schemas, multi-language `sitemap.xml` (92 URLs), and crawler `robots.txt`
- **Security**: Strict-Transport-Security (HSTS), X-Content-Type-Options, X-Frame-Options, Permissions-Policy, Referrer-Policy

---

## 2. Directory Structure & Architecture

```
├── AGENTS.md                              # Decisions that must not be re-derived
├── DEPLOYMENT_GUIDE.md                    # Turnkey deployment operations manual
├── Dockerfile                             # Multi-stage production container
├── docs/                                  # Engineering documentation (see §6)
│   ├── PRODUCTION_AUDIT.md                # Every defect found, its evidence, its fix
│   ├── IMPLEMENTATION_PLAN.md             # What landed, what remains, and why
│   ├── QA_RELEASE_CHECKLIST.md            # What is automated, what needs a person
│   ├── AI_WORKING_RULES.md                # How work is picked up, proven, handed over
│   ├── COMPETITIVE_BENCHMARK.md           # The reference templates, with a verdict each
│   └── archive/                           # Superseded reports, kept for history
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

### Validation

```bash
npm run verify       # typecheck → lint → unit tests → build → browser tests
```

Or individually:

```bash
npm run typecheck    # TypeScript, strict
npm run lint         # ESLint 9 (flat config)
npm run test         # Vitest — content integrity, URL resolution, sitemap/route drift
npm run build        # 106 pages, 92 indexable URLs across both locales
npm run test:e2e     # Playwright — desktop, tablet, mobile
npm run start        # Serve the production build locally
```

`test:e2e` starts its own production server and always starts a fresh one; see
`docs/QA_RELEASE_CHECKLIST.md` §7 for why that is not negotiable.

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

## 6. Documentation

Four documents are kept in step with the code. Read them in this order:

- [`AGENTS.md`](./AGENTS.md) — visual identity, RTL rules and the content rules. Decisions that must not be re-derived
- [`docs/PRODUCTION_AUDIT.md`](./docs/PRODUCTION_AUDIT.md) — current architecture, every defect found, its evidence, and what was done about it
- [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md) — prioritised work, what has landed, what remains, and the reasoning behind the non-obvious calls
- [`docs/AI_WORKING_RULES.md`](./docs/AI_WORKING_RULES.md) — how work is picked up, measured, committed and handed over, and the failure each rule came from

Then, as needed:

- [`docs/QA_RELEASE_CHECKLIST.md`](./docs/QA_RELEASE_CHECKLIST.md) — what is verified automatically, what needs a person, and the release gate
- [`docs/COMPETITIVE_BENCHMARK.md`](./docs/COMPETITIVE_BENCHMARK.md) — the reference templates and themes, twenty features compared, a verdict and a reason for each
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) — deployment operations
- [`دليل-نوڤيكسا-الكامل.md`](./دليل-نوڤيكسا-الكامل.md) — the owner's guide, in Arabic: what the site is, every page, every number, and a step-by-step self-test script

The design system is **published rather than documented in markdown**: it lives
at `/{lang}/design-system`, generated from `src/content/design-system.ts`, which
imports the chart palette from the console's own module so the two cannot
disagree. A `docs/DESIGN_SYSTEM.md` existed and was archived because it had gone
stale in ways that actively misled — it described `glass-card` as carrying a
16px backdrop blur (removed, for measured reasons) and listed an indigo accent
that appears nowhere in the code and that `AGENTS.md` rules out.

Superseded reports are in [`docs/archive/`](./docs/archive/) for history. They
describe earlier states of the project and are not current.

---

## 7. License & Copyright

© 2026 Novixa (نوڤيكسا). All rights reserved.
