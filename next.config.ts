import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
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
        destination: '/ar/solutions',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/ar/about',
        permanent: true,
      },
      {
        source: '/:lang(ar|en)/services',
        destination: '/:lang/solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
