import "server-only";
import { prisma } from "@/lib/prisma";
import { CommunityNotificationType, PaymentStatus, Prisma } from "@prisma/client";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_CATEGORY_SLUG,
  type CategoryDef,
} from "@/lib/community-categories";
import { CommunityError, type CommunityViewer } from "@/lib/community";

/**
 * Kopienas datu slānis — kategorijas, atlase un paziņojumi.
 * Piekļuves pārbaude NOTIEK pirms šo funkciju izsaukšanas
 * (`requireCommunityAccess` / `requireCommunityWriter`).
 */

// ── Kategorijas ──────────────────────────────────────────────

/**
 * Kategorijas no DB. Ja tabula vēl tukša (pirms seed) — atgriež
 * noklusējumus, lai kopiena strādā arī uzreiz pēc deploya.
 */
export async function getCategories(): Promise<CategoryDef[]> {
  const rows = await prisma.communityCategory
    .findMany({ where: { active: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  if (rows.length === 0) return DEFAULT_CATEGORIES;

  return rows.map((r) => ({
    slug: r.slug,
    label: r.label,
    emoji: r.emoji,
    color: r.color,
    order: r.order,
    adminOnly: r.adminOnly,
  }));
}

/**
 * Validē kategoriju PIRMS publicēšanas.
 * Neļauj parastam dalībniekam rakstīt admin kategorijā (📢 Chademy jaunumi)
 * un neļauj izdomāt neeksistējošu kategoriju.
 */
export async function resolvePostCategory(
  viewer: CommunityViewer,
  slug: string | undefined | null
): Promise<CategoryDef> {
  const categories = await getCategories();
  const wanted = slug?.trim() || DEFAULT_CATEGORY_SLUG;
  const found = categories.find((c) => c.slug === wanted);

  if (!found) throw new CommunityError("Nezināma kategorija", 400);
  if (found.adminOnly && !viewer.isStaff) {
    throw new CommunityError(
      `Kategorijā "${found.label}" publicē tikai Chademy komanda`,
      403
    );
  }
  return found;
}

// ── Ierakstu atlase ──────────────────────────────────────────

/** Vienots `include` — visur vienāda ieraksta forma. */
export function postInclude(viewerId: string) {
  return {
    author: {
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        role: true,
        payments: {
          where: { status: PaymentStatus.PAID },
          select: { plan: true },
        },
      },
    },
    media: { orderBy: { order: "asc" } },
    _count: { select: { likes: true, comments: true } },
    likes: { where: { userId: viewerId }, select: { id: true } },
    saves: { where: { userId: viewerId }, select: { id: true } },
  } satisfies Prisma.PostInclude;
}

type RawPost = Prisma.PostGetPayload<{ include: ReturnType<typeof postInclude> }>;

/**
 * Pārveido DB ierakstu klientam drošā formā.
 * Autora e-pasts, telefons un citi personīgie dati NETIEK sūtīti.
 */
export function serializePost(post: RawPost) {
  const order = ["PAMATI", "IZAUGSME", "MEISTARS"];
  const plan =
    post.author.payments.reduce<string | null>((best, p) => {
      if (!p.plan) return best;
      if (best === null || order.indexOf(p.plan) > order.indexOf(best)) return p.plan;
      return best;
    }, null) ?? null;

  return {
    id: post.id,
    title: post.title,
    body: post.body,
    category: post.category,
    pinned: post.pinned,
    isAnnouncement: post.isAnnouncement,
    createdAt: post.createdAt,
    editedAt: post.editedAt,
    author: {
      id: post.author.id,
      name: post.author.name,
      avatarUrl: post.author.avatarUrl,
      joinedAt: post.author.createdAt,
      plan,
      isStaff: post.author.role === "OWNER" || post.author.role === "ADMIN",
    },
    media: post.media.map((m) => ({
      id: m.id,
      type: m.type,
      url: m.url,
      thumbnailUrl: m.thumbnailUrl,
      title: m.title,
      description: m.description,
    })),
    likeCount: post._count.likes,
    commentCount: post._count.comments,
    liked: post.likes.length > 0,
    saved: post.saves.length > 0,
  };
}

export type SerializedPost = ReturnType<typeof serializePost>;

// ── Paziņojumi ───────────────────────────────────────────────

/** Kāds komentēja ierakstu → paziņo ieraksta autoram. */
export async function notifyPostComment(opts: {
  postId: string;
  postAuthorId: string;
  commentId: string;
  actorId: string;
}) {
  // Nepaziņo pašam sev
  if (opts.postAuthorId === opts.actorId) return;
  await prisma.communityNotification
    .create({
      data: {
        userId: opts.postAuthorId,
        actorId: opts.actorId,
        type: CommunityNotificationType.POST_COMMENT,
        postId: opts.postId,
        commentId: opts.commentId,
      },
    })
    .catch(() => null);
}

/** Kāds atbildēja uz komentāru → paziņo komentāra autoram. */
export async function notifyCommentReply(opts: {
  postId: string;
  parentAuthorId: string;
  commentId: string;
  actorId: string;
}) {
  if (opts.parentAuthorId === opts.actorId) return;
  await prisma.communityNotification
    .create({
      data: {
        userId: opts.parentAuthorId,
        actorId: opts.actorId,
        type: CommunityNotificationType.COMMENT_REPLY,
        postId: opts.postId,
        commentId: opts.commentId,
      },
    })
    .catch(() => null);
}

/**
 * Admina paziņojums → visiem dalībniekiem ar apmaksu.
 * Sūta partijās, lai neuzkārtu DB pie liela dalībnieku skaita.
 */
export async function notifyAnnouncement(opts: { postId: string; actorId: string }) {
  const members = await prisma.user
    .findMany({
      where: {
        status: "ACTIVE",
        payments: { some: { status: PaymentStatus.PAID } },
        id: { not: opts.actorId },
      },
      select: { id: true },
    })
    .catch(() => []);

  if (members.length === 0) return;

  await prisma.communityNotification
    .createMany({
      data: members.map((m) => ({
        userId: m.id,
        actorId: opts.actorId,
        type: CommunityNotificationType.ANNOUNCEMENT,
        postId: opts.postId,
      })),
    })
    .catch(() => null);
}
