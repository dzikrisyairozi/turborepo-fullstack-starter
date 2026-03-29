import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    transpilePackages: ['@repo/ui', '@repo/tailwind-config'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/en',
                permanent: false,
            },
        ];
    },
};

const withMDX = createMDX();

export default withMDX(config);
