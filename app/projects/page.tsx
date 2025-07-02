import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and organize your projects here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-center">Create New Project</CardTitle>
            <CardDescription className="text-center">Start a new project from scratch</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project List</CardTitle>
            <CardDescription>Your existing projects will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Add project cards, filters, and management tools.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Templates</CardTitle>
            <CardDescription>Quick start templates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Provide pre-configured project templates.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
