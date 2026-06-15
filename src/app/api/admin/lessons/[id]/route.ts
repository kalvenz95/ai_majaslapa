import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";

const schema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  videoUrl: z.string().trim().url().nullable().optional().or(z.literal("")),
  duration: z.number().int().min(0).nullable().optional(),
  isFree: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireApiPermission("courses.edit");
    const { id } = await params;
    const data = schema.parse(await req.json());
    const lesson = await prisma.lesson.update({
      where: { id },
      data: { ...data, videoUrl: data.videoUrl === "" ? null : data.videoUrl },
    });
    return NextResponse.json({ ok: true, lesson });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Nederīgi dati" }, { status: 400 });
    }
    return adminApiError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireApiPermission("courses.edit");
    const { id } = await params;
    await prisma.lesson.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return adminApiError(err);
  }
}
