# NOVIXA WEBSITE — COMPREHENSIVE UI/UX, ACCESSIBILITY, SEO, PERFORMANCE & QUALITY AUDIT

**Audit date:** 2026-08-28  
**Audit type:** Professional pre-launch / production-quality website audit  
**Target:** Novixa company website  
**Primary audience:** Arabic-speaking and English-speaking business customers, founders, organizations, and potential clients  
**Primary business objective:** Convert qualified visitors into trust, inquiries, project opportunities, and long-term customers.

---

## 0. IMPORTANT AUDIT SCOPE & EVIDENCE STATUS

This report intentionally separates **verified standards / requirements** from **site-specific observations**.

At the time of this audit, the intended public Novixa domain could not be reliably discovered or fetched as a live website. A direct network attempt to `https://novixa.dev` also failed DNS resolution in the audit environment.

Therefore:

- This report does **not** pretend to have visually inspected pages that were not actually accessible.
- No claim below should be interpreted as “the site currently has this bug” unless it is explicitly marked **Verified / Project-Context**.
- The report provides a production-grade inspection framework covering the areas the Novixa team should validate against the actual implementation.
- Project requirements already established for Novixa are treated as **Project-Context**, including bilingual Arabic/English support, Arabic-first/RTL behavior, responsive-first design, a clean professional technology-company identity, strong SEO/social sharing, and a polished public-facing company experience.
- Once a stable public URL or staging URL is available, the remaining visual, interaction, performance, crawlability, and real-device findings should be re-run against the actual build.

**Recommended interpretation:** Treat this document as the **master acceptance checklist and redesign brief**, not as proof that every implementation detail is already present.

---

# 1. EXECUTIVE QUALITY STANDARD

## Target quality bar

The Novixa website should not merely “work.” It should feel like a trustworthy software engineering company whose own website demonstrates the engineering, product, UX, and design quality that Novixa sells to clients.

A strong launch standard is:

| Area | Target |
|---|---|
| Visual design | Premium, coherent, restrained, brand-consistent |
| UX | Obvious, low-friction, predictable |
| Accessibility | WCAG 2.2 AA target |
| Arabic / RTL | First-class, not a translated afterthought |
| English / LTR | Equally polished and natural |
| Responsive | Mobile-first, tablet-safe, desktop-polished |
| SEO | Crawlable, indexable, semantically strong, multilingual |
| Social sharing | Correct OG metadata and compelling share previews |
| Performance | Core Web Vitals in “Good” range |
| Trust | Real evidence, transparent information, credible content |
| Conversion | Clear primary CTA and low-friction contact path |
| Code quality | Semantic HTML, reusable design system, no fragile UI hacks |
| QA | Automated + manual + real-device validation |
| Production readiness | No critical UX, SEO, accessibility, security, or content blockers |

WCAG 2.2 is the current W3C Recommendation and should be the accessibility baseline for new work. W3C explicitly recommends using the latest WCAG version when developing or updating accessibility policies.  
Source: https://www.w3.org/TR/WCAG22/

---

# 2. FINAL DECISION MODEL

Use the following severity levels for every issue discovered during the implementation review.

### P0 — BLOCKER

Must be fixed before production.

Examples:

- broken primary CTA
- unusable mobile navigation
- major RTL corruption
- inaccessible critical interaction
- missing or broken homepage indexability
- production 5xx errors
- security-critical exposure
- catastrophic layout break at common viewport sizes

### P1 — HIGH

Fix before launch unless there is a documented business reason not to.

Examples:

- unclear value proposition
- inconsistent branding
- major mobile usability issue
- missing language alternates
- incorrect canonical/hreflang setup
- poor contrast in primary controls
- important form failures
- incorrect social preview
- significant performance regression

### P2 — MEDIUM

Should be fixed in the launch hardening pass.

Examples:

- inconsistent spacing
- minor typography issues
- non-ideal hover/focus behavior
- awkward empty states
- content hierarchy improvements
- minor animation inconsistencies

### P3 — LOW / POLISH

Post-launch or final polish.

Examples:

- subtle spacing refinement
- micro-interaction enhancement
- tiny icon alignment differences
- cosmetic copy improvements

---

# 3. EXECUTIVE SCORECARD

Because the live website could not be reliably fetched, the score below represents the **required acceptance target**, not a claim of measured current performance.

| Dimension | Target | Minimum launch bar |
|---|---:|---:|
| Brand / visual quality | 95/100 | 90 |
| UI consistency | 95/100 | 90 |
| UX clarity | 95/100 | 90 |
| Responsive quality | 95/100 | 90 |
| Arabic/RTL quality | 100/100 | 95 |
| English/LTR quality | 95/100 | 90 |
| Accessibility | 95/100 | 90 |
| SEO | 95/100 | 90 |
| Social / OG | 100/100 | 95 |
| Performance | 95/100 | 90 |
| Technical quality | 95/100 | 90 |
| Content / trust | 95/100 | 90 |
| Conversion readiness | 95/100 | 90 |
| QA / reliability | 100/100 | 95 |

**Recommended launch rule:** any P0 issue = fail. Any P1 issue touching homepage navigation, mobile UX, SEO indexability, language routing, primary CTA, accessibility, or production runtime should block “production ready” status.

---

# 4. BRAND & VISUAL DIRECTION

## 4.1 Brand consistency

Novixa should look like one coherent company everywhere.

Audit:

- logo proportions are stable
- correct logo variant is used for light/dark backgrounds
- iconography is consistent
- brand colors are not randomly altered
- border radii follow one system
- shadows follow one system
- button shapes are consistent
- typography hierarchy is consistent
- illustration style is consistent
- photographic style is consistent
- motion language is consistent
- CTA styles are consistent
- Arabic and English versions use the same visual system

### Project brand context

The previously defined Novixa visual direction favors:

- primary: `#2563EB`
- secondary/dark: `#0F172A`
- accent: `#14B8A6`
- white/light surfaces
- restrained professional UI
- no unnecessary gradients
- no mascots
- no cheap 3D effects
- no excessive glassmorphism
- no visual gimmicks that reduce engineering credibility

These choices should behave as a **design system**, not as isolated hex values.

---

# 5. DESIGN SYSTEM AUDIT

The site should have a documented design token system.

## Required token families

### Color

Define semantic tokens, not only raw colors.

Examples:

```text
--color-brand
--color-brand-hover
--color-brand-active
--color-surface
--color-surface-muted
--color-text
--color-text-muted
--color-border
--color-success
--color-warning
--color-error
--color-focus
```

Do not hard-code dozens of one-off colors.

### Typography

Define:

- display sizes
- H1
- H2
- H3
- H4
- body large
- body
- body small
- label
- caption
- button
- navigation

Typography must be explicitly tested in both Arabic and English.

### Spacing

Prefer a consistent scale rather than ad-hoc values.

Example conceptual system:

```text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
```

### Radius

Define a small set of radii:

```text
small / medium / large / pill
```

Do not let every card invent its own radius.

### Shadow

