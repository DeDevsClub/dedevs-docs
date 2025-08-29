"use client";

import { GridItem } from "@/config/types";
import { Icon } from "@iconify/react";
import { BentoItemCard } from "./bento-item-card";

const capabilities: GridItem[] = [
  {
    title: "DeDevs Club",
    description: "Community, programs, and how to participate.",
    cta: "/docs/club/overview",
    type: "club",
    icon: <Icon icon="mdi:account-group" className="w-6 h-6 text-foreground" />,
    tags: ["community", "club"],
  },
  {
    title: "DeDevs Design",
    description: "Design system, components, and UX guidance.",
    cta: "/docs/design/overview",
    type: "design",
    icon: <Icon icon="mdi:palette" className="w-6 h-6 text-foreground" />,
    tags: ["design", "ui"],
  },
  {
    title: "Vibes Guide",
    description: "Culture, principles, and how we build together.",
    cta: "https://docs.vibes.guide",
    external: true,
    type: "vibes",
    icon: <Icon icon="mdi:fire" className="w-6 h-6 text-foreground" />,
    tags: ["culture", "vibes"],
  },
  {
    title: "Products",
    description: "Products in development and production.",
    cta: "/docs/products/overview",
    type: "products",
    icon: <Icon icon="mdi:star" className="w-6 h-6 text-foreground" />,
    tags: ["products"],
  },
];

const items: GridItem[] = [
  {
    type: "club",
    title: `Club`,
    description: `Dive deep into the core concepts and fundamental ideas that underpin our documentation and technology.`,
    cta: `/docs/club/overview`,
    tags: ["all", "club", "core"],
    icon: <Icon icon="mdi:id-card" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "design",
    title: `Design`,
    description: `Explore step-by-step guides and practical tutorials to help you master various features and workflows.`,
    cta: `/docs/design/overview`,
    tags: ["design", "guides"],
    icon: <Icon icon="mdi:book" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "vibes",
    title: `Vibes`,
    description: `Access a curated collection of valuable resources, including tools, libraries, and external links.`,
    cta: "https://docs.vibes.guide",
    external: true,
    tags: ["vibes", "production", "resources"],
    icon: (
      <Icon icon="mdi:fire" className="w-6 h-6 text-foreground" />
    ),
  },
  {
    type: "products",
    title: `Products`,
    description: `Discover inspiring showcases and real-world examples of how our technology can be applied.`,
    cta: `/docs/products/production`,
    tags: ["products", "production", "examples", "projects"],
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