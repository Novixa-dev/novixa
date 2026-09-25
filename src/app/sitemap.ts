import { MetadataRoute } from 'next';
import {
  productsCatalog,
  industriesCatalog,
  caseStudiesCatalog,
  insightsArticles,
} from '@/lib/content';
import { getSiteUrl } from '@/lib/env';

const LANGUAGES = ['ar', 'en'] as const;

/**
 * A fixed content revision stamp rather than `new Date()`.
 *
 * Emitting "now" on every crawl told search engines that every URL on the
 * site changed on every fetch, which devalues `lastModified` as a signal.
 * Bump this when the content in `src/content/data.ts` materially changes.
 */
const CONTENT_REVISION = new Date('2026-09-25T00:00:00.000Z');

type RouteSpec = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] };

// Every indexable static route. `services` is listed because it resolves 200
// again (it previously 308-redirected to /solutions while still being
// advertised here, which surfaces in Search Console as "Page with redirect").
const STATIC_ROUTES: RouteSpec[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'services', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'start-project', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'products', priority: 0.8, changeFrequency: 'weekly' },
  { path: 'industries', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'work', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'about', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'team', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'insights', priority: 0.7, changeFrequency: 'weekly' },
];

function entry(path: string, priority: number, changeFrequency: RouteSpec['changeFrequency'], lang: string) {
  const baseUrl = getSiteUrl();
  const suffix = path ? `/${path}` : '';
  return {
    url: `${baseUrl}/${lang}${suffix}`,
    lastModified: CONTENT_REVISION,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ar: `${baseUrl}/ar${suffix}`,
        en: `${baseUrl}/en${suffix}`,
        'x-default': `${baseUrl}/ar${suffix}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of LANGUAGES) {
    for (const route of STATIC_ROUTES) {
      sitemapEntries.push(entry(route.path, route.priority, route.changeFrequency, lang));
    }

    for (const prod of productsCatalog) {
      sitemapEntries.push(entry(`products/${prod.id}`, 0.8, 'monthly', lang));
    }

    // Previously missing entirely — the whole industries cluster was
    // unreachable from the sitemap *and* from site navigation.
    for (const ind of industriesCatalog) {
      sitemapEntries.push(entry(`industries/${ind.id}`, 0.7, 'monthly', lang));
    }

    for (const cs of caseStudiesCatalog) {
      sitemapEntries.push(entry(`work/${cs.id}`, 0.7, 'monthly', lang));
    }

    for (const art of insightsArticles) {
      sitemapEntries.push(entry(`insights/${art.id}`, 0.7, 'monthly', lang));
    }
  }

  return sitemapEntries;
}
