import { Icon } from "@iconify/react";
import Link from "fumadocs-core/link";
import Image from "next/image";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import type { LinkItemType } from "fumadocs-ui/layouts/shared"; 
// import Preview from "@/public/logo-horizontal.svg";

export const links: LinkItemType[] = [
  {
    type: 'main',
    text: 'Club',
    url: '/docs/club/overview',
    // items: [
    //   {
    //     text: 'Getting Started',
    //     url: '/docs/learn/overview',
    //     icon: <Icon icon="carbon:book" />,
    //   },
    //   {
    //     text: 'Concepts',
    //     url: '/docs/concepts/markets',
    //     icon: <Icon icon="carbon:component" />,
    //   },
    // ],
  },
  {
    type: 'custom',
    children: (
      <NavbarMenu>
        <NavbarMenuTrigger>
          <Link href="/docs/club/overview">Club</Link>
        </NavbarMenuTrigger>
        <NavbarMenuContent className="text-[15px]">
          <NavbarMenuLink href="/docs/club/overview" className="md:row-span-2">
            <div className="-mx-3 -mt-3">
              <Image
                src={"/favicon.svg"}
                alt="Preview"
                className="rounded-t-lg object-cover"
                style={{
                  maskImage:
                    'linear-gradient(to bottom,white 60%,transparent)',
                }}
              />
            </div>
            <p className="font-medium">Club</p>
            <p className="text-fd-muted-foreground text-sm">
              Learn about DeDevs.
            </p>
          </NavbarMenuLink>

          <NavbarMenuLink
            href="/docs/club/overview"
            className="lg:col-start-2"
          >
            <Icon icon="mdi:component" className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
            <p className="font-medium">Club</p>
            <p className="text-fd-muted-foreground text-sm">
              Learn about the different concepts of DeDevs.
            </p>
          </NavbarMenuLink>

          <NavbarMenuLink
            href="/docs/club/overview"
            className="lg:col-start-2"
          >
            <Icon icon="mdi:server" className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
            <p className="font-medium">Club</p>
            <p className="text-fd-muted-foreground text-sm">
              Explore the different programs of DeDevs.
            </p>    
          </NavbarMenuLink>

          <NavbarMenuLink
            href="/docs/media"
            className="lg:col-start-3 lg:row-start-1"
          >
            <Icon icon="carbon:play-filled" className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
            <p className="font-medium">Media</p>
            <p className="text-fd-muted-foreground text-sm">
              Watch videos about DeDevs.
            </p>
          </NavbarMenuLink>
        </NavbarMenuContent>
      </NavbarMenu>
    ),
  },
];

export default links;