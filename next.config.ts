import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  // The /og social-card route reads this font off disk at request time; without
  // an explicit trace entry it is not copied into the deployed function bundle
  // and every Arabic card renders as tofu boxes (or 500s).
  outputFileTracingIncludes: {
    '/og': ['./src/app/og/*.ttf'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    // Arabic is Novixa's default and primary language.
    return [
      {
        source: '/',
        destination: '/ar',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/ar/team',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/ar/contact',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/ar/services',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/ar/solutions',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/ar/products',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/ar/work',
        permanent: true,
      },
      {
        source: '/insights',
        destination: '/ar/insights',
        permanent: true,
      },
      {
        source: '/industries',
        destination: '/ar/industries',
        permanent: true,
      },
      {
        source: '/start-project',
        destination: '/ar/start-project',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/ar/about',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/ar/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
