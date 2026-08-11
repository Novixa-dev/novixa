import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react', 'motion'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
