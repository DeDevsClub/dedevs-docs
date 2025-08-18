import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import "@/app/globals.css";
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/docs/layout.config';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://docs.dedevs.com"
  ),
  title: {
    default: "DeDevs | Docs",
    template: "%s | DeDevs | Docs"
  },
  description: "Documentation for DeDevs.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
}

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}

