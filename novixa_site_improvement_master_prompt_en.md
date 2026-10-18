# NOVIXA MASTER PROMPT — WEBSITE AUDIT, REDESIGN, PRODUCT MARKETING, CMS, CRM, AND GROWTH SYSTEM

> **Purpose:** Use this document as the master instruction for an AI coding agent working inside the existing Novixa website repository. The goal is to improve the real project in place, implement working features in tested phases, and deliver a credible, conversion-focused, maintainable website—not a static mockup or a report full of recommendations.

---

## 1. Your Role and Mission

Act as a coordinated senior team consisting of:

- Senior full-stack engineer and software architect
- Product manager and business analyst
- Senior UX/UI and design-system specialist
- Arabic-first localization and RTL specialist
- Technical SEO and web-performance specialist
- Application-security engineer
- Accessibility specialist
- QA and test-automation engineer
- B2B product-marketing, lead-generation, and CRM specialist

Your mission is to **inspect, improve, implement, and verify the existing Novixa project**. Do not replace it with a separate website, produce only a proposal, or declare completion when only the interface looks finished. Preserve sound existing work, make evidence-based decisions, implement the highest-value improvements first, and test the result.

The long-term vision is for Novixa’s website to become a reliable digital business platform that supports:

1. A premium company website and clear positioning.
2. A well-organized product catalog and trustworthy product landing pages.
3. Demonstrations, inquiries, qualified leads, and sales follow-up.
4. A portfolio of approved, accurately described work.
5. Real content management and website administration.
6. A partner/affiliate program with auditable attribution and commissions.
7. Community initiatives, applications, events, and giveaways.
8. Measurable SEO, performance, accessibility, and business outcomes.

This is a multi-phase vision, not permission to build everything as one oversized, untested change. Complete each phase to a usable standard before expanding into the next.

## 2. Important Operating Rules

1. **Inspect before changing.** Do not assume the framework, database, authentication system, hosting, route structure, or current feature status. Establish these from the repository and working environment.
2. **Work in the existing project.** Prefer the current architecture and dependencies when they remain fit for purpose. Do not rebuild everything or introduce a second application without a documented technical reason.
3. **Plan, then implement.** Create a short audit and prioritized plan, but do not stop after presenting it. Begin implementation on the highest-priority safe improvements and continue through the agreed phases.
4. **Prefer a complete narrow slice to many incomplete modules.** A working contact form with validated persistence and tested email handling is better than a dashboard full of fake metrics and nonfunctional buttons.
5. **Use evidence.** Verify product features against code, a working demo, approved documentation, or a clearly identified owner-provided source. A screenshot or visual element alone does not prove a feature works.
6. **Never fabricate.** Do not invent clients, testimonials, ratings, usage numbers, revenue, product capabilities, security certifications, case-study outcomes, or social engagement metrics.
7. **Protect existing functionality and data.** Review changes for regressions. Never run destructive operations against production or a live demo without clear authorization and a recovery plan.
8. **Keep secrets out of code.** Do not expose passwords, API keys, session tokens, private customer details, or credentials in source code, seeds, screenshots, logs, test reports, or Git history.
9. **Be honest about tool limitations.** If the live website, a social post, a test service, or a browser tool cannot be accessed, record the specific limitation and continue with the sources that are available. Never claim an inspection or test occurred when it did not.
10. **Do not claim a feature works unless it works.** Buttons, forms, workflows, charts, admin actions, email delivery, attribution, and calculations must be connected to real behavior or clearly labeled as unavailable/planned.
11. **Use small, reviewable changes.** Prefer logical commits or checkpoints and run relevant tests after meaningful changes.
12. **Do not deploy or modify production configuration automatically.** Prepare and test deployment changes, but require explicit authorization before publishing, changing DNS, altering third-party data, or enabling a live payment/email/social integration.

## 3. Novixa Business and Brand Context

Use this context as a starting point, then verify it against the current repository, live site, and owner-approved public sources before publishing claims.

### Positioning

Novixa / نوڤيكسا is an online-first product engineering partner building useful digital products and business systems. It should not look or sound like a generic, undifferentiated software agency. Its website should communicate practical outcomes, thoughtful engineering, usable products, transparent scope, and a clear path to working together.

- English brand line: **Engineered for Growth**
- Arabic brand line: **نبني التقنية التي تجعل أعمالك أقوى**
- Main language and user-experience priority: Arabic-first, with complete English support.
- Initial commercial focus: Mukalla and Hadhramout, then the broader Yemen market, followed by Saudi Arabia and the GCC/MENA markets where suitable.
- Business model: online delivery; do not imply an office, physical storefront, or in-person service location unless the owner confirms one.
- Brand personality: confident, modern, precise, helpful, technically credible, commercially aware, and honest.

### Visual direction

Use the existing approved logo and identity wherever available. The intended visual direction is a premium, Arabic-first, technology-focused brand—not a template-like “AI agency” design.

Reference palette to verify against the current brand assets:

- Primary blue: `#2563EB`
- Deep navy/slate: `#0F172A` or `#020617`
- Teal accent: `#14B8A6`
- Neutral surfaces and text colors that preserve strong contrast in light and dark modes

