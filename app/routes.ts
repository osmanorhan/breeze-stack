// app/routes.ts
import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // Root routes
  index("./routes/home.tsx"),
  
  // Auth routes
  route("auth", "./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),

  // Dashboard routes
  route("dashboard", "./routes/dashboard/layout.tsx", [
    index("./routes/dashboard/home.tsx"),
    // Projects routes
    route("projects", "./routes/dashboard/projects/layout.tsx", [
      index("./routes/dashboard/projects/index.tsx"),
      route("new", "./routes/dashboard/projects/new.tsx"),
      route(":id", "./routes/dashboard/projects/detail.tsx"),
    ]),
  ]),

  // API routes
  route("api/auth/*", "./routes/api-auth.ts"),
] satisfies RouteConfig;