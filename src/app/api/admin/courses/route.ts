import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";
import { Plan } from "@prisma/client";

const schema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Slug: tikai mazie burti, cipari un defises"),
  description: z.string().trim().min(1).max(2000),
  category: z.string().trim().max(80).optional(),
  level: z.string().trim().max(80).optional(),
  planRequired: z.nativeEnum(Plan),
  icon: z.string().trim().max(40).optional(),
  color: z.string().trim().max(20).optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireApiPermission("courses.edit");
    const data = schema.parse(await req.json());

    const exists = await prisma.course.findUnique({ where: { slug: data.slug } });
    if (exists) {
      return NextResponse.json({ message: "Kurss ar šādu slug jau eksistē" }, { status: 409 });
    }

    const count = await prisma.course.count();
    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        category: data.category || null,
        level: data.level || null,
        planRequired: data.planRequired,
        icon: data.icon || "book",
        color: data.color || "#00ff88",
        order: count,
        published: false,
      },
    });

    return NextResponse.json({ ok: true, course });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues[0]?.message ?? "Nederīgi dati" }, { status: 400 });
    }
    return adminApiError(err);
  }
}
