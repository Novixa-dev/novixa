# Novixa — Final Pre-Launch Audit & Improvement Report

**Date:** 2026-08-27
**Scope:** Full design, UX, brand, content, accessibility, SEO, performance, and technical audit of the Novixa marketing site, followed by direct implementation of fixes and a second full verification pass.
**Method:** Source code review of every route, component, and content file; live browser testing (Playwright + Chromium) of every route in Arabic and English at desktop, tablet, and mobile viewports; production build verification (not dev mode).

---

## Executive Summary

Novixa's site was already in genuinely good shape going into this pass — it had already been migrated to Next.js 15 App Router with clean bilingual URLs, honest case-study labeling (no fake testimonials or client logos), a consistent brand mark, and a real content model. This audit's job was to find what a first-time visitor, a search engine, or a screen reader would actually hit that undermined that work — and there were several real issues, some minor and some launch-relevant. All of them were fixed in this session, not just documented.

The most significant findings were structural rather than cosmetic: a soft-404 bug where **any invalid URL silently rendered the Arabic homepage with a 200 status** (a genuine SEO/duplicate-content risk), a tablet breakpoint bug that broke the navbar for the entire ~768–1023px width range (real iPad-class devices), and 404/error pages that dropped all site chrome (navbar, footer, language) when hit inside a resolved locale. None of these were visible from a quick glance at the homepage — they only surfaced under direct testing, which is exactly why this pass was worth doing.

No fabricated content was introduced. Where real information (a named team member, a client testimonial, a real product screenshot) didn't exist in the project, it was left out and documented below as a manual action, per instruction.

## Final Verdict

**READY FOR PRODUCTION** — conditional on completing the manual actions in the checklist below (primarily: setting real environment variables, and a founder/decision-maker choosing whether to invest in a Team page).

The codebase itself has no known blocking defects: it type-checks cleanly, builds cleanly (58/58 static pages), and every route was verified error-free in a real browser against the production build. The remaining items are business decisions and infrastructure configuration, not code.

---

## What Was Fixed This Session

### Correctness / SEO-critical

