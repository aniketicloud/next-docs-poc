"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeSwitch } from "@/components/theme-switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun, Palette, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const { theme, setTheme, themes } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Preferences
              </CardTitle>
              <CardDescription>Loading theme settings...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 opacity-50">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme Mode</Label>
                  <div className="text-sm text-muted-foreground">Loading...</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Preferences
            </CardTitle>
            <CardDescription>
              Customize the appearance of your dashboard. Choose between light, dark, or system theme.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Theme Mode</Label>
              <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="light" id="light" className="peer sr-only" />
                  <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                  <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    Dark
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="system" id="system" className="peer sr-only" />
                  <Label
                    htmlFor="system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Monitor className="mb-3 h-6 w-6" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Theme Controls */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Theme Controls</Label>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quick Toggle</Label>
                    <div className="text-sm text-muted-foreground">Switch between light and dark mode</div>
                  </div>
                  <ThemeSwitch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Advanced Toggle</Label>
                    <div className="text-sm text-muted-foreground">Access all theme options including system</div>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </div>

            <Separator />

            {/* Current Theme Info */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Current Theme</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {theme}
                </Badge>
                <span className="text-sm text-muted-foreground">Theme preference is automatically saved</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Display Settings
            </CardTitle>
            <CardDescription>Configure display and accessibility options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reduce Motion</Label>
                <div className="text-sm text-muted-foreground">Minimize animations and transitions</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>High Contrast</Label>
                <div className="text-sm text-muted-foreground">Increase contrast for better visibility</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Reset Settings</CardTitle>
            <CardDescription>Reset all theme and display settings to their default values.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setTheme("system")}>
              Reset to System Default
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
