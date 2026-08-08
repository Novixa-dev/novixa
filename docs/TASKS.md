# 📋 Actionable Tasks, Roadmap & Backlog

This document outlines completed milestones, immediate development tasks, and long-term engineering phases for the Novixa platform.

---

## 🟢 Phase 1: Core Frontend & RTL System (Completed)

- [x] Establish React 18 + Vite + TypeScript application workspace.
- [x] Configure Tailwind CSS with custom Novixa brand tokens (`#2563EB`, `#0F172A`, `#14B8A6`).
- [x] Implement bilingual `LanguageContext` supporting dynamic Arabic (RTL) and English (LTR) switching.
- [x] Build sticky `Navbar` with backdrop blur, language switcher, and mobile drawer.
- [x] Build `HeroSection` with geometric N animation and live product preview badges.
- [x] Build `ProblemTransformation` component visualising Fragmented Tools vs. Novixa Engine.
- [x] Build `WhatWeBuild` interactive solution category explorer.
- [x] Build `IndustriesSection` detailing custom modules for Restaurants, Healthcare, Gaming, etc.
- [x] Build `ProductsSection` and embedded interactive `PulseSection` feedback widget.
- [x] Build `CaseStudiesSection` with real metrics and strategy breakdown.
- [x] Build `ProcessSection` displaying 7 engineering lifecycle stages.
- [x] Build `EngineeringSection` showcasing cloud architecture and security principles.
- [x] Build `WhyNovixaSection` and `FounderSection`.
- [x] Build `InsightsSection` with full-screen article reader modal.
- [x] Build 5-step `ProjectDiscoveryWizard` lead generation form.
- [x] Build 7 dedicated sub-views (`SolutionsView`, `IndustriesView`, `ProductsView`, `WorkView`, `AboutView`, `InsightsView`, `StartProjectView`).
- [x] Build footer with quick navigation links, contact details, and copyright metadata.

---

## 🟡 Phase 2: Backend & Database Integration (Target: Q3 2026)

- [ ] **Task 2.1:** Create Express `/api/discovery` endpoint to receive Project Discovery Wizard submissions.
- [ ] **Task 2.2:** Connect Firestore database or Cloud SQL PostgreSQL instance to store lead records securely.
- [ ] **Task 2.3:** Add server-side email notifications via SendGrid/Resend when a new project discovery form is submitted.
- [ ] **Task 2.4:** Implement input validation using Zod schemas for all backend endpoints.
- [ ] **Task 2.5:** Create `/api/pulse/submit` endpoint to store live feedback submissions from the Novixa Pulse widget.

---

## 🔵 Phase 3: Next.js App Router Migration & Full SSR/SSG (Target: Q4 2026)

- [ ] **Task 3.1:** Migrate Vite React routing to Next.js App Router (`/app/[lang]/page.tsx`).
- [ ] **Task 3.2:** Configure `next-intl` or native Server Components for zero-bundle-size bilingual translations.
- [ ] **Task 3.3:** Implement Server-Side Rendering (SSR) for static case studies (`/work/[slug]`) and blog articles (`/insights/[slug]`).
- [ ] **Task 3.4:** Add dynamic OpenGraph image generation (`next/og`) for social media sharing links in both Arabic and English.

---

## 🟣 Phase 4: CMS Integration & Content Hub (Target: Q1 2027)

- [ ] **Task 4.1:** Integrate Sanity.io or Strapi CMS for non-technical team members to publish new insights and case studies.
- [ ] **Task 4.2:** Build MDX blog article renderer with custom React code block highlights and inline product callouts.
- [ ] **Task 4.3:** Add search and category filter controls to the Novixa Insights library.

---

## 🟠 Phase 5: Novixa B2B SaaS Product MVPs Development

- [ ] **Task 5.1 (Novixa Restaurant):** Build standalone multi-tenant POS backend with real-time WebSocket order kitchen display system.
- [ ] **Task 5.2 (Novixa Booking):** Build calendar sync engine supporting Google Calendar and SMS appointment reminders.
- [ ] **Task 5.3 (Novixa Gaming):** Build PC LAN room seat reservation map and console session billing timer.
- [ ] **Task 5.4 (Novixa Pulse):** Build AI sentiment classification engine using Gemini 2.5 Flash to automatically group anonymous employee feedback.

---

## 🔴 Phase 6: Testing, QA & Performance Optimization

- [ ] **Task 6.1:** Add Jest + React Testing Library unit test suite for `LanguageContext` and form validation.
- [ ] **Task 6.2:** Set up Playwright end-to-end (E2E) tests for the 5-step Project Discovery Wizard flow.
- [ ] **Task 6.3:** Audit Lighthouse performance scores to ensure 95+ ratings across Mobile and Desktop.
- [ ] **Task 6.4:** Verify full WCAG 2.1 AA keyboard navigation accessibility across all interactive modals and drawers.
