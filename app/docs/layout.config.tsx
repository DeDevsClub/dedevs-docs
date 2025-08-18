import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
// import ThemeAwareImage from "@/components/markdown/theme-aware-image";
import { Icon } from "@iconify/react";
import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex flex-cols gap-2 justify-between h-full w-full items-center">
        <Link href="/docs" className="flex gap-2 items-center justify-center">
          <Image
            src="/favicon.svg"
            alt="DeDevs"
            className="flex h-7 w-7 justify-center items-center"
            width={1200}
            height={1200}
          />
        <div 
          className="text-base h-full w-full justify-center flex items-center pl-1 text-center font-semibold"
          >
          DeDevs
        </div>
        </Link>
      </div>
    ),
  },
  links: [
    {
      type: "icon",
      icon: (
        <Icon icon="hugeicons:skool" className="size-5 shrink-0 hover:border border-fd-muted-foreground rounded-lg" />
      ),
      url: "https://skool.com/devs",
      text: "Join",
    },
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
    // {
    //   type: "custom",
    //   children: (
    //     <Link
    //       href="https://skool.com/devs"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Button
    //         variant="outline"
    //       >
    //         Join <Icon icon="line-md:external-link" />
    //       </Button>
    //     </Link>
    //   ),
    // },
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
