# Novixa — Working Rules

The standing process for anyone working on this repository, agent or person. It
is not a style guide (`AGENTS.md` is that) and not a plan (`IMPLEMENTATION_PLAN.md`
is that). It is how work gets picked up, proven and handed over, so that the next
session does not re-derive decisions already made or re-introduce defects already
fixed.

Every rule below exists because its absence cost something on this project. The
cost is named, so a future reader can judge whether the rule still earns its
keep instead of obeying it on faith.

**Last updated:** 2026-10-06

---

## 0. Read before writing

In this order, every session:

1. `AGENTS.md` — visual identity, RTL rules, and the content rules. The content
   rules are the ones that get projects into trouble.
2. `docs/PRODUCTION_AUDIT.md` — what is known broken and what is known fine.
3. `docs/IMPLEMENTATION_PLAN.md` — what is done, what remains, and the reasoning
   behind calls that were not obvious. Read the "Decisions worth remembering"
   section even when in a hurry.
4. This file.

Four documents is a deliberate ceiling. There were eleven overlapping audit
reports in `docs/` once; they disagreed with each other and with the code, and
nobody could say which was current. They are in `docs/archive/` now. **Do not add
a fifth standing document** — update one of these instead. A new document is
justified only when it answers a question none of the four is shaped to answer
(`COMPETITIVE_BENCHMARK.md` and the Arabic owner's guide are the two that
qualified).

---

## 1. Never fabricate

The hardest rule and the one that matters most, because this is a real company's
public site.

Never invent: client names, testimonials, logos, quotes, statistics, years of
experience, partnerships, certifications, integrations, engagement models,
prices, release history, team members, security guarantees, SLAs, or deployment
counts. Never invent credentials of any kind — API keys, passwords, tokens,
database URLs — not even as placeholders that look real.

When a page needs a fact nobody has:

- **omit it**, or
- **label it explicitly** (the console says "illustrative data" above its
  figures, not under them, and its CSV export carries the notice in the file),
  or
- **record it as an owner decision** in `IMPLEMENTATION_PLAN.md` and leave the
  page without it.

What this looked like in practice: seven product metrics asserted outcomes no
evidence supported (`2.5× faster at peak`) and were replaced with capability
statements. A `TestimonialsSection` with invented clients was deleted rather than
merged. A placeholder WhatsApp number (`wa.me/967770000000`) was removed and the
channel made env-gated, so it is absent until a real number exists. Of twenty
features the reference templates ship, seven were rejected on exactly this rule.

**A polished site with fewer true claims beats an impressive one with plausible
fiction.** That trade is not a constraint on the work; it is the work.

---

## 2. Measure, do not assert

No performance claim without a number, and no number from a single run.

- Lighthouse scores vary by 10+ points run to run on the same build. **Median of
  5 minimum, 7 preferred.** A single run is not a measurement. One baseline was
  recorded as 72 and the median of 7 was 78; the correction is written into
  `PRODUCTION_AUDIT.md` rather than quietly overwritten.
- Before optimising, find out what is actually slow. Code-splitting ten
  below-fold sections with `next/dynamic` moved the score 72 → 66, because
  splitting rearranges work rather than removing it. Reverted, and the reason
  recorded so nobody tries it again.
- Separate what you changed from what moved. Moving sixteen components off the
  client bundle cut first-load JS by up to 82 kB and moved the Lighthouse score
  by **zero** — the bottleneck was layout, not script. Kept as an architectural
  improvement, recorded as not a performance win.
- Distinguish observed from simulated. `content-visibility: auto` cut the
  observed LCP render delay 1275 → 288 ms and left the simulated Lighthouse
  score unchanged, because Lantern bounds LCP by the simulated critical path.
  Both numbers go in the record, not just the flattering one.
- Write your own measurement tooling with suspicion. A contrast script parsed
  Tailwind v4's `oklch()` output as RGB and produced 372 false failures. The
  replacement samples real screenshot pixels through a browser.

---

## 3. Fix findings; never silence them

Enabling ESLint surfaced 122 findings. 121 were fixed. The one suppression is in
the root error boundary, with the reason inline — that boundary has to survive a
broken router subtree, so a full document load is the only reliable escape hatch.

Specifically forbidden:
- adding a rule to `ignores` or an `eslint-disable` to make a commit pass;
- skipping, `.skip`-ing, quarantining or deleting a failing test;
- loosening `dynamicParams`, `strict`, or a type to make an error go away;
- `as any`, `@ts-expect-error` without a named reason and a plan.

---

## 4. When a test fails, find out which one is wrong

A failing test means the test or the product is wrong. Decide which, on evidence,
before changing either.

Of seven failures in the first browser-suite run: four were real product defects
and were fixed in the product; three were tests misreading deliberate
conventions — Latin glosses inside Arabic parentheses, `<script>` payloads read
as visible text, and a honeypot that is visually hidden rather than
`display: none` (the point: bots skip `display: none`). Those three were
corrected in the tests, each with a comment saying why.

Later, a browser test took the console table's first row to be today. The table
runs oldest-first to match the chart's direction. The test was wrong; it now
asserts both halves of the behaviour.

**And when a whole suite goes red at once, suspect the toolchain.** 105 browser
tests failed in 4 ms each — not a product regression but a caret range on
`@playwright/test` resolving to a version whose pinned browser revision the
container did not provide. A toolchain failure reads exactly like a product
failure in the summary line. Read the first error before reading the count.

---

## 5. Trust nothing that could be stale

