# Novixa — Production Audit

Current state of the platform, the defects found, and what was done about each.
Every entry carries the evidence it rests on. Updated as work lands.

**Last updated:** 2026-10-06
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
| Quality gates | typecheck · ESLint 9 · 78 Vitest unit tests · 120 Playwright E2E · Lighthouse |

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

*Re-confirmed live, 2026-10-06:* production (`main`) still serves
`<link rel="canonical" href="https://novixa.dev/ar">`, and `https://novixa.dev/ar`
now answers **404** (an nginx default page — the planned domain is not pointed at
this site). The live page also carries **no `og:image` at all**. The branch
preview, fetched through Vercel's authenticated bypass, serves the corrected
markup: canonical, `og:url` and `hreflang` on `novixa-cyan.vercel.app`, an
`og:image`, and `/og` returning `200 image/png`. Merging PR #1 is what fixes
production; nothing else does.

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
not the 100 recorded in `AGENTS.md`. (Accessibility scoring is deterministic —
unlike performance, a single run is sufficient there.)
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

### P2-8 · Gradient-clipped text can vanish in forced-colors mode — FIXED

The hero headline paints its second line by clipping a gradient to the glyphs
(`color: transparent` + `background-clip: text`). Windows High Contrast mode
discards background images — including that gradient — and nothing restored the
colour. The headline is the first thing the page says.

Found while closing P3-1 below: the pixel-sampling contrast pass could not read
the element's colour because it is literally `transparent`, which is what
prompted the question.

*Fix:* a `@media (forced-colors: active)` block restoring `CanvasText` and
releasing the clip, written against the `.bg-clip-text` pattern rather than the
one element. The focus ring's `box-shadow` is also dropped in that mode, so the
outline is restated there using the system `Highlight` colour.

*Caught by its own test:* the first version of the rule sat inside
`@layer base` and silently half-applied — cascade layers outrank specificity,
so it lost to Tailwind's `utilities` layer on `background-clip` while still
winning on `color`. The browser test asserted both halves and failed. Unlayered
rules beat every layer, which is where it lives now.

### P3-1 · axe `color-contrast` is unstable on this interface — RESOLVED BY MEASUREMENT

axe resolves a background by walking the DOM. This interface is built on
semi-transparent surfaces (`glass-card`, `glass-overlay`, `bg-slate-900/50`) and
`backdrop-filter`, over which it cannot composite correctly — its verdict changed
between two consecutive runs on identical markup.

*Decision:* the rule is disabled in the axe gate and contrast is measured by
Lighthouse instead, which reports 100 on every touched page. A tool assignment,
not a coverage gap.

*The manual pass was then done, from rendered pixels.* Every visible text node
on `/ar`, `/en`, `/ar/dashboard`, `/ar/solutions`, `/ar/start-project`,
`/ar/faq` and `/ar/contact` — 290 nodes — was measured by screenshotting the
page and sampling the actual composited pixels behind each one, with foreground
colours resolved through a canvas round-trip so Tailwind v4's `oklch` output is
read correctly rather than mis-parsed.

**Result: no genuine failures.** Four nodes were flagged and all four are
limitations of the method, confirmed by inspection:

- two are large dense white headings where the most-common pixel inside the box
  is the glyph itself, not the surface (white on `#020617` is ~19:1);
- two are the gradient-clipped headline, whose computed `color` is
  `transparent` and therefore unreadable this way (the gradient's stops,
  blue-400 through teal-300 on `#020617`, measure ~8:1 to ~13:1).

The second pair is what surfaced P2-8 above.

### P2-7 · No real app icons; manifest not installable — FIXED

`public/` contained only `fonts/`. There was no `favicon.ico`, no PNG icons at
any size, and the manifest declared `display: 'browser'` with a single SVG — so
the site could not be added to a home screen, and browsers that request
`/favicon.ico` by convention got a 404.