Keep shadows subtle. The Novixa visual language should communicate quality through spacing, typography, contrast, alignment, and composition rather than heavy effects.

---

# 6. LAYOUT & GRID QUALITY

## Global layout

Check:

- consistent maximum content width
- symmetrical page margins
- predictable section rhythm
- readable line lengths
- stable vertical spacing
- aligned headings and content blocks
- no random shifts between pages
- no “floating” elements with unclear relationship to the grid

## Desktop

Inspect at minimum:

- 1280×800
- 1366×768
- 1440×900
- 1536×864
- 1920×1080

## Tablet

Inspect at minimum:

- 768×1024
- 820×1180
- 1024×1366
- landscape tablet widths

## Mobile

Inspect at minimum:

- 320
- 360
- 375
- 390
- 412
- 430 CSS px widths

Do not optimize only for one “popular” mobile size.

---

# 7. FIRST-IMPRESSION / ABOVE-THE-FOLD REVIEW

The first viewport should answer three questions immediately:

1. What is Novixa?
2. What problem does Novixa solve?
3. What should I do next?

## Hero requirements

The hero should contain:

- strong, specific headline
- supporting explanation
- primary CTA
- optional secondary CTA
- clear visual hierarchy
- enough whitespace
- no unnecessary paragraph wall
- no vague “We build the future” style copy without concrete meaning
- no competing CTAs of equal visual weight
- no decorative element larger than the actual message

### Recommended CTA hierarchy

One dominant action:

**Start a Project / Talk to Novixa / Request a Consultation**

Secondary action:

**Explore Services / View Work**

Avoid four or five competing CTAs in the hero.

---

# 8. INFORMATION ARCHITECTURE

The navigation should reflect how a real customer thinks.

Recommended high-level structure:

```text
Home
Services
Products / Solutions
Work / Case Studies
About
Insights / Blog (if maintained)
Contact
Language Switcher
Primary CTA
```

The final navigation should remain compact.

Avoid:

- 10+ top-level items
- nested menus for content that does not deserve a top-level category
- unclear labels
- internal jargon
- duplicate destinations

## Navigation acceptance criteria

- current page is visually indicated
- keyboard accessible
- screen-reader understandable
- mobile menu is obvious
- menu can open/close reliably
- Escape closes overlays where appropriate
- focus is managed correctly
- no content becomes inaccessible behind a sticky header
- header remains usable in both RTL and LTR

WAI-ARIA guidance specifically emphasizes keyboard operation, predictable focus, and accessible names for interactive elements.  
Sources:
- https://www.w3.org/WAI/ARIA/apg/
- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

---

# 9. HEADER / NAVIGATION UX

## Desktop header

Inspect:

- logo click returns Home
- nav labels are understandable
- hover behavior is subtle
- active state is clear
- CTA stands out
- language switcher is clear
- sticky behavior does not cover content
- header height does not become visually dominant

## Mobile header

The mobile header is one of the highest-risk areas.

Must validate:

- menu icon has accessible name
- menu opens with obvious animation
- page behind the menu is properly controlled
- menu can close from close button
- Escape works where applicable
- focus is moved appropriately
- links have enough touch area
- menu does not overflow viewport
- language switcher is usable
- CTA remains easy to find
- no horizontal scrolling is introduced

WCAG 2.2 includes a minimum target-size requirement for many pointer targets; teams should design controls with comfortable touch targets rather than barely passing minimum dimensions.  
Source: https://www.w3.org/TR/WCAG22/

---

# 10. FOOTER UX

The footer should not be treated as an afterthought.

Recommended content:

- company identity
- concise description
- primary navigation
- services
- products
- contact information
- social links
- legal links
- copyright
- language context
- optional newsletter only if it is genuinely maintained

Audit:

- links are real
- no placeholder links
- no dead social accounts
- no inconsistent company naming
- no outdated phone/email/address
- no duplicate navigation clutter
- footer language switches correctly
- all links have clear labels

---

# 11. TYPOGRAPHY AUDIT

Typography is one of the largest contributors to perceived quality.

## English

Check:

- readable typeface
- balanced weights
- no excessive font-weight variation
- heading scale feels intentional
- paragraph width is comfortable
- buttons are legible
- labels are not too small

## Arabic

This is more demanding.

Check:

- Arabic font is genuinely optimized for UI
- glyph shapes remain clear at small sizes
- diacritics do not collide
- numerals are handled intentionally
- punctuation behaves naturally
- Arabic headings do not become unnecessarily tall
- line-height is increased where required
- mixed Arabic/English content behaves correctly

W3C states that `dir="rtl"` is the appropriate way to establish right-to-left direction for Arabic and other RTL scripts. Direction should be managed structurally rather than simulated with visual hacks.  
Source: https://www.w3.org/International/questions/qa-html-dir.html

---

# 12. RTL / BIDI AUDIT — CRITICAL FOR NOVIXA

Arabic support should not mean “translate strings and set text-align:right.”

## Direction

Validate:

```html
<html lang="ar" dir="rtl">
```

and for English:

```html
<html lang="en" dir="ltr">
```

The actual implementation may vary by framework, but the semantic document language and direction must remain correct.

## Logical CSS

Prefer logical properties:

```css
margin-inline
padding-inline
inset-inline
border-inline
text-align: start
```

Avoid unnecessary:

```css
margin-left
margin-right
left
right
```

when the property should mirror between RTL/LTR.

## RTL mirror checklist

Verify every component:

- header
- logo area
- breadcrumbs
- nav menus
- dropdowns
- cards
- icon + text rows
- arrow icons
- chevrons
- carousels
- sliders
- timeline
- statistics
- pricing
- forms
- validation messages
- modals
- drawers
- toast notifications
- pagination
- accordions
- tabs
- footer
- floating CTA

## Icons

Do not mirror every icon.

Usually mirrored:

- directional arrows
- chevrons indicating progression
- back/forward navigation icons

Usually not mirrored:

- brand marks
- check marks
- generic settings icons
- search
- info
- external-link semantics unless direction itself is meaningful

## Mixed content

Special attention:

```text
Arabic + English
Arabic + numbers
Arabic + URLs
Arabic + email addresses
Arabic + code
Arabic + product names
Arabic + technology names
```

Bidi issues are often invisible until users encounter real content.

---

# 13. LANGUAGE SWITCHER UX

The language switcher should:

- clearly display current language
- use actual language names where appropriate
- preserve the current route when switching
- preserve meaningful page context
- avoid dropping users on the homepage unless no equivalent page exists
- update document language
- update direction
- update metadata
- update canonical
- update hreflang relationships
- update Open Graph language metadata where relevant
- remain accessible from keyboard and screen readers

Google recommends explicitly indicating alternate language versions when a site has localized versions.  
Source: https://developers.google.com/search/docs/advanced/crawling-indexing/localized-versions

---

# 14. PAGE-BY-PAGE UX AUDIT

Every page should be reviewed using this sequence:

### Step 1 — Purpose

Can a user explain the purpose of the page in a few seconds?

### Step 2 — Hierarchy

Is there one obvious H1?

