# Novixa — Software Engineering & Digital Products

Novixa (نوڤيكسا) is a modern software engineering and digital products company. This repository contains the official Next.js 15 App Router company website, designed and engineered with high-performance architectures, bilingual Arabic (RTL) / English (LTR) experiences, and full SEO optimization.

---

## 1. Technology Stack

- **Framework**: Next.js 15 (App Router, SSG & SSR)
- **UI & Components**: React 19, TypeScript, Lucide Icons, Motion (Framer Motion)
- **Styling**: Tailwind CSS v4, custom Precision Engineering design system
- **Typography**: `next/font/google` (Alexandria for display headings, IBM Plex Sans Arabic for Arabic body, Inter for English body)
- **Email Service**: Resend API (`resend`) via Next.js Route Handler `POST /api/contact`
- **SEO & Social**: Dynamic Open Graph generation (`next/og`), JSON-LD structured schemas, dynamic multi-language `sitemap.xml`, and `robots.txt`

---

## 2. Directory Structure

```
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
│   │   ├── [lang]/                        # Localized route tree (ar/en)
│   │   │   ├── page.tsx                   # Homepage (Hero, Transformation, Trajectory, etc.)
│   │   │   ├── solutions/                 # Solutions catalogue
│   │   │   ├── products/                  # Digital products directory & [slug] pages
│   │   │   ├── industries/                # Vertical industry solutions & [slug] pages
│   │   │   ├── work/                      # Selected work & architectural case studies
│   │   │   ├── about/                     # About Novixa, values, leadership, trajectory
│   │   │   ├── insights/                  # Engineering lab articles & [slug] reader
│   │   │   └── start-project/             # Architectural discovery wizard
│   │   ├── api/contact/route.ts           # Resend email contact API endpoint
│   │   ├── fonts.ts                       # Google Fonts optimization via next/font
│   │   ├── globals.css                    # Tailwind CSS v4 design tokens & utilities
│   │   ├── layout.tsx                     # Root layout & font variables
│   │   ├── opengraph-image.tsx            # Dynamic 1200x630 OG social preview generator
│   │   ├── robots.ts                      # Search engine crawl directives
│   │   └── sitemap.ts                     # Dynamic multi-language sitemap (57 routes)
│   ├── components/
│   │   ├── common/                        # CommandMenu (Cmd+K global search)
│   │   ├── layout/                        # Navbar, Footer
│   │   ├── sections/                      # Section components (Hero, GrowthStory, etc.)
│   │   ├── ui/                            # Logo, Skeleton
│   │   └── views/                         # Route view wrappers
│   ├── content/data.ts                    # Bilingual structured data catalogue
│   ├── context/LanguageContext.tsx        # Arabic / English language state provider
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
Open [http://localhost:3000](http://localhost:3000) (redirects to `/ar`).

### Production Build & Test
```bash
npm run typecheck    # Run TypeScript checks (0 errors)
npm run build        # Build all 57 static pages for production
npm run start        # Start the production server locally
```

---

## 4. Environment Variables

Create `.env.local` for local development:
```env
NEXT_PUBLIC_SITE_URL=https://novixa.dev
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
NOVIXA_CONTACT_EMAIL=hello@novixa.dev
```
*Note: If `RESEND_API_KEY` is omitted in development, contact submissions will be logged safely to the server console.*

---

## 5. Deployment

Deploy easily to **Vercel** or any standard Node.js/Docker hosting:
1. Connect repository on Vercel.
2. Framework preset: **Next.js**.
3. Configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `NOVIXA_CONTACT_EMAIL` in Environment Variables.
4. Deploy!

---

## 6. License & Copyright

© 2026 Novixa (نوڤيكسا). All rights reserved.
