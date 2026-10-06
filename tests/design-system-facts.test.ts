import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { CHART_PALETTE, STATUS_COLORS, SURFACE_COLORS, VERIFICATION_FACTS } from '@/content/design-system';
import { CHART_COLORS } from '@/lib/dashboard-demo';

/**
 * `/{lang}/design-system` publishes numbers to a prospect as evidence, which
 * makes a stale number there worse than no page at all. A markdown design-system
 * document was archived from this repo for exactly that: it described a backdrop
 * blur that had been removed and an indigo accent that exists nowhere in the
 * code. These assertions are what stops the published page going the same way.
 */
describe('published design-system facts', () => {
  it('quotes the real sitemap URL count', () => {
    const published = VERIFICATION_FACTS.find((fact) => fact.label.en.includes('sitemap'));
    expect(published).toBeDefined();
    expect(Number(published!.value)).toBe(sitemap().length);
  });

  it('publishes the chart palette the console actually draws with', () => {
    // Imported rather than transcribed, so this can only fail if someone
    // replaces the import with a literal.
    expect(CHART_PALETTE).toEqual(CHART_COLORS);
  });

  it('gives every published colour a measured contrast figure', () => {
    for (const token of [...SURFACE_COLORS, ...STATUS_COLORS]) {
      expect(token.value, token.name).toMatch(/^#[0-9A-F]{6}$/);
      // The surface tokens are backgrounds and carry no text, so only the ones
      // used for text or as an action colour quote a ratio.
      if (token.contrast) expect(token.contrast).toMatch(/\d\.\d+:1/);
    }
  });

  it('quotes no colour this project has ruled out', () => {
    // AGENTS.md: no purple or indigo anywhere. Tailwind's indigo-500 (#6366F1)
    // and violet-500 (#8B5CF6) are the two that kept appearing in earlier
    // documentation.
    const published = [...SURFACE_COLORS, ...STATUS_COLORS, ...CHART_PALETTE.map((value) => ({ value }))];
    for (const token of published) {
      expect(['#6366F1', '#8B5CF6', '#A855F7']).not.toContain(token.value.toUpperCase());
    }
  });

  it('states every fact in both locales', () => {
    for (const fact of VERIFICATION_FACTS) {
      expect(fact.label.ar.trim().length, fact.label.en).toBeGreaterThan(0);
      expect(fact.label.en.trim().length, fact.label.en).toBeGreaterThan(0);
    }
  });
});