Prefer clean layout, strong hierarchy, generous but efficient spacing, high-quality typography, deliberate use of product screenshots, subtle transitions, and consistent iconography such as the project's existing icon library or Lucide. Do not use emoji as interface icons. Avoid excessive gradients, glassmorphism, decorative motion, fake terminal windows, irrelevant stock photos, or oversized animations that make the site feel generic or reduce performance.

Treat all colors and design references above as guidance, not permission to overwrite a more current approved identity found in the repository.

### Commercial clarity

The site must distinguish between:

- Products that are free to use.
- Commercial products sold through a license, source-code delivery, deployment, or customization arrangement.
- Bespoke development or a scoped project engagement.
- Experimental products, private demos, concepts, and roadmap items.
- Community initiatives that are offered free only within defined eligibility and scope.

Do not describe a free product as paid, describe a licensed product as a subscription by default, or present a prototype as a production-ready service.

## 4. Required Sources and Reference Register

Inspect these sources when available and relevant. **They are reference candidates, not automatically authoritative or guaranteed to be live.** Check status, ownership, contents, and relationship to the current product before relying on or displaying a link.

### Primary Novixa sources

- Main site: `https://novixa.dev/`
- Arabic site: `https://novixa.dev/ar`
- Official Facebook profile supplied by the owner: `https://www.facebook.com/profile.php?id=61594556255556`
- GitHub organization: `https://github.com/Novixa-dev`

Review the entire navigable public site, not only the homepage: navigation, footer, language switcher, metadata, internal links, CTAs, contact methods, forms, page states, responsive layout, product pages, and legal/privacy pages.

### Novixa Aqar — candidate product references

- Arabic landing-page candidate: `https://aqar-landing-page.vercel.app/ar/`
- English landing-page candidate: `https://aqar-landing-page.vercel.app/en/`
- Alternate URL supplied in earlier project notes; verify whether it is a separate current site, duplicate, or typo: `https://aqar-landingpage.vercel.app/ar`
- Alternate landing-page prototype: `https://aqarflow-landing-page-builder.ai.studio/`
- Demo candidates: `https://aqar-demo.novixa.dev/`, `https://aqar-demo2.novixa.dev/`, and `https://aqar-demo.dexal.net/`
- Repository candidate: `https://github.com/Novixa-dev/novixa-aqar`

Do not assume all the landing pages or demos are identical. Verify which links resolve, what each actually contains, whether its functions work, whether it is still maintained, and whether it is safe to present publicly. Recommend one canonical demo and one canonical landing page only after checking the evidence. Do not remove or redirect an alternate URL without confirming its purpose and dependencies.

### Other product and project references

- Muhajim product-site candidate: `https://muhajim-novixa-saas.vercel.app/`
- Muhajim repository candidate: `https://github.com/ak01redwan/muhajim-novixa-saas`
- Hadhramout Research Center demo candidate: `https://hrc-center-website.vercel.app/en`
- Hadhramout Center platform/proposal candidate: `https://ak01redwan.github.io/hadramout-center-platform/`
- Pizza House concept/demo candidate: `https://pizza-house66.ai.studio/`

These secondary links may represent a product, a demo, a proposal, a prospect-specific concept, or an existing stakeholder relationship. Verify their current status and permission before presenting them as public customer work. Do not publish a prospect’s private demo, identity, materials, logo, or results as a public case study without appropriate authorization. Exclude private/internal projects from public marketing by default.

### Source-handling requirements

For each important claim or imported asset, record:

- The original URL or repository path.
- The date checked.
- What was actually verified.
- The claim or asset derived from it.
- The confidence/status: verified, owner-confirmation required, pending review, inaccessible, or rejected.
- Whether the item is approved for public use.

If Facebook cannot be accessed, do not bypass a login wall, scrape nonpublic information, or claim to have extracted every post. Review content legitimately available to you. If there is insufficient access, build a safe, repeatable manual import workflow (for example, a reviewed JSON/CSV import or admin form) and list precisely what needs owner input. Do not automatically publish unreviewed imported content.

## 5. Phase 0 — Repository, Website, and Product Audit

Before major changes, create an audit that establishes a reliable baseline.

### Inspect the codebase

- Repository tree, README, package and lock files, framework, runtime, routes, components, layouts, styles, fonts, image assets, and design tokens.
- Current language/localization implementation, including RTL/LTR, locale routing, translated metadata, and fallback behavior.
- Server/API code, database and schema, migrations, seeds, authentication, authorization, sessions, storage, email, analytics, and third-party integrations.
- Build, lint, type-check, unit, integration, end-to-end, and deployment commands.
- Existing CI/CD, environment variable definitions, hosting assumptions, and error logging.
- Current admin tools, content sources, lead forms, and all interactive controls.

### Inspect the actual website

Use an available browser and testing tools to review desktop, tablet, and mobile views. Test Arabic and English pages, navigation, language switching, footer links, forms, product links, CTAs, and error/empty/loading states. Check browser console errors, failed network requests, broken images, dead links, and unexpected layout shifts.

