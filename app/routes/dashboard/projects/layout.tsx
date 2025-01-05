import { Outlet, redirect } from "react-router";
import { auth } from "~/lib/auth.server";
import type { Route } from "~/+types/dashboard/projects/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return redirect("/login");
  }
  
  return { user: session.user };
}

export default function ProjectsLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}