"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { GridItem } from "@/config/types";
import MarkdownLink from "@/components/markdown/link";
import { cn } from "@/lib/utils";

const items: GridItem[] = [
  {
    title: "DeDevs Club",
    type: "club",
    description:
      "Community, programs, and how to participate.",
    icon: <Icon icon="mdi:account-group" className="w-6 h-6 text-foreground" />,
    cta: "/docs/club/overview",
  },
  {
    title: "DeDevs UI",
    type: "design",
    description:
      "Design system, components, and UX guidance.",
    icon: <Icon icon="mdi:palette" className="w-6 h-6 text-foreground" />,
    cta: "/docs/design/overview",
  },
  {
    title: "Vibes Guide",
    type: "vibes",
    description:
      "Culture, principles, and how we build together.",
    icon: <Icon icon="mdi:fire" className="w-6 h-6 text-foreground" />,
    cta: "/docs/vibes/overview",
  },
  {
    title: "Products",
    type: "products",
    description:
      "Products in development and production.",
    icon: <Icon icon="mdi:web" className="w-6 h-6 text-foreground" />,
    cta: "/docs/products/overview",
  },
];

const BentoItemCard = ({ item }: { item: GridItem }) => (
  <MarkdownLink
    href={item.cta ?? "#"}
    className={cn(
      "group relative p-4 rounded-xl overflow-hidden transition-all duration-300 w-full",
      "border border-gray-200/80 dark:border-gray-700/60 bg-card dark:bg-neutral-900/50",
      "hover:shadow-lg hover:dark:shadow-neutral-800/50",
      "hover:-translate-y-0.5 will-change-transform",
      "max-w-full sm:max-w-[calc(50%-0.5rem)]", // Adjusted for responsiveness, similar to bento.tsx
      "no-underline"
    )}
  >
    {/* Optional: Background pattern from bento.tsx - can be enabled if desired */}
    {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:4px_4px]" />
    </div> */}

    <div className="relative flex flex-col w-full h-full">
      <div className="space-y-1 flex-grow">
        <h3 className="font-medium text-foreground tracking-tight justify-center items-center text-center sm:text-lg text-base">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-snug font-[425]">
          {item.description}
        </p>

        <div className="flex items-center justify-end mt-auto">
          <div
            className={cn(
              "text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-xs",
              "bg-muted/80 dark:bg-neutral-800/60 text-background dark:text-muted-foreground",
              "transition-colors duration-300 group-hover:bg-muted dark:group-hover:bg-neutral-700/80"
            )}
          >
            →
          </div>
        </div>
      </div>
    </div>

    {/* Optional: Hover border effect from bento.tsx - can be enabled if desired */}
    <div
      className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-neutral-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    />
  </MarkdownLink>
);
export const CoreBento = () => {
  return (
    <div className="mx-auto w-full grid grid-cols-1 items-center ">
      {/* Adapted from bento.tsx's grid structure */}
      <div className="flex flex-wrap w-full items-stretch justify-center gap-4 no-underline">
        {items.map((item, index) => (
          <BentoItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CoreBento;
