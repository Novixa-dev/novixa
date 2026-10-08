# AGENTS.md — Novixa Design & Engineering Reference

> **Picking up the project?** `docs/NEXT_STEPS.md` is the ordered list of what remains before `novixa.dev` is live, with commands and verifications. `deploy/README.md` is the production runbook.

This file exists so future AI-assisted work on this repository stays consistent with decisions already made, instead of re-deriving (and drifting from) them. If you're an agent about to touch UI code here, read this first.

## What Novixa is

A software engineering company (custom platforms, SaaS products, digital operating systems) serving the Middle East/GCC, with a bilingual Arabic/English site where **Arabic is the default and primary language**, not a translation of an English original. Brand tone: technical precision and architectural restraint — a serious engineering firm, not a generic agency or template.

## Stack

Next.js 15 App Router, TypeScript, Tailwind CSS v4, `motion/react` (Framer Motion), `lucide-react` for icons. No CMS — content lives in `src/content/data.ts`, typed via `src/types.ts`. Locale routing is `[lang]/...` (`ar` | `en`), handled in `src/context/LanguageContext.tsx` via a `t(arText, enText)` helper — every user-facing string goes through this, no exceptions.

The decisions below are also published, client-facing, at `/{lang}/design-system`, generated from `src/content/design-system.ts`. If you change a token here, change it there — the page exists so a prospect can audit the claim, so a stale page is worse than no page.

## Visual identity — do not change without a real reason

- **Palette:** deep slate canvas (`#020617` / `#0f172a`), royal blue (`#2563EB`, `blue-600`) as the primary action color, teal (`#14B8A6`-ish, `teal-600/700`) as a secondary accent. No purple/indigo anywhere — this was a deliberate anti-generic-SaaS decision, not an oversight. Dark-only; there is no light theme.
- **Typography:** `Alexandria` for display/headings (`font-display`), `IBM Plex Sans Arabic` for Arabic body (`font-arabic`), `Inter` for English body (`font-latin`, applied via `html[lang="en"] body`). All loaded through `next/font` (`src/app/fonts.ts`) — self-hosted, no runtime Google Fonts request. Reference these via the CSS variables (`var(--font-display)` etc.) or the `.font-*` utility classes in `globals.css`, which already point at those variables — never hardcode a literal font-family string.
- **Radius hierarchy:** outer containers `rounded-2xl` (16px), inner cards `rounded-xl` (12px), buttons/inputs `rounded-lg`/`rounded-xl`, badges/pills fully rounded. Keep this nesting relationship when adding new components.
- **Muted text floor:** `text-slate-400` (`#94A3B8`) is the lightest shade allowed for readable text — 7.87:1 on the canvas, 7.04:1 over a card. `text-slate-500` (`#64748B`) measures 4.24:1 and 3.79:1, under the 4.5:1 normal-text threshold, so it is reserved for non-text UI (icons, dividers) where the threshold is 3:1. This is not theoretical: the design-system page was written with `text-slate-500`, dropped Lighthouse accessibility from 100 to 96, and the same usage turned up in `AdrSnippetCard` and `AboutView`. Published with the measured ratios on `/{lang}/design-system`.
- **Cards:** `.glass-card` (defined in `globals.css`) is the standard elevated-surface treatment — `rgba(15,23,42,0.92)` and a hairline border, **no `backdrop-filter`**. The homepage renders 57 of them and each blur promoted its own compositing layer to blur a flat colour, measured as the largest single Style & Layout cost on the page. Use `.glass-overlay` (which does blur) only for surfaces that genuinely float over scrolling content: navbar, modals, command menu.
- **Icons:** `lucide-react` exclusively, used functionally (status, inline meaning) — not as a grid of identical 48×48 decorative stamps on every card. One exception exists on principle, not by accident: `src/components/ui/WhatsAppIcon.tsx` is a hand-inlined SVG for the one spot that names a real third-party product (WhatsApp) lucide has no brand glyph for. Don't add a second icon library to get more of these — extend that pattern (one-off inline SVG) instead.

## Typography micro-rules (Vercel Web Interface Guidelines, applied here)

