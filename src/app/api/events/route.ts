import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function isBlockedUser(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { status: true },
  });

  return user?.status === "BLOCKED";
}

export async function GET() {
  const { userId } = await auth();
  const blocked = userId ? await isBlockedUser(userId) : false;

  const events = await prisma.liveEvent.findMany({
    where: { startAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    orderBy: { startAt: "asc" },
    select: userId && !blocked
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
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (await isBlockedUser(userId)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { title, description, startAt, endAt, meetUrl, type } = await req.json();
  if (!title?.trim() || !startAt) {
    return NextResponse.json({ error: "Virsraksts un sākuma laiks ir obligāti" }, { status: 400 });
  }

  const event = await prisma.liveEvent.create({
    data: { title, description, startAt: new Date(startAt), endAt: endAt ? new Date(endAt) : null, meetUrl, type: type ?? "WEBINAR" },
  });

  return NextResponse.json(event, { status: 201 });
}
