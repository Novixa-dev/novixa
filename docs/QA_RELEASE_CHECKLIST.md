# Novixa — QA & Release Checklist

What is verified automatically, what still needs a person, and the gate before a
production release.

**Last updated:** 2026-10-01
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
| Unit | `npm run test` | ✅ 78 passed |
| Build | `npm run build` | ✅ 90 routes |
| Browser | `npm run test:e2e` | ✅ 117 passed (desktop · tablet · mobile) |

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
| ✅ axe WCAG 2.2 A/AA on seven pages | `color-contrast` excluded — see §8 |
| ✅ Skip link is the first tab stop and works | |
| ✅ 25 tab stops each show a visible focus ring | |
| ✅ One `h1` per page, no skipped levels | |
| ✅ Reduced motion removes decorative movement | |
| ✅ Lighthouse accessibility | **100** on every touched page |
| 👤 Screen-reader pass (NVDA / VoiceOver) in Arabic | Automation cannot judge this |
| 👤 Contrast over glass surfaces | §8 |

---

## 5. SEO

| Check | How |
|---|---|
| ✅ Canonical, hreflang and OG resolve to the serving origin | `tests/site-url.test.ts` |
| ✅ Sitemap covers every route in both locales, no duplicates | `tests/routing.test.ts` |
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
| ⚠️ **Vercel can deploy at all** | **Currently blocked.** `Cannot deploy from a private GitHub organization repository on the Hobby plan` — production is frozen on an older build and no change in this repository can reach it until the plan or repository visibility changes |
| ⚠️ GitHub Actions executing | Run `36635306000` failed in 4s with no logs; all steps pass locally. Check Actions billing / spending limit / allowed-actions policy |
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

A tool assignment, not a coverage gap. A manual pass over the glass surfaces at
the smallest type sizes is still worth doing (`IMPLEMENTATION_PLAN.md` R4).

---

## 9. After deploying

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