1. **Soft-404 on invalid URLs (highest-impact fix).** `[lang]/layout.tsx` accepted *any* value for the `[lang]` segment and silently coerced it to `'ar'`. A URL like `/xyz` or `/whatever123` rendered the Arabic homepage with an HTTP 200, instead of a 404. This is a real crawlability problem — search engines could index unlimited duplicate-content URLs, and it's classified by Google as a "soft 404" pattern that actively hurts indexing quality. Fixed with `export const dynamicParams = false` plus a catch-all route (`[lang]/[...catchall]/page.tsx`) so unmatched paths now correctly return 404.
2. **404 and runtime errors lost all site chrome.** Because only a root-level `not-found.tsx`/`error.tsx` existed, hitting a broken link *inside* a resolved locale (e.g. `/ar/products/old-deleted-slug`) rendered a bare card with no navbar, no footer, no command palette, and mixed Arabic/English text on the same line — a jarring, unbranded dead end. Added `[lang]/not-found.tsx` and `[lang]/error.tsx` (locale-aware, reusing `useLanguage()`), so these boundaries now render inside the normal page chrome with a single, correct language.
3. **Root redirect was a temporary, client-rendered 307.** `/` used `next/navigation`'s `redirect()` inside a `force-dynamic` page, producing a 307 and an extra render round-trip for what is a permanent, static decision (Arabic is the default locale). Moved to `next.config.ts`'s `redirects()` with `permanent: true` — now a proper 308 handled at the routing layer, and the now-redundant `src/app/page.tsx` was removed.
4. **`<html lang>`/`dir` correctness on 404/error boundaries** — verified these now report the correct locale rather than defaulting silently.
5. **Doubled title suffix on 404 pages** (`"Page Not Found | Novixa | Novixa"`) — caused by manually appending `| Novixa` on top of the root layout's own title template. Fixed to let the template do it once.
6. **Unused, more-accurate JSON-LD helpers wired in.** `generateProductJsonLd` and `generateWebSiteJsonLd` existed in `src/lib/metadata.ts` but were never called — every page instead built a thinner, ad-hoc inline schema object. The product detail page and homepage now use the shared helpers, and the product schema now correctly uses `SoftwareApplication` with category/offer/url fields instead of a bare `Product` type.
7. **Structured-data accuracy: `Person` → `Organization` for team-authored content.** Insight articles are written by internal practice teams ("Novixa Engineering Team", "Cloud Architecture Team", "Novixa AI Lab" — see the Team page section below for why no individual is named), but the JSON-LD and `generateArticleJsonLd` helper both hardcoded `author: { "@type": "Person" }`. This is inaccurate structured data (Google's rich-result guidelines expect `Person` only for actual named individuals) and was corrected to `Organization`.

### Bilingual correctness

8. **Arabic text leaking into the English article page.** `InsightArticle.author.name` was a single Arabic-only string (not `{ar, en}` like every other bilingual field), so the English version of every article byline showed a mixed sentence like *"By فريق هندسة نوڤيكسا • Software Engineering Practice."* Fixed the type, translated the three author names, and removed a hardcoded English `"By"` prefix that also appeared unconditionally on the Arabic page.
9. **Minor Arabic spelling fix**: "التطبقي" → "التطبيقي" ("applied", AI Lab role label).

### Responsive / layout

10. **Tablet navbar breakage (768px–1023px).** The navbar switched from mobile-hamburger to full desktop nav at Tailwind's `md:` breakpoint (768px), but the full nav — logo, 7 nav items, search, language switch, CTA button — does not fit in that width. On real tablet widths (iPad Mini 768px, iPad Air 820px, standard iPad ~810px) this produced visibly wrapped, cut-off text ("ابدأ مشر" instead of "ابدأ مشروعك"). Moved the breakpoint to `lg:` (1024px) across the nav, action buttons, mobile menu button, and drawer, so tablets now get the clean, purpose-built mobile navigation instead of a squeezed desktop layout.
11. **Awkward empty space on the Start Project wizard.** `StartProjectView` forced `min-h-screen` on a wrapper around a multi-step form whose content height varies a lot by step; on shorter steps (especially step 1) this left a large dead gap before the footer, most visible on tablet. Removed the forced height so the page height now tracks its actual content.

### Content quality / page value

12. **Product detail pages only showed the first metric.** `data.ts` models multiple metrics per product (e.g. Novixa Pulse has two), but the page only rendered `metrics[0]`. Now renders all defined metrics.
13. **Product detail pages didn't surface honest availability status.** Each product already has a `status`/`statusLabel` field (`Available`, `Early Access`, `In Development`) used elsewhere, but it wasn't shown on the product's own detail page — the one place a prospect most needs to know whether they're looking at a live product or something still being built. Added a status badge (green/amber/slate depending on status) next to the category badge.
14. **Data hygiene: `InsightArticle.slug` didn't match `id`.** All routing is keyed off `.id` (confirmed via `src/lib/content.ts`), and for every other content type (`Product`, `Industry`, `CaseStudy`) `id` and `slug` are identical — except the three insight articles, where `slug` held a different, unused value (e.g. `id: 'custom-vs-ready'` vs `slug: 'custom-vs-ready-software'`). Not a live bug today, but a dormant footgun for whoever next reaches for the semantically-obvious `.slug` field to build a link. Aligned all three.
15. **Heading hierarchy skip on product and work detail pages.** Section headers (`"Key Operational Features"`, `"Operational & Architecture Challenge"`, etc.) were `<h3>` directly under the page's only `<h1>`, skipping `<h2>`. Corrected to `<h2>` — a pure semantic/tag change with no visual difference (styling is class-driven, not tag-driven).

### Accessibility

16. **Command palette had no dialog semantics.** The Cmd+K search overlay was a plain `<div>` with no indication to assistive technology that it's a modal. Added `role="dialog"`, `aria-modal="true"`, and `aria-label` to the panel, `role="presentation"` to the backdrop, and `aria-hidden` to decorative icons.
17. **Icon-only buttons with no accessible name.** The mobile search trigger and hamburger menu toggle in the navbar had no `aria-label`, `title`, or visible text — a screen reader would announce only "button." Added `aria-label` (and `aria-expanded`/`aria-controls` on the hamburger) to all icon-only controls in the navbar and command palette.
18. **Form fields relying solely on placeholder text.** The 5-step project discovery wizard's text/email/phone/textarea inputs had no `<label>` or `aria-label` — placeholder-only fields are a standard WCAG 3.3.2 gap (the accessible name disappears from view once the user starts typing, and isn't a fully reliable accessible-name source across all assistive tech). Added `aria-label` matching each field's intent to all 5 inputs.