*Fix:* 192/512 icons plus maskable variants (artwork inside an 80% safe zone, so
Android's launcher crop does not clip the logo), a 180px Apple touch icon, and a
`favicon.ico`. Manifest is now `standalone`, `lang: ar`, `dir: rtl`.

### P3-0 · Mobile performance is 78; the bottleneck is layout, not JavaScript — PARTIALLY ACTED ON

Lighthouse, throttled mobile, `/ar`, **median of 7 runs**:

| Metric | Value | Reading |
|---|---|---|
| CLS | **0** | The font work holds — no layout movement at all |
| FCP | 1.4 s | Good |
| LCP | 4.9 s | **Poor.** 92% of it is *render delay*, not network — the H1 is in the HTML at 460 ms and does not paint for five seconds |
| TBT | 193 ms | Acceptable |

**Correction to an earlier figure in this document:** a performance score of 72
was recorded from a single run. The median of seven is **78**; individual runs
on this container range 73–83. A single Lighthouse run is not a measurement
here, and the 72 should not be cited.

The cause is main-thread work, and specifically **Style & Layout (~1300–1500 ms)**
rather than script. The homepage lays out twelve full sections.

**Tried and kept — architectural, not a measured win.** Ten presentational
sections and six views were client components solely because they called
`useLanguage()`, a hook. A server-side `createTranslator(lang)` lets them take
the locale as a prop and leave the client bundle entirely.

Deterministic result, straight from the build:

| Route | First-load JS before | after |
|---|---|---|
| `/[lang]` (home) | 208 kB (22.7 kB page) | **193 kB** (10.8 kB page) |
| `/[lang]/work` | 188 kB (6.1 kB) | **106 kB** (200 B) |
| `/[lang]/about` | 142 kB (5.7 kB) | **106 kB** (200 B) |
| `/[lang]/products` | 141 kB (4.3 kB) | **106 kB** (200 B) |

Lighthouse result, median of 7 runs each side: **78 → 78**. LCP 4.9 s → 5.1 s,
TBT 193 ms → 188 ms. No measurable change.

That is the honest outcome and it is worth stating plainly: removing JavaScript
removed JavaScript. It did not move the score, because the bottleneck is the
cost of laying out a very long page, not of evaluating script. The change is
kept because 36 kB less JS delivered, parsed and hydrated on three routes is a
real saving for a visitor on a slow connection — and because a static section
being a client component was wrong regardless — but it is **not** presented as
a performance win.

**Tried and reverted:** code-splitting the ten below-the-fold sections with
`next/dynamic`. Measured worse on the runs available at the time (TBT
330 → 570 ms); the chunks still all load, so splitting added per-chunk
evaluation overhead without removing work.

**What would actually move LCP, not attempted here:** reducing how much DOM the
homepage lays out before the hero can paint. Twelve sections of markup is the
cost; deferring the below-the-fold DOM itself (not merely its JavaScript) is
the lever. That is a content-structure decision as much as a technical one and
belongs in its own change, with the median-of-7 protocol used above.

### P1-9 · `text-slate-500` still shipped as readable text in two components — FIXED

P1-8 raised the micro-text that a visual review had noticed. It did not catch
every instance, and nothing stopped a new one being written: a fresh page used
`text-slate-500` for small muted text and Lighthouse accessibility dropped from
100 to 96. Measured on the real surfaces, `#64748B` is **4.24:1** on the canvas
and **3.79:1** over a card — under the 4.5:1 floor for normal text. A grep then
found the same usage already live in `AdrSnippetCard` (a label) and `AboutView`
(a 10px stage number).

*Why it recurred:* the fix existed, the rule did not. "Raised to slate-400" is an
action; "slate-400 is the floor, and here is what slate-500 measures" is a rule
someone can apply without having been present.

*Fix:* all text usages raised to `text-slate-400` (**7.87:1** / **7.04:1**). The
remaining `slate-500` uses are `CommandMenu` arrow icons — non-text UI at a 3:1
threshold, which they pass. The floor is now written in `AGENTS.md`, published as
a token with its measured ratios on `/{lang}/design-system`, and the published
figures are asserted by `tests/design-system-facts.test.ts`.

### P1-10 · Every social card a container served was a 500 — FIXED

The `Dockerfile` copied the build output and ran `next start` in a runner stage
with no `src/`. `/og` reads `src/app/og/IBMPlexSansArabic-SemiBold.ttf` at request
time, so on any Docker host — Railway, a VPS, Compose — every share card failed.
Vercel was unaffected, which is why it went unnoticed.

*Evidence:* the old runner stage assembled in an isolated directory and started:
`/og` → `500`, log `ENOENT … IBMPlexSansArabic-SemiBold.ttf`.
*Fix:* Next standalone output, gated on `NEXT_OUTPUT=standalone` so the Vercel
pipeline and the browser suite's `next start` are untouched. Standalone traces the
font in through the existing `outputFileTracingIncludes`. Same isolated test:
`/og` → `200 image/png`; runtime dependencies 716 MB → 79 MB.
*Hypothesis that did not survive:* the old image was expected to have lost the
security headers too, since the runner never saw `next.config.ts`. It had not —
headers and redirects compile into `routes-manifest.json`, which it did copy.
Recorded so it is not "fixed" again.

### P2-9 · `role="tablist"` promised keyboard behaviour it did not implement — FIXED

The console's module switcher declared `role="tablist"` with `role="tab"`
children and correct `aria-selected`. axe passes that markup. But the role is a
promise to a keyboard user that arrow keys move between tabs, and they did not —
every tab was its own tab stop, and the pattern was announced but absent.

*Fix:* roving tabindex (`0` on the selected tab, `-1` on the rest), `ArrowLeft` /
`ArrowRight` with wrapping, `Home` / `End`, and left/right swapped under RTL so
"next" is always the visually following tab. A browser test asserts it, because
an automated accessibility scan cannot tell a kept promise from a broken one.

### P2-10 · A caret range on the test runner turned the whole browser suite red — FIXED

105 browser tests failed, each in about 4 ms, with `Executable doesn't exist at
/opt/pw-browsers/chromium_headless_shell-1243/...`. Nothing in the product had
changed. `@playwright/test` sat behind `^1.63.0`, resolved to 1.63, and 1.63
demands browser revision 1243 while the environment provisions 1194.

*Why it matters beyond this repo:* in the summary line a toolchain failure and a
product regression are indistinguishable — "105 failed" either way. Reading the
first error rather than the count is the difference between a two-minute fix and
an afternoon.

*Fix:* the config resolves an executable explicitly —
`PLAYWRIGHT_CHROMIUM_PATH`, else `<PLAYWRIGHT_BROWSERS_PATH>/chromium`, else
Playwright's own download — checking each file exists rather than trusting the
variable. The caret is gone: a runner that pins a browser revision should not
float its own version.

### P2-11 · Two documents had drifted into contradicting the code — FIXED

`docs/DESIGN_SYSTEM.md` described `.glass-card` as carrying a 16px backdrop blur.
That was removed deliberately and for a measured reason (57 instances on the
homepage, each promoting a compositing layer to blur a flat colour). It also
listed an indigo accent `#6366F1`, which appears nowhere in the code and which
`AGENTS.md` rules out explicitly, and named JetBrains Mono as the monospace face,
which is not loaded. `docs/DESIGN_AND_ARCHITECTURE_DECISIONS.md` duplicated the
plan's decisions section at an older state.

*Fix:* both archived. The still-true, not-yet-captured part — the emerald/amber/
rose status palette, used across 25 files — became published tokens with measured
ratios. The design system is now generated from `src/content/design-system.ts`,
which imports the chart palette from the console's own module, and five unit tests
assert the published figures against reality. A document that disagrees with the
code is worse than no document, and the only durable defence is a test.

### P0-2 · A critical Next.js advisory in the installed version — FIXED

`npm audit --omit=dev` (2026-10-07) reported Next.js 15.5.23 as **critical**: unauthenticated remote code execution through the Image Optimization API, among others. That is the version the production image would have shipped. Next.js was moved to **15.5.27** within the existing `^15.5` range, with `npm audit fix` and no `--force`, which clears every critical and high runtime advisory except the one in P3-4. The build, unit, integration and E2E suites all passed on the new version.

### P1-11 · An enquiry existed only as an email — FIXED

Before this pass, a submission that Resend rejected was gone: the key expired, the from-address was unverified, or the message landed in spam. Nothing kept the lead. Now every submission is written to PostgreSQL first, and email is a notification *about* the row. `/admin` (scrypt password, HMAC session cookie with `Secure`/`HttpOnly`/`SameSite=Strict` scoped to `/admin`, 10 attempts per 15 minutes) lists, filters, searches, exports (with a CSV formula-injection guard) and tracks every lead through a status pipeline. The SQL is proven by an integration suite that runs against a real PostgreSQL service in CI.

### P1-12 · Production depended on a third-party email account that did not exist — FIXED

The only transport was Resend, and the Resend domain was never verified. The site now also sends over authenticated SMTP (`src/lib/mail.ts`, nodemailer with STARTTLS required and file/URL access disabled), through the mailcow server that already hosts novixa.dev mail. Resend stays as an option and wins when its key is set. The SMTP path was exercised end to end against a server that requires STARTTLS and authentication: notification, Arabic acknowledgement, `email_delivered = true`.

### P2-12 · The rate limits trusted a header the client controls — MITIGATED AT THE PROXY

The contact form (5/min) and the admin login (10/15 min) key on the first `X-Forwarded-For` entry. A proxy that *appends* to that header lets a client put any address first and rotate past both limits. The production nginx block overwrites it with `$remote_addr`, after `real_ip` has taken `CF-Connecting-IP`, and only from Cloudflare's published ranges. Rehearsed: six posts, each with a different forged `X-Forwarded-For` and `CF-Connecting-IP`, returned 200 ×5 and then 429. `DEPLOYMENT_GUIDE.md` §6 states the requirement for any other proxy.

### P2-13 · No automated path to production at all — FIXED

Production was whatever Vercel built from `main`, with no database and no rollback. There is now `.github/workflows/deploy.yml` plus `deploy/`:
- It runs only after CI passes on a push to `main`.
- It builds the image with the commit SHA baked in and pushes it to GHCR.
- It connects over SSH with a pinned host key.
- On the server: back up the database, start the new image behind a health check (which also applies migrations), verify the reported version, and **roll back automatically** otherwise. The nginx site block is installed behind `nginx -t`.
- Finally, it checks the deployed version through Cloudflare.

The rehearsal (`deploy/README.md`) found and fixed one real defect before it ever ran: `.env` was rewritten with the new tag *before* the image pull. A failed pull therefore left the "previous release" pointing at an image that never ran, so the next rollback would have targeted it. The new tag is now passed through the environment and recorded only once the release is healthy.

### P2-14 · The admin's daily chart drew at half width — FIXED

The SVG had a fixed height and a `viewBox`, so the default `preserveAspectRatio` letterboxed it into the middle half of its card. Found on the screenshot taken during the rehearsal. It now stretches; the chart has no text inside to distort.

### P2-15 · The first real deploy failed on a mixed-case image name — FIXED

The first run of the Deploy workflow on `main` (2026-10-08) stopped in the image job, before touching the server:

```
invalid tag "ghcr.io/Novixa-dev/novixa:sha-…": repository name must be lowercase
```

The workflow built the image reference from `github.repository`, which keeps the capital `N` of the `Novixa-dev` organisation, and Docker refuses upper case in an image name. The rehearsal had used a lower-case organisation (`novixa-dev`), so it could not have caught this.

*Evidence:* the failing run's log (the `docker/build-push-action` step); nothing was deployed and the server was not reached.
*Fix:* Actions expressions have no lower-case function, so a shell step computes `ghcr.io/${GITHUB_REPOSITORY,,}` once, in the build job. The deploy job takes the same value from that job's outputs, so the two cannot disagree. `tests/deploy-workflow.test.ts` fails if the raw repository name is interpolated into an image reference again.
*Checked:* a search of `.github/` and `deploy/` for any other hand-built image reference found none. The server-side scripts receive the image name as an argument and never build it.

### P3-4 · PostCSS advisory inside Next.js — ACCEPTED

Next.js 15.5.27 vendors PostCSS 8.4.x, which carries an XSS advisory (unescaped `</style>` in stringified CSS) and several source-map path traversal advisories. The only fix `npm audit` offers is Next.js 16 (P3-3). PostCSS runs here only at build time, over this repository's own stylesheets: no visitor-supplied CSS is ever parsed. Re-check when moving to Next.js 16.

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
| `npm run test` (Vitest) | 124 passed, plus 8 PostgreSQL integration tests when `TEST_DATABASE_URL` is set (always in CI) |
| `npm run test:e2e` (Playwright) | 171 passed — desktop, tablet, mobile; the admin suite additionally 8× repeated per viewport, 192/192 |
| `npm run build` | clean, 104 pages, 92 indexable URLs |
| Lighthouse a11y / best-practices / SEO | **100 / 100 / 100** on `/ar`, `/en`, `/ar/design-system`, `/en/design-system`, `/ar/dashboard`, `/en/dashboard`, `/ar/contact`, `/ar/products`, `/ar/solutions`, `/ar/faq`, `/ar/start-project`, `/ar/about`, `/ar/services/custom-software`, `/ar/solutions/restaurant-system`, `/ar/legal/privacy` |
| Lighthouse performance (throttled mobile, `/ar`) | **78** (median of 7; range 73–83) — CLS 0, FCP 1.4 s, LCP 4.9 s, TBT 193 ms. See P3-0 |
| LCP element render delay, observed (`/ar`) | **288 ms** (median of 5), from 1275 ms. See P3-0 |

---

## 4. Requires human action

| Item | Why it needs a person |
|---|---|
| `NEXT_PUBLIC_SITE_URL` in Vercel | Canonical URLs, hreflang, sitemap and OG cards are prerendered at **build** time. The Vercel fallbacks keep a deployment self-consistent, but only this variable survives a domain change. |
| **VPS go-live** (`deploy/README.md` §1–5) | Cloudflare DNS + SSL mode + origin certificate; one run of `server-setup.sh` as root on the server; a `no-reply@novixa.dev` mailbox, DKIM/SPF/DMARC and reverse DNS for mailcow; the GitHub `production` environment secrets and `DEPLOY_ENABLED=true`. Each needs an account only the owner holds. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | The WhatsApp channel is hidden until a real number is set. Leaving it unset is correct; a placeholder is not. |
| ~~Vercel cannot deploy~~ · **RESOLVED** | Was `Cannot deploy from a private GitHub organization repository on the Hobby plan`. The repository was made public on 2026-10-06 and deployment resumed on the first push after: Vercel status `success`, preview built and Ready. |
| ~~GitHub Actions is not executing~~ · **RESOLVED** | Same root cause — a private organization repository on the free tier of both services. CI has run green on every push since, including the full browser suite. |
| ~~Preview deployments cannot be verified~~ · **RESOLVED** | The preview is still behind Deployment Protection (correctly), but Vercel's authenticated bypass now lets it be fetched for QA. Done on 2026-10-06; results under P0-1. |
| ~~Merge PR #1~~ · **DONE 2026-10-07** | The canonical and `og:image` are fixed in production. |
| `NEXT_PUBLIC_SITE_URL=https://novixa.dev` on Vercel, once the VPS is live | Then the Vercel deployment's canonicals point at the primary domain rather than competing with it. |
| **Link GitHub to Railway** | The Railway project, service, domain (`web-production-d2452.up.railway.app`) and variables are in place, but Railway's GitHub app has no access to `Novixa-dev`, so the service cannot read the repository. Steps in `DEPLOYMENT_GUIDE.md` §4. |
| Legal review | `src/content/legal.ts` is engineering-authored copy describing real system behaviour (`LEGAL_REVIEW_PENDING = true`). A lawyer should read it before launch. |
| Real social profiles | `linkedin.com/company/novixa`, `github.com/novixa`, `x.com/novixa` are referenced in `sameAs` structured data and the footer. Unverified. |
