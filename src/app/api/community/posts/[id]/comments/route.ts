import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  requireCommunityWriter,
  communityApiError,
  CommunityError,
} from "@/lib/community";
import { notifyCommentReply, notifyPostComment } from "@/lib/community-data";

const schema = z.object({
  body: z.string().trim().min(1, "Teksts ir tukšs").max(2000),
  /** Atbilde uz citu komentāru */
  parentId: z.string().cuid().nullish(),
});

/** POST — komentē ierakstu vai atbild uz komentāru. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const viewer = await requireCommunityWriter();
    const { id } = await params;

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Nederīgi dati" },
        { status: 400 }
      );
    }
    const { body, parentId } = parsed.data;

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });
    if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    // Atbilde: vecākam jābūt tajā pašā ierakstā; dziļums — viens līmenis
    let parent: { id: string; authorId: string; parentId: string | null } | null = null;
    if (parentId) {
      parent = await prisma.postComment.findUnique({
        where: { id: parentId },
        select: { id: true, authorId: true, parentId: true, postId: true },
      });
      if (!parent || (parent as any).postId !== id) {
        throw new CommunityError("Nederīgs komentārs, uz ko atbildēt", 400);
      }
    }

    const comment = await prisma.postComment.create({
      data: {
        postId: id,
        authorId: viewer.id,
        body,
        // Atbilde uz atbildi tiek pielīdzināta pirmā līmeņa atbildei
        parentId: parent ? parent.parentId ?? parent.id : null,
      },
      include: {
        author: { select: { id: true, name: true, avatarUrl: true, role: true } },
      },
    });

    // Paziņojumi
    if (parent) {
      await notifyCommentReply({
        postId: id,
        parentAuthorId: parent.authorId,
        commentId: comment.id,
        actorId: viewer.id,
      });
    } else {
      await notifyPostComment({
        postId: id,
        postAuthorId: post.authorId,
        commentId: comment.id,
        actorId: viewer.id,
      });
    }

    return NextResponse.json(
      {
        id: comment.id,
        body: comment.body,
        parentId: comment.parentId,
        createdAt: comment.createdAt,
        editedAt: comment.editedAt,
        author: {
          id: comment.author.id,
          name: comment.author.name,
          avatarUrl: comment.author.avatarUrl,
          isStaff:
            comment.author.role === "OWNER" || comment.author.role === "ADMIN",
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return communityApiError(err);
  }
}
