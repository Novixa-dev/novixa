import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // No remote images yet; all imagery is served from /public.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Arabic is Novixa's default and primary language. This is a permanent
    // structural redirect (not a runtime decision), so it's handled here as
    // a 308 at the routing layer rather than a client-rendered 307 page.
    return [
      {
        source: '/',
        destination: '/ar',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
