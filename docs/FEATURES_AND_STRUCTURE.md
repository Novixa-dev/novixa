# 🧱 Features & Application Structure

## 1. Directory & File Inventory

```text
/src
├── App.tsx                        # Core Application Entry Point & Route Orchestrator
├── main.tsx                       # React DOM Root Mounting Script
├── index.css                      # Global Styles & Tailwind CSS Imports
├── types.ts                       # Shared TypeScript Interfaces & Data Contract
│
├── context/
│   └── LanguageContext.tsx        # Bilingual (Arabic/English) & RTL/LTR State Provider
│
├── content/
│   └── data.ts                    # Structured Static Data (Products, Solutions, Case Studies, etc.)
│
└── components/
    ├── layout/
    │   ├── Navbar.tsx             # Sticky Navigation Bar with Language Switcher & Mobile Menu
    │   └── Footer.tsx             # Site Footer with Links, Contact Brief, & Legal Info
    │
    ├── sections/                  # Modular Homepage Sections
    │   ├── HeroSection.tsx        # Impact Hero with Interactive Demo Cards
    │   ├── ProblemTransformation.tsx # Fragmented Systems -> Unified Platform Visualizer
    │   ├── WhatWeBuild.tsx        # Interactive Solution Categories Selector
    │   ├── IndustriesSection.tsx  # Domain-Specific Solutions Matrix (Restaurants, Healthcare, etc.)
    │   ├── ProductsSection.tsx    # B2B Digital SaaS Products Directory
    │   ├── PulseSection.tsx       # Embedded Interactive Novixa Pulse Feedback Demo Widget
    │   ├── CaseStudiesSection.tsx # Selected Case Studies Showcase & Metrics
    │   ├── ProcessSection.tsx     # 7-Stage Engineering Lifecycle Explorer
    │   ├── EngineeringSection.tsx # Tech Stack & Cloud Architecture Showcase
    │   ├── WhyNovixaSection.tsx   # Core Differentiators & Values
    │   ├── FounderSection.tsx     # Founder Vision & Engineering Philosophy
    │   ├── InsightsSection.tsx    # Technical Articles & Essay Reader
    │   └── ProjectDiscoveryWizard.tsx # 5-Step Interactive Lead Generation Wizard
    │
    └── views/                     # Full-page Dedicated Views
        ├── SolutionsView.tsx      # Solutions Catalogue with Category Filtering
        ├── IndustriesView.tsx     # Dedicated Industry Solutions Portal
        ├── ProductsView.tsx       # Dedicated Products Page with Embedded Pulse Widget
        ├── WorkView.tsx           # Complete Portfolio & Case Studies Gallery
        ├── AboutView.tsx          # Company Overview, Values, & Leadership
        ├── InsightsView.tsx       # Knowledge Hub & Full Article Library
        └── StartProjectView.tsx   # Dedicated Project Discovery Page
```

---

## 2. Core Views & Component Breakdown

### 2.1 Navigation & Header (`Navbar.tsx`)
- **Features:** Sticky backdrop blur navbar, responsive mobile menu drawer, bilingual toggle (العربية | English), primary CTA ("ابدأ مشروعك").
- **View Navigation:** Triggers client-side view changes with automatic smooth scroll to top.
- **RTL Behavior:** Logo sits on right (Arabic mode), CTA sits on left, nav items align seamlessly.

### 2.2 Homepage Sections

#### 1. HeroSection (`HeroSection.tsx`)
- **Headline:** "نبني التقنية التي تجعل أعمالك أقوى."
- **Key Elements:** Animated gradient pills, primary & secondary action buttons, floating UI product mockup badges showcasing real-time order feeds, booking statuses, and employee feedback counters.

#### 2. ProblemTransformation (`ProblemTransformation.tsx`)
- **Concept:** Demonstrates the shift from fragmented tools (WhatsApp, paper notes, Excel files, scattered databases) to a single, unified Novixa digital backend.
- **Interactivity:** Interactive transformation toggle letting visitors view the "Before (Friction)" vs. "After (Novixa Engine)" state.

#### 3. WhatWeBuild (`WhatWeBuild.tsx`)
- **Categories:** Business Platforms, SaaS Products, Digital Commerce, Booking Engines, Practical AI, Custom Systems.
- **Interactivity:** Clicking or hovering a category updates the technical feature list and visual spec preview.

