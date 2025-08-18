import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://docs.dedevs.com',
      images: '/hero.png',
      siteName: 'DeDevs',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@DeDevsClub',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/hero.png',
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.VERCEL_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL}`);