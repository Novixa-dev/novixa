import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Novixa | نوڤيكسا — Software Engineering & Digital Products',
    short_name: 'Novixa',
    description:
      'Novixa builds enterprise software systems, multi-tenant B2B SaaS platforms, and digital products across the Middle East and GCC.',
    start_url: '/ar',
    display: 'browser',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
