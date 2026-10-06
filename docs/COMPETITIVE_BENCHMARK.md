# Novixa — Competitive Benchmark

What the reference templates and themes do, what Novixa does, and a verdict on
each idea. The owner supplied the references; the verdicts are mine and the
reasoning is written down so a later reader can disagree with the reasoning
rather than guess at it.

**Last updated:** 2026-10-06
**Method:** each reference page was fetched and read. Marketplace pages describe
feature checklists rather than craft, so the checklist is what is compared here;
where a live preview existed it was read too.

---

## The references

| Reference | Category | What it is selling |
|---|---|---|
| Kestrel Labs (Framer) | AI/SaaS startup template, 16 pages | A complete launch site: pricing, changelog, integrations, careers, waitlist |
| uiCookies — Nexus / Stratos / Ledgerline / Launchpad / Abacus | Free IT & SaaS templates | IT services site, SaaS marketing site + app dashboard, a pricing calculator, a release-focused landing page, an accounting dashboard mock |
| Zotech / TechZen / Saino (ThemeForest, via AEThemes) | IT-solutions WordPress themes | Elementor layouts, one-click demo content, 4 homepage variants, multilingual plugin support |
| tech-software / it-zone (WordPress.org) | Free WP themes | Conventional IT-company layout |
| Divi, Webify, Jevelin | Multipurpose builders | Anything, via a page builder |

One thing is true of every one of them and worth stating before the table: they
are **templates**. Their job is to look complete for any buyer, which is exactly
why they ship fabricated testimonials, placeholder client logos and invented
statistics as *features*. Novixa is a real company with a real claim to make, so
a feature Novixa cannot fill with true content is not a gap — copying it would
make the site worse. That distinction drives most of the verdicts below.

---

## Gap table

Legend: **build** · **owner decision** (needs facts only the owner has) ·
**reject** (would require fabrication or hurts the product)

| # | Reference does | Novixa today | Verdict | Why |
|---|---|---|---|---|
| 1 | Design System page — change a token, the site follows | Tokens exist in `globals.css` and `AGENTS.md`, nothing public | **build** | Zero fabrication risk, entirely verifiable from the code, and for a firm that sells engineering discipline it is evidence rather than decoration. Built as `/{lang}/design-system`. |
| 2 | Product screens in dark browser windows | `/dashboard` is a real interactive console, honestly labelled | **build (deepen)** | Novixa has the strongest possible version of this already — a working console, not a screenshot. What it lacked was depth: period selection, period-over-period deltas, a shareable URL, CSV export. |
| 3 | Pricing page with plan comparison; Ledgerline ships a pricing calculator | No pricing anywhere | **owner decision** | Novixa sells custom engineering. Publishing prices or packages requires commercial decisions that are the owner's, and inventing "from $X" or an engagement model is exactly what the content rules forbid. The page is cheap to build the day real numbers exist. |
| 4 | Changelog / release notes | — | **owner decision** | A changelog is only worth having if it is true. There is no release history to publish yet; a fabricated one is worse than none. |
| 5 | Integrations directory with detail pages | — | **reject (for now)** | Every entry names a third-party product Novixa integrates with. Asserting an integration that has not been built is a false capability claim. |
| 6 | Careers with job pages + application form | — | **owner decision** | Truthfully buildable as a speculative-application page, but it implies a hiring process and a team size. "Do not make the company appear larger than it is" applies. Owner's call. |
| 7 | Blog with posts | `/insights`, 2 articles | **owner decision** | Already recorded as R6. The structure is there; depth needs someone who can write with authority about the Yemeni and GCC market. |
| 8 | Testimonials | Deliberately absent | **reject** | A `TestimonialsSection` with invented clients existed once on a diverged branch and was removed rather than merged. That decision stands. |
| 9 | Client logo strip / logo ticker | Absent | **reject** | Same reason. A ticker makes the fabrication more prominent, not less. |
| 10 | Team page with photos and bios | `/team` is "Engineering Disciplines & Methodology" — no named people | **owner decision** | The honest substitute is already in place. Real names, photos and bios are a manual action for a human. |
| 11 | Stats that count up on scroll | Product metrics are capability statements, not numbers | **reject** | Animating a number draws the eye to it. The seven unsupported figures were removed for good reason; animating what replaced them would be theatre. Numbers that *are* real (test counts, Lighthouse scores, route counts) live in the docs, where they belong. |
| 12 | Intro preloader — wordmark rises, curtain slides away | None | **reject** | It delays first paint by design. This site's measured problem was a 1275 ms LCP render delay; a preloader is that defect as a feature. |
| 13 | Staged scroll animations on every page | `Reveal` / `RevealGroup` primitives, reduced-motion respected | **already better** | One definition, honoured `prefers-reduced-motion`, and a browser test asserting decorative movement stops. |
| 14 | Working forms with pending / success / error states | Contact and start-project forms have all three, and a test asserts a server failure never reads as success | **already better** | The template ships the states; the test is what makes them trustworthy. |
| 15 | Native language switcher, full second locale | Arabic-first with English as the second locale, `dir` correct before first paint, leak tests in both directions | **already better** | The templates bolt a second language onto an English original. Here Arabic is the original. |
| 16 | 4 homepage layouts, one-click demo import | One homepage | **reject** | Four layouts is a template seller's feature. A company needs the one correct homepage. |
| 17 | Waitlist page | — | **reject** | There is no product to wait for. |
| 18 | Contact with an embedded map | Contact page without a map | **owner decision** | Needs a real, publishable address. Embedding a third-party map also adds a tracking surface and a render-blocking iframe; worth it only if walk-in visits matter. |
| 19 | 16 pages as a completeness signal | 90 URLs across two locales | **already better** | Counted from the sitemap, with a test that fails the build if an advertised URL does not serve. |
| 20 | SEO titles, descriptions, social previews per page | Same, plus hreflang, canonical, 9 structured-data types, and tests that the origin resolves | **already better** | |

---

## What was built as a result

1. **`/{lang}/design-system`** — the strongest idea in the reference set, and the
   only one that is pure upside for this company. It publishes what the code
   already enforces: the palette with measured contrast, the radius hierarchy,
   the type scale and why Arabic headings carry `leading-snug`, the motion
   contract, the RTL rules, and the accessibility commitments with the numbers
   behind them. A prospect evaluating an engineering firm can read it as
   evidence; a future contributor can read it as the spec.

2. **A deeper operations console** — period selection that recomputes the series,
   period-over-period deltas derived from the same data rather than asserted,
   state in the URL so a view can be shared, and CSV export of the table.
   Everything still labelled illustrative, above the figures, not under them.

## What was deliberately not built

Items 3, 4, 6, 7, 10 and 18 are blocked on facts only the owner has — prices,
release history, hiring intent, market writing, real people, a publishable
address. Each is a small build once those exist. Items 5, 8, 9, 11, 12, 16 and 17
are rejected on the record: they would require inventing clients, results,
integrations or urgency, or they would make the site measurably slower.

A site with twenty truthful pages beats one with thirty where ten are furnished
with plausible-sounding fiction. That is the same trade the seven product
figures were decided on, and it is the right one for a company whose product is
trust in its engineering.
