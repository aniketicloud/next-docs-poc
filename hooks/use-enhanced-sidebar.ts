"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export function useEnhancedSidebar() {
  const sidebar = useSidebar()
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleWithAnimation = () => {
    setIsAnimating(true)
    sidebar.toggleSidebar()

    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Persist state changes
  useEffect(() => {
    const handleStateChange = () => {
      document.cookie = `sidebar:state=${sidebar.open}; path=/; max-age=${60 * 60 * 24 * 7}`
    }

    handleStateChange()
  }, [sidebar.open])

  return {
    ...sidebar,
    isAnimating,
    toggleWithAnimation,
    isCollapsed: sidebar.state === "collapsed",
    isExpanded: sidebar.state === "expanded",
  }
}
