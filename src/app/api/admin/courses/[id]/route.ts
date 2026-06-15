import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";
import { Plan } from "@prisma/client";

const schema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  description: z.string().trim().min(1).max(2000).optional(),
  category: z.string().trim().max(80).nullable().optional(),
  level: z.string().trim().max(80).nullable().optional(),
  planRequired: z.nativeEnum(Plan).optional(),
  icon: z.string().trim().max(40).optional(),
  color: z.string().trim().max(20).optional(),
  published: z.boolean().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireApiPermission("courses.edit");
    const { id } = await params;
    const data = schema.parse(await req.json());

    const course = await prisma.course.update({ where: { id }, data });
    return NextResponse.json({ ok: true, course });
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
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return adminApiError(err);
  }
}
