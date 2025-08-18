import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
// import ThemeAwareImage from "@/components/markdown/theme-aware-image";
import { Icon } from "@iconify/react";
import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Link href="/">
        <Image
          src="/favicon.ico"
          alt="DeDevs"
          className="max-h-9 w-full px-12 py-1 justify-center flex items-center text-center mt-1"
          width={124}
          height={32}
        />
      </Link>
    ),
  },
  links: [
    {
      type: "icon",
      icon: (
        <Icon icon="line-md:github-twotone" className="size-5 shrink-0 hover:border border-fd-muted-foreground rounded-lg" />
      ),
      url: "https://github.com/DeDevsClub",
      text: "Github",
    },
    {
      type: "icon",
      icon: (
        <Icon icon="line-md:twitter-x" className="size-5 shrink-0 hover:border border-fd-muted-foreground rounded-lg" />
      ),
      url: "https://x.com/DeDevsClub",
      text: "X",
    },
    {
      type: "icon",
      icon: (
        <Icon icon="line-md:youtube" className="size-5 shrink-0 hover:border border-fd-muted-foreground rounded-lg" />
      ),
      url: "https://www.youtube.com/@BunsDev",
      text: "YouTube",
    },
    {
      type: "custom",
      children: (
        <Link
          href="https://docs.dedevs.club"
        >
          <Button
            variant="outline"
          >
            Launch <Icon icon="line-md:external-link" />
          </Button>
        </Link>
      ),
    },
  ],
  // links: [
  //   { 
  //     type: "custom",
  //     children: (
  //       <Navbar />
  //     ),
  //   },
  // ],
};
