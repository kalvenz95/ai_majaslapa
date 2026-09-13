import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireCommunityAccess, communityApiError } from "@/lib/community";

/** GET — pēdējie paziņojumi + nelasīto skaits. */
export async function GET() {
  try {
    const viewer = await requireCommunityAccess();

    const [items, unread] = await Promise.all([
      prisma.communityNotification.findMany({
        where: { userId: viewer.id },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
          actor: { select: { id: true, name: true, avatarUrl: true } },
          post: { select: { id: true, title: true } },
        },
      }),
      prisma.communityNotification.count({ where: { userId: viewer.id, read: false } }),
    ]);

    return NextResponse.json({
      unread,
      items: items.map((n) => ({
        id: n.id,
        type: n.type,
        read: n.read,
        createdAt: n.createdAt,
        postId: n.postId,
        postTitle: n.post?.title ?? null,
        actorName: n.actor?.name ?? null,
        actorAvatar: n.actor?.avatarUrl ?? null,
      })),
    });
  } catch (err) {
    return communityApiError(err);
  }
}

const schema = z.object({
  /** Konkrēts paziņojums, vai visi, ja nav norādīts */
  id: z.string().cuid().optional(),
});

/** POST — atzīmē kā izlasītu. */
export async function POST(req: NextRequest) {
  try {
    const viewer = await requireCommunityAccess();
    const parsed = schema.safeParse(await req.json().catch(() => ({})));
    const id = parsed.success ? parsed.data.id : undefined;

    await prisma.communityNotification.updateMany({
      // userId filtrs — neļauj atzīmēt svešus paziņojumus
      where: { userId: viewer.id, ...(id ? { id } : { read: false }) },
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return communityApiError(err);
  }
}
