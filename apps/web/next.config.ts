import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/tailwind-config', '@repo/i18n'],
};

export default nextConfig;
