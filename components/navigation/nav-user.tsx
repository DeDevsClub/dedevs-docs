"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { type LucideIcon } from "lucide-react";

interface NavUserProps {
  user: {
    emailAddresses: {
      emailAddress: string;
    }[];
  };
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}
export function NavUser({ user, items }: NavUserProps) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 bg-muted text-muted-background p-2 rounded-lg w-full">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm">
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
