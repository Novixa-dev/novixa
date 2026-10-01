# Novixa — Implementation Plan

Prioritised work, what has landed, what remains, and the reasoning behind the
calls that were not obvious. Kept in step with the code; findings live in
`PRODUCTION_AUDIT.md`, release checks in `QA_RELEASE_CHECKLIST.md`.

**Last updated:** 2026-10-01

---

## Ordering principle

Correctness before reach, reach before polish.

A broken canonical costs every page its ranking, so it outranks a new page. A
page nobody can link to is worth less than one that exists, so routes outrank
animation. Animation that hides a missing loading state is decoration over a
defect, so states outrank motion. Nothing on this list is scheduled because it
is pleasant to build.

---

## Phase 1 — Correctness · **DONE**

| # | Work | Outcome |
|---|---|---|
| 1.1 | Single origin resolver (`lib/site.ts`) | Canonical, hreflang, OG and sitemap resolve to the serving host |
| 1.2 | ESLint 9 flat config, Prettier, Vitest, CI | 122 findings surfaced and fixed, not silenced |
| 1.3 | Remove unreachable code | ~900 lines; two sections lose `motion` entirely |
| 1.4 | Derive locale from the route | Removes the state/URL disagreement class |
| 1.5 | Remove the placeholder WhatsApp number | Channel is env-gated and hidden until real |

## Phase 2 — Reach · **DONE**

| # | Work | Outcome |
|---|---|---|
| 2.1 | `/{lang}/services/[slug]` · `/{lang}/solutions/[slug]` | 34 pages of existing content given addresses |
| 2.2 | `/{lang}/faq` + FAQPage JSON-LD | Generated from the same array the page renders |
| 2.3 | `/{lang}/legal/[slug]` | Privacy and terms; required by Search Console and procurement |
| 2.4 | Sitemap + drift tests | 65 → 90 URLs; sitemap and route catalogs cannot diverge silently |
| 2.5 | Surface industries / insights / console | Previously reachable from the sitemap but no navigation |

## Phase 3 — Proof · **DONE**

| # | Work | Outcome |
|---|---|---|
| 3.1 | `/{lang}/dashboard` operations console | The consoles were described in prose and never shown |
| 3.2 | Validated chart palette | All five categorical checks pass; worst adjacent pair ΔE 9.4 under simulated deuteranopia (target 8.0) |
| 3.3 | Illustrative-data notice above the figures | Not a footnote under them |
| 3.4 | Table view of the same data | Figures reachable without reading a picture |

**Why a demo console and not an authenticated dashboard.** The brief asked for a
"full dashboard". A company marketing site has no authenticated user, no
database and no account model, so an auth system would have been scaffolding
with nothing behind it — complexity for appearance, which the brief explicitly
rules out. The real business need is *evidence*: a prospect must see the console
Novixa sells. That is a public, interactive demonstration, honestly labelled. If
a genuine authenticated surface is ever needed — a client portal with project
status and invoices — it is a separate build with real authorization, not an
extension of this page.

**Why hand-rolled SVG charts.** The site ships 102 kB of shared JS. A charting
library would be a large fraction of that again for two chart shapes, and inline
SVG keeps the marks under the same hairline/mono treatment as the rest of the
interface.

**Why a seeded PRNG.** `Math.random()` would differ between server and client,
producing a hydration mismatch, and would reshuffle the page on every visit.

## Phase 4 — States and motion · **DONE**

| # | Work | Outcome |
|---|---|---|
| 4.1 | Leaf-segment loading skeletons | Navigation has feedback; the written-but-unused `Skeleton` is in service |
| 4.2 | Navigation progress bar | Starts on click, not on route commit, which is too late to be useful |
| 4.3 | `Reveal` / `RevealGroup` primitives | One definition replaces per-section ad-hoc motion |
| 4.4 | Back-to-top | Several pages run past twelve sections |

Loading boundaries sit on **leaf** segments, not the `[lang]` root: a root
boundary would flash a skeleton over instant static pages on every navigation.

## Phase 5 — Verification · **DONE**

