/**
 * PAGAIDU testa dublieris Clerk autentifikācijai.
 * Aizvieto `@clerk/nextjs/server` TIKAI testa tsconfig ietvaros, lai
 * varētu izspēlēt "nav pieteicies" / "dažādi lietotāji" scenārijus.
 * Pārējais kods (piekļuves loģika, Prisma vaicājumi) ir īstais.
 */

let currentClerkId: string | null = null;

export function __setUser(clerkId: string | null) {
  currentClerkId = clerkId;
}

export async function auth() {
  return { userId: currentClerkId };
}

export async function currentUser() {
  return currentClerkId ? { id: currentClerkId, emailAddresses: [], imageUrl: null } : null;
}

export function clerkMiddleware() {
  return () => {};
}

export function createRouteMatcher() {
  return () => false;
}