### Step 3 — Orientation

Does the page make it clear where the user is?

### Step 4 — Content

Is the copy specific, useful, and credible?

### Step 5 — Action

Does the page provide a sensible next action?

### Step 6 — Trust

Does it provide evidence?

### Step 7 — Accessibility

Can it be used without a mouse?

### Step 8 — Mobile

Does it remain understandable at small widths?

### Step 9 — SEO

Can search engines understand the page?

### Step 10 — Social

Does the shared URL represent the page correctly?

---

# 15. CORE PAGES — EXPECTED QUALITY

## Home

Must establish:

- identity
- value proposition
- primary services/products
- differentiation
- proof
- process
- CTA
- trust
- contact path

Avoid a homepage that is only a visual showcase.

## Services

Every service page should communicate:

- what it is
- who it is for
- problem solved
- deliverables
- process
- expected outcomes
- relevant technologies if useful
- examples
- CTA

## Products / Solutions

Each product must have:

- clear purpose
- target user
- key capabilities
- business value
- screenshots / evidence where available
- status (live / beta / planned) when relevant
- CTA

## Work / Case Studies

Prefer real evidence over generic “we are experts.”

A high-quality case study includes:

- client/problem context
- challenge
- approach
- solution
- outcome
- measurable impact where legitimately available
- screenshots
- technology
- constraints
- lessons

Do not manufacture metrics.

## About

Should answer:

- who is Novixa?
- why does it exist?
- what does it believe?
- what does it specialize in?
- why should a client trust it?
- where can clients contact it?

## Contact

The contact page should make contacting Novixa easy.

Minimum:

- email
- clear form
- direct messaging option when appropriate
- response expectations if genuinely maintained
- concise project-information fields
- success state
- failure state

---

# 16. UI COMPONENT AUDIT

Every component should be checked in all states:

| Component | Required states |
|---|---|
| Button | default / hover / focus / active / disabled / loading |
| Link | default / hover / focus / visited where useful |
| Input | empty / focus / filled / error / disabled |
| Select | closed / open / selected / error |
| Checkbox | unchecked / checked / focus / disabled |
| Radio | unselected / selected / focus / disabled |
| Switch | off / on / focus / disabled |
| Card | default / hover where interactive |
| Accordion | collapsed / expanded |
| Tabs | inactive / active / focus |
| Modal | closed / open / focus trap / close |
| Toast | success / error / info |
| Dropdown | closed / open / selected |
| Navigation | default / active / mobile-open |
| Pagination | first / middle / last / disabled |
| Skeleton | loading / loaded |
| Empty state | no data / recovery action |
| Error page | 404 / 500 / offline or failed request |

A mature design system defines all states instead of designing only the “happy path.”

---

# 17. INTERACTION DESIGN

Interactions should reinforce understanding.

Avoid:

- animations that delay navigation
- scroll-jacking
- excessive parallax
- decorative motion that looks like a gaming site
- every element bouncing on scroll
- long entrance animations
- hover-dependent information that disappears on touch
- click targets that are too small

Motion should be:

