import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Novixa | نوڤيكسا — Software Engineering & Digital Products',
    short_name: 'Novixa',
    description:
      'Novixa builds enterprise software systems, multi-tenant B2B SaaS platforms, and digital products across the Middle East and GCC.',
    start_url: '/ar',
    // Arabic is the primary language, so the installed app opens RTL.
    lang: 'ar',
    dir: 'rtl',
    scope: '/',
    // `standalone` rather than `browser`: with real icons in place the site is
    // worth keeping on a home screen — a branch manager opening the operations
    // console daily should not go through the browser chrome each time.
    display: 'standalone',
    orientation: 'any',
    background_color: '#020617',
    theme_color: '#020617',
    categories: ['business', 'productivity', 'developer'],
    icons: [
      // SVG first: it scales to any density without shipping a large raster.
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Maskable variants carry the artwork inside an 80% safe zone. Android
      // crops installed icons to the launcher's shape, so a logo filling the
      // canvas loses its corners without these.
      { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
