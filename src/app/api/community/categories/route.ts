import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  requireCommunityAccess,
  requireCommunityStaff,
  communityApiError,
} from "@/lib/community";
import { getCategories } from "@/lib/community-data";

/** GET — kategoriju saraksts dalībniekiem. */
export async function GET() {
  try {
    await requireCommunityAccess();
    return NextResponse.json({ categories: await getCategories() });
  } catch (err) {
    return communityApiError(err);
  }
}

const schema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(40)
    .regex(/^[a-z0-9-]+$/, "Slug drīkst saturēt tikai mazos burtus, ciparus un defises"),
  label: z.string().trim().min(2).max(60),
  emoji: z.string().trim().min(1).max(8).default("💬"),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Krāsai jābūt HEX formātā")
    .default("#6D5EF3"),
  order: z.number().int().min(0).max(99).default(50),
  adminOnly: z.boolean().default(false),
});

/** POST — izveido kategoriju. Tikai moderatoriem. */
export async function POST(req: NextRequest) {
  try {
    await requireCommunityStaff();

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Nederīgi dati" },
        { status: 400 }
      );
    }

    const existing = await prisma.communityCategory.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return NextResponse.json({ error: "Šāds slug jau eksistē" }, { status: 409 });
    }

    const category = await prisma.communityCategory.create({ data: parsed.data });
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return communityApiError(err);
  }
}
