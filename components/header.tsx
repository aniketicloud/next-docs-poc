import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6 main-content-transition">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200 hover:scale-105" />
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="w-64 transition-all duration-200 focus:w-80" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-colors duration-200">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary hover:scale-105 transition-transform duration-200 cursor-pointer" />
      </div>
    </header>
  )
}