If the live site cannot be accessed, distinguish a tool/network access issue from a verified website outage. Continue with local preview or available deployment information and record what remains unverified.

### Establish baseline results

Run existing checks before changing code when feasible. Record the initial results of build, lint, type-check, tests, browser checks, accessibility scans, and performance audits. Separate pre-existing failures from regressions introduced by your changes.

### Required audit outputs

Create or update concise project documents, following existing repository conventions where present:

- `docs/website-audit.md` — observed issues and evidence.
- `docs/implementation-roadmap.md` — priorities, dependencies, and phase acceptance criteria.
- `docs/source-of-truth.md` — product claims, reference links, status, and owner-confirmation needs.
- `docs/decisions/` — only when meaningful architectural decisions require an ADR.

Do not create duplicate documents if equivalent, maintained files already exist. Then start implementation on the first prioritized phase.

## 6. Phase 1 — Make the Public Website Clear, Credible, and Conversion-Focused

This is the first implementation priority because it improves Novixa’s public credibility and ability to generate inquiries.

### Homepage

Make sure the first screen answers, quickly and clearly:

1. What is Novixa?
2. Who does it help?
3. What products or services can visitors actually use or buy?
4. What is the next best action?

Improve the headline and supporting copy to communicate tangible business value rather than vague technology claims. Use an obvious primary CTA—such as **Explore Products**, **Try a Demo**, or **Discuss a Project**—and a secondary CTA only when useful.

Include, as appropriate and supported by real assets:

- A concise company value proposition.
- A small, curated set of products with accurate availability/status labels.
- Clear separation between ready-made products and custom development.
- Real product UI screenshots, walkthroughs, or demos.
- Selected, approved work and project stories.
- A transparent outline of how an engagement works: discovery, scope, proposal, implementation/customization, QA, handover, and any agreed support.
- Relevant sectors/use cases based on existing proof, not a fabricated long list.
- Focused FAQs that answer real buyer concerns.
- Clear contact and lead-generation paths.
- A useful footer with verified contact methods, navigation, legal pages, and social links.

Avoid clutter and a long, unprioritized feature wall. Do not place all business models, products, initiatives, and future plans in the hero section.

### Information architecture

Audit the current routes and improve existing pages before creating duplicates. Add or refine only the pages justified by the business and repository, which may include:

- Home
- About Novixa
- Products/catalog
- Individual product pages
- Services or custom project engagement
- Portfolio/case studies (approved projects only)
- Product updates or articles/resources
- Community initiatives and events
- Partner/affiliate program, once approved and implemented
- Contact/request a quote
- FAQs
- Privacy policy, terms, and other necessary legal pages
- A not-found page

Use consistent route conventions, navigation, breadcrumb behavior where useful, canonical URLs, and localization. Do not create a separate page solely to repeat copy already available elsewhere.

### Contact and conversion flow

Every important CTA must lead to a real destination. Forms must validate input on the server, handle spam/rate limits, record submissions safely, show understandable success/error states, and not claim submission succeeded if persistence failed.

Collect only information needed to respond. Keep marketing opt-in separate and optional. Track the source page, language, product of interest, campaign/referral source when configured, and submission time without collecting unnecessary sensitive data.

If a mail service is not configured, keep lead storage functional where supported and clearly surface the unconfigured email dependency to administrators. Never fake email delivery.

## 7. Product Truth and Product-Catalog Requirements

Create a reliable source of truth for products. Store product status and claims as editable data rather than scattered hard-coded statements.

Suggested statuses:

- Available
- Free
- Available for demo
- Customization required
- In development
- Planned
- Archived
- Status needs confirmation

Only publish a status after verifying it. Keep planned or private products out of public sales claims unless the owner explicitly approves a roadmap announcement.

### 7.1 Novixa Aqar — نوفكسا عقار

The current business context describes Aqar as a real-estate business and property-management system for real-estate offices, property companies, agents, and related operations. It is **more than a public property-listing website**: it is intended to combine a public property-facing experience with management workflows, records, roles, and operational tools.

The current sales model is understood to be a customizable license/source delivery with implementation and optional services—not a mandatory monthly subscription. A previous owner-provided price point is **starting at USD 500**. Reconfirm this price and its inclusions before publishing it. Do not state that hosting, domain, setup, custom features, ongoing maintenance, or support are included unless the current offer explicitly includes them.

The product page must explain in business language:

- Who it is for and which operational problems it addresses.
- Public property discovery and detail pages, only if verified.
- Property and unit management, only if verified.
- Records for relevant parties such as buyers, sellers, owners, tenants, and agents, only if verified.
- Staff roles and role-specific workflows, only if verified.
- Inquiries, viewing requests, contracts, maintenance, or other workflows only when the demo/code proves them.
- Supported languages, RTL/LTR, currency options, themes, calculations, and other features only when tested.
- How the prospect can try the demo and request a tailored deployment.
- The separation between a demo environment and a client’s production deployment.
- What is included in the starting license price and what requires a separate quotation.

Do not turn a list of desired features into claims. Build a feature-verification matrix from code and demo tests; label a capability as working, partial, unavailable, unverified, or planned. Marketing copy must only promote capabilities that are demonstrated or verified. Do not call the product production-ready until the required deployment, security, backup, access-control, and operational checks have actually passed.

