import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SOCIAL_LINKS } from '@/data/navigation';

/**
 * Locks the structured-data and social-card guarantees that carry no UI of
 * their own, so a refactor cannot silently drop them.
 *
 * The concrete regression this guards: the Organization's `sameAs` list used
 * to be a second, hand-maintained copy of the footer's social URLs. Two copies
 * drift, and a search engine then reads a profile the site never links to — or
 * misses one it does. It now derives from `SOCIAL_LINKS`, and this asserts the
 * two cannot diverge again.
 */

const ENV_KEYS = ['NEXT_PUBLIC_SITE_URL'] as const;
let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  process.env.NEXT_PUBLIC_SITE_URL = 'https://novixa.dev';
  vi.resetModules();
});

afterEach(() => {
  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

describe('Organization JSON-LD', () => {
  it('is identified and lists exactly the site’s real social profiles', async () => {
    const { generateOrganizationJsonLd } = await import('@/lib/metadata');
    const org = generateOrganizationJsonLd();
    expect(org['@id']).toBe('https://novixa.dev/#organization');
    expect(org.sameAs).toEqual(SOCIAL_LINKS.map((link) => link.url));
    expect(org.sameAs.length).toBeGreaterThan(0);
  });

  it('declares both site languages and a structured logo', async () => {
    const { generateOrganizationJsonLd } = await import('@/lib/metadata');
    const org = generateOrganizationJsonLd();
    expect(org.knowsLanguage).toEqual(['ar', 'en']);
    expect(org.logo).toMatchObject({ '@type': 'ImageObject', url: 'https://novixa.dev/icon.svg' });
  });
});

describe('WebSite JSON-LD', () => {
  it('points at the organization node as its publisher', async () => {
    const { generateWebSiteJsonLd } = await import('@/lib/metadata');
    const site = generateWebSiteJsonLd();
    expect(site['@id']).toBe('https://novixa.dev/#website');
    expect(site.publisher).toEqual({ '@id': 'https://novixa.dev/#organization' });
    expect(site.inLanguage).toEqual(['ar', 'en']);
  });
});

describe('constructMetadata', () => {
  it('emits a self-referential canonical and both alternates', async () => {
    const { constructMetadata } = await import('@/lib/metadata');
    const md = constructMetadata({ title: 'الخدمات', description: 'وصف', lang: 'ar', path: 'services' });
    expect(md.alternates?.canonical).toBe('https://novixa.dev/ar/services');
    expect(md.alternates?.languages).toMatchObject({
      ar: 'https://novixa.dev/ar/services',
      en: 'https://novixa.dev/en/services',
      'x-default': 'https://novixa.dev/ar/services',
    });
  });

  it('sets a Twitter handle derived from the social links, not a hardcoded one', async () => {
    const { constructMetadata } = await import('@/lib/metadata');
    const md = constructMetadata({ title: 'Services', description: 'Description', lang: 'en', path: 'services' });
    const handle = SOCIAL_LINKS.find((link) => link.iconName === 'Twitter')?.url.replace(/.*\//, '@');
    // Next exposes the Twitter metadata as a union; read it as a plain record.
    const twitter = JSON.parse(JSON.stringify(md.twitter ?? {})) as { site?: string; creator?: string; card?: string };
    expect(twitter.site).toBe(handle);
    expect(twitter.creator).toBe(handle);
    expect(twitter.card).toBe('summary_large_image');
  });

  it('never opts a public page out of indexing', async () => {
    const { constructMetadata } = await import('@/lib/metadata');
    const md = constructMetadata({ title: 'Work', description: 'Description', lang: 'en', path: 'work' });
    expect(md.robots).toMatchObject({ index: true, follow: true });
  });
});

describe('robots.txt', () => {
  it('names the canonical host and keeps the private surface out', async () => {
    const robots = (await import('@/app/robots')).default;
    const result = robots();
    expect(result.host).toBe('https://novixa.dev');
    expect(result.sitemap).toBe('https://novixa.dev/sitemap.xml');
    const disallow = result.rules && (Array.isArray(result.rules) ? result.rules : [result.rules]);
    const blocked = JSON.stringify(disallow);
    expect(blocked).toContain('/admin');
    expect(blocked).toContain('/api/');
  });
});
