import { test, expect, type Page } from '@playwright/test';

/**
 * Locale correctness.
 *
 * AGENTS.md records that RTL/LTR bugs and mixed-language leaks — not
 * polish-level issues — have repeatedly been the actual defects on this
 * project. These tests target exactly that class.
 */

/** Arabic script, including the presentation forms. */
const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

/** Pages that carry the most copy, in both locales. */
const PAGES = ['', '/services', '/solutions', '/products', '/dashboard', '/work', '/about', '/faq'];

/**
 * Collects visible text, skipping nodes that are legitimately Latin in an
 * Arabic page: brand and product names, code/mono spans, anything marked
 * `translate="no"`, and the language switcher itself (which must name the
 * other language in that language).
 */
async function visibleLatinRuns(page: Page) {
  return page.evaluate(() => {
    const SKIP_SELECTOR = '[translate="no"], code, pre, .font-mono, [lang="en"], [data-allow-latin]';
    const results: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest(SKIP_SELECTOR)) continue;
      if (parent.closest('script, style, noscript')) continue;
      // Only text the reader can actually see.
      const style = window.getComputedStyle(parent);
      if (style.display === 'none' || style.visibility === 'hidden') continue;

      const raw = (node.textContent || '').trim();
      if (raw.length < 25) continue;

      // Latin glosses in parentheses — "أنظمة الأعمال (Internal Business
      // Systems)" — are a deliberate convention here, not a leak, so they
      // are removed before the check rather than reported.
      const text = raw.replace(/[([][^)\]]*[)\]]/g, ' ');

      // A run of Latin words long enough to be a sentence rather than a
      // product name or an acronym embedded in Arabic prose.
      const latinSentence = text.match(/[A-Za-z][A-Za-z\s,'’\-]{24,}/);
      if (latinSentence) results.push(raw.slice(0, 160));
    }
    return results;
  });
}

for (const path of PAGES) {
  test(`Arabic page ${path || '/'} is RTL and free of English sentences`, async ({ page }) => {
    await page.goto(`/ar${path}`);

    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    expect(ARABIC.test((await h1.innerText()).trim()), 'the H1 must be Arabic').toBe(true);

    const leaks = await visibleLatinRuns(page);
    expect(leaks, `English sentences on the Arabic page:\n${leaks.join('\n---\n')}`).toEqual([]);
  });

  test(`English page ${path || '/'} is LTR and free of Arabic text`, async ({ page }) => {
    await page.goto(`/en${path}`);

    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    expect(ARABIC.test((await h1.innerText()).trim()), 'the H1 must not be Arabic').toBe(false);

    // Arabic leaking into the English page, excluding the language switcher
    // and the brand's own Arabic wordmark, which belong there.
    const leaks = await page.evaluate(() => {
      const ARABIC_RE = /[؀-ۿݐ-ݿ]/;
      const out: string[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const parent = node.parentElement;
        if (!parent) continue;
        // Script payloads (JSON-LD, the Next.js flight data) are not text a
        // reader sees; the brand wordmark and the language switcher are
        // Arabic on the English page by design.
        if (parent.closest('script, style, noscript, template')) continue;
        if (parent.closest('[translate="no"], [lang="ar"], [data-allow-arabic]')) continue;
        const style = window.getComputedStyle(parent);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        const raw = (node.textContent || '').trim();
        if (raw.length < 12) continue;
        // Arabic inside parentheses is a gloss on a proper noun —
        // "Novixa Aqar (عقار)" — which belongs on the English page.
        const text = raw.replace(/[([][^)\]]*[)\]]/g, ' ');
        if (ARABIC_RE.test(text)) out.push(raw.slice(0, 160));
      }
      return out;
    });
    expect(leaks, `Arabic text on the English page:\n${leaks.join('\n---\n')}`).toEqual([]);
  });
}

test('switching locale keeps you on the same page', async ({ page }) => {
  await page.goto('/ar/solutions');
  await page.getByRole('button', { name: /Switch to English|English/i }).first().click();
  await page.waitForURL('**/en/solutions');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('no page scrolls horizontally', async ({ page }) => {
  // Horizontal overflow is the classic RTL regression: one fixed width or a
  // non-logical margin and the whole page drifts sideways on mobile.
  for (const path of ['/ar', '/en', '/ar/dashboard', '/ar/solutions', '/ar/faq']) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `${path} scrolls horizontally by ${overflow}px`).toBeLessThanOrEqual(0);
  }
});