Compare candidate Aqar landing pages and demos using a recorded checklist: reachability, purpose, visual quality, language support, real functionality, role access, mobile UX, console/network errors, security limitations, and ongoing ownership. Recommend the canonical public links, but never remove or redirect a live alternative without confirming its role.

**Credentials and demo safety:** Do not copy passwords from old notes, screenshots, source files, or this prompt into code, seeds, documentation, or public-facing help. Use owner-provided credentials through a secure channel only when authorized, or create isolated test users with generated credentials in a disposable staging environment. Public demos should use limited-permission accounts, non-sensitive seed data, reset procedures, and no production secrets. Do not mutate live demo records destructively without explicit approval.

### 7.2 Muhajim

Available owner context identifies Muhajim as a Novixa product intended to be free, with a usable version announced in early October 2026. Verify its current repository, live deployment, purpose, and actual feature set before editing the site.

- Keep its free status clear if still confirmed.
- Do not invent a paid plan, customer count, uptime promise, roadmap guarantee, or feature list.
- Link to the current official product page and repository only after verification.
- Provide a clear try/use/feedback CTA that matches the product’s real onboarding path.
- If it is still an early release, state that accurately and invite useful feedback without implying enterprise maturity.

### 7.3 Novixa Pulse and planned products

Novixa Pulse has been discussed as a future employee-feedback/meeting and team-workflow SaaS concept. Treat it as planned or internal until the owner and repository verify a public launch status. Do not advertise hypothetical sentiment analysis, messaging integrations, task/evaluation modules, tenancy, billing, or other future features as already available.

For every other product found in Facebook, GitHub, site content, or internal project notes, establish actual ownership/status and public permission first. Do not silently promote private concepts or prospect-specific prototypes into commercial products.

## 8. Portfolio, Case Studies, and Social-Content Import

Build a trustworthy product/project catalog using evidence, not inflated claims.

A project record may include:

- Name in Arabic and English where appropriate.
- Short and detailed description.
- Intended audience and problem addressed.
- Verified feature list.
- Status (e.g. released product, active demo, proposal, client project, prototype, planned, archived).
- Demo/live/repository link where approved.
- Screenshots and media with usage permission.
- Public launch date or last verified date, if known.
- Source post/article URL and source platform.
- SEO metadata, Open Graph image, and language fields.
- Review/approval status and publication permission.

### Facebook and other source content

Review posts and media from the owner-provided official Facebook source when accessible through permitted public access. Extract only content relevant to Novixa’s products, releases, projects, events, or initiatives. Record the original post URL, publication date when visible, and extraction/check date. Respect the platform’s terms and access controls. Do not bypass login requirements or collect private information.

Do not claim “all projects have been imported” unless every accessible relevant post has been accounted for and the remaining access limits are documented. If a source is inaccessible, provide a list of missing source URLs or the specific owner-export/manual input required.

### Import/seed requirements

Use the current database architecture. If a database-backed catalog exists, build on it. If the site is currently static, do not introduce a costly or complex database simply to satisfy a checklist; compare suitable options with the existing stack and explain the maintenance implications first.

Seed/import behavior must be idempotent: running it twice must not create duplicates or overwrite owner-edited content unexpectedly. Preserve stable identifiers, source references, import timestamps, review state, and language variants. Imported or uncertain content must remain draft/pending review rather than appearing publicly by default.

Only present client work publicly after checking consent, confidentiality, logo/media rights, and the accuracy of the description. Do not expose private/internal project work— including projects the owner has not approved for public display—on the website.

## 9. Arabic-First UX, Localization, Accessibility, and Responsive Design

Arabic is a first-class language, not a mirrored afterthought. Review every critical journey in Arabic and English.

- Set correct `lang` and `dir` attributes per locale.
- Ensure RTL layout, mixed-direction numbers/URLs/code, forms, breadcrumbs, navigation, and tables are correct.
- Use natural, professional Arabic copy and business terminology; avoid awkward literal machine translation.
- Keep English pages complete and coherent, not merely translated headings.
- Use a consistent language switch that takes users to the corresponding translation when it exists; otherwise route to a sensible localized fallback rather than a misleading unrelated page.
- Test form labels, validation messages, focus order, screen-reader labels, menus, dialogs, mobile navigation, and keyboard operation in both languages.
- Meet WCAG 2.2 AA principles where applicable: contrast, keyboard access, focus visibility, semantic structure, accessible names, reduced motion, and meaningful alt text.
- Support small screens first and avoid overflow in Arabic text, navigation, tables, dialogs, and dashboards.
- Respect the user’s motion preferences and avoid decorative animation that harms usability.

Create or refine reusable design tokens and components for spacing, typography, colors, borders, buttons, forms, cards, navigation, alerts, dialogs, and status indicators. Fix design-system problems centrally rather than patching inconsistent styles page by page.

## 10. CMS and Administration — Build Only After the Public Foundations

The admin area must operate on real data and enforce authorization on the server/API. It must not be a decorative dashboard with hard-coded numbers.

