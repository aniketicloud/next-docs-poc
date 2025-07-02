"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSidebar } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { state } = useSidebar()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const isCollapsed = state === "collapsed"

  return (
    <div className="space-y-6 transition-all duration-300 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard. Sidebar is currently {isCollapsed ? "collapsed" : "expanded"}.
        </p>
      </div>

      <div
        className={`grid gap-6 transition-all duration-300 ${
          isCollapsed ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your main dashboard overview will go here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Add charts, metrics, and key information here.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Display recent user activities and system updates.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Add buttons for common tasks and shortcuts.</p>
          </CardContent>
        </Card>

        {isCollapsed && (
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Extra Space</CardTitle>
              <CardDescription>More room when sidebar is collapsed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This card appears when the sidebar is collapsed.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
