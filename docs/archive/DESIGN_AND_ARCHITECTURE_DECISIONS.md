# Novixa — Design and Architecture Decisions Log

**Last Updated:** 2026-08-24

---

## 1. Migration from Vite/Hash SPA to Next.js 15 App Router

- **Decision**: Fully adopt Next.js 15 App Router (`src/app/[lang]/`) with static site generation (`generateStaticParams`) and server rendering.
- **Rationale**: The previous Vite-based hash routing (`/#/ar/home`) produced an empty `<div id="root"></div>` on server request, causing search engines and social unfurlers to index blank pages. Next.js 15 App Router delivers full server-rendered HTML for all routes while maintaining instant client-side transitions.

## 2. Server Components vs Client Boundaries

- **Decision**: Keep page layouts, metadata generation, and sitemaps as pure Server Components. Interactive widgets (Wizard, Architecture Simulator, Command Menu, Mobile Nav) are designated as Client Components (`'use client'`).
- **Rationale**: Eliminates runtime JS overhead for static content and avoids Next.js pre-rendering crashes caused by passing event handlers across boundaries.

## 3. Brand Identity & Design System: Precision Engineering

- **Decision**: Avoid generic AI website templates (excessive identical cards, generic purple gradients, fake skeleton loading delays). Use an architectural theme: Deep Slate (`#020617`), Royal Blue (`#2563EB`), Teal (`#14B8A6`), sharp hairline blueprint grid patterns, and distinctive geometric typography (`Alexandria` + `IBM Plex Sans Arabic` + `Inter`).
- **Rationale**: Novixa is a serious software engineering and digital products company. The design must communicate technical depth, reliability, and custom craftsmanship rather than off-the-shelf templates.

## 4. Strategic Narrative: The 4-Stage Trajectory

- **Decision**: Prominently feature the 4-phase growth trajectory:
  1. *Sector-Specific Engineering (حلول القطاعات)*
  2. *Reusable Engineering Core (النواة الهندسية)*
  3. *Proprietary B2B SaaS Platforms (منتجات سحابية مملوكة)*
  4. *Regional & Global Expansion (التوسع الخليجي والعالمي)*
- **Rationale**: Distinguishes Novixa from typical web agencies by clearly conveying its productization business model and long-term vision.

## 5. Contact Inquiries & Notifications

- **Decision**: Use `POST /api/contact` powered by Resend with HTML email templates and an automatic console-logging fallback when `RESEND_API_KEY` is not present in development.
- **Rationale**: Guarantees zero runtime crashes during development and ensures that inquiries in production are safely dispatched to `NOVIXA_CONTACT_EMAIL`.