- purposeful
- fast
- interruptible
- consistent
- subtle
- reduced when the user requests reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce) { ... }
```

---

# 18. ACCESSIBILITY — WCAG 2.2 AA TARGET

Accessibility should be a first-class engineering requirement.

## A. Keyboard

Test every interaction without a mouse:

```text
Tab
Shift + Tab
Enter
Space
Arrow keys where expected
Escape
```

No keyboard trap.

All interactive controls need logical and visible focus.

W3C's APG states that all interactive elements must be operable by keyboard and emphasizes predictable focus behavior.  
Source: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

## B. Focus

Verify:

- focus indicator is clearly visible
- focus is never permanently hidden
- sticky headers do not obscure focused content
- modal opening moves focus appropriately
- modal closing returns focus to the trigger
- menus handle focus predictably

WCAG 2.2 added additional focus-related success criteria including Focus Not Obscured.  
Source: https://www.w3.org/TR/WCAG22/

## C. Accessible names

Every interactive control should have a meaningful accessible name.

Bad:

```text
aria-label="icon"
```

Better:

```text
aria-label="Open navigation"
```

Best where possible: use visible text.

W3C's ARIA APG recommends concise, meaningful accessible names and favors visible text and native HTML naming mechanisms.  
Source: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

## D. Images

Every meaningful image needs appropriate alternative text.

Decorative images should not create unnecessary screen-reader noise.

Do not describe decorative content as though it were important information.

## E. Color

Do not communicate:

- errors only with red
- success only with green
- selection only through color
- disabled states only through opacity

Use text, icons, shape, borders, and semantic messaging in addition to color.

## F. Forms

All inputs require:

- associated labels
- meaningful error messages
- clear required/optional semantics
- preserved user-entered values where appropriate
- understandable instructions
- predictable validation

Do not rely on placeholders as the primary label.

---

# 19. FORM UX

A form should be designed as a conversation, not a database schema.

Recommended project inquiry fields:

```text
Name
Work email
Company (optional)
What do you need?
Budget / project range (optional)
Timeline (optional)
Message
```

Do not ask for ten fields before allowing a basic inquiry.

## Submission states

Mandatory:

1. idle
2. focusing
3. validating
4. submitting
5. success
6. recoverable failure
7. server failure

Success must be understandable.

Error must tell the user what to do next.

---

# 20. MOBILE UX

Mobile is not a collapsed desktop layout.

Audit:

- navigation
- hero
- typography
- cards
- grids
- tables
- forms
- buttons
- modal/drawer behavior
- footer
- sticky elements
- floating contact buttons

## Common failure patterns to eliminate

- horizontal scroll
- text clipped by fixed heights
- cards wider than viewport
- oversized hero image
- giant headline that wraps into 7 lines
- buttons that look like links
- dense text
- tiny secondary labels
- modal wider than viewport
- sticky CTA blocking content
- bottom navigation colliding with browser controls

---

# 21. RESPONSIVE TYPOGRAPHY

Use fluid sizing where appropriate.

Example conceptual approach:

```css
font-size: clamp(min, fluid, max);
```

But do not make typography so fluid that line breaks become unpredictable.

Validate real Arabic content at every breakpoint.

---

# 22. PERFORMANCE / CORE WEB VITALS

The production goal should be **Good Core Web Vitals**.

Current “Good” thresholds commonly used by web.dev:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

These are evaluated using the 75th percentile in field data.  
Sources:
- https://web.dev/articles/defining-core-web-vitals-thresholds
- https://web.dev/articles/inp

## LCP

Likely risks:

- oversized hero image
- large web font
- render-blocking CSS/JS
- client-only hero content
- excessive animations before main content appears

Actions:

- optimize hero image
- prioritize critical content
- avoid unnecessary client-side rendering
- preload only truly critical assets
- keep above-the-fold markup lightweight

## INP

Likely risks:

- heavy JavaScript
- large hydration work
- expensive animations
- huge component trees
- synchronous event handlers

Actions:

- reduce JS
- split bundles
- defer non-critical work
- avoid long main-thread tasks
- simplify interaction handlers

## CLS

Likely risks:

- images without dimensions
- fonts causing layout shifts
- late-loaded banners
- dynamic content inserted above existing content

Actions:

- reserve image space
- use stable font strategy
- reserve dynamic slots
- avoid injecting content above the user

---

# 23. IMAGE OPTIMIZATION

Audit all images:

- correct format
- correctly sized
- responsive
- compressed
- no unnecessary originals
- explicit dimensions/aspect ratios
- lazy-loaded below the fold when appropriate
- hero image prioritized appropriately
- meaningful alt text
- Open Graph image available

Avoid shipping 2–5 MB images for a 200 KB visual need.

---

# 24. FONT STRATEGY

Audit:

- font count
- font file sizes
- font subsets
- Arabic glyph coverage
- English glyph coverage
- weight count
- loading strategy
- fallback chain
- layout stability

Avoid loading every font weight “just in case.”

Ensure the selected Arabic font does not force excessive payload or poor CLS.

---

# 25. SEO — TECHNICAL FOUNDATION

Google Search's documentation emphasizes crawlability, understandable URLs, valid metadata, indexability controls, and structured content.  
Sources:
- https://developers.google.com/search/docs
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing

## Required for every indexable page

- unique `<title>`
- unique meta description
- one clear H1
- semantic headings
- canonical URL
- correct language
- correct `dir`
- crawlable links
- indexable content
- meaningful URL
- correct robots directives

## Titles

Avoid:

```text
Home | Home | Novixa
```

Prefer:

```text
Novixa — Software Engineering & Digital Products
```

Every major page should have its own search intent.

---

# 26. MULTILINGUAL SEO

For Arabic and English pages:

- separate indexable URLs are preferable
- every language version should reference the alternates
- use correct hreflang values
- self-reference when appropriate
- include `x-default` only when it has a real purpose
- canonical each localized URL to itself
- do not canonical Arabic pages to English
- do not canonical English pages to Arabic

Google recommends telling it about localized versions so it can surface the most appropriate language/region version.  
Source: https://developers.google.com/search/docs/advanced/crawling-indexing/localized-versions

---

# 27. URL QUALITY

URLs should be:

- human readable
- stable
- lowercase where practical
- descriptive
- not full of random IDs
- not unnecessarily query-driven

Examples:

```text
/en/services
/ar/services
```

or:

```text
/en/services/software-development
/ar/services/software-development
```

Use a URL architecture that matches the actual localization strategy.

Google documents logical, intelligible URL structure as part of crawl/indexing best practice.  
Source: https://developers.google.com/search/docs/crawling-indexing/url-structure

---

# 28. CANONICAL / ROBOTS / INDEXING

Verify:

```text
robots.txt
sitemap.xml
canonical
robots meta
X-Robots-Tag where relevant
```

Important distinction:

- `robots.txt` controls crawling behavior.
- `noindex` controls index inclusion for supported crawlers.
- A robots.txt block does **not** reliably mean “keep this page out of Google”.

Google explicitly documents this distinction.  
Sources:
- https://developers.google.com/search/docs/crawling-indexing/robots/intro
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

---

# 29. XML SITEMAP

The sitemap should:

- be valid XML
- use absolute canonical URLs
- include only URLs intended for indexing
- avoid duplicate variants
- represent localized versions correctly where applicable
- be accessible at the expected path
- be submitted to Google Search Console

Google notes that sitemaps help search engines crawl larger/newer/complex sites more efficiently.  
Source:
https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

---

# 30. STRUCTURED DATA / SCHEMA.ORG

At minimum evaluate:

### Organization

For the company entity:

- name
- alternateName where useful
- URL
- logo
- contact information if applicable
- sameAs
- address only when legitimate and useful

Google explicitly recommends Organization structured data to help it understand and disambiguate an organization.  
Source:
https://developers.google.com/search/docs/appearance/structured-data/organization

### WebSite

Evaluate for the site entity where applicable.

### BreadcrumbList

Use where breadcrumbs are meaningful.

### Service

Use only when the markup is accurate and supported by page content.

### Article

Only on genuine editorial content.

Do not inject schema simply to “have more schema.” It must describe visible, truthful page content.

---

# 31. SEO CONTENT QUALITY

Avoid:

- generic AI filler
- keyword stuffing
- repeated service paragraphs
- fake authority claims
- fake client numbers
- fake testimonials
- fake case studies
- repetitive headings

Prefer:

- clear problem statements
- industry-specific usefulness
- actual capabilities
- real process
- genuine technical differentiation
- real screenshots
- real work
- transparent limitations

Google's SEO guidance focuses on helping users and search engines understand content rather than using tricks that guarantee rankings.  
Source:
https://developers.google.com/search/docs/fundamentals/seo-starter-guide

---

# 32. INTERNAL LINKING

Every important page should be reachable through meaningful links.

Review:

- homepage → services
- homepage → products
- homepage → work
- homepage → contact
- services → related work
- products → contact
- case studies → service/product
- articles → relevant services
- breadcrumbs → parent hierarchy

Do not use vague anchors everywhere:

```text
Click here
Read more
Learn more
```

Prefer meaningful anchor labels.

---

# 33. OPEN GRAPH / SOCIAL SHARING

Every shareable page should have an intentional social preview.

Minimum:

```text
og:title
og:description
og:image
og:url
og:type
```

Also validate:

- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

The image should be purpose-built for social sharing rather than being an accidental crop of a hero asset.

## Social image quality

Recommended concept:

```text
1200 × 630
```

Use:

- Novixa brand
- clear title
- enough contrast
- no tiny text
- safe margins
- strong focal point

Do not let the social card display:

- wrong language
- old logo
- placeholder image
- localhost URL
- framework default title
- unescaped characters
- missing image

---

# 34. SOCIAL / SHARE ROUTING

When a page is shared:

- URL should resolve
- language should remain correct
- OG tags should match that exact URL
- image should be accessible to crawlers
- social preview should not require client-side rendering if the crawler cannot execute it reliably
- canonical should match the intended public URL

---

# 35. TRUST & CREDIBILITY

For a software engineering company, visual polish alone is insufficient.

The website should communicate evidence.

Strong trust signals include:

- real work
- real product screenshots
- real technology expertise
- clear company identity
- genuine contact details
- transparent process
- genuine testimonials
- named case studies when permitted
- clear response expectations
- professional legal pages
- secure HTTPS
- professional domain/email

Weak trust signals:

- impossible claims
- “#1 agency” without evidence
- invented client logos
- fake metrics
- empty testimonial sliders
- meaningless “10 years experience” claims
- overused startup buzzwords

---

# 36. CONVERSION / CTA STRATEGY

The site should guide a visitor toward one obvious next step.

## Recommended funnel

```text
Awareness
  ↓
Understand Novixa
  ↓
Explore capability
  ↓
See evidence
  ↓
Build trust
  ↓