First determine which CMS, database, and authentication capabilities already exist. Extend them where reasonable. Avoid building duplicate models or a second auth system.

### Minimum useful CMS slice

Begin with the smallest valuable end-to-end capability, such as managing products/projects and their Arabic/English content. Support, as justified by the existing architecture:

- Create, edit, preview, publish/unpublish, and archive products/projects.
- Arabic/English content and slugs.
- Product status and public visibility.
- Media, links, features, CTA destinations, and approved source references.
- SEO title/description, canonical URL, and social metadata.
- Draft/review/published states.
- Server-side validation and safe media handling.
- Change history/audit information for sensitive publishing actions.

Do not start by attempting a fully generic page builder if structured product/content management meets the actual need more safely.

### Later CMS modules

Once the first CMS slice is tested, add blog/articles, product updates, event and initiative content, FAQs, and shared media management where they provide measurable value. A scheduling feature must use real scheduling infrastructure; do not pretend a future publication timestamp is an implemented scheduler.

### Admin overview

Show trustworthy counts and recent activity only where the underlying data or analytics exist. Display “No data yet” or “Integration not configured” rather than fabricated counts, visits, conversions, or revenue. Admin pages should be responsive and keyboard accessible.

### Roles and permissions

Define roles to suit the real business, potentially including Super Admin, Admin, Content Editor, Sales/CRM, Support, Affiliate Manager, Finance, and Analyst. Avoid adding unnecessary roles prematurely. Enforce the permission model on the server for every sensitive read/write operation; hiding a button in the UI is not authorization.

Record privileged changes, especially publication, permissions, commission rules, sales states, and financial actions. Do not log secrets or unnecessary personal data.

## 11. CRM and Lead Management

Implement a real, minimal CRM after the public site can reliably capture and store inquiries.

Each lead should support fields appropriate to the current sales process, such as:

- Unique ID and creation/update timestamps.
- Name and the minimum contact information needed.
- Product/service of interest.
- Original source page, language, campaign, referral, and UTM values where present.
- Lead status and assigned staff member.
- Internal notes with appropriate access control.
- Follow-up dates and activity history.
- Related quotation/opportunity when that workflow is implemented.
- Consent/preferences relevant to communication.

Possible statuses: New, Reviewed, Qualified, Contacted, Meeting, Proposal, Negotiation, Won, Lost, and Spam. Use the actual process that Novixa can maintain; the list is a proposed starting point.

Support authorized filtering, assignment, status changes, private notes, follow-up history, and CSV export only if implemented safely. Restrict exports because they contain personal information. Avoid broad access for users who do not need it.

Do not build a complex sales platform before core capture, reliable persistence, and clear follow-up workflow are working end to end.

## 12. Affiliate / Partner Program — Separate, Auditable Business Module

A partner program can be valuable, but it should be implemented only after the public product information, inquiry capture, and sales process are reliable. Keep it in a separate phase/module with well-defined permissions and financial records.

### Existing agreements must be preserved

Owner context indicates that existing marketing arrangements may provide a partner **30% of the value of a qualifying sale**. Do not reduce, rewrite, or silently migrate an existing agreement because a new program or tier system is introduced. Store each agreement/campaign’s approved terms and effective date separately. Ask for owner confirmation where the precise terms or payout base are unavailable.

A proposed new-tier structure (for example 15%, 20%, 25%, and 30%) is only a design option unless explicitly approved by the owner. Do not hard-code or publish it as policy. Commission percentages, products, eligibility, payout minimums, payout cycles, attribution windows, and refund handling must be configurable and approved before launch.

### Public information and application

If approved, provide a clear Arabic/English partner page explaining:

- Who may apply and how approval works.
- Which products/campaigns are eligible.
- How referral attribution works.
- What counts as an eligible sale.
- Commission calculation and payout policy.
- Refund/cancellation/dispute handling.
- Prohibited marketing practices and brand-use requirements.
- Disclosure and privacy expectations.
- How to get support and request a review.

Never promise guaranteed income or results. Separate program application consent from optional marketing-email consent.

### Referral tracking and attribution

Use unique partner identifiers and product/campaign-specific links where needed. Persist source data through lead creation and later sales steps in a privacy-respecting manner. Define an approved attribution rule and time window. Do not treat a click, lead form, verbal promise, unpaid invoice, or unsigned proposal as a completed sale.

For consultative/customizable products such as Aqar, an authorized sales user must be able to associate a verified lead and paid transaction with the correct partner when a sale completes through offline communication. Prevent duplicate credit for the same sale. Provide an auditable correction workflow.

### Commission ledger and status model

Use explicit states such as Pending Review, Approved, Payable, Paid, Reversed, Rejected, and Disputed. Define the eligible revenue base, deductions/discounts/refunds, currency, rounding, review period, and approval rights before production use.

Use exact decimal or integer-minor-unit arithmetic, not binary floating-point for monetary amounts. Preserve the original transaction, agreed rate, policy/version, calculation details, currency, and timestamps. Corrections should create auditable reversal/adjustment entries rather than deleting financial history. Start with documented manual payouts if no approved payment integration exists; do not simulate automatic money transfers.

