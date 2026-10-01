# Novixa — Production Audit

Current state of the platform, the defects found, and what was done about each.
Every entry carries the evidence it rests on. Updated as work lands.

**Last updated:** 2026-10-01
**Audited against:** `claude/practical-fermat-1avypc` · live deployment `novixa-cyan.vercel.app`

---

## 1. Architecture as it stands

| Area | Current state |
|---|---|
| Framework | Next.js 15.5 App Router, React 19, TypeScript 5.8 (strict) |
| Styling | Tailwind CSS v4 (`oklch` colour output), dark-only canvas |
| Motion | `motion/react`, globally gated by `MotionConfig reducedMotion="user"` |
| Icons | `lucide-react`, plus one hand-inlined SVG for the WhatsApp brand glyph |
| Content | No CMS — `src/content/data.ts` typed by `src/types.ts` |
| Locales | `ar` (primary) / `en` via `[lang]` segment; `dynamicParams = false` |
| Email | Resend via `POST /api/contact`, with honeypot and in-process rate limit |
| Rendering | Static prerender for all content routes; `/og` and `/api/contact` dynamic |
| Deployment | Vercel, `distDir: 'dist'`, security headers in `next.config.ts` |
| Quality gates | typecheck · ESLint 9 · 78 Vitest unit tests · 117 Playwright E2E · Lighthouse |

**Routes:** 90 indexable URLs across both locales (was 65).

---

## 2. Findings

Severity: **P0** breaks production behaviour · **P1** materially harms users or
search · **P2** quality and maintenance · **P3** noted, not acted on.

### P0-1 · Canonical URLs and OG cards pointed at a dead origin — FIXED

`getSiteUrl()` existed twice (`lib/env.ts`, `lib/metadata.ts`) and both fell back
to a hardcoded `https://novixa.dev`. The live deployment served:

```html
<link rel="canonical" href="https://novixa.dev/ar">
<meta property="og:image" content="https://novixa.dev/og?...">
```

from `novixa-cyan.vercel.app`. Two consequences: search engines were told the
live URL duplicates an origin they cannot fetch, and **no social preview
rendered anywhere**, because every card URL resolved to a host that does not
serve it.

*Evidence:* `curl` of the deployed `/ar` head; reproduced in a local build with
the variable unset.
*Fix:* single `src/lib/site.ts` resolving `NEXT_PUBLIC_SITE_URL` → `SITE_URL` →
`VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → localhost. Covered by
`tests/site-url.test.ts`.
*Residual:* `NEXT_PUBLIC_SITE_URL` must be set in Vercel — see §4.

### P1-1 · Arabic text rendered on the English pages — FIXED

`Product.metrics[].value` was typed `string` while every neighbouring field was
`{ ar, en }`. Seven values rendered verbatim in both locales, e.g.
`2.5x أسرع في الذروة` on `/en/products`.

*Evidence:* `e2e/locale.spec.ts` — "English page /products is LTR and free of
Arabic text".
*Fix:* field localized; the E2E check now guards the whole class.

### P1-2 · Unsupported quantitative claims — FIXED

The same values asserted outcomes no evidence supports: *2.5× faster at peak*,
*85% fewer no-shows*, *3× engagement*, *60% faster resolution*, *−30% waste*.
The heading above them read "Performance Metrics", presenting them as measured.

*Fix:* replaced with capability statements that are true as written ("Orders
routed straight to the kitchen display"); heading changed to "Operational
highlights".

Case-study figures (`+42%`, `+65%`, `85%`, `98%`) have the same shape. Each card
carried a type badge — *Product Demonstration*, *Concept Architecture* — but the
badge is not where the eye lands. The figures now carry their own marker stating
they describe a modelled scenario.

### P1-3 · A placeholder WhatsApp number shipped to production — FIXED

`https://wa.me/967770000000` — a number nobody owns — was linked from the contact
page and stored in `BRAND_INFO`. A visitor clicking it reaches a dead chat.

