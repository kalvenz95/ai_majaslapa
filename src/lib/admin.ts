import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * Piekļuves kontrole (RBAC) admin panelim.
 *
 * Lomas:
 *  - OWNER   — pilna piekļuve visam (arī iestatījumi, admin lietotāju pārvaldība)
 *  - ADMIN   — lietotāji, kursi, maksājumi
 *  - SUPPORT — skata lietotājus un statusus, NEvar mainīt maksājumus
 *  - USER    — bez piekļuves admin panelim
 *
 * Visas pārbaudes notiek SERVERA pusē — frontends nekad nenosaka piekļuvi.
 */

// Lomas, kas vispār drīkst redzēt admin paneli
export const ADMIN_ROLES: Role[] = [Role.OWNER, Role.ADMIN, Role.SUPPORT];

// Atļauju matrica — ko katra loma drīkst darīt
export const PERMISSIONS = {
  // Skatīšanās
  "users.view": [Role.OWNER, Role.ADMIN, Role.SUPPORT],
  "payments.view": [Role.OWNER, Role.ADMIN, Role.SUPPORT],
  "subscriptions.view": [Role.OWNER, Role.ADMIN, Role.SUPPORT],
  "courses.view": [Role.OWNER, Role.ADMIN, Role.SUPPORT],
  // Lietotāju izmaiņas
  "users.edit": [Role.OWNER, Role.ADMIN],
  "users.block": [Role.OWNER, Role.ADMIN],
  "users.notes": [Role.OWNER, Role.ADMIN, Role.SUPPORT],
  // Maksājumu izmaiņas — SUPPORT nedrīkst
  "payments.edit": [Role.OWNER, Role.ADMIN],
  // Kursu pārvaldība
  "courses.edit": [Role.OWNER, Role.ADMIN],
  // Tikai īpašnieks
  "settings.manage": [Role.OWNER],
  "admins.manage": [Role.OWNER],
  "data.export": [Role.OWNER, Role.ADMIN],
} as const;

export type Permission = keyof typeof PERMISSIONS;

export type AdminUser = {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: Role;
};

/**
 * Atgriež pašreizējo admin lietotāju (vai null, ja nav pieteicies / nav DB).
 * Bootstrap: ja lietotāja e-pasts ir OWNER_EMAIL env mainīgajā, automātiski
 * paaugstina līdz OWNER (vienreizēja pirmā īpašnieka izveide droši caur env).
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, clerkId: true, email: true, name: true, role: true },
  });

  // Ja lietotājs vēl nav DB (pirmā reize) — izveido no Clerk datiem
  if (!dbUser) {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
    if (!email) return null;
    dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || null,
        avatarUrl: clerkUser?.imageUrl || null,
      },
      select: { id: true, clerkId: true, email: true, name: true, role: true },
    });
  }

  // Pirmā īpašnieka bootstrap caur env (OWNER_EMAIL)
  const ownerEmails = (process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (
    dbUser.role !== Role.OWNER &&
    ownerEmails.includes(dbUser.email.toLowerCase())
  ) {
    dbUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: { role: Role.OWNER },
      select: { id: true, clerkId: true, email: true, name: true, role: true },
    });
  }

  return dbUser;
}

/** Vai lietotājam ir konkrēta atļauja. */
export function can(role: Role, permission: Permission): boolean {
  return (PERMISSIONS[permission] as readonly Role[]).includes(role);
}

/**
 * Aizsargā admin lapu (Server Component). Ja nav piekļuves — pāradresē.
 * Atgriež admin lietotāju, ja viss kārtībā.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  if (!ADMIN_ROLES.includes(user.role)) redirect("/admin/no-access");
  return user;
}

/**
 * Aizsargā lapu/darbību, kas prasa konkrētu atļauju.
 * Lieto Server Components iekšienē.
 */
export async function requirePermission(permission: Permission): Promise<AdminUser> {
  const user = await requireAdmin();
  if (!can(user.role, permission)) redirect("/admin/no-access");
  return user;
}

/**
 * API maršrutiem: atgriež admin lietotāju vai izmet kļūdu ar statusu.
 * Lieto kopā ar `handleAdminError`.
 */
export class AdminError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function requireApiPermission(
  permission: Permission
): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) throw new AdminError("Nav autorizēts", 401);
  if (!ADMIN_ROLES.includes(user.role)) throw new AdminError("Nav piekļuves", 403);
  if (!can(user.role, permission)) throw new AdminError("Nepietiekamas tiesības", 403);
  return user;
}

/** Vienota kļūdu atbilde API maršrutiem. */
export function adminApiError(err: unknown) {
  if (err instanceof AdminError) {
    return Response.json({ message: err.message }, { status: err.status });
  }
  console.error("[ADMIN_API]", err);
  return Response.json({ message: "Servera kļūda" }, { status: 500 });
}

// Lomu nosaukumi latviski — re-eksports no klienta-drošā format moduļa
export { ROLE_LABELS } from "@/lib/format";
