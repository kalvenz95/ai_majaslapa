import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";

const schema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional(),
  videoUrl: z.string().trim().url().optional().or(z.literal("")),
  duration: z.number().int().min(0).optional(),
  isFree: z.boolean().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireApiPermission("courses.edit");
    const { id: courseId } = await params;
    const data = schema.parse(await req.json());

    const count = await prisma.lesson.count({ where: { courseId } });
    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        title: data.title,
        description: data.description || null,
        videoUrl: data.videoUrl || null,
        duration: data.duration ?? null,
        isFree: data.isFree ?? false,
        order: count,
      },
    });

    return NextResponse.json({ ok: true, lesson });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Nederīgi dati" }, { status: 400 });
    }
    return adminApiError(err);
  }
}
