import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { MediaType } from "@prisma/client";
import {
  requireCommunityAccess,
  requireCommunityWriter,
  communityApiError,
  canModerate,
  CommunityError,
} from "@/lib/community";
import { postInclude, resolvePostCategory, serializePost } from "@/lib/community-data";

/**
 * GET — viens ieraksts ar komentāriem.
 * Aizsargāts: tiešs URL bez apmaksas atgriež 403, NEVIS saturu.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const viewer = await requireCommunityAccess();
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        ...postInclude(viewer.id),
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            author: { select: { id: true, name: true, avatarUrl: true, role: true } },
          },
        },
      },
    });

    if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    return NextResponse.json({
      ...serializePost(post),
      comments: post.comments.map((c) => ({
        id: c.id,
        body: c.body,
        parentId: c.parentId,
        createdAt: c.createdAt,
        editedAt: c.editedAt,
        author: {
          id: c.author.id,
          name: c.author.name,
          avatarUrl: c.author.avatarUrl,
          isStaff: c.author.role === "OWNER" || c.author.role === "ADMIN",
        },
      })),
    });
  } catch (err) {
    return communityApiError(err);
  }
}

const updateSchema = z.object({
  title: z.string().trim().min(3).max(140).optional(),
  body: z.string().trim().min(1).max(5000).optional(),
  category: z.string().trim().max(60).optional(),
  media: z
    .array(
      z.object({
        type: z.enum(["IMAGE", "VIDEO", "LINK"]),
        url: z.string().url().max(2048),
        thumbnailUrl: z.string().url().max(2048).nullish(),
        title: z.string().max(200).nullish(),
        description: z.string().max(500).nullish(),
      })
    )
    .max(6)
    .optional(),
});

/** PATCH — rediģē ierakstu. Tikai autors vai moderators. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const viewer = await requireCommunityWriter();
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true, category: true },
    });
    if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    // Sveša ieraksta rediģēšana — aizliegta
    if (!canModerate(viewer, post.authorId)) {
      throw new CommunityError("Vari rediģēt tikai savus ierakstus", 403);
    }

    const parsed = updateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Nederīgi dati" },
        { status: 400 }
      );
    }
    const { title, body, media } = parsed.data;

    const category = parsed.data.category
      ? await resolvePostCategory(viewer, parsed.data.category)
      : null;

    const updated = await prisma.$transaction(async (tx) => {
      if (media) {
        // Pielikumi tiek aizstāti pilnībā
        await tx.postMedia.deleteMany({ where: { postId: id } });
        if (media.length > 0) {
          await tx.postMedia.createMany({
            data: media.map((m, i) => ({
              postId: id,
              type: m.type as MediaType,
              url: m.url,
              thumbnailUrl: m.thumbnailUrl ?? null,
              title: m.title ?? null,
              description: m.description ?? null,
              order: i,
            })),
          });
        }
      }

      return tx.post.update({
        where: { id },
        data: {
          ...(title !== undefined ? { title } : {}),
          ...(body !== undefined ? { body } : {}),
          ...(category ? { category: category.slug } : {}),
          editedAt: new Date(),
        },
        include: postInclude(viewer.id),
      });
    });

    return NextResponse.json(serializePost(updated));
  } catch (err) {
    return communityApiError(err);
  }
}

/** DELETE — dzēš ierakstu. Autors savu, moderators jebkuru. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const viewer = await requireCommunityAccess();
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });
    if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    if (!canModerate(viewer, post.authorId)) {
      throw new CommunityError("Vari dzēst tikai savus ierakstus", 403);
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return communityApiError(err);
  }
}
