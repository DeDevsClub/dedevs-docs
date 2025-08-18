"use client";

import { GridItem } from "@/config/types";
import { Icon } from "@iconify/react";
import { BentoItemCard } from "./bento-item-card";

const capabilities: GridItem[] = [
  {
    title: "DeDevs Club",
    description: "Community, programs, and how to participate.",
    cta: "/docs/club/overview",
    type: "concept",
    icon: <Icon icon="mdi:account-group" className="w-6 h-6 text-foreground" />,
    tags: ["community", "club"],
  },
  {
    title: "DeDevs UI",
    description: "Design system, components, and UX guidance.",
    cta: "/docs/design/overview",
    type: "concept",
    icon: <Icon icon="mdi:palette" className="w-6 h-6 text-foreground" />,
    tags: ["design", "ui"],
  },
  {
    title: "Vibes Guide",
    description: "Culture, principles, and how we build together.",
    cta: "/docs/vibes/overview",
    type: "concept",
    icon: <Icon icon="mdi:fire" className="w-6 h-6 text-foreground" />,
    tags: ["culture", "vibes"],
  },
  {
    title: "Skool Community",
    description: "Join, onboard, and get the most from our Skool.",
    cta: "/docs/club/concepts/skool",
    type: "concept",
    icon: <Icon icon="mdi:school" className="w-6 h-6 text-foreground" />,
    tags: ["skool", "community"],
  },
];

const items: GridItem[] = [
  {
    type: "concept",
    title: `Concepts`,
    description: `Dive deep into the core concepts and fundamental ideas that underpin our documentation and technology.`,
    cta: `/docs/concepts`,
    tags: ["all", "concepts", "core"],
    icon: <Icon icon="mdi:id-card" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "guide",
    title: `Guides`,
    description: `Explore step-by-step guides and practical tutorials to help you master various features and workflows.`,
    cta: `/docs/guides`,
    tags: ["guides", "tutorials", "how-to"],
    icon: <Icon icon="mdi:book" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "resource",
    title: `Resources`,
    description: `Access a curated collection of valuable resources, including tools, libraries, and external links.`,
    cta: `/docs/resources`,
    tags: ["resources", "tools", "links"],
    icon: (
      <Icon icon="mdi:list-box-outline" className="w-6 h-6 text-foreground" />
    ),
  },
  {
    type: "showcase",
    title: `Showcases`,
    description: `Discover inspiring showcases and real-world examples of how our technology can be applied.`,
    cta: `/docs/showcases`,
    tags: ["showcases", "examples", "projects"],
    icon: <Icon icon="mdi:web" className="w-6 h-6 text-foreground" />,
  },
];

export const BuildBento = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      {/* Adapted from bento.tsx's grid structure */}
      <div className="mx-auto flex flex-wrap w-full gap-4 py-8 items-stretch justify-center no-underline">
        {capabilities.map((item, index) => (
          <BentoItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BuildBento;