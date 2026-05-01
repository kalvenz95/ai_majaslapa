import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Aizsargātās lapas — prasa autentifikāciju
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/user(.*)",
  "/api/courses(.*)",
  "/api/progress(.*)",
  "/api/stripe/checkout(.*)",
  "/api/stripe/portal(.*)",
]);

// Rate limiting — vienkārša atmiņas bāzēta versija
// Ražošanā aizstāt ar Upstash Redis: https://upstash.com
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Rate limiting visiem /api/* pieprasījumiem
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const allowed = rateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { message: "Pārāk daudz pieprasījumu. Mēģini vēlāk." },
        { status: 429 }
      );
    }
  }

  // Stripe webhook izslēgts no auth pārbaudes (Stripe veic savu verificāciju)
  if (req.nextUrl.pathname === "/api/stripe/webhook") {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname === "/api/webhooks/clerk") {
    return NextResponse.next();
  }

  // Aizsargātas lapas prasa pieteikšanos
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
