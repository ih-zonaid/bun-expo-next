import { NextRequest, NextResponse } from "next/server";

// CORS configuration
export const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:8081",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
  "Access-Control-Allow-Credentials": "true",
};

// Add CORS headers to any response
export function addCorsHeaders(response: Response): Response {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Handle preflight OPTIONS requests
export function handleCorsOptions(): NextResponse {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// Wrapper function to add CORS to any route handler
export function withCors<T extends any[]>(
  handler: (req: NextRequest, ...args: T) => Promise<Response>
) {
  return async (req: NextRequest, ...args: T): Promise<Response> => {
    const response = await handler(req, ...args);
    return addCorsHeaders(response);
  };
}
