import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Next.js only renders a segment's own not-found.tsx boundary for explicit
// notFound() calls or params rejected by dynamicParams — a URL that matches
// no route file at all falls through to the root not-found.tsx instead,
// losing the Navbar/Footer. This catch-all is a real matched page inside
// [lang], so any otherwise-unmatched path under /ar or /en lands here and
// triggers [lang]/not-found.tsx with the site chrome intact.
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function CatchAllNotFound(): never {
  notFound();
}
