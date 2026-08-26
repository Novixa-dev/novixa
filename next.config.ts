import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // No remote images yet; all imagery is served from /public.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
