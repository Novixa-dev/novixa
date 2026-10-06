# Novixa — Implementation Plan

Prioritised work, what has landed, what remains, and the reasoning behind the
calls that were not obvious. Kept in step with the code; findings live in
`PRODUCTION_AUDIT.md`, release checks in `QA_RELEASE_CHECKLIST.md`.

**Last updated:** 2026-10-06

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
| 5.1 | Playwright across desktop / tablet / mobile | 144 tests |
| 5.2 | Route suite driven by the sitemap | Every advertised URL must serve |
| 5.3 | Locale suite | Direction, H1 language, and leaks in both directions |
| 5.4 | axe (WCAG 2.2 A/AA) + keyboard + heading order | Covers what Lighthouse's subset does not |
| 5.5 | Conversion suite | Validation, truthful failure, honeypot, demo disclaimer |
| 5.6 | Fresh server per run | Removes the stale-build class of false result |

The tablet viewport is its own project because the navbar breakpoint has now
broken twice at that width.

## Phase 6 — Benchmark, publish, deepen · **DONE**

Driven by a set of reference templates and themes the owner supplied (Framer,
uiCookies, ThemeForest IT themes, WordPress themes).

| # | Work | Outcome |
|---|---|---|
| 6.1 | Read all references, compare twenty features, verdict and reason each | `COMPETITIVE_BENCHMARK.md`; 7 rejected on the content rules, 7 recorded as owner decisions |
| 6.2 | `/{lang}/design-system` | The one reference idea that was pure upside — published evidence, generated from `src/content/design-system.ts` |
| 6.3 | Contrast floor, site-wide | P1-9: slate-500 measured 4.24:1 / 3.79:1; raised, written as a rule, published with ratios, asserted by tests |
| 6.4 | Console: window selection, derived delta, shareable URL, CSV export | The page had nothing to do on it; now it has four things, none of them fabricated |
| 6.5 | Console tablist keyboard pattern | P2-9: the role promised arrow keys that did not work |
| 6.6 | `AI_WORKING_RULES.md` | The standing process, each rule carrying the cost its absence incurred here |
| 6.7 | Arabic owner's guide | Idea, every URL, every figure, and a 40-step self-test script |
| 6.8 | Published figures under test | `tests/design-system-facts.test.ts` + a total-URL assertion; P2-11 is why |

**Why a design-system page on a marketing site.** The reference templates sell a
"Design System page" as a convenience for the buyer — change a token, the site
follows. Here it is the opposite: a page a prospect can audit. Every value is read
off the implementation, every number is measured, and five unit tests stop it
drifting. For a firm whose product is trust in its engineering, that is evidence
rather than decoration, and it is the only one of the twenty reference features
that needed no facts the company does not have.

**Why the console got interaction rather than more panels.** More panels would
have meant more generated numbers. Period selection, a delta computed from the
series the table prints, a shareable URL and a CSV export all add capability
without adding a single new claim — and the CSV carries the illustrative-data
notice in the file, because a download leaves the page's disclaimer behind.

**What the benchmark refused.** Testimonials, client logos, integrations,
counting-up statistics, an intro preloader, four homepage variants, a waitlist.
The first three would require inventing clients or capabilities. Counting-up
statistics would animate attention onto figures that were removed for being
unsupported. A preloader delays first paint by design, on a site whose measured
defect was a 1275 ms paint delay.

## Phase 7 — Deployability and live verification · **DONE except one account step**

| # | Work | Outcome |
|---|---|---|
| 7.1 | Live QA on production and on the branch preview | Production (`main`) re-confirmed broken: canonical on a 404 domain, no `og:image`. Preview correct on every §9 check. The merge is the fix |
| 7.2 | Standalone container image | P1-10: `/og` 500'd in every Docker deployment; now `200 image/png`, runtime deps 716 MB → 79 MB |
| 7.3 | Railway-aware origin resolver | `RAILWAY_PUBLIC_DOMAIN` as a fallback, two tests; the Dockerfile declares the build-time ARGs Railway needs |
| 7.4 | Railway project prepared | Service, domain, variables, healthcheck, restart policy. Blocked only on the GitHub app being granted `Novixa-dev` |
| 7.5 | `DEPLOYMENT_GUIDE.md` rewritten in English | The Arabic original would have baked the wrong origin into Docker builds, asked QA to look for eight team-member cards that do not exist, and referenced a `docker-compose.yml` that was never committed |

