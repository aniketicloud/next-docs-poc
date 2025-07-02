"use client"

import { Home, FolderOpen, CheckSquare, BarChart3, Settings, User, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
]

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className="sidebar-transition">
      <SidebarHeader className="border-b border-sidebar-border relative">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <div
            className={`flex flex-col sidebar-content-transition ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
          >
            <span className="text-sm font-semibold">My App</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>

        {/* Enhanced toggle button with visual cues */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-sidebar-border shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 toggle-pulse"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className={`sidebar-content-transition ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
          >
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={isCollapsed ? item.title : undefined}
                    className="sidebar-item-hover"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span
                        className={`sidebar-content-transition ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel
            className={`sidebar-content-transition ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
          >
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={isCollapsed ? item.title : undefined}
                    className="sidebar-item-hover"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span
                        className={`sidebar-content-transition ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2">
          <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent p-2 sidebar-item-hover">
            <div className="h-6 w-6 rounded-full bg-primary flex-shrink-0" />
            <div
              className={`flex flex-col sidebar-content-transition ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
            >
              <span className="text-xs font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
