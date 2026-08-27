import { Inter, IBM_Plex_Sans_Arabic, Alexandria } from 'next/font/google';

// Body copy — Latin (English) text.
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-english',
  display: 'swap',
});

// Body copy — Arabic text. Chosen for clean, technical legibility at small sizes.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

// Display headings — both languages.
export const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});
