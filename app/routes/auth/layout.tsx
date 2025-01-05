// app/routes/dashboard/layout.tsx
import { Outlet, redirect } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/dashboard/layout";
import { auth } from "../../lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {

}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}