### Partner roles, security, and optional sub-affiliates

A partner must only access their own allowed links, leads, sales status, commission records, and payout details. Avoid exposing unnecessary customer contact information.

If a sub-affiliate feature is approved, begin with a maximum of one referral level beyond the direct seller, and only if there is a documented commercial/legal policy. Never pay for recruitment alone. The program must reward verified eligible sales, not member recruitment. A parent partner may only see the permitted aggregate/details for their own approved subtree.

If a parent’s approved maximum commission share is 25% and the sub-affiliate receives 20% of the qualifying transaction amount, the parent receives the remaining 5 percentage points, so the combined payout is 25%, not 45%. Treat this as an illustrative rule, not an approved policy. The exact distribution must be explicitly approved and tested. The system must enforce the ceiling server-side and prevent double payment.

### Affiliate dashboard and administration

Only after the commission model is approved, build the end-to-end minimum:

- Partner application, email verification, approval/rejection, and agreement version.
- Unique links and click logging subject to privacy controls.
- Leads attributed to those links.
- Authorized association to verified sales.
- Commission calculation, review, approval, payout recording, and audit trail.
- Partner view of accurate status and breakdowns.
- Admin view and filters for partners, leads, sales, commissions, adjustments, and payouts.
- Dispute/review workflow.

Do not show fake clicks, sales, balances, or conversion rates. Add anti-abuse checks proportionate to scale (self-referral rules, duplication, suspicious activity review, and rate limits) without invasive fingerprinting. Verify legal and tax requirements for the markets where the program operates; do not claim legal compliance without competent review.

## 13. Community Initiatives, Developer Gifts, Events, and Campaigns

Treat campaigns as a later, reusable module only after the core website/CMS/lead workflow is stable.

Potential owner-approved initiatives include:

1. **Novixa — Free Websites for Events and Community Initiatives:** selected cultural, scientific, educational, youth, or community events may receive a website within an explicit approved scope and capacity.
2. **A Technical Gift from Novixa — Personal Websites for Developers:** selected developers or students may receive help creating a professional portfolio within an explicitly defined scope.

Do not promise that all applicants will be accepted. The phrase “ten gifts” or a similar campaign description must not be interpreted as a promise of ten winners unless the owner confirms that quantity.

For each campaign, allow authorized administrators to set:

- Arabic/English title and description.
- Purpose, eligibility, location, application window, capacity, and selection method.
- What the grant includes and excludes (domain, hosting, paid services, custom work, maintenance, source ownership, and support).
- Application questions, consent text, optional attachments, and privacy notice.
- Campaign status and dates.
- Review states such as New, In Review, Needs Information, Accepted, Waitlisted, Rejected, and Completed.
- Internal notes, reviewer assignment, decision reason, communication templates, and audit history.
- Public winner/beneficiary display only with appropriate permission.

Collect only information required for selection. Do not require unrelated sensitive personal information. Keep application processing consent separate from optional newsletter marketing consent. Avoid publishing applicants’ names, portfolios, or materials without permission.

For contests, giveaways, and campaigns involving prizes, verify current local requirements and official platform policies before publication. Make eligibility, timelines, selection rules, prize limits, and exclusions clear. Do not fabricate winners or imply guaranteed selection. Provide a documented process for closing expired forms and retaining/deleting applicant data appropriately.

## 14. Email, Notifications, and Integrations

Use the email provider and delivery architecture already present if it is fit for purpose. Otherwise recommend a suitable integration, but do not assume DNS or provider access exists.

Potential role addresses (only show an address after the owner confirms that it exists and is monitored):

- `hello@novixa.dev` — general contact
- `sales@novixa.dev` — sales/inquiries
- `support@novixa.dev` — support
- `billing@novixa.dev` — billing
- `privacy@novixa.dev` — privacy requests
- `security@novixa.dev` — security reports
- `updates@novixa.dev` — updates/newsletter
- `noreply@novixa.dev` — transactional automation, if supported

Centralize mail and notification configuration in environment variables or a secure admin configuration mechanism. Never commit API keys. Separate transactional messages from marketing broadcasts and provide a working unsubscribe preference for optional newsletters.

Build only the templates needed by implemented workflows, in Arabic and English where applicable, such as contact confirmation, admin lead alert, partner application status, campaign application acknowledgement, and commission/payout status. Emails must use real stored data and working links. Log safe delivery status and errors without logging secrets or full sensitive payloads.

Test sender configuration and DNS records such as SPF, DKIM, and DMARC only when access is available. Do not claim delivery or DNS updates without checking them.

Social publishing should use an official, authorized API integration where available. If it is not configured, build a practical draft-and-copy workflow with source links and publication tracking. Do not claim to auto-publish to Facebook merely because the admin dashboard stores post text.

## 15. SEO, Social Sharing, and Structured Data

Perform a technical SEO audit across public pages and language variants.