- Curly/locale-correct quotes, not straight ones: Arabic pull-quotes use `«` `»` (via `t('«','"')` / `t('»','"')`), English uses `"` `"`. See `FounderSection.tsx`.
- `h1`/`h2` get `text-wrap: balance` globally (`globals.css`) — don't fight this per-component, it's a global rule.
- `body` sets `font-variant-numeric: tabular-nums` globally so stat/metric numbers align — no need to add `tabular-nums` per element.
- Arabic display headings need `leading-snug` (or better) on `font-display` text — Tailwind's default tight line-height for `text-3xl`+ causes ascenders/diacritics from a wrapped second line to visually collide with the line above in Arabic. Every heading in the codebase already carries this; keep it on new ones.
- `tracking-tight` is fine for Latin display type; be more careful applying it to Arabic — it's cosmetically tolerated here (see `HeroSection.tsx`'s `tracking-normal lg:tracking-tight` pattern) but don't add it reflexively to new Arabic-only headings without checking it doesn't crowd the glyphs.

## RTL / LTR rules

- Never hardcode `text-left`/`text-right`, `ml-*`/`mr-*`, or directional icons. Use the logical pattern already established: `text-right rtl:text-right ltr:text-left` (yes, this looks redundant — it's intentional, RTL is the default unmarked state and `ltr:` is the override), and pick the arrow icon direction from `isRtl` (`const ArrowIcon = isRtl ? ArrowLeft : ArrowRight` — forward motion points left in RTL, right in LTR).
- The root `<html lang dir>` is set two ways that must stay in sync: a blocking inline script in `src/app/layout.tsx` (so `/en` never flashes RTL before hydration) and `LanguageContext`'s effect after hydration. If you touch locale detection, update both.
- `[lang]/layout.tsx` uses `dynamicParams = false` — `ar`/`en` are the only valid values; anything else 404s via `[lang]/[...catchall]/page.tsx` rather than silently falling back to Arabic. Don't loosen this — it's what stops garbage URLs from soft-404ing as indexable duplicate content.
- Brand/technical Latin terms embedded in Arabic sentences (`NOVIXA` in the logo, product names, tech-stack tokens) should carry `translate="no"` where they're a standalone, high-visibility text node — protects them from browser auto-translate mangling. Not applied exhaustively everywhere a Latin word appears inline in a sentence; use judgment for where it's load-bearing (brand mark, product name) versus incidental (a tech tag in a pill).

## Content rules — the load-bearing one

**Never fabricate:** client names, testimonials, logos, quotes, statistics, "years of experience," partnerships, certifications, or engagement models. If information isn't verified, the correct move is to omit it or explicitly label it as illustrative — not to invent something plausible-sounding. This has been the standing rule across every session on this project; a `TestimonialsSection` with fabricated clients briefly existed on a diverged git branch and was deliberately removed rather than merged in. The Work page's case studies are honestly labeled (`Product Demonstration` / `Concept Architecture` / `Engineering Prototype`) rather than presented as real client results — keep that pattern for anything new.

There is currently no real, verifiable named individual (founder, team member) anywhere in the project — `FOUNDER_INFO` in `data.ts` is deliberately a "founding team" placeholder, not a named person. Do not invent one for a "Team" page or anywhere else; that's a manual action for a human to provide real names/photos/bios before it can be built.

## Anti-slop rules (see `.claude/skills/design-anti-slop`)

Before adding a new section, ask whether it's saying something specific to Novixa or whether it's structurally interchangeable with any SaaS template. Concretely, avoid without a specific reason:
- Purple/indigo as a default accent (not banned, just not the reflex — it isn't Novixa's palette).
- A three/four-box icon grid where the descriptions are generic enough to belong to any competitor — every card needs a claim only Novixa's actual product could make.
- A centered hero + two CTAs + logo strip. The hero is intentionally asymmetric with a real interactive system panel, not an illustration.
- A second "browse this category" header inside a component that's already embedded on a page with its own page-level H1 saying the same thing (see the `showHeader` prop pattern on `CaseStudiesSection`/`IndustriesSection`/`InsightsSection` — this exact redundancy was found and fixed once already; don't reintroduce it by adding a new shared section without checking where else it'll be embedded).

## Before shipping a UI change

1. `npm run typecheck` and `npm run build` both clean.
2. Check both locales in a real browser, not just source review — RTL/LTR bugs and mixed-language leaks (hardcoded English/Arabic strings not routed through `t()`) have repeatedly been the actual defects found in this project, not the polish-level things.
3. Check the change at a tablet width (768–1023px) specifically — the navbar's mobile/desktop breakpoint was tuned to `lg:` (1024px) after a real bug where the `md:` (768px) default cramped/wrapped the desktop nav on iPad-class widths. Don't move it back to `md:`.
4. Re-run Lighthouse (`npx lighthouse <url> --only-categories=accessibility,best-practices,seo`) on any page you touched — the whole site currently holds 100/100/100 on all three; a regression is a real signal, not noise.
