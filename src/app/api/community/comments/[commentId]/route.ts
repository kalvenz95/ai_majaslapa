import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  requireCommunityAccess,
  requireCommunityWriter,
  communityApiError,
  canModerate,
  CommunityError,
} from "@/lib/community";

const schema = z.object({ body: z.string().trim().min(1).max(2000) });

/** PATCH — rediģē savu komentāru. */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const viewer = await requireCommunityWriter();
    const { commentId } = await params;

    const comment = await prisma.postComment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true },
    });
    if (!comment) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    // Rediģēt drīkst TIKAI autors — arī moderators nepārraksta svešu tekstu
    if (viewer.id !== comment.authorId) {
      throw new CommunityError("Vari rediģēt tikai savus komentārus", 403);
    }

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Teksts ir tukšs" }, { status: 400 });
    }

    const updated = await prisma.postComment.update({
      where: { id: commentId },
      data: { body: parsed.data.body, editedAt: new Date() },
      select: { id: true, body: true, editedAt: true },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return communityApiError(err);
  }
}

/** DELETE — dzēš komentāru. Autors savu, moderators jebkuru. */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const viewer = await requireCommunityAccess();
    const { commentId } = await params;

    const comment = await prisma.postComment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true },
    });
    if (!comment) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    if (!canModerate(viewer, comment.authorId)) {
      throw new CommunityError("Vari dzēst tikai savus komentārus", 403);
    }

    // Atbildes tiek dzēstas līdzi (onDelete: Cascade shēmā)
    await prisma.postComment.delete({ where: { id: commentId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return communityApiError(err);
  }
}
