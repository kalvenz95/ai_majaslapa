import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  "/lv/dashboard(.*)",
  "/en/dashboard(.*)",
]);

// Admin panelis dzīvo ārpus [locale] — bez valodas prefiksa.
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
// Publiskās admin lapas (nav jābūt pieteiktam, lai tās redzētu)
const isAdminPublicRoute = createRouteMatcher([
  "/admin/login(.*)",
  "/admin/no-access",
]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Admin maršruti: prasa pieteikšanos (lomu pārbaude notiek serverī, lapā),
  // un NETIEK laisti caur intl middleware (lai /admin nepāradresē uz /lv/admin).
  if (isAdminRoute(req)) {
    if (!isAdminPublicRoute(req)) {
      await auth.protect({
        unauthenticatedUrl: new URL("/admin/login", req.url).toString(),
      });
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