**Why prospects and outreach templates are not in this repository.** The owner
asked for a prospect list and first-contact templates. Both were produced and
handed over directly. The repository is public, so committing either would show
prospects the list they are on and the script they are about to receive. Business
material lives with the business, not with the website's source.

---

## Remaining

### R0 — Deployment pipeline · **UNBLOCKED 2026-10-06**
The repository was made public. Vercel deploys again (status `success`, preview
Ready) and GitHub Actions runs green on every push, browser suite included.
Both blockers shared one cause: a private organization repository on the free
tier of both services.

Verified on `cc0b7df`: combined commit status `success`, both check runs
(`Typecheck, lint, test, build`, `Vercel Preview Comments`) `success`, PR
mergeable state `clean`.

### R1 — Set the production environment variables · **blocked on access**
`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
`NEXT_PUBLIC_WHATSAPP_NUMBER`. See `PRODUCTION_AUDIT.md` §4.

### R2 — Get GitHub Actions executing · **DONE 2026-10-06**
Folded into R0 — the 4-second no-log failure was the private-repository cause,
not a billing or allowed-actions policy as first suspected. `Typecheck, lint,
test, build` now completes `success` on the branch head, and the `Vercel` status
alongside it is `success` too.

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

### R4 — Manual contrast pass over the glass surfaces · **DONE**
290 text nodes across seven pages, measured from rendered pixels rather than
from the DOM, so the semi-transparent surfaces axe cannot composite were read
exactly as they paint. No genuine failures; the four flagged nodes are
limitations of the method and are explained in `PRODUCTION_AUDIT.md` P3-1.

It did surface a real one: the gradient-clipped headline has no colour to
measure because it is `transparent`, which is also how it would render in
forced-colors mode. Fixed as P2-8.

### R5 — Server-component refactor · **DONE, and it did not do what was expected**
Ten presentational sections and six views now take `lang` as a prop and use a
server-side `createTranslator()` instead of the `useLanguage()` hook, so they
leave the client bundle entirely.

First-load JS: home 208 → **193 kB**, `/work` 188 → **106 kB**, `/about`
142 → **106 kB**, `/products` 141 → **106 kB**.

Lighthouse, median of 7 runs each side: **78 → 78**. No measurable change.

The expectation was wrong, and the measurement is what revealed it: the
bottleneck is Style & Layout (~1300–1500 ms) from laying out twelve full
sections, not script evaluation. Removing JavaScript removed JavaScript.

Kept anyway — 36 kB less delivered, parsed and hydrated on three routes is a
real saving on a slow connection, and a static section being a client component
was wrong regardless — but it is recorded as an architectural improvement, not
a performance one.

### R5b — Reduce the homepage's layout cost · **DONE, and the lab score still did not move**
The diagnosis from R5 was right and this is where it pointed. Lighthouse's own
LCP breakdown on the homepage: time to first byte 18 ms, element render delay
**1275 ms**. The H1 is in the HTML almost immediately and then waits more than a
second for a frame, because the browser lays out all twelve sections below it
first — Style & Layout was the largest single main-thread entry.

The fix is `content-visibility: auto` with `contain-intrinsic-size: auto 720px`
on every section after the hero, applied through a wrapper in the route rather
than to the section components (they are reused on pages that render two or
three of them, where there is nothing off-screen to defer). Reasoning is in
`globals.css` next to the rule.

Measured, median of 5 runs each side, same build pipeline and same machine:

| | before | after |
|---|---|---|
| LCP element render delay (observed) | 1275 ms | **288 ms** |
| Style & Layout, main thread | 920 ms | **614 ms** |
| Lighthouse performance score (simulated) | 78 | 78 |
| Lighthouse LCP (simulated) | 5073 ms | 4926 ms |
| CLS | 0.0000 | 0.0000 |

So: the thing that was targeted moved by 4.4×, and the headline score did not.
That is not a contradiction. Lighthouse's score comes from Lantern, which
re-simulates the trace over a throttled network and CPU, and under that model
the homepage's LCP is bounded by the simulated critical path rather than by the
main-thread work this change removes. The observed numbers are what a visitor's
browser actually did, and they are what `useReportWebVitals` will report from
the field (R3).

Recorded honestly on both counts: a real improvement to how fast the headline
paints, and no improvement to the lab score. The remaining lab-score lever is
still content structure — whether the homepage should carry twelve sections at
all — and that is the owner's decision, not an engineering one.

Not reverted this time (unlike the `next/dynamic` experiment, which made the
score *worse*): this one improved the metric it targeted, costs nothing, and all
120 browser tests pass with it in place, CLS included.

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
