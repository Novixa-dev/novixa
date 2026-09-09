import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
