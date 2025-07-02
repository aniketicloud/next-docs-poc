"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ThemeSwitch() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <div className="h-5 w-9 animate-pulse bg-muted rounded-full" />
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center space-x-3">
      <Sun
        className={`h-4 w-4 transition-colors duration-300 ${isDark ? "text-muted-foreground" : "text-yellow-500"}`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-yellow-100"
      />
      <Moon
        className={`h-4 w-4 transition-colors duration-300 ${isDark ? "text-blue-400" : "text-muted-foreground"}`}
      />
      <Label className="sr-only">Toggle dark mode</Label>
    </div>
  )
}
