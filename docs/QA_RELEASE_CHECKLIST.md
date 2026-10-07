# Novixa — QA & Release Checklist

What is verified automatically, what still needs a person, and the gate before a
production release.

**Last updated:** 2026-10-06
**Legend:** ✅ automated · 👤 manual · ⚠️ blocked

---

## 1. Run the gate

```bash
npm ci
npm run verify     # typecheck → lint → unit → build → e2e
```

`npm run test:e2e` starts its own production server on port 3100 and always
starts a fresh one — see §7.

| Gate | Command | Current |
|---|---|---|
| Types | `npm run typecheck` | ✅ clean |
| Lint | `npm run lint` | ✅ 0 errors, 0 warnings |
| Unit | `npm run test` | ✅ 96 passed |
| Build | `npm run build` | ✅ 104 pages, 92 indexable URLs |
| Browser | `npm run test:e2e` | ✅ 144 passed (desktop · tablet · mobile) |

---

## 2. Functional

| Check | How |
|---|---|
| ✅ Every sitemap URL serves 200 | `e2e/routes.spec.ts` — driven by the sitemap, so an advertised URL that 404s fails the build |
| ✅ Unknown locale 404s | `/not-a-locale` — `dynamicParams = false` |
| ✅ Unknown page under a valid locale 404s | Real 404 status, not a soft 404 |
| ✅ Root redirects to `/ar` | 308 |
| ✅ Locale switch keeps the page | `/ar/solutions` → `/en/solutions` |
| ✅ Contact form rejects empty input and announces each problem | `role="alert"` / `aria-invalid` |
| ✅ A server failure reads as a failure | Route intercepted with a 502; success text must not appear |
| ✅ Honeypot is visually hidden, `aria-hidden`, out of the tab order | Not `display: none` — bots skip those |
| ✅ Dashboard switches modules and exposes a table view | |
| ✅ The console window selector changes how much history the table shows | 14 → 30 → 90 rows |
| ✅ Widening the window leaves the most recent day unchanged | Generated data that reshuffles reads as a bug |
| ✅ The console view is restorable from its URL | `?module=…&days=…&table=1` |
| ✅ Arrow keys move between console tabs | `role="tablist"` is a promise; axe cannot check it |
| ✅ The exported CSV carries the illustrative-data notice | A download leaves the page's disclaimer behind |
| 👤 A real submission arrives by email | Needs `RESEND_API_KEY` — §6 |
| 👤 WhatsApp channel opens the right chat | Needs `NEXT_PUBLIC_WHATSAPP_NUMBER` — §6 |

---

## 3. Arabic RTL / English LTR

| Check | How |
|---|---|
| ✅ `dir` and `lang` correct per locale | Both set before first paint by a blocking script, and kept in sync on client navigation |
| ✅ H1 is in the page's own language | |
| ✅ No English sentences on Arabic pages | Latin glosses in parentheses are a deliberate convention and are excluded |
| ✅ No Arabic on English pages | The brand wordmark and the language switch are excluded — both carry `lang` |
| ✅ No horizontal scroll in either direction | The classic RTL regression |
| ✅ Nav fits at 820 / 1024 / 1280 / 1440 | Every header descendant measured against the viewport |
| ✅ Arabic and English strings never left empty | `tests/content-integrity.test.ts` |
| 👤 Arabic reads as written Arabic, not translated English | Needs a native reader |

---

## 4. Accessibility

| Check | How |
|---|---|
| ✅ axe WCAG 2.2 A/AA on eight pages | `color-contrast` excluded — see §8 |
| ✅ Skip link is the first tab stop and works | |
| ✅ 25 tab stops each show a visible focus ring | |
| ✅ One `h1` per page, no skipped levels | |
| ✅ Reduced motion removes decorative movement | |
| ✅ The hero headline survives forced-colors mode | Gradient-clipped text would otherwise vanish in Windows High Contrast |
| ✅ Contrast measured from rendered pixels | 290 text nodes across seven pages; no genuine failures — §8 |
| ✅ Lighthouse accessibility | **100** on every touched page |
| 👤 Screen-reader pass (NVDA / VoiceOver) in Arabic | Automation cannot judge this |
| ✅ Contrast over glass surfaces | Measured from pixels, not from the DOM — §8 |

---

## 5. SEO

| Check | How |
|---|---|
| ✅ Canonical, hreflang and OG resolve to the serving origin | `tests/site-url.test.ts` |
| ✅ Sitemap covers every route in both locales, no duplicates | `tests/routing.test.ts` |
| ✅ The sitemap advertises exactly what the content catalogs account for | 92 URLs, asserted as a total — catches an entry no content backs |
| ✅ The figures published on `/design-system` match reality | `tests/design-system-facts.test.ts` — two prose documents were archived for drifting; this is the defence |
| ✅ `lastModified` is a fixed stamp, not "now" | "Now" on every crawl devalues the signal |
| ✅ robots.txt names an absolute sitemap URL | |
| ✅ Lighthouse SEO | **100** on every touched page |
| 👤 Rich Results Test on `/ar/faq` and a product page | Needs a public URL |
| 👤 Search Console submission | Post-launch |

