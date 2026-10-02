import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertNotBlocked, BlockedUserError } from "@/lib/user-access";
import { requireApiPermission, adminApiError } from "@/lib/admin";

export async function GET() {
  const { userId } = await auth();

  let canViewPrivate = false;
  if (userId) {
    try {
      await assertNotBlocked(userId);
      canViewPrivate = true;
    } catch (error) {
      if (error instanceof BlockedUserError) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      console.error("[EVENTS_GET_BLOCK_CHECK]", error);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const events = await prisma.liveEvent.findMany({
    where: { startAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    orderBy: { startAt: "asc" },
    select: canViewPrivate
      ? {
          id: true,
          title: true,
          description: true,
          startAt: true,
          endAt: true,
          meetUrl: true,
          type: true,
        }
      : {
          id: true,
          title: true,
          startAt: true,
          endAt: true,
          type: true,
        },
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  try {
    await requireApiPermission("events.create");

    const { title, description, startAt, endAt, meetUrl, type } = await req.json();
    if (!title?.trim() || !startAt) {
      return NextResponse.json({ error: "Virsraksts un sakuma laiks ir obligati" }, { status: 400 });
    }

    const event = await prisma.liveEvent.create({
      data: { title, description, startAt: new Date(startAt), endAt: endAt ? new Date(endAt) : null, meetUrl, type: type ?? "WEBINAR" },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return adminApiError(error);
  }
}
