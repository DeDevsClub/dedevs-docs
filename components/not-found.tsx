"use client";
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils"; // Assuming cn is available, similar to bento.tsx

// Interface for individual bento items, adapted from bento.tsx's GridItem and original NotFound BentoItem
export interface BentoItem {
  id: string; // For React key
  title: string;
  description: string;
  url: string; // Maps to cta in bento.tsx
  type: "club" | "design" | "vibes"; // For badge styling
  icon?: React.ReactNode; // From bento.tsx
  tags?: string[]; // From bento.tsx
  // Removed isFeatured and imageUrl to align with bento.tsx's item structure
}

function generateItems() {  

  // const paths = [`/${mainTopic}`, topicPath];
  // Future: Add more dynamically generated items based on 'pathname'
  // Placeholder icon - consider using a relevant Lucide icon or similar

  const items: BentoItem[] = [
    {
      id: "1",
      title: `Club`,
      description: `Explore DeDevs Club.`,
      url: `/docs/club`,
      type: "club",
      tags: ["club"],
    },
    {
      id: "2",
      title: `Design`,
      description: `Explore DeDevs Design System.`,
      url: `/docs/design`,
      type: "design",
      tags: ["design"],
    },
    {
      id: "3",
      title: `Vibes`,
      description: `Explore DeDevs Vibes Guide.`,
      url: `/docs/vibes`,
      type: "vibes",
      tags: ["vibes"],
    },
  ];

  return items;
}

// Helper component to render each bento item card, styled like bento.tsx items
const BentoItemCard: React.FC<{ item: BentoItem }> = ({ item }) => {

  return (
    <Link
      href={item.url}
      passHref
      legacyBehavior={false} // Recommended for modern Next.js if Link wraps <a>, or remove <a> if Link can be styled directly
      className={cn(
        "group relative p-4 rounded-xl overflow-hidden transition-all duration-300 w-full",
        "border border-gray-200/80 dark:border-gray-700/60 bg-card dark:bg-neutral-900/50",
        "hover:shadow-lg hover:dark:shadow-neutral-800/50",
        "hover:-translate-y-0.5 will-change-transform",
        "max-w-full sm:max-w-[calc(50%-0.5rem)]" // Adjusted for responsiveness, similar to bento.tsx
      )}
      target={item.url.startsWith("http") ? "_blank" : "_self"}
    >
      {/* Optional: Background pattern from bento.tsx - can be enabled if desired */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:4px_4px]" />
      </div>

      <div className="relative flex flex-col space-y-3 w-full h-full">
        <div className="space-y-1 flex-grow">
          <h3 className="font-medium text-foreground tracking-tight text-[15px]">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-snug font-[425]">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center space-x-1 text-xs text-background dark:text-muted-foreground/80">
            {item.tags?.map((tag, i) => (
              <span
                key={i}
                className={
                  "px-1.5 py-0.5 rounded-md bg-muted/80 dark:bg-neutral-800/50 group-hover:bg-muted/70 dark:group-hover:bg-neutral-700/70 transition-colors duration-300"
                }
              >
                #{tag}
              </span>
            ))}
          </div>
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

      {/* Optional: Hover border effect from bento.tsx - can be enabled if desired */}
      <div
        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-neutral-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </Link>
  );
};

export const NotFound = () => {
  const items = generateItems();
  return (
    <div className="container mx-auto px-4 py-18 flex flex-col items-center">
      {/* Adapted from bento.tsx's grid structure */}
      <div className="mx-auto flex flex-wrap w-full gap-4 py-8 items-stretch justify-center">
        {items.map((item) => (
          <BentoItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
