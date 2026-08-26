import type { Metadata } from 'next';
import { inter, ibmPlexSansArabic, alexandria } from './fonts';
import { getSiteUrl } from '@/lib/env';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Novixa | نوڤيكسا — Software Engineering & Digital Products',
    template: '%s | Novixa',
  },
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
        {children}
      </body>
    </html>
  );
}
