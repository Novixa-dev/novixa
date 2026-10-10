import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    // Names the canonical host so a crawler that reached the site through a
    // mirror or a preview origin still credits novixa.dev, not that host.
    host: baseUrl,
  };
}
