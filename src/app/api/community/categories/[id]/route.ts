import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireCommunityStaff, communityApiError } from "@/lib/community";

const schema = z.object({
  label: z.string().trim().min(2).max(60).optional(),
  emoji: z.string().trim().min(1).max(8).optional(),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Krāsai jābūt HEX formātā")
    .optional(),
  order: z.number().int().min(0).max(99).optional(),
  adminOnly: z.boolean().optional(),
  active: z.boolean().optional(),
});

/** PATCH — rediģē kategoriju. Tikai moderatoriem. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCommunityStaff();
    const { id } = await params;

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Nederīgi dati" },
        { status: 400 }
      );
    }

    const category = await prisma.communityCategory.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json(category);
  } catch (err) {
    return communityApiError(err);
  }
}

/**
 * DELETE — paslēpj kategoriju (active=false).
 * Ieraksti netiek dzēsti: tie paliek ar savu slug un turpina rādīties.
 */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireCommunityStaff();
    const { id } = await params;

    await prisma.communityCategory.update({ where: { id }, data: { active: false } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return communityApiError(err);
  }
}