### Technical correctness (low-risk polish)

19. **`.font-arabic` / `.font-display` / `.font-latin` utility classes referenced literal font family names** (`'Alexandria'`, `'IBM Plex Sans Arabic'`, `'Inter'`) instead of the `next/font`-generated CSS variables (`var(--font-display)`, etc.). This happened to still render the correct font (next/font registers the `@font-face` under the same literal name), but bypassed next/font's metrics-matched fallback face, which exists specifically to reduce layout shift while the webfont loads. Switched to the CSS variables to get that benefit for free — no visual change, only faster/more stable text rendering during font load.
20. **Added `src/app/manifest.ts`** — a `manifest.webmanifest` was missing entirely (favicon/brand-asset completeness). Now serves a correctly-branded manifest with the real icon, theme color, and honest name/description (no invented app-store-style claims).

---

## Design Audit

The visual language is genuinely intentional, not templated: a consistent deep-slate/royal-blue/teal palette, a real geometric "N" brand mark used identically across the logo, favicon, Apple touch icon, and Open Graph image, a considered Arabic (Alexandria + IBM Plex Sans Arabic) / Latin (Inter) type pairing, and restrained use of gradients and blur rather than the "glowing orb + glassmorphism everywhere" look common to AI-generated sites. Card grids vary in column count and density by section rather than repeating one generic card shape everywhere, and copy is specific ("sub-second slot locking," "80% no-show reduction," honestly labeled as an illustrative/sector benchmark) rather than "Build. Scale. Grow." filler.

