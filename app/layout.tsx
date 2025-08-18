import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
import { RootProvider, SidebarProvider } from "fumadocs-ui/provider";
// import ChatWidget from "@/components/chat/widget";
import DefaultSearchDialog from "@/components/search";

import "fumadocs-ui/style.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const defaultUrl = `https://docs.dedevs.club`;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DeDevs | Docs",
  description: "Documentation for DeDevs.",
  keywords: "DeDevs, Documentation, Docs",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "DeDevs | Docs",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    title: "DeDevs | Docs",
    description: "Documentation for DeDevs.",
    url: defaultUrl,
    siteName: "DeDevs | Docs",
    images: [
      {
        url: `/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "DeDevs Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeDevs | Docs",
    description: "Documentation for DeDevs.",
    images: [`/opengraph-image.png`],
    creator: "@DeDevsClub",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    // <ClerkProvider>
      <html
        lang="en"
        className={inter.className}
        suppressHydrationWarning={true}
      >
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <RootProvider
              search={{
                enabled: true,
                SearchDialog: DefaultSearchDialog,
              }}
            >
              <SidebarProvider>
                {children}
              </SidebarProvider>
              {/* <ChatWidget /> */}
            </RootProvider>
          </ThemeProvider>
        </body>
      </html>
    // </ClerkProvider>
  );
}
