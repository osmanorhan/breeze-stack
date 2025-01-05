import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { Route } from "~/+types/dashboard/home";
import { auth } from "~/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  // For demo purposes - you would typically fetch this from your database
  const stats = {
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    recentActivity: [
      { id: 1, type: 'Project Created', name: 'Marketing Website', date: '2025-01-04' },
      { id: 2, type: 'Task Completed', name: 'Database Migration', date: '2025-01-03' },
      { id: 3, type: 'Project Updated', name: 'Mobile App', date: '2025-01-02' },
    ]
  };

  return { 
    user: session?.user,
    stats
  };
}

export default function DashboardHome({ loaderData }: Route.ComponentProps) {
  const { user, stats } = loaderData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name || 'User'}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
          </div>
          <Button variant="default" className="rounded-md">
            Create New Project
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card className="rounded-lg">
            <CardContent className="pt-6 px-6">
              <p className="text-sm font-medium">Total Projects</p>
              <p className="text-2xl font-bold pt-1">{stats.totalProjects}</p>
              <p className="text-sm text-muted-foreground">Projects managed</p>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardContent className="pt-6 px-6">
              <p className="text-sm font-medium">Active Projects</p>
              <p className="text-2xl font-bold pt-1">{stats.activeProjects}</p>
              <p className="text-sm text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardContent className="pt-6 px-6">
              <p className="text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold pt-1">{stats.completedProjects}</p>
              <p className="text-sm text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-lg">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
              <Button variant="outline" className="justify-start h-10 px-4 py-2">
                <span className="mr-2">+</span>
                New Project
              </Button>
              <Button variant="outline" className="justify-start h-10 px-4 py-2">
                <span className="mr-2">📋</span>
                View Tasks
              </Button>
              <Button variant="outline" className="justify-start h-10 px-4 py-2">
                <span className="mr-2">👥</span>
                Team Members
              </Button>
              <Button variant="outline" className="justify-start h-10 px-4 py-2">
                <span className="mr-2">💬</span>
                Messages
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-lg">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-6">
              {stats.recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.date.split('-')[1]}/{activity.date.split('-')[2]}/{activity.date.split('-')[0]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card className="rounded-lg">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Your Profile</h2>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name || ''} 
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {(user.name || user.email || "U")[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">{user.name || "User"}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}