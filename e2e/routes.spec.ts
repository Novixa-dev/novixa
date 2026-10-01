import { test, expect } from '@playwright/test';

/**
 * Every indexable route, in both locales, must actually serve.
 *
 * The route list is derived from the sitemap rather than hardcoded: the
 * sitemap is what search engines are told exists, so if a URL is advertised
 * there and does not serve, that is precisely the defect worth catching.
 */

async function sitemapPaths(request: import('@playwright/test').APIRequestContext) {
  const response = await request.get('/sitemap.xml');
  expect(response.status(), 'sitemap.xml must serve').toBe(200);
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(locs.length, 'sitemap must list routes').toBeGreaterThan(50);
  return locs;
}

test.describe('routing', () => {
  test('every sitemap URL serves 200', async ({ request }) => {
    const paths = await sitemapPaths(request);
    const failures: string[] = [];

    for (const path of paths) {
      const response = await request.get(path, { maxRedirects: 0 });
      if (response.status() !== 200) failures.push(`${path} → ${response.status()}`);
    }

    expect(failures, `sitemap advertises URLs that do not serve:\n${failures.join('\n')}`).toEqual([]);
  });

  test('robots.txt names an absolute sitemap URL', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    // robots.txt is prerendered at build time and therefore carries whatever
    // origin the build was given, which is not necessarily the origin serving
    // this test. The requirement is that it names an absolute sitemap URL;
    // which origin that resolves to is covered by tests/site-url.test.ts.
    expect(body).toMatch(/^Sitemap: https?:\/\/\S+\/sitemap\.xml$/m);
  });

  test('an unknown locale 404s instead of silently serving Arabic', async ({ request }) => {
    // `[lang]` matches any segment, so without `dynamicParams = false` every
    // garbage path would soft-404 as indexable duplicate content.
    const response = await request.get('/not-a-locale', { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  });

  test('an unknown page under a valid locale 404s', async ({ request }) => {
    const response = await request.get('/ar/this-page-does-not-exist', { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  });

  test('the bare root redirects to the Arabic homepage', async ({ request }) => {
    const response = await request.get('/', { maxRedirects: 0 });
    expect([301, 308]).toContain(response.status());
    expect(response.headers()['location']).toContain('/ar');
  });
});
