"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft, Calendar, User, Settings } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function FormResultsContent() {
  const searchParams = useSearchParams()

  const formType = searchParams.get("type")
  const priority = searchParams.get("priority")
  const department = searchParams.get("department")
  const features = searchParams.get("features")?.split(",") || []
  const notifications = searchParams.get("notifications") === "true"

  const getRedirectInfo = () => {
    switch (formType) {
      case "project":
        return {
          title: "Project Creation Request",
          description: "Your project request has been submitted successfully",
          icon: <Settings className="h-8 w-8 text-blue-500" />,
          nextSteps: "You will be redirected to the Projects page to set up your new project.",
          redirectPath: "/projects",
        }
      case "task":
        return {
          title: "Task Assignment Request",
          description: "Your task has been created and assigned",
          icon: <Calendar className="h-8 w-8 text-green-500" />,
          nextSteps: "You will be redirected to the Tasks page to view and manage your tasks.",
          redirectPath: "/tasks",
        }
      case "report":
        return {
          title: "Analytics Report Request",
          description: "Your custom report is being generated",
          icon: <User className="h-8 w-8 text-purple-500" />,
          nextSteps: "You will be redirected to the Analytics page to view your report.",
          redirectPath: "/analytics",
        }
      default:
        return {
          title: "Request Submitted",
          description: "Your form has been submitted successfully",
          icon: <CheckCircle className="h-8 w-8 text-green-500" />,
          nextSteps: "You will be redirected to the dashboard.",
          redirectPath: "/",
        }
    }
  }

  const redirectInfo = getRedirectInfo()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              {redirectInfo.icon}
            </div>
            <CardTitle className="text-green-800">{redirectInfo.title}</CardTitle>
            <CardDescription className="text-green-600">{redirectInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-green-700 mb-4">{redirectInfo.nextSteps}</p>
            <Link href={redirectInfo.redirectPath}>
              <Button className="bg-green-600 hover:bg-green-700">
                Continue to{" "}
                {redirectInfo.redirectPath.replace("/", "").charAt(0).toUpperCase() +
                  redirectInfo.redirectPath.slice(2)}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Details</CardTitle>
            <CardDescription>Review your form submission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Request Type</label>
              <p className="text-sm">{formType?.charAt(0).toUpperCase() + formType?.slice(1) || "Not specified"}</p>
            </div>

            {priority && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Priority Level</label>
                <div className="mt-1">
                  <Badge
                    variant={priority === "high" ? "destructive" : priority === "medium" ? "default" : "secondary"}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Badge>
                </div>
              </div>
            )}

            {department && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                <p className="text-sm">{department}</p>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Selected Features</label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground">Email Notifications</label>
              <p className="text-sm">{notifications ? "Enabled" : "Disabled"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function FormResults() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <FormResultsContent />
    </Suspense>
  )
}
