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
      <div className="flex items-center space-x-2 opacity-50">
        <Sun className="h-4 w-4" />
        <Switch disabled />
        <Moon className="h-4 w-4" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-yellow-500" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4 text-blue-500" />
      <Label htmlFor="theme-switch" className="sr-only">
        Toggle between light and dark mode
      </Label>
    </div>
  )
}
