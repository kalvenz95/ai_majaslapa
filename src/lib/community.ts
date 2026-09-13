import "server-only";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Plan, PaymentStatus, Role, UserStatus } from "@prisma/client";

/**
 * Chademy Community — piekļuves kontrole.
 *
 * VIENS avots patiesībai. Katra kopienas lapa, API maršruts un DB
 * vaicājums iet caur šo failu. Frontends NEKAD nenosaka piekļuvi —
 * tas tikai attēlo to, ko serveris jau ir atļāvis.
 *
 * Noteikums (Kalvja lēmums): dalībnieks = lietotājs ar vismaz vienu
 * `Payment` ierakstu, kam `status = PAID`. Abonements vien NEDOD
 * piekļuvi — tas ir apzināti, jo platforma pāriet uz vienreizējiem
 * mūža pirkumiem un `Payment` ir gala entitlement avots.
 *
 * Izņēmums: personāls (OWNER/ADMIN) piekļūst vienmēr — citādi neviens
 * nevarētu moderēt kopienu.
 */

// Lomas, kas apiet apmaksas pārbaudi un drīkst moderēt
const STAFF_ROLES: Role[] = [Role.OWNER, Role.ADMIN];

export type CommunityViewer = {
  /** Iekšējais DB lietotāja id (NEVIS clerkId) */
  id: string;
  clerkId: string;
  name: string | null;
  avatarUrl: string | null;
  role: Role;
  /** Augstākā iegādātā paka (profila rādīšanai) */
  plan: Plan | null;
  /** Kad pievienojies Chademy */
  joinedAt: Date;
  isStaff: boolean;
  /** Vai drīkst publicēt — admins var ierobežot rakstīšanu */
  canPost: boolean;
  restrictedReason: string | null;
};

export type CommunityDenyReason =
  | "UNAUTHENTICATED" // nav pieteicies
  | "NO_ACCESS" // pieteicies, bet nav apmaksas
  | "BLOCKED"; // konts bloķēts administrācijā

// `?: never` uz abām pusēm — projektā `strict: false`, tāpēc bez tā
// TypeScript nesašaurina savienojumu un `access.reason` dod kļūdu.
export type CommunityAccess =
  | { ok: true; viewer: CommunityViewer; reason?: never }
  | { ok: false; viewer?: never; reason: CommunityDenyReason };

/** Augstākā apmaksātā paka no PAID maksājumiem. */
function highestPaidPlan(payments: { plan: Plan | null }[]): Plan | null {
  const order: Plan[] = [Plan.PAMATI, Plan.IZAUGSME, Plan.MEISTARS];
  let best: Plan | null = null;
  for (const p of payments) {
    if (!p.plan) continue;
    if (best === null || order.indexOf(p.plan) > order.indexOf(best)) best = p.plan;
  }
  return best;
}

/**
 * Nosaka, vai pašreizējais apmeklētājs drīkst piekļūt kopienai.
 * Neizmet kļūdu — atgriež rezultātu, lai lapas var parādīt aizslēgto stāvokli.
 */
export async function getCommunityAccess(): Promise<CommunityAccess> {
  let clerkId: string | null = null;
  try {
    clerkId = (await auth()).userId;
  } catch {
    return { ok: false, reason: "UNAUTHENTICATED" };
  }
  if (!clerkId) return { ok: false, reason: "UNAUTHENTICATED" };

  const user = await prisma.user
    .findUnique({
      where: { clerkId },
      select: {
        id: true,
        clerkId: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        status: true,
        createdAt: true,
        communityRestrictedAt: true,
        communityRestrictedReason: true,
        // Tikai apmaksātie maksājumi — tie nosaka piekļuvi
        payments: {
          where: { status: PaymentStatus.PAID },
          select: { plan: true },
        },
      },
    })
    .catch(() => null);

  if (!user) return { ok: false, reason: "UNAUTHENTICATED" };

  // Administrācijā bloķēts konts — nekādas kopienas, arī ja samaksājis
  if (user.status === UserStatus.BLOCKED) return { ok: false, reason: "BLOCKED" };

  const ownerEmails = (process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isOwnerByEmail = ownerEmails.includes(user.email.toLowerCase());
  const isStaff = STAFF_ROLES.includes(user.role) || isOwnerByEmail;

  const hasPaid = user.payments.length > 0;
  if (!isStaff && !hasPaid) return { ok: false, reason: "NO_ACCESS" };

  return {
    ok: true,
    viewer: {
      id: user.id,
      clerkId: user.clerkId,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      plan: highestPaidPlan(user.payments),
      joinedAt: user.createdAt,
      isStaff,
      // Personālu nevar apklusināt
      canPost: isStaff || user.communityRestrictedAt === null,
      restrictedReason: user.communityRestrictedReason,
    },
  };
}

// ── API maršrutu palīgi ──────────────────────────────────────

export class CommunityError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "CommunityError";
    this.status = status;
  }
}

/**
 * API maršrutiem: atgriež skatītāju vai izmet `CommunityError`.
 * Lieto KATRĀ kopienas maršrutā, arī lasīšanas (GET) maršrutos —
 * ieraksti nedrīkst noplūst caur tiešu URL.
 */
export async function requireCommunityAccess(): Promise<CommunityViewer> {
  const access = await getCommunityAccess();
  if (access.ok) return access.viewer;

  if (access.reason === "UNAUTHENTICATED") {
    throw new CommunityError("Nepieciešama pieteikšanās", 401);
  }
  throw new CommunityError(
    "Chademy Community ir pieejama tikai aktīvajiem Chademy dalībniekiem.",
    403
  );
}

/** Papildus pārbaudei — vai skatītājs drīkst RAKSTĪT (nav ierobežots). */
export async function requireCommunityWriter(): Promise<CommunityViewer> {
  const viewer = await requireCommunityAccess();
  if (!viewer.canPost) {
    throw new CommunityError(
      viewer.restrictedReason ||
        "Tava iespēja publicēt kopienā ir īslaicīgi ierobežota.",
      403
    );
  }
  return viewer;
}

/** Tikai moderatoriem (OWNER/ADMIN). */
export async function requireCommunityStaff(): Promise<CommunityViewer> {
  const viewer = await requireCommunityAccess();
  if (!viewer.isStaff) throw new CommunityError("Nepietiekamas tiesības", 403);
  return viewer;
}

/** Vienota kļūdu atbilde kopienas API maršrutiem. */
export function communityApiError(err: unknown) {
  if (err instanceof CommunityError) {
    return Response.json({ error: err.message }, { status: err.status });
  }
  console.error("[COMMUNITY_API]", err);
  return Response.json({ error: "Servera kļūda" }, { status: 500 });
}

/**
 * Vai skatītājs drīkst rediģēt/dzēst konkrētu saturu.
 * Autors — savu; personāls — jebkuru.
 */
export function canModerate(viewer: CommunityViewer, authorId: string): boolean {
  return viewer.isStaff || viewer.id === authorId;
}
