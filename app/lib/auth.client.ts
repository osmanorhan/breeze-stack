import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    fetchOptions: {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });