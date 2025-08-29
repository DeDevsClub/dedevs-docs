"use client"

import * as React from "react"
import { NavDocuments } from "@/components/navigation/nav-documents"
import { DashboardNavMain } from "@/components/navigation/nav-main"
import { DashboardNavSecondary } from "@/components/navigation/nav-secondary"
import { NavUser } from "@/components/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconButterfly } from "@tabler/icons-react"
import { User, Settings2, LogOut } from "lucide-react"

const data = {
    navUser: [
        {
            title: "Profile",
            url: "#",
            icon: User,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
        {
            title: "Logout",
            url: "#",
            icon: LogOut,
        },
    ],
}

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconButterfly className="!size-5 text-primary" />
                <span className="text-base font-semibold text-primary">
                  DeDevs
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <DashboardNavMain />
        <NavDocuments />
        <DashboardNavSecondary />
      </SidebarContent>
      <SidebarFooter> 
        <NavUser user={{ emailAddresses: [{ emailAddress: "test" }] }} items={data.navUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
 