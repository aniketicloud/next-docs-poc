"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useSidebar } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Send, FileText, Calendar, BarChart3 } from "lucide-react"
import { toast } from "sonner"

export default function Dashboard() {
  const { state } = useSidebar()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formType, setFormType] = useState("")
  const [priority, setPriority] = useState("")
  const [department, setDepartment] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [notifications, setNotifications] = useState(false)
  const [description, setDescription] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const isCollapsed = state === "collapsed"

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, feature])
    } else {
      setFeatures(features.filter((f) => f !== feature))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formType) {
      toast.error("Please select a request type")
      return
    }

    setIsSubmitting(true)

    // Show loading toast
    const loadingToast = toast.loading("Processing your request...")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Dismiss loading toast
      toast.dismiss(loadingToast)

      // Show success toast
      toast.success("Request submitted successfully!")

      // Build query parameters
      const params = new URLSearchParams({
        type: formType,
        ...(priority && { priority }),
        ...(department && { department }),
        ...(features.length > 0 && { features: features.join(",") }),
        notifications: notifications.toString(),
      })

      // Redirect based on form type with a slight delay for better UX
      setTimeout(() => {
        router.push(`/form-results?${params.toString()}`)
      }, 500)
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  const getFormTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FileText className="h-4 w-4" />
      case "task":
        return <Calendar className="h-4 w-4" />
      case "report":
        return <BarChart3 className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 transition-all duration-300 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard. Submit a request using the form below.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dynamic Request Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Submit New Request
            </CardTitle>
            <CardDescription>
              Fill out the form below to submit a new request. You'll be redirected based on your selection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Type Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="request-type">Request Type *</Label>
                <Select value={formType} onValueChange={setFormType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        New Project
                      </div>
                    </SelectItem>
                    <SelectItem value="task">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Task Assignment
                      </div>
                    </SelectItem>
                    <SelectItem value="report">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Analytics Report
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Level Radio Buttons */}
              {formType && (
                <div className="space-y-3">
                  <Label>Priority Level</Label>
                  <RadioGroup value={priority} onValueChange={setPriority}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-sm font-normal">
                        Low Priority
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="text-sm font-normal">
                        Medium Priority
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="text-sm font-normal">
                        High Priority
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Department Selection */}
              {formType && (
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Feature Checkboxes */}
              {formType === "project" && (
                <div className="space-y-3">
                  <Label>Project Features</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Authentication",
                      "Database",
                      "API Integration",
                      "Real-time Updates",
                      "Mobile App",
                      "Analytics",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={features.includes(feature)}
                          onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                        />
                        <Label htmlFor={feature} className="text-sm font-normal">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {formType && (
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional details about your request..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              {/* Email Notifications Switch */}
              {formType && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your request via email</p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full theme-transition" disabled={!formType || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    {getFormTypeIcon(formType)}
                    <span className="ml-2">Submit Request</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] theme-transition border-l-4 border-l-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="/projects">
                  <FileText className="mr-2 h-4 w-4" />
                  View Projects
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="/tasks">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Tasks
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">Project Alpha completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-muted-foreground">New task assigned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-muted-foreground">Report generated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overview Cards */}
      <div
        className={`grid gap-6 transition-all duration-300 ${
          isCollapsed ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] theme-transition">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Currently running projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] theme-transition">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Tasks awaiting completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">-3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] theme-transition">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Active team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+1 new member</p>
          </CardContent>
        </Card>

        {isCollapsed && (
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] theme-transition">
            <CardHeader>
              <CardTitle>Completion Rate</CardTitle>
              <CardDescription>Project success rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">+2% improvement</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
