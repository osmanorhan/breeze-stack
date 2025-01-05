import type { User } from "@prisma/client";

export namespace Route {
  export interface LoaderArgs {
    request: Request;
  }

  export interface LoaderData {
    stats: {
      totalProjects: number;
      activeProjects: number;
      completedProjects: number;
    };
    user: User;
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }
}