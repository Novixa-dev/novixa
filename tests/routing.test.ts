import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import {
  servicesCatalog,
  readySolutionsCatalog,
  productsCatalog,
  industriesCatalog,
  caseStudiesCatalog,
  insightsArticles,
} from '@/lib/content';
import { LEGAL_DOCUMENTS } from '@/content/legal';
import { FAQ_ITEMS } from '@/content/faq';

/**
 * The sitemap is hand-maintained and the routes are generated from catalogs,
 * so the two drift apart silently: a new entry in `data.ts` produces a live
 * page nothing links to, and a removed one leaves the sitemap advertising a
 * URL that 404s. Both show up in Search Console weeks later. Assert the two
 * agree at build time instead.
 */

const entries = sitemap();
const paths = new Set(
  entries.map((entry) => new URL(entry.url).pathname)
);

describe('sitemap', () => {
  it('covers both locales for every entry', () => {
    for (const path of paths) {
      const other = path.startsWith('/ar') ? path.replace('/ar', '/en') : path.replace('/en', '/ar');
      expect(paths.has(other), `${path} has no counterpart at ${other}`).toBe(true);
    }
  });

  it('has no duplicate URLs', () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it.each([
    ['services', servicesCatalog, (e: { slug: string }) => e.slug],
    ['solutions', readySolutionsCatalog, (e: { slug: string }) => e.slug],
    ['products', productsCatalog, (e: { id: string }) => e.id],
    ['industries', industriesCatalog, (e: { id: string }) => e.id],
    ['work', caseStudiesCatalog, (e: { id: string }) => e.id],
    ['insights', insightsArticles, (e: { id: string }) => e.id],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ])('lists every %s detail page in both locales', (segment, catalog, key: any) => {
    for (const item of catalog) {
      for (const lang of ['ar', 'en']) {
        const expected = `/${lang}/${segment}/${key(item)}`;
        expect(paths.has(expected), `sitemap is missing ${expected}`).toBe(true);
      }
    }
  });

  it('lists the legal documents', () => {
    for (const doc of LEGAL_DOCUMENTS) {
      for (const lang of ['ar', 'en']) {
        expect(paths.has(`/${lang}/legal/${doc.slug}`)).toBe(true);
      }
    }
  });

  it('advertises exactly the URLs the content catalogs account for', () => {
    // 14 hub pages plus every detail page, in both locales. Asserting the total
    // catches an entry added to the sitemap that no catalog backs — the mirror
    // image of the per-catalog checks above, which catch the reverse. The
    // owner's guide quotes this number, so it is guarded rather than trusted.
    const hubs = 14;
    const details =
      servicesCatalog.length +
      readySolutionsCatalog.length +
      productsCatalog.length +
      industriesCatalog.length +
      caseStudiesCatalog.length +
      insightsArticles.length +
      LEGAL_DOCUMENTS.length;

    expect(entries).toHaveLength((hubs + details) * 2);
  });

  it('lists the hub pages', () => {
    for (const lang of ['ar', 'en']) {
      for (const hub of ['', '/services', '/solutions', '/products', '/dashboard', '/design-system', '/faq', '/work', '/about', '/contact', '/industries', '/insights', '/start-project', '/team']) {
        expect(paths.has(`/${lang}${hub}`), `sitemap is missing /${lang}${hub}`).toBe(true);
      }
    }
  });

  it('uses a fixed lastModified rather than the current time', () => {
    // Emitting "now" on every crawl tells search engines every URL changed on
    // every fetch, which devalues the signal entirely.
    const stamps = new Set(entries.map((e) => String(e.lastModified)));
    expect(stamps.size).toBe(1);
  });
});

describe('FAQ', () => {
  it('has unique ids, which double as in-page anchors', () => {
    const ids = FAQ_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('answers every question in both locales', () => {
    for (const item of FAQ_ITEMS) {
      expect(item.answer.ar.trim().length, `${item.id} ar`).toBeGreaterThan(40);
      expect(item.answer.en.trim().length, `${item.id} en`).toBeGreaterThan(40);
    }
  });
});
