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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='10' fill='%23020617'/><path d='M10 8V32M10 8L30 32M30 8V32' stroke='%232563EB' stroke-width='4.5' stroke-linecap='round' stroke-linejoin='round'/><circle cx='30' cy='8' r='3' fill='%2338BDF8'/><circle cx='10' cy='32' r='3' fill='%231D4ED8'/></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='10' fill='%23020617'/><path d='M10 8V32M10 8L30 32M30 8V32' stroke='%232563EB' stroke-width='4.5' stroke-linecap='round' stroke-linejoin='round'/><circle cx='30' cy='8' r='3' fill='%2338BDF8'/><circle cx='10' cy='32' r='3' fill='%231D4ED8'/></svg>"
          type="image/svg+xml"
        />
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