| # | Work | Outcome |
|---|---|---|
| 5.1 | Playwright across desktop / tablet / mobile | 117 tests |
| 5.2 | Route suite driven by the sitemap | Every advertised URL must serve |
| 5.3 | Locale suite | Direction, H1 language, and leaks in both directions |
| 5.4 | axe (WCAG 2.2 A/AA) + keyboard + heading order | Covers what Lighthouse's subset does not |
| 5.5 | Conversion suite | Validation, truthful failure, honeypot, demo disclaimer |
| 5.6 | Fresh server per run | Removes the stale-build class of false result |

The tablet viewport is its own project because the navbar breakpoint has now
broken twice at that width.

---

## Remaining

### R1 — Set the production environment variables · **blocked on access**
`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
`NEXT_PUBLIC_WHATSAPP_NUMBER`. See `PRODUCTION_AUDIT.md` §4.

### R2 — Get GitHub Actions executing · **blocked on account access**
The workflow is correct — all four steps pass locally from a clean `npm ci` —
but run `36635306000` failed in 4 seconds with no logs, meaning the job never
ran its commands. Usually billing, a spending limit, or an allowed-actions
policy.

### R3 — Field performance reporting · **DONE, endpoint not chosen**
`src/components/common/WebVitals.tsx` reports real-visit LCP/CLS/INP through
Next.js's built-in `useReportWebVitals`, tagged with path and locale. It sends
nothing until `NEXT_PUBLIC_VITALS_ENDPOINT` is set.

**Not** `@vercel/analytics` / `@vercel/speed-insights`: both carry an optional
`@sveltejs/kit` peer dependency that npm resolves against this tree, where it
collides with the Vite version Vitest pins. Installing either needs
`--legacy-peer-deps`, which weakens dependency resolution for every package in
the project — a permanent maintenance cost for one reporting script. The native
hook reports the same metrics with no dependency at all.

The locale dimension matters here specifically: Arabic pages load a different
font subset, so their LCP can diverge from the English ones, and an aggregate
number would hide that.

### R4 — Manual contrast pass over the glass surfaces · **ready to do**
axe cannot composite them (`PRODUCTION_AUDIT.md` P3-1). Lighthouse reports 100,
but a human check over `glass-card` / `glass-overlay` at the smallest type sizes
is still worth doing.

### R5 — Server-component refactor of the presentational sections · **ready to do, own change**
The measured bottleneck (`PRODUCTION_AUDIT.md` P3-0): LCP 5.1 s whose delay is
92% render, from 1290 ms of Style & Layout and 838 ms of script evaluation.
Nearly every homepage section is a client component solely because it calls
`useLanguage()`. Passing `lang` as a prop and reading a server-side `t` would
remove them from the client bundle outright.

Not bundled here on purpose. Code-splitting was tried first as the cheaper
option and measured *worse* (72 → 66, TBT 330 → 570 ms) — it rearranged the work
instead of removing it, and was reverted. The real fix touches a dozen
components and deserves its own change with its own before/after numbers.

### R6 — Editorial depth · **content task, not engineering**
Two insight articles and four industries. Both clusters are sound but shallow for
the terms they target. Needs someone who can write with authority about the
Yemeni and GCC market — not something to generate.

### R7 — Next.js 16 migration · **separate change**
Deliberately not bundled here: a framework migration alongside a feature and
content pass makes any regression hard to attribute. The ESLint work already done
is forward-compatible, since `next lint` is removed in 16.

---

## Decisions worth remembering

**Fix findings, do not silence them.** Enabling ESLint produced 122 findings. The
only suppression added was one `<a>` in the root error boundary, with the reason
inline — that boundary has to survive a broken router subtree, so a full document
load is the only reliable escape hatch.

**Correct the test when the test is wrong.** Three E2E failures were the tests
misreading deliberate conventions: Latin glosses inside Arabic sentences, script
payloads read as visible text, and a honeypot that is visually hidden rather than
`display: none` (the point — bots skip `display: none`). Those were corrected in
the tests. Four others were real product defects and were fixed in the product.

**Fewer true claims beat more impressive false ones.** Seven product figures
asserted outcomes no evidence supports. Replacing them with capability statements
makes the page less impressive and more credible, which is the trade this company
should want.

**Do not keep a change that fixes nothing.** A `dynamicParams = false` catch-all
was written to fix a soft-404, then reverted once a fresh server showed
`notFound()` had been correct all along. The stale-server fix stayed; the
unnecessary complexity did not.