#### 4. IndustriesSection (`IndustriesSection.tsx`)
- **Verticals Covered:** Restaurants & Cafes, Healthcare & Clinics, Retail & E-Commerce, Gaming & Entertainment, Hospitality & Hotels, Corporate B2B.
- **Details:** Displays domain-specific challenges, custom solution modules, and operational impact metrics.

#### 5. ProductsSection (`ProductsSection.tsx`) & PulseSection (`PulseSection.tsx`)
- **Showcased SaaS Products:**
  - **Novixa Restaurant:** Multi-branch POS & online ordering platform.
  - **Novixa Booking:** Automated appointment & reservation engine.
  - **Novixa Gaming:** Gaming center LAN room & console booking platform.
  - **Novixa Pulse:** Employee feedback & organizational health intelligence platform.
- **Interactive Pulse Widget:** A live embedded simulator where users can filter feedback categories (Morale, Bottlenecks, Ideas), view real-time sentiment distribution bars, and submit test feedback notes.

#### 6. CaseStudiesSection (`CaseStudiesSection.tsx`)
- **Showcased Work:** Black Spider Gaming Center, Al-Shifa Health Network, Express Logistics Hub.
- **Details:** Includes challenge statements, technical strategies, deployed stack, and measurable business results (+240% booking velocity, -65% wait times).

#### 7. ProcessSection (`ProcessSection.tsx`)
- **Lifecycle Stages:** 1) Understand -> 2) Plan -> 3) Design -> 4) Build -> 5) Test -> 6) Launch -> 7) Evolve.
- **Interactivity:** Interactive step-bar allowing visitors to click through each stage, view specific deliverables, and inspect customer benefits.

#### 8. EngineeringSection (`EngineeringSection.tsx`) & WhyNovixaSection (`WhyNovixaSection.tsx`)
- **Tech Stack Groups:** Frontend (React, Next.js, Tailwind), Backend (Node.js, Express, WebSockets), Cloud (Docker, Cloud Run, Edge CDN), Security (PostgreSQL, Firestore, SOC2 isolation).
- **Core Values:** Product-first mindset, problem-first analysis, built for scale, obsessive craft, lifetime SLA partnership.

#### 9. FounderSection (`FounderSection.tsx`) & InsightsSection (`InsightsSection.tsx`)
- **Founder Brief:** Sets out the engineering philosophy from leadership.
- **Insights Lab:** Displays technical articles on custom vs. SaaS trade-offs, multi-tenant database isolation, and practical AI implementations with an interactive full-screen article modal.

#### 10. ProjectDiscoveryWizard (`ProjectDiscoveryWizard.tsx`)
- **5-Step Form:**
  - Step 1: Project Type selection
  - Step 2: Business Sector selection
  - Step 3: Operational Problem description
  - Step 4: Existing System & Budget Range selection ($5k-$10k, $10k-$25k, $25k+)
  - Step 5: Contact Details & Proposal Brief submission summary card

---

## 3. State Management & Bilingual Engine

State management is anchored in `src/context/LanguageContext.tsx`:
- Provides `language` (`ar` | `en`), `isRtl` boolean, `toggleLanguage()`, and `t(arString, enString)` helper function.
- Automatically sets the document body's `dir` attribute (`rtl` for Arabic, `ltr` for English).
- Persists user language preference across session navigation.

```typescript
export interface LanguageContextType {
  language: Language;
  isRtl: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
}
```

---

## 4. Shared Data Contracts (`src/types.ts`)

- `Product`: Defines name, tagline, description, features array, status badge, metrics, and accent color.
- `SolutionCategory`: Defines slug, title, description, features list, business impact, and icon.
- `Industry`: Defines name, challenges list, solutions list, product modules list, and stats.
- `CaseStudy`: Defines client name, title, industry, challenge, strategy, solution, tech stack, and key metrics.
- `ProcessStep`: Defines step number, title, description, deliverable, and customer benefit.
- `InsightArticle`: Defines article ID, category, title, read time, date, content paragraphs array, and author details.
- `ProjectDiscoveryData`: Captures form input across all 5 steps of the project wizard.
- `ViewType`: Union type for view routing (`'home' | 'solutions' | 'industries' | 'products' | 'work' | 'about' | 'insights' | 'start'`).