*Fix:* the channel renders only when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set
(`src/lib/contact-channels.ts`). **Currently unset, so the channel is hidden** —
see §4.

### P1-4 · Heading order broken on every page — FIXED

The footer's four trust badges were `h4` with no `h3` anywhere above them. The
footer is on every page, so every page failed heading order.

*Evidence:* Lighthouse `heading-order`; `/ar` measured **94** on accessibility,
not the 100 recorded in `AGENTS.md`.
*Fix:* they are assurance labels, not document sections — now `<p><strong>`.

### P1-5 · Nav CTA clipped at tablet width — FIXED

Adding a nav item clipped the "ابدأ مشروعك" CTA at 1024px — the same failure
`AGENTS.md` records for `md:`, one breakpoint up.

*Evidence:* every header descendant measured against the viewport at 820 / 1024 /
1280 / 1440 in both locales.
*Fix:* desktop switch moved to `xl:`; SLA chip and ⌘K hint to `2xl:`. Covered by
the `tablet` Playwright project.

### P1-6 · 34 pages of content with no URL — FIXED

Nine services and eight ready solutions carried the deepest content on the site —
scope, capabilities, deliverables, package tiers — and none of it had an address.
Services rendered as cards whose only outbound link was the contact form;
solutions were switched in client state, so a selected solution could not be
linked, shared or indexed at all.

*Fix:* `/{lang}/services/[slug]`, `/{lang}/solutions/[slug]`, plus `/{lang}/faq`
and `/{lang}/legal/[slug]`. Sitemap 65 → 90 URLs. `tests/routing.test.ts` asserts
the sitemap and the route catalogs cannot drift apart.

### P1-7 · No visible focus ring on several controls — FIXED

The global `*:focus-visible` rule set a blue outline, which on the blue primary
buttons is nearly invisible and on semi-transparent surfaces sits directly
against the content behind it.

*Evidence:* `e2e/accessibility.spec.ts` walks 25 tab stops and asserts each
focused element renders an indicator.
*Fix:* the outline is now paired with a dark offset ring, so it reads the same on
a button, a card and the page background.

### P1-8 · Contrast below AA in three places — FIXED

`text-slate-500` micro-text measured 3.78–4.07:1 against the dark surfaces,
under the 4.5:1 floor. A homepage step number carried `opacity-80`, dropping
slate-400 on slate-950 to 4.0:1.

*Fix:* raised to `slate-400`; `opacity-80` removed.

### P2-1 · Nothing was ever linted — FIXED

No ESLint configuration existed; `next lint` was never initialised. Enabling it
surfaced 122 findings: three `any` escapes, ~110 unused imports, and one
intentional `<a>` in the root error boundary (kept, documented — that boundary
must survive a broken router subtree).

ESLint is pinned to 9.x: ESLint 10 dropped legacy config support and
`eslint-config-next` has not adopted flat config natively.

### P2-2 · ~900 lines of unreachable code — FIXED

`CaseStudiesSection` and `InsightsSection` each carried ~50 lines of modal UI
whose only setter lived in a handler nothing called, plus `onSelect*` props no
caller passes — leftovers from pre-App-Router in-page view switching. Five
orphaned section components duplicated live sections. Root-level `components/`
and `data/` were re-export shims.

One of the orphans (`PulseSection`) carried a filter bug that never surfaced,
which is what unreferenced UI does.

### P2-3 · Locale state duplicated the URL — FIXED

`LanguageContext` mirrored the route locale into `useState` and re-synced it by
effect. The same fact in two places: switching locale set state first and pushed
the route second, so for one render they disagreed, and the reconciling effect
could undo the user's choice as easily as apply it.

*Fix:* derived from `usePathname()`. Also removes the `exhaustive-deps` warning
rather than suppressing it, and exposes `alternateHref` so switches can be links.

### P2-4 · The test harness reused a stale server — FIXED

