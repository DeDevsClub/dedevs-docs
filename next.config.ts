import createBundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@dedevs/chat-components'],

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    // Replaced by root workspace command
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: [
    'ts-morph',
    'typescript',
    'oxc-transform',
    'twoslash',
    'shiki',
    'fumadocs-mdx',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'docs.dedevs.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'docs.dedevs.club',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/club/overview',
        permanent: true,
      },
      {
        source: '/club',
        destination: '/docs/club/overview',
        permanent: true,
      },
      {
        source: '/docs/club',
        destination: '/docs/club/overview',
        permanent: true,
      },
      {
        source: '/design',
        destination: '/docs/design/overview',
        permanent: true,
      },
      {
        source: '/docs/design',
        destination: '/docs/design/overview',
        permanent: true,
      },
      {
        source: '/vibes',
        destination: '/docs/vibes/overview',
        permanent: true,
      },
      {
        source: '/docs/vibes',
        destination: '/docs/vibes/overview',
        permanent: true,
      },
      {
        source: '/skool',
        destination: '/docs/club/skool',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX();
// export default withMDX(config);

export default withAnalyzer(withMDX(config));