A `next start` from an earlier build once answered an entire debugging session.
Every measurement described a build that no longer existed, and four experiments
chased a defect that was not there. `EADDRINUSE` was in the log and went unread.

- `reuseExistingServer: false` in the Playwright config is deliberate. Do not
  "optimise" it back.
- Before measuring anything, confirm what is listening: `lsof -ti:<port>`.
- Rebuild before measuring. `npm run build` then measure, never the reverse.
- Never `pkill -f "next start"` — it matched and killed the controlling shell.
  Use `ps -eo pid,args | grep "[n]ext-server"` and kill by pid.

---

## 6. Verification coverage follows the feature

A new page gets added to the suites in the same commit that creates it, not in a
follow-up. When `/design-system` was built, the axe suite and both locale-leak
suites gained it immediately — and that is how the `text-slate-500` contrast
defect was caught, including the two existing components that already had it.

The route suite is driven by the sitemap, so an advertised URL that does not
serve fails the build. Keep it that way: when you add a route to the sitemap you
have also added it to the tests.

---

## 7. The gate

Nothing is "done" until all of this is green, locally, on the current build:

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # 0 errors, 0 warnings
npm run test          # unit
npm run build         # production build
npm run test:e2e      # desktop · tablet · mobile
```

Plus, for any page touched:

```bash
CHROME_PATH=/opt/pw-browsers/chromium npx lighthouse <url> \
  --only-categories=accessibility,best-practices,seo
```

100/100/100 is the standing bar on all three, and a drop is a real signal. It
dropped to 96 once, on a page written in this session, and the cause was a
genuine WCAG failure that was also already live in two other components.

And check both locales in a browser, not by reading the source. RTL/LTR bugs and
mixed-language leaks have repeatedly been the actual defects on this project, not
the polish-level things. Check tablet width (768–1023px) specifically; the navbar
breakpoint has broken there twice.

---

## 8. Commits and synchronisation

- **One concern per commit.** When two unrelated changes end up staged together,
  split them before pushing — `git reset --soft HEAD~1` and re-stage. Splitting
  a local commit is free; rewriting pushed history is not, and is not done.
- **The message carries the reasoning, not the diff.** The diff already says
  what changed. The message says what was wrong, what the numbers were before
  and after, what was tried and rejected, and what is still unknown. If a commit
  message would be as useful six months from now with the diff unavailable, it
  is long enough.
- **Record the corrections too.** A message that mentions only the change that
  worked is a message that will mislead the next person into retrying the one
  that did not.
- **Push after each coherent unit**, not at the end of a session. The branch is
  the only durable artefact; a container is reclaimed.
- **Never** force-push, hard-reset a shared branch, rewrite public history,
  bypass hooks to make a commit pass, or delete a branch without being asked.

---

## 9. Tracking

Keep a task list and keep it honest. A task is `completed` only when the gate in
§7 passed for it — not when the code is written. When a task turns out to be
blocked on a fact only the owner has, say so in the task and in
`IMPLEMENTATION_PLAN.md`, finish everything that does not depend on it, and
report what was left and why.

Scaling work down is the owner's decision, not the implementer's. Deliver the
whole scope or name the part you did not.

---

## 10. Tools

Prefer, in this order: what the repository already has → the platform → a
dependency.

- The site ships ~102 kB of shared JS. A dependency that adds a meaningful
  fraction of that for one feature needs an argument. The console's two chart
  shapes are hand-rolled SVG for exactly this reason.
- `@vercel/analytics` and `@vercel/speed-insights` were rejected: both carry an
  optional `@sveltejs/kit` peer that npm resolves against this tree, where it
  collides with the Vite version Vitest pins. Installing either needs
  `--legacy-peer-deps`, which weakens resolution for every package in the
  project — a permanent cost for one reporting script. Next's own
  `useReportWebVitals` reports the same metrics with no dependency.
- Pin test tooling exactly. A caret on `@playwright/test` is what broke the
  browser suite; a runner that pins a browser revision should not float its own
  version.
- Reach for the platform first: `<details>` for the FAQ accordion (expand,
  collapse, in-page find and keyboard support, no JavaScript),
  `content-visibility` for off-screen layout cost, `history.replaceState` for URL
  state that must not trigger a navigation.

---

## 11. Accessibility and internationalisation are not a pass at the end

They are the conditions the work is done under.

- Every user-facing string goes through `t(ar, en)`. No exceptions, including
  `aria-label`, `alt`, `title`, and text inside a generated file such as a CSV
  export.
- Arabic is the original, not a translation. Write the Arabic first and make the
  English match it.
- `text-slate-400` is the lightest shade allowed for readable text. Measured:
  7.87:1 on the canvas, 7.04:1 over a card. `text-slate-500` is 4.24:1 and
  3.79:1 — below threshold, so non-text UI only.
- `role="tablist"` is a promise that arrow keys work. Keep the promise or drop
  the role. Automated checks cannot tell the difference; a browser test can.
- A chart that exists only as a picture excludes people. The console carries a
  real `<table>` of the same data.

---

## 12. Reporting

Report outcomes faithfully. If a measurement did not move, say it did not move.
If a step was skipped, say which. If something is blocked on account access or a
network policy, name the blocker and what unblocks it rather than describing the
work as finished.

The honest version of this project's performance story is: the architecture
improved materially, the observed paint time improved by 4.4×, and the lab score
did not change. All three statements are in the record. A report containing only
the first two would have been more flattering and less useful — and the next
person would have wasted a day wondering why the score was still 78.