Start conversation
```

Avoid:

```text
Hero → 12 animations → 9 cards → more slogans → footer
```

without a meaningful decision path.

---

# 37. CONTACT EXPERIENCE

A good contact flow should minimize uncertainty.

Show:

- what happens after submission
- expected response timeframe only if you can maintain it
- what information is useful
- alternate contact option
- privacy reassurance when collecting data

Example success message:

```text
Your project request has been received.
We’ll review the details and get back to you through the contact information you provided.
```

Avoid fake “instant response” claims.

---

# 38. ERROR UX

Review all:

- 404
- 500
- form error
- network failure
- empty state
- unavailable content
- invalid route
- image failure
- API failure

Error pages should preserve:

- Novixa branding
- navigation
- language
- primary recovery action

A 404 page should not look like a framework default page.

---

# 39. ACCESSIBLE ERROR MESSAGING

Error messages should:

- appear near the relevant field/control
- be understandable
- identify what is wrong
- tell users how to fix it
- be announced appropriately to assistive technologies where necessary
- not rely only on color

---

# 40. CONTENT DESIGN

## Tone

Novixa should sound:

- confident
- precise
- technically credible
- human
- business-oriented
- not arrogant
- not full of generic startup language

## Prefer

```text
We design and build production-grade digital systems for businesses that need reliable software.
```

over:

```text
We leverage cutting-edge innovation to revolutionize the future.
```

Specificity wins.

---

# 41. COPY HIERARCHY

Each section should answer one question.

Example:

```text
H2: What we build
Supporting line: Digital systems designed around real business workflows.

Card:
Software Products
Build custom systems around your actual business processes.
```

Avoid sections where:

- H2 says one thing
- paragraph says another
- cards introduce unrelated concepts
- CTA points somewhere else

---

# 42. VISUAL RHYTHM

A premium page has rhythm.

Recommended conceptual rhythm:

```text
Hero
↓
Proof / credibility
↓
Services / solutions
↓
Differentiation
↓
Work / products
↓
Process
↓
Trust
↓
CTA
```

Do not make every section visually identical.

Variation should come from:

- content structure
- columns
- alignment
- image placement
- surface treatment

Not from random visual effects.

---

# 43. CARDS

Card-heavy websites easily become generic.

For every card ask:

> Does this need to be a card?

Use cards when content is actually grouped.

Do not place every heading, paragraph, and icon into a rounded rectangle.

Avoid:

- huge shadows
- 3D tilt
- unnecessary glass
- inconsistent heights
- excessive text
- duplicate CTA buttons

---

# 44. BUTTON DESIGN

Primary button must be:

- visually dominant
- readable
- touch-friendly
- keyboard-accessible
- focus-visible
- semantically labeled
- consistent

Preferred language:

```text
Start a Project
Request a Consultation
Talk to Novixa
Explore Services
View Case Study
```

Avoid vague:

```text
Click Here
Discover
Go
Submit
```

unless context makes the meaning obvious.

---

# 45. LINKS

Links should look like links.

Do not rely exclusively on:

- hover color
- tiny underlines
- icon-only indicators

Interactive semantics should remain obvious without a hover device.

---

# 46. ICONOGRAPHY

Use one icon family.

Do not mix:

- Lucide
- Font Awesome
- custom line icons
- random SVG stock icons

unless there is a documented reason.

Icons should support meaning rather than replace important text.

---

# 47. ANIMATION AUDIT

For every animation ask:

1. Why does it exist?
2. Does it improve comprehension?
3. Does it delay the user?
4. Does it run on mobile?
5. Does it respect reduced-motion preference?
6. Does it create CLS?
7. Does it feel like Novixa or like a template?

A software company site benefits more from excellent composition than from excessive animation.

---

# 48. BROWSER COMPATIBILITY

Validate current major browsers:

- Chrome
- Edge
- Firefox
- Safari

At least one iOS Safari and one Android Chrome physical-device test should be included.

Inspect:

- fonts
- sticky positioning
- viewport behavior
- form controls
- modal behavior
- overflow
- animations
- backdrop/filter effects
- RTL behavior

---

# 49. SEMANTIC HTML

Use real elements where they match the content:

```text
header
nav
main
section
article
aside
footer
button
a
form
label
input
textarea
```

Do not replace native semantics with clickable `<div>` elements without a compelling reason.

Prefer native HTML before adding ARIA.

W3C ARIA guidance explicitly favors native naming techniques where possible.  
Source:
https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

---

# 50. HEADING STRUCTURE

Every page should have a meaningful heading hierarchy.

Typical:

```text
H1
  H2
    H3
  H2
    H3
