import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { AdminError, requireApiPermission, adminApiError } from "@/lib/admin";

const schema = z.object({ note: z.string().trim().min(1).max(2000) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireApiPermission("users.notes");
    const { id } = await params;
    const { note } = schema.parse(await req.json());

    const created = await prisma.adminNote.create({
      data: { userId: id, adminId: admin.id, note },
    });

    return NextResponse.json({ ok: true, note: created });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Piezīme nedrīkst būt tukša" }, { status: 400 });
    }
    return adminApiError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireApiPermission("users.notes");
    const { id } = await params;
    const noteId = new URL(req.url).searchParams.get("noteId")?.trim();

    if (!noteId) {
      return NextResponse.json({ message: "Trūkst noteId" }, { status: 400 });
    }

    const deleted = await prisma.adminNote.deleteMany({
      where: { id: noteId, userId: id },
    });

    if (deleted.count === 0) {
      throw new AdminError("Piezīme nav atrasta", 404);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return adminApiError(err);
  }
}
