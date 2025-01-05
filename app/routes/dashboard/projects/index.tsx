// app/routes/dashboard/projects/index.tsx
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { auth } from "~/lib/auth.server";
import prisma from "~/lib/db.server";
import { Link, redirect } from "react-router";
import type { Route } from "~/+types/dashboard/projects/index";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    projects,
    user: session.user,
  };
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and their details.
          </p>
        </div>
        <Link to="new">
          <Button>Create New Project</Button>
        </Link>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="h-12 px-4 align-middle font-medium">Name</th>
                  <th className="h-12 px-4 align-middle font-medium">Budget</th>
                  <th className="h-12 px-4 align-middle font-medium">
                    Start Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium">Status</th>
                  <th className="h-12 px-4 align-middle font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No projects found. Create your first project!
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        ${project.budget.toLocaleString()}
                      </td>
                      <td className="p-4">
                        {new Date(project.startDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${
                              new Date(project.startDate) > new Date()
                                ? "bg-yellow-400"
                                : "bg-green-400"
                            }`}
                          />
                          {new Date(project.startDate) > new Date()
                            ? "Pending"
                            : "Active"}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Link to={project.id}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
