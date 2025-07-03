import { auth } from "@packages/server";
import { toNextJsHandler } from "better-auth/next-js";
import { withCors, handleCorsOptions } from "~/lib/cors";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth.handler);

// Wrap handlers with CORS
export const GET = withCors(authGET);
export const POST = withCors(authPOST);

// Handle preflight requests
export const OPTIONS = handleCorsOptions;
