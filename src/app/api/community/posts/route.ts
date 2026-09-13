import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { MediaType, Prisma } from "@prisma/client";
import {
  requireCommunityAccess,
  requireCommunityWriter,
  communityApiError,
} from "@/lib/community";
import {
  getCategories,
  notifyAnnouncement,
  postInclude,
  resolvePostCategory,
  serializePost,
} from "@/lib/community-data";
import { ANNOUNCEMENT_CATEGORY_SLUG } from "@/lib/community-categories";

const PAGE_SIZE = 20;

/**
 * GET — kopienas plūsma.
 * Aizsargāts: bez apmaksātas piekļuves NEATGRIEŽ nevienu ierakstu.
 */
export async function GET(req: NextRequest) {
  try {
    const viewer = await requireCommunityAccess();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") === "popularakie" ? "popularakie" : "jaunakie";
    const savedOnly = searchParams.get("saved") === "1";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

    const where: Prisma.PostWhereInput = {};
    if (category && category !== "visi") where.category = category;
    if (savedOnly) where.saves = { some: { userId: viewer.id } };

    // Populārākie = pēc patikšanām, tad komentāriem; piespraustie vienmēr augšā
    const orderBy: Prisma.PostOrderByWithRelationInput[] =
      sort === "popularakie"
        ? [
            { pinned: "desc" },
            { likes: { _count: "desc" } },
            { comments: { _count: "desc" } },
            { createdAt: "desc" },
          ]
        : [{ pinned: "desc" }, { createdAt: "desc" }];

    const [posts, total, categories] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy,
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: postInclude(viewer.id),
      }),
      prisma.post.count({ where }),
      getCategories(),
    ]);

    return NextResponse.json({
      posts: posts.map(serializePost),
      total,
      page,
      pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
      categories,
    });
  } catch (err) {
    return communityApiError(err);
  }
}

const mediaSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "LINK"]),
  url: z.string().url("Nederīga saite").max(2048),
  thumbnailUrl: z.string().url().max(2048).nullish(),
  title: z.string().max(200).nullish(),
  description: z.string().max(500).nullish(),
});

const createSchema = z.object({
  title: z.string().trim().min(3, "Virsraksts par īsu").max(140),
  body: z.string().trim().min(1, "Teksts ir tukšs").max(5000),
  category: z.string().trim().max(60).optional(),
  media: z.array(mediaSchema).max(6, "Maksimums 6 pielikumi").optional(),
});

/** POST — izveido ierakstu. Prasa apmaksu UN neierobežotu rakstīšanu. */
export async function POST(req: NextRequest) {
  try {
    const viewer = await requireCommunityWriter();

    const parsed = createSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Nederīgi dati" },
        { status: 400 }
      );
    }
    const { title, body, media } = parsed.data;

    // Validē kategoriju — bloķē admin kategoriju parastam dalībniekam
    const category = await resolvePostCategory(viewer, parsed.data.category);
    const isAnnouncement =
      category.slug === ANNOUNCEMENT_CATEGORY_SLUG && viewer.isStaff;

    const post = await prisma.post.create({
      data: {
        authorId: viewer.id,
        title,
        body,
        category: category.slug,
        isAnnouncement,
        // Paziņojumi automātiski nonāk plūsmas augšā
        pinned: isAnnouncement,
        media: media?.length
          ? {
              create: media.map((m, i) => ({
                type: m.type as MediaType,
                url: m.url,
                thumbnailUrl: m.thumbnailUrl ?? null,
                title: m.title ?? null,
                description: m.description ?? null,
                order: i,
              })),
            }
          : undefined,
      },
      include: postInclude(viewer.id),
    });

    if (isAnnouncement) {
      await notifyAnnouncement({ postId: post.id, actorId: viewer.id });
    }

    return NextResponse.json(serializePost(post), { status: 201 });
  } catch (err) {
    return communityApiError(err);
  }
}
