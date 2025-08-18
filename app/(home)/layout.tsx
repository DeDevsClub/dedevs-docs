import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import "@/app/globals.css";
import { HomeLayout } from 'fumadocs-ui/layouts/home';
// import Preview from '@/public/logo-horizontal.svg';
import { baseOptions } from '@/app/docs/layout.config';
import { Icon } from '@iconify/react';
import { links as navLinks } from '@/data/links';
import Link from 'next/link';

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
  return (
    <HomeLayout
      {...baseOptions}
      links={navLinks}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-fd-card py-12 text-fd-secondary-foreground">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-3">
          <Link
            href="https://x.com/DeDevsClub"
            rel="noreferrer noopener"
            target="_blank"
            aria-label="Twitter"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <Icon icon="line-md:twitter-x" className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/DeDevsClub"
            rel="noreferrer noopener"
            target="_blank"
            aria-label="GitHub"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            <Icon icon="line-md:github-twotone" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}