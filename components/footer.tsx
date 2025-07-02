"use client"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Heart, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p className="text-sm text-muted-foreground">
              Built with <Heart className="inline h-4 w-4 text-red-500" /> using Next.js and shadcn/ui
            </p>
            {mounted && (
              <Badge variant="outline" className="text-xs">
                {resolvedTheme === "dark" ? "🌙" : "☀️"} {resolvedTheme} mode
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <p className="text-xs text-muted-foreground">© 2024 Dashboard App</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
