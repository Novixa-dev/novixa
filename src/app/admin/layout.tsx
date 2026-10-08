import type { Metadata } from 'next';

/**
 * Private back office. Never indexed, never cached, never in the sitemap, and
 * `robots.txt` already disallows `/admin`. The noindex here is the second lock
 * for the crawler that ignores robots.txt.
 */
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