Playwright's `reuseExistingServer` let a `next start` from an earlier build
answer an entire debugging session. Every measurement described a build that no
longer existed, and four "isolation" experiments chased a soft-404 that did not
exist — `notFound()` had been returning a correct 404 throughout.

*Fix:* `reuseExistingServer: false`.

### P2-5 · Three copies of the icon map — FIXED

`iconName` → component was resolved in three places and had already drifted, so a
name resolving on a listing page fell back to a generic glyph on the detail page.
Consolidated into `src/lib/icon-map.tsx`.

### P2-6 · No loading states anywhere — FIXED

No `loading.tsx` existed. A click held the old page on screen with no feedback
until the new one was ready — on a slow connection, indistinguishable from the
click not registering. The 330-line `Skeleton` component was written but never
imported.

*Fix:* leaf-segment loading skeletons, a navigation progress bar, and a
back-to-top control. Boundaries sit on leaf segments rather than the `[lang]`
root, so an instant static page does not flash a skeleton on every navigation.

### P3-1 · axe `color-contrast` is unstable on this interface — NOT ACTED ON

axe resolves a background by walking the DOM. This interface is built on
semi-transparent surfaces (`glass-card`, `glass-overlay`, `bg-slate-900/50`) and
`backdrop-filter`, over which it cannot composite correctly — its verdict changed
between two consecutive runs on identical markup.

*Decision:* the rule is disabled in the axe gate and contrast is measured by
Lighthouse instead, which reports 100 on every touched page. A tool assignment,
not a coverage gap. A manual contrast pass over the glass surfaces remains
worthwhile.

### P3-2 · Thin editorial content — NOT ACTED ON

Two insight articles and four industries. Both clusters are structurally sound
but shallow for the search terms they target. This is a content-production task,
not an engineering one.

### P3-3 · Next.js 16 is available — NOT ACTED ON

The project is on 15.5; 16.3 is current. Deliberately not bundled with this work:
a major framework migration alongside a feature and content pass makes any
regression hard to attribute. The ESLint migration already done is
forward-compatible — `next lint` is removed in 16.

---

## 3. Verification

| Gate | Result |
|---|---|
| `npm run typecheck` | clean |
| `npm run lint` | 0 errors, 0 warnings |
| `npm run test` (Vitest) | 78 passed |
| `npm run test:e2e` (Playwright) | 117 passed — desktop, tablet, mobile |
| `npm run build` | clean, 90 routes |
| Lighthouse a11y / best-practices / SEO | **100 / 100 / 100** on `/ar`, `/en`, `/ar/dashboard`, `/en/dashboard`, `/ar/contact`, `/ar/products`, `/ar/faq`, `/ar/services/custom-software`, `/ar/solutions/restaurant-system`, `/ar/legal/privacy` |

---

## 4. Requires human action

| Item | Why it needs a person |
|---|---|
| `NEXT_PUBLIC_SITE_URL` in Vercel | Canonical URLs, hreflang, sitemap and OG cards are prerendered at **build** time. The Vercel fallbacks keep a deployment self-consistent, but only this variable survives a domain change. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Without a key the contact API logs instead of sending and returns `delivered: false`. The from-address must be on a domain verified in Resend. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | The WhatsApp channel is hidden until a real number is set. Leaving it unset is correct; a placeholder is not. |
| GitHub Actions is not executing | Run `36635306000` failed in 4 seconds with no logs — the job never ran its commands. All four steps pass locally from a clean `npm ci`. Typically Actions billing, a spending limit, or an org policy restricting allowed actions. |
| Legal review | `src/content/legal.ts` is engineering-authored copy describing real system behaviour (`LEGAL_REVIEW_PENDING = true`). A lawyer should read it before launch. |
| Real social profiles | `linkedin.com/company/novixa`, `github.com/novixa`, `x.com/novixa` are referenced in `sameAs` structured data and the footer. Unverified. |
