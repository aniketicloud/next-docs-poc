"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "dark":
        return <Moon className="h-4 w-4 text-blue-400" />
      case "system":
        return <Monitor className="h-4 w-4 text-gray-500" />
      default:
        return <Palette className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
        >
          <div className="transition-transform duration-300 hover:rotate-12">{getCurrentIcon()}</div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "cursor-pointer transition-colors duration-200",
            theme === "light" && "bg-accent text-accent-foreground",
          )}
        >
          <Sun className="mr-2 h-4 w-4 text-yellow-500" />
          <span>Light</span>
          {theme === "light" && <div className="ml-auto h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "cursor-pointer transition-colors duration-200",
            theme === "dark" && "bg-accent text-accent-foreground",
          )}
        >
          <Moon className="mr-2 h-4 w-4 text-blue-400" />
          <span>Dark</span>
          {theme === "dark" && <div className="ml-auto h-2 w-2 rounded-full bg-blue-400 animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "cursor-pointer transition-colors duration-200",
            theme === "system" && "bg-accent text-accent-foreground",
          )}
        >
          <Monitor className="mr-2 h-4 w-4 text-gray-500" />
          <span>System</span>
          {theme === "system" && <div className="ml-auto h-2 w-2 rounded-full bg-gray-500 animate-pulse" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
