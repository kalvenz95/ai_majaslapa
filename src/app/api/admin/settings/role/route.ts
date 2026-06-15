import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";
import { Role } from "@prisma/client";

const schema = z.object({
  email: z.string().trim().email(),
  role: z.nativeEnum(Role),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await requireApiPermission("admins.manage");
    const { email, role } = schema.parse(await req.json());

    const target = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!target) {
      return NextResponse.json(
        { message: "Lietotājs ar šādu e-pastu nav atrasts (viņam vispirms jāreģistrējas)" },
        { status: 404 }
      );
    }

    // Nedrīkst mainīt pats savu lomu (lai nezaudētu piekļuvi)
    if (target.id === admin.id) {
      return NextResponse.json(
        { message: "Nevari mainīt savu paša lomu" },
        { status: 400 }
      );
    }

    // Nedrīkst noņemt pēdējo īpašnieku
    if (target.role === Role.OWNER && role !== Role.OWNER) {
      const owners = await prisma.user.count({ where: { role: Role.OWNER } });
      if (owners <= 1) {
        return NextResponse.json(
          { message: "Nevar noņemt pēdējo īpašnieku" },
          { status: 400 }
        );
      }
    }

    await prisma.user.update({ where: { id: target.id }, data: { role } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Nederīgs e-pasts vai loma" }, { status: 400 });
    }
    return adminApiError(err);
  }
}