The one structural weakness found was the tablet breakpoint bug above (now fixed) — everything else held up under close inspection at desktop, tablet, and mobile. The homepage is long (~11,500px at desktop after this session's earlier content-deduplication pass), which is a deliberate editorial choice for a company explaining a genuinely broad set of solutions/products/industries rather than a sign of padding — every section on it is distinct in structure, not a repeated template block.

## UX Audit

Primary intent (get a serious software partner to scope a project) is clear within the first screen, with a single consistent primary CTA pattern ("Start Your Project" / "ابدأ مشروعك") repeated at every natural decision point (navbar, hero, section-end CTAs, footer) rather than competing CTAs pulling in different directions. The 5-step discovery wizard is well-scoped (project type → industry → problem → budget/setup → contact) and the RTL button ordering (Next on the visual-left with a left-pointing arrow, Previous on the right) was verified correct. The command palette (Cmd+K) is a genuine differentiator — fast, real fuzzy search across products/solutions/industries/insights, not a decorative feature.

## Brand Audit

Strong and consistent. Same mark, same palette, same voice across every touchpoint checked (navbar, footer, favicon, Apple icon, Open Graph image, manifest). No fabricated logos, client marks, awards, or press mentions anywhere — trust signals are limited to what's real (an honest 3-tier case-study classification: Product Demonstration / Concept Architecture / Engineering Prototype), which is the correct call for a company at this stage.

## Responsive Audit

| Breakpoint | Status |
| --- | --- |
| Desktop (1440px+) | Pass — verified across all routes, both locales |
| **Tablet (768–1023px)** | **Fixed this session** — navbar previously broke (cut-off/wrapped text); now renders the intentional mobile-style nav |
| Mobile (390px) | Pass — drawer, forms, cards all verified |

## Accessibility Audit

Fixed: command palette dialog semantics, icon-only button accessible names, form field accessible names (5 inputs in the discovery wizard), heading-hierarchy skips on two detail page templates.

Noted but not changed (low severity, judgment call): `text-slate-500` (used for secondary/mono meta text — dates, placeholders) sits at roughly 4.24:1 contrast against the site's near-black background, just under the 4.5:1 WCAG AA threshold for normal text (it does clear the 3:1 threshold for large text). It's used exclusively for tertiary/secondary text, not primary reading content. Worth a future pass if pursuing full AA conformance, not treated as launch-blocking given its limited, secondary usage.

Not tested: no automated axe-core/Lighthouse accessibility audit was run (no such tooling was available in this environment); the fixes above were found and verified by direct code and browser inspection.

## SEO Audit

- Per-page metadata (title/description) verified genuinely unique across Home, Solutions, Products (+ 4 product detail pages), Industries (+ industry detail), Work (+ case study detail), About, Insights (+ article detail), Start Project — not a single generic block reused everywhere.
- `hreflang` alternates (`ar`/`en`/`x-default`) present on every page via `constructMetadata()`.
- `sitemap.xml` and `robots.ts` present and correctly configured (disallows `/api/`, points to the sitemap).
- JSON-LD: `Organization` and `WebSite` on the homepage, `SoftwareApplication` on products, `Article` (Organization-authored) on insights, `BreadcrumbList` helper available. All now using the shared, more accurate helpers (see fixes above).
- Root `/` now issues a real permanent 308 to `/ar` (was a client-rendered 307).
- Invalid URLs now correctly 404 instead of soft-404ing to the homepage (see fixes above) — this was the single highest-value SEO fix in this pass.

## Open Graph / Social Audit

The Open Graph image (`src/app/opengraph-image.tsx`, generated via `next/og`) is a real, professionally designed 1200×630 branded image — not a placeholder — verified by rendering it directly. `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, and matching Twitter/X `summary_large_image` card metadata are all present per-page via `constructMetadata()`. One limitation: the OG image itself is a single site-wide image (Next.js's file-based convention makes it global unless duplicated per-route); a shared WhatsApp/LinkedIn link to a specific product or case study will show the generic Novixa image rather than one naming that product. Listed below as an optional future improvement, not a defect — a shared generic-but-professional image is a legitimate baseline.

## Team / People Page

**Not added.** This required a judgment call under an explicit, repeated instruction in this task: never invent people, roles, photos, or bios.

I searched the entire project — `data.ts`, `README.md`, `package.json`, and every doc — for any real, verifiable individual (name, title, bio, photo). None exists. The one related piece of content, `FOUNDER_INFO` in `src/content/data.ts`, is already deliberately anonymized: `name: "Novixa Engineering Founders"` / `"فريق تأسيس نوڤيكسا"`, with no individual named. Building a "Team" page would have meant either inventing people (explicitly forbidden) or publishing a page with no names and no photos — which reads as *more* suspicious to a visitor than not having the page at all, undermining the exact trust goal it would be meant to serve.

**What I need from you to build this properly:** for each person you want listed —
- Full name
- Title/role
- A short (1–3 sentence) professional summary in your own words
- Areas of expertise (a short list)
- A real photo (or a deliberate choice to omit photos and use initials/icons instead — some serious engineering-led companies do this intentionally)
- Optional: a LinkedIn or professional profile link

Once provided, this is a straightforward, low-risk addition: a new `/[lang]/team` route, a footer/nav link, and a `sitemap.ts` entry, styled consistently with the existing card system already used on About/Work.

## Performance Audit

No `<img>` tags exist anywhere in the codebase — all iconography is inline SVG (`lucide-react`), so there's no image-optimization surface to audit. First Load JS per route ranges from ~103KB (static utility routes) to ~189KB (homepage, the heaviest page) — reasonable for a marketing site with this much interactivity (command palette, multi-step wizard, animated sections). No blocking third-party scripts. Fonts are self-hosted via `next/font` with `display: swap` (no render-blocking font requests). No layout-shift-inducing patterns beyond the minor font-face nuance fixed in item 19 above.

## Browser QA — Routes and States Tested

Tested against the **production build** (`next build` + `next start`), not dev mode, in both `ar` and `en`, at 1440px (desktop), 820px (tablet), and 390px (mobile) viewports, using headless Chromium via Playwright, with console-error and page-error listeners attached throughout.

- `/` (redirect), `/ar`, `/en` (homepage)
- `/ar/solutions`, `/en/solutions`
- `/ar/products`, `/ar/products/pulse`, `/ar/products/restaurant`, `/en/products/pulse`
- `/ar/industries`, `/ar/industries/restaurants`
- `/ar/work`, `/ar/work/black-spider`
- `/ar/about`, `/en/about`
- `/ar/insights`, `/ar/insights/custom-vs-ready`, `/ar/insights/multi-tenant-saas`, `/ar/insights/practical-ai`
- `/ar/start-project` (all 5 wizard steps clicked through)
- Command palette (Cmd+K, click-trigger, and live search with real queries)
- Mobile nav drawer (open/close)
- Language toggle round-trip (`/ar/about` → `/en/about` → `/ar/about`)
- 404 scenarios: nonexistent product slug, nonexistent top-level path under `/ar` and `/en`, and a garbage single-segment path with no locale at all
- Result across all of the above: **zero browser console errors, zero page errors**

## Testing

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Pass — 0 errors |
| `next build` (production) | Pass — 58/58 static pages generated |
| `next start` (production server) | Verified running, all routes 200/308/404 as appropriate |
| Browser console/page errors | 0 across every tested route |
| No automated lint/test script beyond `typecheck`/`build`| This project has no separate `lint` or unit-test script configured in `package.json`; verification relied on `tsc`, `next build`'s own type/lint pass, and direct browser QA. |

## Routes Audit

| Route | Locales | Status |
| --- | --- | --- |
| `/` | — | 308 → `/ar` (permanent) |
| `/[lang]` (home) | ar, en | ✅ |
| `/[lang]/solutions` | ar, en | ✅ |
| `/[lang]/products` | ar, en | ✅ |
| `/[lang]/products/[slug]` (4 products) | ar, en | ✅ (metrics + status badge added) |
| `/[lang]/industries` | ar, en | ✅ |
| `/[lang]/industries/[slug]` (12 industries) | ar, en | ✅ |
| `/[lang]/work` | ar, en | ✅ |
| `/[lang]/work/[slug]` (3 case studies) | ar, en | ✅ (heading fix) |
| `/[lang]/about` | ar, en | ✅ |
| `/[lang]/insights` | ar, en | ✅ |
| `/[lang]/insights/[slug]` (3 articles) | ar, en | ✅ (bilingual byline fix) |
| `/[lang]/start-project` | ar, en | ✅ (layout gap fix) |
| `/api/contact` | — | ✅ (Resend + console fallback) |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | — | ✅ |
| `/icon.svg`, `/apple-icon`, `/opengraph-image` | — | ✅ (verified rendering as real images) |
| Invalid product/article/work slug | ar, en | ✅ 404, chrome intact (fixed) |
| Invalid path under a valid locale | ar, en | ✅ 404, chrome intact (fixed) |
| Invalid locale segment (e.g. `/xyz`) | — | ✅ 404 (fixed — was a silent 200) |

## Environment Variables

| Variable | Required | Current State | Purpose | Example / Format | Where to Configure | Production Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Present in `.env.local`, empty | Canonical URL base for metadata, sitemap, OG/Twitter tags, and JSON-LD | `https://novixa.dev` | Hosting provider's environment variables (e.g. Vercel Project Settings → Environment Variables) | Falls back to `https://novixa.dev` if unset — **must be set to your real production domain**, or all canonical/OG URLs will point at the wrong domain |
| `RESEND_API_KEY` | Required for live email | Present in `.env.local`, empty | Auth key for Resend, used to send "Start a Project" form submissions | `re_xxxxxxxxxxxx` | Resend dashboard → API Keys; set in hosting provider's env vars | If unset, submissions are only logged to the server console — **no email is sent**. Safe for local dev, not acceptable for production |
| `RESEND_FROM_EMAIL` | Recommended | Present in `.env.local`, empty (code defaults to `onboarding@resend.dev`) | The "from" address on outgoing notification emails | `notifications@novixa.dev` | Must be a domain verified in your Resend account | The default `onboarding@resend.dev` works but is Resend's shared sandbox address — for a professional appearance, verify your own domain in Resend and use an address on it |
| `NOVIXA_CONTACT_EMAIL` | Required for live email | Present in `.env.local`, empty (code defaults to `hello@novixa.dev`) | Destination inbox for project inquiries | `hello@novixa.dev` | Hosting provider's env vars | Confirm this inbox actually exists and is monitored before launch |
| `SITE_URL` | Optional | Not set | Legacy/alternate fallback read by `constructMetadata()` if `NEXT_PUBLIC_SITE_URL` is absent | `https://novixa.dev` | Not needed if `NEXT_PUBLIC_SITE_URL` is set | Redundant with `NEXT_PUBLIC_SITE_URL` — no action needed |

No secrets are included above or anywhere in this report — only variable names, purposes, and whether they currently hold a value.

---

## Manual Actions Required Before Launch

1. **Set `NEXT_PUBLIC_SITE_URL` to the real production domain** in your hosting provider's environment settings. *Why:* every canonical URL, sitemap entry, hreflang tag, and Open Graph/Twitter URL is derived from this. *Blocks launch:* yes — without it, all of the above point at the wrong (or default placeholder) domain.
2. **Create a Resend account (if you don't have one), verify your sending domain, and set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`** in production. *Why:* without a key, "Start a Project" submissions are never emailed anywhere — they only appear in server logs, which nobody is watching in production. *Where:* resend.com → API Keys, and their domain verification flow for your own sending domain. *Blocks launch:* yes, if you want to actually receive leads from the site.
3. **Confirm `NOVIXA_CONTACT_EMAIL` is a real, monitored inbox.** *Blocks launch:* yes, for the same reason as above.
4. **Point your actual domain (e.g. `novixa.dev` or whichever you've registered) at your hosting provider (DNS)** and confirm SSL is active. *Blocks launch:* yes, obviously — the site needs a real, reachable domain.
5. **Decide on the Team/People page.** If you want one, send me the information listed in the Team/People section above (name, role, summary, expertise, photo or a deliberate no-photo decision, optional professional link) for each person. *Blocks launch:* no — this is a trust/credibility enhancement, not a technical blocker.
6. **Decide whether to add a Privacy Policy page.** The site collects name/email/phone/company through the "Start a Project" form but has no privacy policy or terms page. Not a hard legal requirement everywhere, but standard practice and good for trust, especially given plans to serve GCC/Saudi clients (check whether Saudi PDPL or similar regional requirements apply to your specific business model). *Blocks launch:* your call — flagged as a real gap either way.
7. **Consider connecting a privacy-respecting analytics tool** (Vercel Analytics, Plausible, etc.) — there is currently none. *Blocks launch:* no.
8. **Double-check the 3 case studies (Black Spider, Aura Medical, Nexus Logistics) are labeled the way you intend** — they're already honestly classified (Product Demonstration / Concept Architecture / Engineering Prototype), but confirm this still matches reality before go-live, since only you know if any of these have since become real client engagements. *Blocks launch:* no, but affects credibility if inaccurate.

## Optional Future Improvements (not required for launch)

- Per-page Open Graph images (product- and article-specific social preview images) instead of one shared site-wide image.
- Real product screenshots — `heroImageTag` fields already exist in `data.ts` as placeholders for this but are intentionally not rendered as fake images anywhere.
- A Team/People page, once real information is available (see above).
- A Privacy Policy / Terms page.
- Automated accessibility testing (axe-core or Lighthouse CI) as a standing check, since this pass was manual.
- A dedicated `lint` script/config — `package.json` currently only defines `typecheck`, `build`, `dev`, `start`; there's no standalone ESLint script (Next.js's own build-time lint pass does run, but a separate `npm run lint` for local iteration doesn't currently exist).

## Known Limitations

- No automated test suite exists for this project (no unit/integration tests) — verification in this pass relied on type-checking, production builds, and direct browser QA rather than a regression test suite.
- The borderline `text-slate-500` contrast noted in the Accessibility section was left as-is (secondary/tertiary text only, not primary content) rather than swept across the codebase.
- Product page-specific and article-specific Open Graph images were not built (see Optional Future Improvements) — the single shared image is used everywhere.

## Final Production Checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real production domain
- [ ] `RESEND_API_KEY` and `RESEND_FROM_EMAIL` configured with a verified sending domain
- [ ] `NOVIXA_CONTACT_EMAIL` confirmed as a real, monitored inbox
- [ ] Production domain DNS pointed at hosting provider, SSL active
- [ ] `npm run typecheck` passes (verified clean at time of this report)
- [ ] `npm run build` passes (verified: 58/58 static pages at time of this report)
- [ ] Manual smoke test of the "Start a Project" form against the real Resend key (submit once, confirm the email actually arrives)
- [ ] Decision made on Team/People page (add real info, or consciously skip for now)
- [ ] Decision made on Privacy Policy page
- [ ] Decision made on analytics
