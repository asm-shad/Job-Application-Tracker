import { NextRequest } from "next/server";

// Check if we're in build time
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

export async function GET(req: NextRequest) {
  // Return dummy response during build
  if (isBuildTime) {
    return new Response(JSON.stringify({ message: "Build time" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const { auth } = await import("@/lib/auth/auth");
  const { toNextJsHandler } = await import("better-auth/next-js");
  const handler = toNextJsHandler(auth);
  return handler.GET(req);
}

export async function POST(req: NextRequest) {
  // Return dummy response during build
  if (isBuildTime) {
    return new Response(JSON.stringify({ message: "Build time" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const { auth } = await import("@/lib/auth/auth");
  const { toNextJsHandler } = await import("better-auth/next-js");
  const handler = toNextJsHandler(auth);
  return handler.POST(req);
}