import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * Regression cover for the production bug where every canonical link, hreflang
 * alternate and OG image URL pointed at a hardcoded `https://novixa.dev` while
 * the site was actually served from a Vercel hostname — so search engines were
 * told the live URL was a duplicate, and no social card ever rendered.
 */

const ENV_KEYS = [
  'NEXT_PUBLIC_SITE_URL',
  'SITE_URL',
  'NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL',
  'VERCEL_PROJECT_PRODUCTION_URL',
  'NEXT_PUBLIC_VERCEL_URL',
  'VERCEL_URL',
] as const;

let saved: Record<string, string | undefined>;

async function loadSiteModule() {
  // `getSiteUrl()` reads process.env on every call, but resetting the module
  // registry keeps each case independent of any module-level caching.
  vi.resetModules();
  return import('@/lib/site');
}

beforeEach(() => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  for (const k of ENV_KEYS) delete process.env[k];
});

afterEach(() => {
  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

describe('getSiteUrl', () => {
  it('prefers an explicit NEXT_PUBLIC_SITE_URL', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novixa.dev';
    process.env.VERCEL_URL = 'preview-abc.vercel.app';
    const { getSiteUrl } = await loadSiteModule();
    expect(getSiteUrl()).toBe('https://novixa.dev');
  });

  it('strips a trailing slash', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novixa.dev/';
    const { getSiteUrl } = await loadSiteModule();
    expect(getSiteUrl()).toBe('https://novixa.dev');
  });

  it('upgrades a bare Vercel hostname to https', async () => {
    // Vercel supplies hostnames without a scheme; `new URL()` in metadataBase
    // throws on those, which would fail the whole build.
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'novixa-cyan.vercel.app';
    const { getSiteUrl } = await loadSiteModule();
    expect(getSiteUrl()).toBe('https://novixa-cyan.vercel.app');
    expect(() => new URL(getSiteUrl())).not.toThrow();
  });

  it('prefers the stable production host over the per-deployment host', async () => {
    // Read from inside a preview deployment, the canonical must still point at
    // production — otherwise previews compete with production in the index.
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'novixa.vercel.app';
    process.env.VERCEL_URL = 'novixa-git-feature-x.vercel.app';
    const { getSiteUrl } = await loadSiteModule();
    expect(getSiteUrl()).toBe('https://novixa.vercel.app');
  });

  it('falls back to localhost when nothing is configured', async () => {
    const { getSiteUrl } = await loadSiteModule();
    expect(getSiteUrl()).toBe('http://localhost:3000');
  });

  it('ignores blank values instead of emitting an empty origin', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = '   ';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'novixa-cyan.vercel.app';
    const { getSiteUrl } = await loadSiteModule();
    expect(getSiteUrl()).toBe('https://novixa-cyan.vercel.app');
  });
});

describe('absoluteUrl', () => {
  it('joins a site-relative path', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novixa.dev';
    const { absoluteUrl } = await loadSiteModule();
    expect(absoluteUrl('/ar/contact')).toBe('https://novixa.dev/ar/contact');
    expect(absoluteUrl('ar/contact')).toBe('https://novixa.dev/ar/contact');
    expect(absoluteUrl()).toBe('https://novixa.dev');
  });

  it('passes an already-absolute URL through untouched', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novixa.dev';
    const { absoluteUrl } = await loadSiteModule();
    expect(absoluteUrl('https://cdn.example.com/a.png')).toBe('https://cdn.example.com/a.png');
  });
});