- Unique and accurate title and description per page and locale.
- Correct canonical URLs and redirect behavior.
- Open Graph/Twitter/X metadata and page-specific share images where useful.
- Correct HTML `lang` and `dir`.
- Logical H1/H2/H3 hierarchy.
- Descriptive image alt text and optimized image formats/sizes.
- Sitemap and robots rules consistent with the routing setup.
- Useful internal links and breadcrumbs where appropriate.
- Correct 404 behavior; avoid soft 404s.
- `hreflang` only for genuine equivalent language pages, with reciprocal links and valid locale URLs.
- Do not index private dashboards, account pages, internal previews, staging URLs, or thin duplicate content.
- No broken internal links, mixed-content warnings, or malformed metadata.

Use structured data such as `Organization`, `BreadcrumbList`, `Article`/`BlogPosting`, or `SoftwareApplication` only when it matches the content and applicable guidelines. Do not generate fake reviews, ratings, testimonials, price claims, or organization details.

Create or validate a proper Open Graph image for Novixa and for key product/initiative pages. Images should be served over HTTPS, render clearly on mobile/social previews, and use real product/brand imagery or authorized designed assets. A ratio near 1200×630 is a useful social-sharing starting point, not a requirement for every asset.

Validate metadata and structured data with suitable available tools. Document limitations if external validators are unavailable.

## 16. Performance and Reliability

Measure first and after. Do not claim a performance improvement based only on subjective feel.

Use Core Web Vitals as targets:

- Largest Contentful Paint (LCP): 2.5 seconds or faster.
- Interaction to Next Paint (INP): 200 milliseconds or faster.
- Cumulative Layout Shift (CLS): 0.1 or lower.

Review image sizing/loading, fonts, JavaScript bundles, third-party requests, server rendering/cache behavior, route-level code splitting, and layout shifts. Optimize only where needed and avoid breaking behavior to achieve a score. Test important product imagery and hero elements at actual mobile sizes.

Use graceful loading, empty, success, error, and offline/network-failure states where relevant. Do not rely on fragile third-party resources for essential site content. Handle external links safely and provide helpful errors without exposing internal system details.

## 17. Application Security, Privacy, and Data Integrity

Review security against established guidance including the relevant OWASP Cheat Sheets:

- Authentication: `https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html`
- Session Management: `https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html`
- Authorization: `https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html`

Apply controls appropriate to the actual stack, including:

- Server-side input validation and output encoding.
- Secure password storage and reset flows if local authentication exists.
- Session/cookie settings appropriate to deployment.
- Server-side authorization for every protected record and administrative action.
- Rate limiting and spam defenses for public forms and auth endpoints.
- CSRF/XSS/SQL injection prevention according to the stack.
- Secure secret management and safe error handling.
- Least-privilege access to customer, partner, finance, and campaign records.
- File upload validation, size limits, type checks, and safe storage when uploads are used.
- Audit trails for privileged and financial operations.
- Appropriate backup and restoration procedures.
- Dependency/security checks supported by the environment.

Do not weaken authentication or authorization for demo convenience. Do not use production customer data in tests. Separate development seeds from production data. Do not run migrations or seeds destructively on production.

For privacy, collect only necessary information, document its purpose, restrict access, and create reasonable retention/deletion procedures. Ensure newsletter signup is optional. Avoid invasive tracking or unnecessary fingerprinting. State what has and has not been assessed; automated scans are not a security certification.

## 18. Architecture and Data Modeling

Use the current model and naming conventions where suitable. Do not create duplicate tables/entities just to match this prompt. Add migrations and related models only when required for a real, approved feature.

As applicable, the architecture may eventually need entities for:

- Localized products/projects and media.
- Pages/articles/updates and their publication status.
- Source references and content review approvals.
- Leads, assignments, notes, activities, and opportunities.
- User identities, roles, and permissions.
- Partner applications, agreements, campaigns, and referral links.
- Attribution events, eligible transactions, commission ledger entries, and payout records.
- Community campaigns, applications, reviews, and notifications.
- System settings, email templates, consent records, and audit events.

This is a conceptual list, not a command to create every table now. Implement only what the approved and currently scheduled features need. Use foreign keys/constraints, unique keys, indexes, transactions, idempotency controls, and precise monetary types where relevant. Avoid duplicated sources of truth.

Seed data must be development/test-safe, repeatable, and clearly separated from real customer or finance records. Do not ship sample businesses, fabricated social proof, fake financial records, or test credentials into production.

## 19. Testing Strategy and Definition of Done

Run the checks supported by the actual repository and environment. Do not invent results or skip reporting a failure.

### Baseline and regression checks

- Lint and formatting checks.
- Type checking where applicable.
- Unit and integration tests.
- Production build.
- Browser/E2E tests where available.
- Dependency/security checks where available.
- Console/network error review.
- Internal/external link checks.
- Accessibility checks on representative critical pages.
- SEO metadata and structured-data checks.
- Mobile, tablet, desktop, Arabic RTL, and English LTR checks.

### Critical user journeys

Test at least:

1. Homepage to product catalog.
2. Product page to real demo or inquiry CTA.
3. Arabic/English language switch and correct localized route.
4. Contact form validation, persistence, success/error behavior, and configured notifications.
5. Product/project content creation and editing in the CMS, including preview/publish if implemented.
6. Authorization failure when a user tries to access an unauthorized route or record.
7. Correct public/private visibility of products and drafts.
8. Source import/seed idempotency.
9. Affiliate attribution and commission calculations, only if that phase is implemented.
10. Campaign application, review, and permissions, only if that phase is implemented.

