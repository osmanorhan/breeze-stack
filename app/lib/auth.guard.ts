import {auth}  from "./auth.server";
import { redirect } from "react-router";


export async function requireAuth(request: Request) {
  const session = await auth.api.getSession({headers: request.headers});
  
  if (!session?.user) {
    const searchParams = new URLSearchParams([
      ["redirectTo", new URL(request.url).pathname],
    ]);
    throw redirect(`/login?${searchParams}`);
  }
  
  return session.user;
}

export async function requireNoAuth(request: Request) {
  const session = await auth.api.getSession({headers: request.headers});
  
  if (session?.user) {
    throw redirect('/dashboard');
  }
  
  return null;
}