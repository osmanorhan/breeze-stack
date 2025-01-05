import { auth } from '~/lib/auth.server' // Adjust the path as necessary
import type { Route } from "./+types/api-auth" // Adjust the path as necessary;

export async function loader({ request }: { request: Request }) {
    return await auth.handler(request);
}
 
export async function action({ request }:{ request: Request }) {
    return await auth.handler(request);
}