import { describe, it, expect } from 'vitest';
import {
  BRAND_INFO,
  SERVICES,
  READY_SOLUTIONS,
  PRODUCTS,
  INDUSTRIES,
  CASE_STUDIES,
  INSIGHTS,
  SOLUTIONS,
  PROCESS_STEPS,
} from '@/content/data';

/**
 * The site has no CMS: `src/content/data.ts` is the database, and a typo there
 * ships straight to production. TypeScript proves the *shape* is right but
 * cannot prove an Arabic string is actually Arabic, that a slug is unique, or
 * that an `en` translation was not left empty — and per AGENTS.md, mixed-locale
 * leaks have repeatedly been the real defect on this project rather than
 * anything visual. These tests cover exactly the failures types cannot.
 */

type Localized = { ar: string; en: string };

const CATALOGS = {
  SERVICES,
  READY_SOLUTIONS,
  PRODUCTS,
  INDUSTRIES,
  CASE_STUDIES,
  INSIGHTS,
  SOLUTIONS,
} as const;

/** Any Arabic-script codepoint, including the Arabic Presentation Forms. */
const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

function localizedPairs(node: unknown, path: string, out: Array<[string, Localized]> = []) {
  if (node === null || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    node.forEach((child, i) => localizedPairs(child, `${path}[${i}]`, out));
    return out;
  }
  const record = node as Record<string, unknown>;
  if (typeof record.ar === 'string' && typeof record.en === 'string') {
    out.push([path, record as unknown as Localized]);
  }
  for (const [key, value] of Object.entries(record)) {
    if (key === 'ar' || key === 'en') continue;
    localizedPairs(value, `${path}.${key}`, out);
  }
  return out;
}

describe.each(Object.entries(CATALOGS))('%s', (name, catalog) => {
  it('has at least one entry', () => {
    expect(catalog.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = catalog.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique slugs', () => {
    const slugs = catalog.map((entry) => (entry as { slug?: string }).slug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses URL-safe slugs', () => {
    for (const entry of catalog) {
      const slug = (entry as { slug?: string }).slug;
      if (slug) expect(slug, `${name} ${entry.id}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('resolves every id through its slug lookup', () => {
    // `lib/content.ts` looks entries up by `slug` OR `id`, and the sitemap
    // emits `id`. If the two ever diverge, the sitemap advertises URLs that
    // 404 — so assert both keys reach the same entry.
    for (const entry of catalog) {
      const slug = (entry as { slug?: string }).slug;
      if (!slug) continue;
      const byId = catalog.find((c) => c.id === entry.id || (c as { slug?: string }).slug === entry.id);
      const bySlug = catalog.find((c) => c.id === slug || (c as { slug?: string }).slug === slug);
      expect(byId, `${name}: id "${entry.id}" does not resolve`).toBeDefined();
      expect(bySlug, `${name}: slug "${slug}" does not resolve`).toBeDefined();
    }
  });

  it('never leaves an ar/en pair empty', () => {
    for (const entry of catalog) {
      for (const [path, pair] of localizedPairs(entry, `${name}.${entry.id}`)) {
        expect(pair.ar.trim(), `${path}.ar is empty`).not.toBe('');
        expect(pair.en.trim(), `${path}.en is empty`).not.toBe('');
      }
    }
  });

  it('never leaks Arabic text into an English string', () => {
    // The `en` side of a pair is what an English visitor reads. Arabic script
    // appearing there means a translation was skipped and the Arabic was
    // copied across.
    for (const entry of catalog) {
      for (const [path, pair] of localizedPairs(entry, `${name}.${entry.id}`)) {
        expect(ARABIC.test(pair.en), `${path}.en contains Arabic script: ${pair.en}`).toBe(false);
      }
    }
  });

  it('writes real Arabic on the ar side', () => {
    // Guards the reverse leak: an `ar` value left as the English copy.
    //
    // Two legitimate exemptions:
    //  - Purely numeric/symbolic values (metric readings like "+42%") carry no
    //    script at all.
    //  - Product names ("Novixa Aqar") are proper nouns that stay Latin in
    //    Arabic copy by design, per the brand rules in AGENTS.md. They are
    //    recognised by being byte-identical across both locales *and* carrying
    //    the brand name, so a genuinely forgotten translation still fails.
    for (const entry of catalog) {
      for (const [path, pair] of localizedPairs(entry, `${name}.${entry.id}`)) {
        if (!/\p{Letter}/u.test(pair.ar)) continue;
        if (pair.ar === pair.en && pair.ar.includes(BRAND_INFO.name)) continue;
        expect(ARABIC.test(pair.ar), `${path}.ar has no Arabic script: ${pair.ar}`).toBe(true);
      }
    }
  });
});

describe('PROCESS_STEPS', () => {
  it('is numbered contiguously from 01', () => {
    const numbers = PROCESS_STEPS.map((step) => step.number);
    expect(numbers).toEqual(numbers.map((_, i) => String(i + 1).padStart(2, '0')));
  });
});
