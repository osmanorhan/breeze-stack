import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link, redirect } from "react-router";
import { auth } from "~/lib/auth.server";
import prisma from "~/lib/db.server";
import type { Route } from "./+types/detail";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return redirect("/login");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
      userId: session.user.id, // Ensure user can only see their own projects
    },
  });

  if (!project) {
    return redirect("/dashboard/projects");
  }

  return {
    project,
    user: session.user,
  };
}

export default function ProjectDetails({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">Project details and management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Edit Project</Button>
          <Button variant="destructive">Delete Project</Button>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="mt-1">{project.description}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Budget</label>
              <p className="mt-1">${project.budget.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Start Date</label>
              <p className="mt-1">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="flex items-center mt-1">
                <span className={`h-2 w-2 rounded-full mr-2 ${
                  new Date(project.startDate) > new Date() 
                    ? "bg-yellow-400" 
                    : "bg-green-400"
                }`}
                />
                {new Date(project.startDate) > new Date() ? "Pending" : "Active"}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Visibility</label>
              <p className="mt-1">{project.isPublic ? "Public" : "Private"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              No recent activity
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