```

Avoid using headings only because they look visually large.

CSS should control visual size; HTML headings should express document structure.

---

# 51. LANDMARKS

A good document outline should expose:

- banner/header
- navigation
- main
- complementary regions where needed
- contentinfo/footer

This improves navigability for assistive technology users.

W3C's APG documents landmark practices as a core accessibility technique.  
Source:
https://www.w3.org/WAI/ARIA/apg/

---

# 52. SEARCH ENGINE RENDERING

For a modern JavaScript application, verify:

- important content exists in rendered HTML
- titles/meta are correct
- language attributes are present
- canonical is present
- internal links are crawlable
- images are discoverable
- content is not hidden behind user interaction unnecessarily

Do not assume “the browser can render it” means “every crawler sees it identically.”

---

# 53. SECURITY / WEB QUALITY

Even though this is not a penetration test, verify baseline web hygiene:

- HTTPS everywhere
- no mixed content
- secure cookies where applicable
- no secret keys shipped to client
- no exposed environment secrets
- sensible security headers
- no accidental debug output
- production source maps policy reviewed
- no stack traces visible
- form endpoints rate-limited where necessary
- external embeds reviewed
- third-party scripts minimized

---

# 54. PRIVACY / LEGAL

Depending on the actual operating model and jurisdiction, the site should have appropriate:

- Privacy Policy
- Terms of Service where applicable
- Cookie information/consent where legally required
- Contact data usage information
- third-party service disclosures where relevant

Do not copy generic legal text blindly.

---

# 55. ANALYTICS

At minimum, define meaningful events.

Examples:

```text
cta_click
contact_form_open
contact_form_submit
contact_form_success
language_switch
service_view
case_study_view
product_view
social_click
email_click
whatsapp_click
```

Do not measure only page views.

The goal is to learn:

> What actions are visitors taking?

---

# 56. SEO + ANALYTICS + CONVERSION RELATIONSHIP

The website should answer:

```text
How did the visitor arrive?
What did they view?
What persuaded them?
What did they click?
Did they contact us?
Which language did they use?
Which page converted them?
```

Without this, post-launch optimization becomes guesswork.

---

# 57. IMAGE / SOCIAL / BRAND ASSET CONSISTENCY

The same company identity should appear correctly in:

- browser favicon
- Apple touch icon
- Open Graph
- X/Twitter card
- JSON-LD logo
- header logo
- footer logo
- 404
- emails
- social profile links

No outdated logo or old company name anywhere.

---

# 58. FAVICON / APP ICON

Verify:

- favicon exists
- correct sizes
- SVG where supported
- PNG fallback
- no default framework icon
- correct theme appearance
- no transparent icon becoming invisible on dark browser surfaces

---

# 59. METADATA MATRIX

Create a page inventory:

| Route | AR title | EN title | AR description | EN description | Canonical | Hreflang | OG | Schema |
|---|---|---|---|---|---|---|---|---|
| Home | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Products | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Work | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| About | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Contact | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

The actual project should maintain this matrix as a release artifact.

---

# 60. SOCIAL METADATA MATRIX

For every major page:

| Route | og:title | og:description | og:image | og:url | type | language |
|---|---|---|---|---|---|---|
| Home AR | ✓ | ✓ | ✓ | ✓ | website | ar |
| Home EN | ✓ | ✓ | ✓ | ✓ | website | en |
| Services | ✓ | ✓ | ✓ | ✓ | website | locale |
| Case study | ✓ | ✓ | ✓ | ✓ | article/page | locale |
| Product | ✓ | ✓ | ✓ | ✓ | website/product | locale |

---

# 61. MOBILE CONVERSION AUDIT

On mobile, the visitor should never have to hunt for the next step.

Check:

- CTA visible near the top
- CTA accessible after reading
- contact button easy to tap
- email/WhatsApp links work
- form is easy to complete
- no typing-heavy unnecessary fields
- phone number is tap-to-call where applicable
- links do not sit too close together

---

# 62. RTL FORMS — SPECIAL TESTS

Arabic forms are frequently broken even when the rest of the UI looks good.

Test:

- text starts at correct edge
- placeholders
- labels
- numeric fields
- phone fields
- email fields
- URLs
- textarea
- error messages
- validation icons
- password visibility controls
- dropdown arrows
- calendar/date controls
- file upload components

For email/URL fields, it may be correct to use LTR text direction while the surrounding field layout remains RTL.

---

# 63. NUMBERS & LOCALES

Decide intentionally:

- Arabic-Indic vs Western numerals
- currency format
- date format
- phone format
- decimal separators

Do not allow browser/localization defaults to create inconsistent displays.

---

# 64. ACCESSIBILITY AUTOMATION

Recommended automated checks:

- axe-core
- Lighthouse
- Pa11y or equivalent
- HTML validation where practical
- broken-link checks
- schema validation
- metadata checks

Automation is not enough; manual keyboard and screen-reader checks are still required.

---

# 65. MANUAL ACCESSIBILITY QA

At least test:

- keyboard-only navigation
- zoom to 200%
- high text size
- reduced motion
- screen-reader smoke test
- focus order
- modal focus
- mobile screen reader
- Arabic screen-reader pronunciation where available

---

# 66. ZOOM / TEXT RESIZE

At 200% zoom:

- no critical information should disappear
- no horizontal scrolling for ordinary page content where avoidable
- buttons remain usable
- menus remain usable
- text does not overlap
- cards do not become unreadable

---

# 67. CONTENT DENSITY

Do not overfill the homepage.

A premium technology site usually benefits from:

- fewer stronger sections
- better copy
- stronger evidence
- deliberate spacing

rather than:

- 15 sections
- 40 cards
- 6 carousels
- 12 animated counters

---

# 68. CAROUSEL AUDIT

Carousels should be used sparingly.

If a carousel exists:

- pause/controls are accessible
- keyboard interaction works
- touch interaction works
- no automatic movement that creates accessibility problems
- users can understand what is off-screen
- critical information is not exclusively hidden inside slides

Prefer static grids for important information.

---

# 69. VIDEO / MOTION MEDIA

If video is used:

- poster image exists
- muted autoplay only where justified
- controls are accessible
- captions provided when required
- content does not block primary interaction
- mobile performance remains acceptable

---

# 70. THIRD-PARTY SCRIPTS

Audit:

- analytics
- forms
- fonts
- social embeds
- chat
- maps
- video
- tracking

Every script adds:

- performance cost
- privacy implications
- possible failure modes

Remove anything that does not provide clear value.

---

# 71. SEO IMAGE AUDIT

Images should have:

- descriptive filenames where useful
- alt text
- proper dimensions
- optimized format
- crawlable URLs
- correct Open Graph image
- no critical text baked into images only

---

# 72. TECHNICAL URL / ROUTE QA

Every public URL should be tested for:

```text
200
404
redirect
canonical
language
OG
schema
sitemap inclusion
navigation access
```

Avoid:

- accidental duplicate routes
- trailing slash inconsistencies
- uppercase duplicates
- locale duplication
- route aliases without canonical strategy

---

# 73. REDIRECT STRATEGY

Define:

- HTTP → HTTPS
- www/non-www
- old route → new route
- trailing slash policy
- locale route policy

Prefer one canonical public URL form.

---

# 74. 404 STRATEGY

A good 404 page:

- preserves brand
- states the problem clearly
- suggests recovery
- links to Home
- optionally links to popular pages
- preserves language
- does not expose implementation details

---

# 75. DEPLOYMENT SAFETY

Before launch:

- production env variables are validated
- no development URL in metadata
- no localhost in OG/canonical
- no staging URLs in sitemap
- no `noindex` accidentally left enabled
- analytics points to production
- email endpoints point to production
- social preview points to production
- robots.txt is intentional
- sitemap is production-only

---

# 76. PRE-LAUNCH SEO CHECKLIST

```text
[ ] Domain resolves
[ ] HTTPS works
[ ] Canonical host chosen
[ ] robots.txt reviewed
[ ] sitemap.xml exists
[ ] Search Console connected
[ ] No accidental noindex
[ ] Titles unique
[ ] Descriptions unique
[ ] H1 present
[ ] Internal links crawlable
[ ] Localized URLs valid
[ ] hreflang valid
[ ] Organization schema valid
[ ] Website schema reviewed
[ ] Breadcrumb schema reviewed
[ ] OG tags valid
[ ] X/Twitter metadata valid
[ ] Social image accessible
[ ] Favicon configured
[ ] 404 works
[ ] Redirects reviewed
[ ] Staging removed from public metadata
```

---

# 77. PRE-LAUNCH UI / UX CHECKLIST

```text
[ ] Logo correct
[ ] Header correct
[ ] Navigation clear
[ ] Active state clear
[ ] Mobile menu polished
[ ] Hero message clear
[ ] Primary CTA obvious
[ ] Secondary CTA sensible
[ ] Typography consistent
[ ] Arabic typography validated
[ ] English typography validated
[ ] RTL layout validated
[ ] LTR layout validated
[ ] Cards consistent
[ ] Buttons consistent
[ ] Forms validated
[ ] Error states designed
[ ] Loading states designed
[ ] Empty states designed
[ ] 404 branded
[ ] Footer complete
[ ] Social links real
[ ] Legal pages reachable
```

---

# 78. PRE-LAUNCH ACCESSIBILITY CHECKLIST

```text
[ ] Keyboard-only pass
[ ] Visible focus
[ ] Focus not obscured
[ ] Skip link considered
[ ] Semantic headings
[ ] Semantic landmarks
[ ] Form labels
[ ] Accessible names
[ ] Alt text
[ ] Color contrast
[ ] Non-color error communication
[ ] Modal focus management
[ ] Escape behavior
[ ] Reduced motion
[ ] 200% zoom
[ ] Mobile screen-reader smoke test
[ ] Arabic RTL semantics
[ ] English LTR semantics
```

---

# 79. PRE-LAUNCH PERFORMANCE CHECKLIST

```text
[ ] LCP good
[ ] INP good
[ ] CLS good
[ ] Hero optimized
[ ] Fonts optimized
[ ] Images optimized
[ ] JS minimized
[ ] Unused libraries removed
[ ] Third-party scripts minimized
[ ] Cache strategy reviewed
[ ] CDN/edge delivery reviewed
[ ] Mobile 4G throttled test
[ ] Low-end device test
```

Core Web Vitals target:
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1  
Source: https://web.dev/articles/defining-core-web-vitals-thresholds

---

# 80. DESIGN REVIEW — QUESTIONS FOR THE DESIGNER

The designer should answer “yes” to most of these:

### Brand

- Does Novixa look credible enough to sell professional software engineering?
- Does the site avoid template-like visual language?
- Is the visual identity memorable without being gimmicky?

### Hierarchy

- Is the most important thing always the most visually obvious?
- Can a visitor skim the page and understand the story?
- Do sections have distinct purposes?

### Typography

- Are Arabic and English equally polished?
- Is line length comfortable?
- Are heading sizes intentional?
- Are mobile line breaks controlled?

### Spacing

- Does every major section share the same rhythm?
- Are components aligned?
- Are there random gaps or inconsistent paddings?

### Components

- Does one button look like one button everywhere?
- Does one card pattern remain recognizable?
- Are interactive states complete?

---

# 81. UX REVIEW — QUESTIONS FOR THE PRODUCT DESIGNER

- Can a first-time visitor understand Novixa quickly?
- Is the navigation obvious?
- Is the primary CTA consistent throughout the site?
- Is there any page that dead-ends?
- Is any content difficult to find?
- Are forms shorter than necessary?
- Are errors actionable?
- Are success states reassuring?
- Is the site pleasant without requiring users to “figure it out”?

---

# 82. ENGINEERING REVIEW — QUESTIONS FOR DEVELOPERS

- Is semantic HTML used?
- Are design tokens centralized?
- Is RTL implemented structurally?
- Are logical CSS properties used?
- Are page metadata values route-aware?
- Are canonical URLs generated correctly?
- Are hreflang tags generated correctly?
- Is sitemap generation correct?
- Is robots.txt intentional?
- Are OG tags generated server-side?
- Is JSON-LD generated safely?
- Is all critical content crawlable?
- Are images optimized?
- Are fonts optimized?
- Is client-side JavaScript kept proportional?
- Are error boundaries present?
- Are 404/500 pages branded?
- Are environment URLs separated between staging and production?

---

# 83. QA REVIEW — REQUIRED TEST MATRIX

Create a test matrix covering:

### Routes

Every public route.

### Languages

```text
Arabic
English
```

### Viewports

```text
Mobile small
Mobile standard
Tablet portrait
Tablet landscape
Desktop
Large desktop
```

### Browsers

```text
Chrome
Edge
Firefox
Safari
iOS Safari
Android Chrome
```

### Interaction

```text
Mouse
Keyboard
Touch
Screen reader smoke test
```

Every combination does not need identical depth, but all critical paths must be covered.

---

# 84. PRODUCTION ACCEPTANCE TEST

A page can be marked PASS only when all of these are true:

### Visual

- no unexpected overflow
- no broken layout
- spacing is coherent
- typography is correct
- assets load correctly
- animations behave correctly

### Functional

- all links work
- buttons work
- forms work
- menus work
- language switching works
- CTA works

### Accessibility

- keyboard works
- focus is visible
- names are meaningful
- form labels exist
- contrast is acceptable
- RTL semantics work

### SEO

- title
- description
- canonical
- hreflang
- indexability
- crawlability
- structured data

### Social

- OG title
- OG description
- OG image
- correct URL
- locale

### Performance

- no obvious blocking resource
- acceptable mobile load
- Core Web Vitals target is on track

---

# 85. RECOMMENDED TOOLING FOR THE TEAM

Use several tools rather than trusting one score.

## Browser / UX

- Chrome DevTools
- Firefox DevTools
- Safari Web Inspector
- real iOS/Android devices

## Accessibility

- axe
- Lighthouse
- manual keyboard review
- screen reader smoke testing

## SEO

- Google Search Console
- Rich Results Test
- sitemap inspection
- URL Inspection
- structured-data testing

## Performance

- Lighthouse
- PageSpeed Insights
- Chrome DevTools Performance
- field Core Web Vitals where traffic exists

## Social

- OG preview validators / platform-specific preview tools
- manual inspection of shared URLs

---

# 86. IMPORTANT: DO NOT OPTIMIZE FOR “100/100” SCORES ONLY

Perfect Lighthouse scores are not the same thing as excellent UX.

A site can score highly while still having:

- confusing navigation
- poor copy
- weak trust
- bad Arabic typography
- unclear CTA
- fake credibility
- broken real-device behavior

The team should optimize for:

**real user quality + accessibility + performance + crawlability + conversion**, not a single synthetic score.

---

# 87. RECOMMENDED NOVIXA HOMEPAGE STORY

A strong company homepage can follow this narrative:

```text
1. What Novixa is
2. What Novixa builds
3. Why clients should trust Novixa
4. What Novixa can build for them
5. Real evidence / products / work
6. How the engagement works
7. Why the approach is different
8. Final CTA
```

Every section should earn its place.

---

# 88. NOVIXA-SPECIFIC DIFFERENTIATION OPPORTUNITY

The biggest risk for a software company website is looking like every other agency website.

Novixa should demonstrate its engineering identity through:

- precise copy
- excellent information architecture
- real product thinking
- real technical depth
- clean UI systems
- bilingual quality
- high performance
- strong accessibility
- real product/case evidence
- purposeful micro-interactions

The website itself should function as the first product sample.

---

# 89. HIGH-PRIORITY REVIEW ORDER

For the implementation team, review in this order:

## P0 — Must verify first

1. Production domain / DNS / HTTPS
2. All routes load
3. No critical mobile breakage
4. Primary CTA works
5. Arabic/RTL does not break layout
6. English/LTR does not break layout
7. No accidental `noindex`
8. Canonical/hreflang correct
9. Homepage metadata correct
10. 404/500 behavior sane

## P1 — Then

11. Visual hierarchy
12. Typography
13. Navigation UX
14. Mobile menu
15. Forms
16. Accessibility
17. Open Graph
18. Structured data
19. Sitemap/robots
20. Performance

## P2 — Then

21. Micro-interactions
22. Spacing polish
23. content refinement
24. image refinement
25. animation tuning

---

# 90. LIKELY HIGH-RISK AREAS FOR THIS PROJECT

Because Novixa is bilingual and intended to look premium, the most important regression risks are likely to be:

### 1. Arabic is technically translated but visually inferior

This happens when:

- English font assumptions are retained
- line-height is too tight
- text blocks become too tall
- icons do not mirror correctly
- mixed-direction text breaks

### 2. Mobile looks like compressed desktop

This happens when the design relies too heavily on desktop widths.

### 3. Social metadata is inconsistent

This happens when:

- only the homepage has OG
- locale routes reuse the wrong metadata
- OG image remains English for Arabic pages
- canonical and OG URL disagree

### 4. Visual polish hides weak conversion

A beautiful site can still fail if users do not know what to do next.

### 5. Marketing claims are stronger than evidence

Trust drops when numbers or testimonials appear unverifiable.

### 6. Too much animation

A technology company website should feel engineered, not overloaded.

### 7. Design system drift

Over time, individual pages may develop:

- different radii
- different shadows
- different button sizes
- different heading scales
- different card patterns

This should be prevented centrally.

---

# 91. RELEASE GATE — FINAL “GO / NO-GO”

Mark **GO** only if all are true:

```text
[ ] No P0 issues
[ ] No unresolved P1 issues in core user journeys
[ ] Arabic UX passes
[ ] English UX passes
[ ] Mobile passes
[ ] Keyboard passes
[ ] Core SEO passes
[ ] Social metadata passes
[ ] Core performance passes
[ ] Contact flow passes
[ ] Error states pass
[ ] Real content replaces placeholders
[ ] No accidental staging/debug data
[ ] Search Console setup completed
[ ] Analytics verified
[ ] Production URLs verified
```

---

# 92. SITE-SPECIFIC VERIFICATION LOG

Once the live/staging URL is available, populate this table instead of making assumptions.

| Area | Result | Evidence | Severity | Owner |
|---|---|---|---|---|
| Homepage visual design | PENDING LIVE INSPECTION | — | — | Designer |
| Header | PENDING LIVE INSPECTION | — | — | Designer/Frontend |
| Footer | PENDING LIVE INSPECTION | — | — | Frontend |
| Mobile navigation | PENDING LIVE INSPECTION | — | — | Frontend |
| Arabic RTL | PENDING LIVE INSPECTION | — | — | Frontend |
| English LTR | PENDING LIVE INSPECTION | — | — | Frontend |
| Responsive breakpoints | PENDING LIVE INSPECTION | — | — | Frontend |
| Accessibility | PENDING LIVE TEST | — | — | Frontend/QA |
| SEO metadata | PENDING LIVE TEST | — | — | SEO/Frontend |
| hreflang | PENDING LIVE TEST | — | — | SEO/Frontend |
| Sitemap | PENDING LIVE TEST | — | — | Frontend/DevOps |
| robots.txt | PENDING LIVE TEST | — | — | Frontend/DevOps |
| Organization schema | PENDING LIVE TEST | — | — | SEO/Frontend |
| OG previews | PENDING LIVE TEST | — | — | Frontend |
| Performance | PENDING LIVE TEST | — | — | Frontend/DevOps |
| 404 | PENDING LIVE TEST | — | — | Frontend |
| Contact flow | PENDING LIVE TEST | — | — | Full-stack |
| Analytics events | PENDING IMPLEMENTATION REVIEW | — | — | Full-stack |
| Security headers | PENDING LIVE TEST | — | — | DevOps |

---

# 93. WHAT THE DESIGNERS SHOULD FIX FIRST

This is the recommended design-priority list:

1. **Information hierarchy**
2. **Hero clarity**
3. **Navigation simplicity**
4. **Typography**
5. **Arabic/English parity**
6. **Spacing and grid**
7. **CTA consistency**
8. **Card consistency**
9. **Mobile layout**
10. **Interaction states**
11. **Accessibility states**
12. **Motion polish**

Do not start with small decorative details while hierarchy or navigation is weak.

---

# 94. WHAT THE DEVELOPERS SHOULD FIX FIRST

1. **Correct semantic HTML**
2. **Reliable localization and direction switching**
3. **Route-aware metadata**
4. **Canonical + hreflang**
5. **Sitemap + robots**
6. **Structured data**
7. **OG / social metadata**
8. **Keyboard/focus behavior**
9. **Image/font optimization**
10. **Core Web Vitals**
11. **Error states**
12. **Production environment hygiene**

---

# 95. WHAT THE QA TEAM SHOULD VERIFY LAST

After fixes, QA should perform a fresh end-to-end regression, not only re-test individual bugs.

At minimum:

```text
Home AR
Home EN
Services AR
Services EN
Products AR
Products EN
Work AR
Work EN
About AR
About EN
Contact AR
Contact EN
404 AR
404 EN
Mobile menu
Language switch
Primary CTA
Contact form
Social metadata
SEO metadata
Keyboard navigation
Real-device smoke test
```

---

# 96. PROFESSIONAL AUDIT CONCLUSION

## Current assessment

The Novixa project has a strong opportunity to present itself as a serious software engineering company, especially because the stated product direction emphasizes bilingual Arabic/English support, RTL-first quality, responsive design, modern engineering, and strong SEO/social presence.

However, **the live public implementation could not be reliably inspected in this audit environment**, so a trustworthy professional conclusion about the current visual quality cannot be based on guesswork.

The correct next step is therefore not to invent a score.

The correct next step is to use this document as the **release acceptance specification** and run it against the actual deployed or staging website.

## Most important strategic recommendation

Treat these as one integrated quality problem:

```text
Design
+
UX
+
Arabic/LTR/RTL
+
Accessibility
+
SEO
+
Open Graph
+
Performance
+
Trust
+
Conversion
+
Engineering quality
```

They should not be handled as isolated checkboxes.

A site can have beautiful UI and poor SEO.
A site can have strong SEO and poor conversion.
A site can look excellent in English and fail badly in Arabic.
A site can pass Lighthouse and still feel confusing.

Novixa should aim for the intersection of all of them.

---

# 97. PRIMARY REFERENCES / STANDARDS

## W3C / Accessibility

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- Keyboard interface guidance: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
- Accessible names/descriptions: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- Right-to-left text in HTML: https://www.w3.org/International/questions/qa-html-dir.html

## Google Search

- Google Search documentation: https://developers.google.com/search/docs
- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Localized versions / hreflang: https://developers.google.com/search/docs/advanced/crawling-indexing/localized-versions
- Sitemap overview: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Build and submit sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Robots meta: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- URL structure: https://developers.google.com/search/docs/crawling-indexing/url-structure
- Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization

## Performance

- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- INP optimization: https://web.dev/articles/optimize-inp

---

# 98. FINAL TEAM DIRECTIVE

Before declaring the Novixa website “Production Ready”, the team should be able to demonstrate:

> **The same page is visually excellent in Arabic and English, structurally correct in RTL and LTR, accessible by keyboard and assistive technology, responsive on real devices, crawlable and indexable, correctly localized for search engines, shareable with accurate social previews, performant under mobile conditions, and capable of guiding a first-time visitor toward a clear business action.**

Anything less should be considered **incomplete hardening**, not final quality.