Structured data in place: Organization · WebSite · BreadcrumbList · Service ·
SoftwareApplication · Article · ContactPage · FAQPage · ItemList.

---

## 6. Deployment

| Step | State |
|---|---|
| ✅ Production build succeeds | |
| ⚠️ `NEXT_PUBLIC_SITE_URL` set in Vercel | **Required.** Canonical, hreflang, sitemap and OG are baked at build time; only this variable survives a domain change |
| ⚠️ `RESEND_API_KEY` + `RESEND_FROM_EMAIL` | Without them the API logs and returns `delivered: false`. From-address must be on a domain verified in Resend |
| ⚠️ `NEXT_PUBLIC_WHATSAPP_NUMBER` | Channel stays hidden until set — correct, but the channel is absent |
| 👤 `NEXT_PUBLIC_VITALS_ENDPOINT` | Optional. Field Core Web Vitals report nowhere until a destination is chosen |
| ✅ **Vercel can deploy** | Resolved 2026-10-06 by making the repository public. Status `success`, preview built and Ready |
| ✅ GitHub Actions executing | Green on every push since, browser suite included |
| ✅ Preview QA | Run 2026-10-06 through Vercel's authenticated bypass: canonical/hreflang/og:url on the production host, `og:image` present, `/og` → `200 image/png`, unknown page → 404 + noindex, robots names an absolute sitemap, security headers present, preview sends `x-robots-tag: noindex` |
| ⚠️ Production still serves the dead-origin canonical | `main` points canonical at `https://novixa.dev/ar` (404) and has no `og:image`. Fixed by merging PR #1 |
| ⚠️ Railway | Project, service, domain and variables ready; waiting on the GitHub app being granted `Novixa-dev` — `DEPLOYMENT_GUIDE.md` §4 |
| ✅ Container image serves social cards | `/og` was a 500 in any Docker deployment (font not in the image); standalone output fixes it — `PRODUCTION_AUDIT.md` P1-10 |
| ✅ Security headers | HSTS, nosniff, frame options, referrer policy, permissions policy |
| 👤 Custom domain + HTTPS | |
| 👤 Re-test the live URL after deploy | §9 |

---

## 7. Why the E2E server is never reused

`reuseExistingServer: false` is deliberate. A stale `next start` from an earlier
build once answered an entire debugging session: every measurement described a
build that no longer existed, and four experiments chased a defect that was not
there. Starting fresh costs a few seconds and removes the whole class of false
result. Do not "optimise" it back.

---

## 8. Why axe does not check contrast here

axe resolves a background by walking the DOM. This interface is built on
semi-transparent surfaces (`glass-card`, `glass-overlay`, `bg-slate-900/50`) and
`backdrop-filter`, which it cannot composite — its verdict changed between two
consecutive runs on identical markup. Contrast is gated by Lighthouse instead,
which reports 100 on every touched page.

A tool assignment, not a coverage gap. The glass surfaces were then measured
directly: 290 text nodes across seven pages, sampled from rendered screenshot
pixels rather than resolved from the DOM, so a semi-transparent panel was read
exactly as it paints. No genuine failures (`IMPLEMENTATION_PLAN.md` R4,
`PRODUCTION_AUDIT.md` P3-1).

---

## 9. After deploying

Run these from a machine with ordinary outbound internet access. The container
this work was done in is behind a network policy that allows GitHub and the
package registries only, so it cannot reach a deployed URL — every check below
is a person's to run, not a gap in the automated suite.

1. `curl -I` the live URL — expect 200 on `/ar` and `/en`, 308 on `/`, 404 on `/ar/nonsense`.
2. View source on `/ar`: canonical, `og:url` and `og:image` must all name the live domain.
3. Fetch the `og:image` URL directly — it must return a PNG, not an error.
4. Paste the live URL into a social debugger and confirm the card renders.
5. `/sitemap.xml` and `/robots.txt` must carry the live domain.
6. Submit a real enquiry through the form and confirm it arrives.
7. Re-run Lighthouse against the live URL, not localhost.
8. Open `/ar` and `/en` on a real phone — Arabic rendering and tap targets.

---

## 10. Release sign-off

- [ ] `npm run verify` green
- [ ] Environment variables set (§6)
- [ ] Live URL re-tested (§9)
- [ ] A native Arabic reader has read the site
- [ ] Legal has read `src/content/legal.ts` (`LEGAL_REVIEW_PENDING`)
- [ ] Social profile URLs in `sameAs` confirmed to exist
- [ ] No claim on the site is unsupported by evidence
