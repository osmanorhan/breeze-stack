import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

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
