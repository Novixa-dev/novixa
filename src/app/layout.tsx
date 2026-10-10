import type { Metadata, Viewport } from 'next';
import { MotionConfig } from 'motion/react';
import { inter, ibmPlexSansArabic, alexandria } from './fonts';
import { getSiteUrl } from '@/lib/env';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Novixa | نوڤيكسا — Software Engineering & Digital Products',
    template: '%s | Novixa',
  },
  applicationName: 'Novixa',
  description:
    'Novixa is a software engineering and digital products company: custom business platforms, SaaS products, and system modernization for the Middle East and GCC.',
  authors: [{ name: 'Novixa', url: getSiteUrl() }],
  creator: 'Novixa',
  publisher: 'Novixa',
  category: 'technology',
  // The site has no phone number or postal address to auto-detect; leaving
  // detection on makes some mobile browsers rewrite innocent number-like text
  // (a budget, a port) into tappable tel: links.
  formatDetection: { email: false, address: false, telephone: false },
  appleWebApp: {
    capable: true,
    title: 'Novixa',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    // `favicon.ico` first for the browsers and crawlers that still request
    // `/favicon.ico` by convention and ignore the declared SVG; the SVG then
    // wins wherever it is supported, since it stays crisp at any density.
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

// Matches the site's dark-only canvas: themeColor tints the mobile browser
// chrome (address bar) instead of leaving it default white/black, and
// color-scheme (set in globals.css) themes native form controls/scrollbars
// to dark instead of the browser's light default.
export const viewport: Viewport = {
  themeColor: '#020617',
};

// Root layout renders once for every locale, but sits above the `[lang]`
// route segment and so has no server-side access to it. This inline script
// runs synchronously before first paint (before `[lang]/layout.tsx`'s own
// `dir` div even mounts) so `/en` pages never flash RTL before flipping to
// LTR. `LanguageContext` keeps these attributes in sync after hydration.
const SET_LANG_DIR_SCRIPT = `
(function () {
  var lang = location.pathname.split('/')[1] === 'en' ? 'en' : 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexSansArabic.variable} ${alexandria.variable} scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SET_LANG_DIR_SCRIPT }} />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        {/* Respects the OS-level "reduce motion" preference for every
            motion.* animation site-wide, instead of playing full motion
            unconditionally regardless of user preference. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