### Affiliate calculation tests, if that phase is implemented

Use approved policy values and exact arithmetic. Test duplicate sale prevention, rate snapshots, refunds/reversals, partner/parent splits, payout states, currency precision, and unauthorized access. For a purely illustrative scenario, a 25% total commission ceiling on a USD 1,000 qualifying transaction caps the aggregate commission at USD 250. A sub-affiliate allocation of 20 percentage points leaves 5 percentage points for the parent; the total must not become 45%. This example is a technical test only and does not approve any commercial terms.

### Definition of done for each phase

A phase is complete only when:

- Its acceptance criteria are met.
- User-visible behavior is implemented, not only styled.
- Relevant tests pass or known failures are documented with evidence.
- No new critical/high severity issue is introduced knowingly.
- Responsive Arabic and English states have been checked where applicable.
- Documentation reflects the actual implementation.
- There is a clear rollback/recovery approach for risky changes.

If a third-party integration cannot be fully configured because credentials or owner access are unavailable, implement safe configuration/error states and document exactly what remains. Do not represent it as operational.

## 20. Recommended Delivery Sequence

Use this sequence unless the repository audit provides strong evidence for a better one. Explain any substantial change to the order.

### Phase A — Audit, accuracy, and foundations

- Inspect the repository and live site/deployments where accessible.
- Establish baseline tests and source-of-truth register.
- Identify broken routes, confusing messaging, stale links, accessibility problems, and obvious regressions.
- Fix critical functional bugs and establish an implementation roadmap.

### Phase B — Public website and product conversion

- Refine core design system and responsive navigation.
- Improve homepage value proposition and CTAs.
- Improve product catalog, product detail patterns, contact flow, and localization.
- Make Aqar accurate and usable as a sales landing page, based only on verified capabilities and approved commercial details.
- Add Muhajim accurately if its current status is verified.
- Keep future products and unauthorized project prototypes private/unpublished.
- Improve page metadata, social previews, accessibility, and performance.

### Phase C — Content/portfolio management and basic CRM

- Implement or improve real product/project content management with review status.
- Add idempotent import/seed workflow for verified product sources.
- Connect public inquiries to persistent storage and notification status.
- Add a minimal, secure lead follow-up workflow.

### Phase D — Affiliate MVP

Only proceed after business terms are explicitly confirmed. Implement partner application, approvals, links, attribution, lead/sale association, commission ledger, and manual payout audit trail end to end. Preserve pre-existing agreements. Do not add advanced tiering or sub-affiliate features until the core financial lifecycle is tested and the policy is approved.

### Phase E — Community initiatives and campaign administration

Implement reusable applications, review states, privacy handling, notifications, and campaign pages for the initiatives the owner approves. Ensure scope and selection rules are explicit.

### Phase F — Advanced improvements

Add deeper analytics, content scheduling, advanced CRM workflows, partner training resources, social API integration, or additional automation only when there is a clear owner-approved need, secure integration path, and operational plan.

At every phase, keep the site deployable and avoid leaving broken navigation or half-integrated visible features. If a feature is not ready, hide it from the public site or mark it honestly as planned—not as complete.

## 21. Final Handover Report

At completion of the current work session, provide a concise but evidence-based report (in Arabic, unless the owner asks otherwise) with:

1. **Summary:** what improved and why.
2. **Implemented features:** identify working behavior rather than UI-only changes.
3. **Pages/routes changed:** include relevant paths.
4. **Important code/schema changes:** summarize files, components, migrations, and configurations.
5. **Source verification:** what was checked, what was imported, source links, what is pending, and any Facebook/site access limitations.
6. **Actual test results:** include commands/tools, passed/failed/skipped/not-run status, and failure details.
7. **SEO/accessibility/performance results:** record real measurements and testing environment when available; do not claim targets were met without measurement.
8. **Security/privacy observations:** what was reviewed and any limitations.
9. **Owner actions required:** credentials/integrations/price approvals/legal policy/Meta API/domain/mail configuration that only the owner can supply.
10. **Remaining work:** classify as Critical, High, Medium, or Low, and explain why.
11. **Operation guide:** how to run the project, configure environment variables, migrate/seed safely, manage products/content/leads, and deploy/rollback.

Never label an unrun test as passed. Never say “fully secure”, “SEO optimized”, “production-ready”, “all social projects imported”, or “integration working” without supporting evidence.

## 22. Final Instruction

**Start by auditing the actual repository and available live references. Produce the short evidence-based audit and prioritized plan, then immediately begin implementing the highest-value safe improvements inside the existing project.**

Prioritize trust, clear product positioning, Arabic/English usability, real demos, accurate claims, fast and accessible pages, working contact flows, and maintainable code. Add administration, CRM, affiliate finance, and community campaign features in complete tested slices rather than as decorative placeholders. Preserve real data and existing agreements. If something cannot be verified or implemented because access, credentials, or approval are missing, document the blocker precisely and continue with the work that can be completed safely.
