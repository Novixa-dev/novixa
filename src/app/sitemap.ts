import { MetadataRoute } from 'next';
import { productsCatalog, industriesCatalog, caseStudiesCatalog, insightsArticles } from '@/lib/content';
import { getSiteUrl } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const languages = ['ar', 'en'];
  const staticRoutes = [
    '',
    'services',
    'solutions',
    'products',
    'work',
    'about',
    'contact',
    'insights',
    'start-project',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    // Static Routes
    for (const route of staticRoutes) {
      const url = `${baseUrl}/${lang}${route ? `/${route}` : ''}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === 'services' || route === 'solutions' || route === 'contact' ? 0.9 : 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${route ? `/${route}` : ''}`,
            en: `${baseUrl}/en${route ? `/${route}` : ''}`,
          },
        },
      });
    }

    // Dynamic Products
    for (const prod of productsCatalog) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/products/${prod.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar/products/${prod.id}`,
            en: `${baseUrl}/en/products/${prod.id}`,
          },
        },
      });
    }

    // Dynamic Case Studies (Work)
    for (const cs of caseStudiesCatalog) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/work/${cs.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar/work/${cs.id}`,
            en: `${baseUrl}/en/work/${cs.id}`,
          },
        },
      });
    }

    // Dynamic Insights
    for (const art of insightsArticles) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/insights/${art.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar/insights/${art.id}`,
            en: `${baseUrl}/en/insights/${art.id}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
