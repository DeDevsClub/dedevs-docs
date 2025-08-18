import { cn } from "@/lib/utils";
import MarkdownLink from "@/components/markdown/link";
import Image from "@/components/markdown/image";
import { Icon } from "@iconify/react";
import { GridItem } from "@/config/types";

const items: GridItem[] = [
    {
      title: "DeDevs Club",
      description: "Community, programs, and how to participate.",
      icon: <Icon icon="mdi:account-group" className="w-6 h-6 text-[#2470FF]" />,
      tags: ["community", "club"],
      cta: "/docs/club/overview",
      ctaText: "Explore Club",
      external: false,
      type: "club",
    },
    {
      title: "DeDevs UI",
      description: "Design system, components, and UX guidance.",
      icon: <Icon icon="mdi:palette" className="w-6 h-6 text-[#2470FF]" />,
      tags: ["design", "ui"],
      cta: "/docs/design/overview",
      ctaText: "Explore Design",
      external: false,
      type: "design",
    },
    {
      title: "Vibes Guide",
      description: "Culture, principles, and how we build together.",
      icon: <Icon icon="mdi:fire" className="w-6 h-6 text-[#2470FF]" />,
      tags: ["culture", "vibes"],
      cta: "/docs/vibes/overview",
      ctaText: "Explore Vibes",
      external: false,
      type: "vibes",
    },
    {
      title: "Products",
      description: "Products in development and production.",
      icon: <Icon icon="mdi:web" className="w-6 h-6 text-[#2470FF]" />,
      tags: ["products"],
      cta: "/docs/products/overview",
      ctaText: "Explore Products",
      external: false,
      type: "products",
    },
  ]

const ConceptsBento = () => {
    
    return (
    <div className="items-center justify-between max-w-screen mx-auto p-2">
      <div>
        <Image
          src="/opengraph-image.png"
          alt="Documentation Logo"
          className="w-full h-auto object-cover p-4 max-h-[24vh] rounded-lg mx-auto my-2"
          width={3800}
          height={3800}
        />
      </div>
      <div className="mx-auto flex flex-wrap w-full gap-2 mt-2 text-white items-center justify-center">
        {items.map((item, index) => (
          <MarkdownLink
            href={item.cta || "/docs/club/overview"}
            key={index}
            className={cn(
              "group relative p-4 rounded-xl overflow-hidden transition-all duration-300 w-full", // Base: w-full for mobile-first
              "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-[#0F0F0F]",
              "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
              "hover:-translate-y-0.5 will-change-transform",
              "no-underline",
              // Conditional width for medium screens and up:
              // First item remains w-full, others become max-w-[calc(50%-1rem)]
              index !== 0 && "md:max-w-[calc(50%-1rem)]",
              {
                "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5":
                  item.hasPersistentHover,
              },
              {
                "bg-[#000000]": item.bgColor === "primary",
                "bg-[#2470FF]": item.bgColor === "secondary",
              },
              {
                "text-[#2470FF]": item.color === "primary",
                "text-[#000000]": item.color === "secondary",
              }
            )}
          >
            <div
              className={`absolute inset-0 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-300`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>

            <div className="relative flex flex-col space-y-3 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-linear-to-br transition-all duration-300">
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-xs",
                    "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                    "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                  )}
                >
                  {item.status || "Active"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                  {item.title}
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                    {item.meta}
                  </span>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-md duration-300">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-xs",
                    "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                    "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                  )}
                >
                  →
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 -z-10 rounded-xl p-px bg-linear-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-300`}
            />
          </MarkdownLink>
        ))}
      </div>
    </div>
  );
};

export default ConceptsBento;
