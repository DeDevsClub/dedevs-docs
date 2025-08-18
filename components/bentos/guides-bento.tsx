"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { GridItem } from "@/config/types";
import { BentoItemCard } from "./bento-item-card";

const items: GridItem[] = [
  {
    type: "guide",
    title: "Getting Started: DeDevs Club",
    description: "Join the community and learn how to participate effectively.",
    cta: "/docs/club/overview",
    tags: ["getting-started", "club"],
    icon: <Icon icon="mdi:account-group" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "guide",
    title: "Design System: DeDevs UI",
    description: "Understand our design system and component usage.",
    cta: "/docs/design/overview",
    tags: ["design", "ui"],
    icon: <Icon icon="mdi:palette" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "guide",
    title: "Culture Guide: Vibes",
    description: "Principles and practices for how we build together.",
    cta: "/docs/vibes/overview",
    tags: ["culture", "vibes"],
    icon: <Icon icon="mdi:fire" className="w-6 h-6 text-foreground" />,
  },
  {
    type: "guide",
    title: "Join our Skool Community",
    description: "How to join, onboard, and get the most value.",
    cta: "/docs/club/concepts/skool",
    tags: ["skool", "community"],
    icon: <Icon icon="mdi:school" className="w-6 h-6 text-foreground" />,
  },
];

export const GuidesBento = () => {
  return (
    <div className="container mx-auto px-4 py-18 mt-4 sm:mt-16 flex flex-col items-center">
      {/* Adapted from bento.tsx's grid structure */}
      <div className="mx-auto flex flex-wrap w-full gap-4 py-8 items-stretch justify-center no-underline">
        {items.map((item, index) => (
          <BentoItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GuidesBento;