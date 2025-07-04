import { NextRequest, NextResponse } from "next/server";

// Allowed origins
const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:3000",
  "http://localhost:19006", // Expo dev server
  "https://starter-mobile.expo.app",
  // Add more URLs here
];

// CORS configuration
export const corsHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
  "Access-Control-Allow-Credentials": "true",
} as const;

// Get CORS headers with dynamic origin
export function getCorsHeaders(origin?: string | null): Record<string, string> {
  const allowedOrigin =
    origin && allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0] || "http://localhost:3000";

  return {
    ...corsHeaders,
    "Access-Control-Allow-Origin": allowedOrigin,
  };
}

// Add CORS headers to any response
export function addCorsHeaders(
  response: Response,
  origin?: string | null
): Response {
  const headers = getCorsHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Handle preflight OPTIONS requests
export function handleCorsOptions(req: NextRequest): NextResponse {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

// Wrapper function to add CORS to any route handler
export function withCors<T extends any[]>(
  handler: (req: NextRequest, ...args: T) => Promise<Response>
) {
  return async (req: NextRequest, ...args: T): Promise<Response> => {
    const origin = req.headers.get("origin");
    const response = await handler(req, ...args);
    return addCorsHeaders(response, origin);
  };
}
