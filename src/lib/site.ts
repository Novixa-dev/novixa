/**
 * Single source of truth for the site's public origin.
 *
 * Everything user-visible that needs an absolute URL — canonical links,
 * hreflang alternates, `og:image`, the sitemap, robots.txt, JSON-LD `@id`s —
 * resolves through here. It used to be duplicated across `lib/env.ts` and
 * `lib/metadata.ts`, both of which fell back to a hardcoded
 * `https://novixa.dev`. On any deployment not served from that exact domain
 * (every preview, and the production Vercel URL before the custom domain is
 * attached) that produced canonicals and social-card URLs pointing at a host
 * which does not serve the page: search engines were told the real URL was a
 * duplicate, and every OG card resolved to a dead origin, so no share
 * preview rendered at all.
 *
 * Resolution order, most explicit first:
 *  1. NEXT_PUBLIC_SITE_URL — set this in production; it is the only value
 *     that survives a domain change and is inlined into the client bundle.
 *  2. SITE_URL — server-only alias, kept for existing deployments.
 *  3. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production
 *     hostname. Correct even when read from inside a preview deployment,
 *     which is what makes it safe for canonical URLs.
 *  4. VERCEL_URL — the per-deployment hostname. Last resort, so preview
 *     builds are at least self-consistent instead of pointing elsewhere.
 *  5. localhost, for local development.
 */

const FALLBACK_DEV_ORIGIN = 'http://localhost:3000';

function normalize(value: string): string {
  const trimmed = value.trim().replace(/\/$/, '');
  if (!trimmed) return '';
  // Vercel supplies bare hostnames ("novixa.vercel.app"); an origin needs a
  // scheme or `new URL()` throws when metadataBase parses it.
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = normalize(candidate);
    if (normalized) return normalized;
  }

  return FALLBACK_DEV_ORIGIN;
}

/** Absolute URL for a site-relative path, e.g. `absoluteUrl('/ar/contact')`. */
export function absoluteUrl(path = ''): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
