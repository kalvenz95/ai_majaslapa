import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertNotBlocked, BlockedUserError } from "@/lib/user-access";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    await assertNotBlocked(userId);

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true },
    });

    return NextResponse.json({ user });
  } catch (err) {
    if (err instanceof BlockedUserError) {
      return NextResponse.json({ message: "Konts ir bloķēts" }, { status: 403 });
    }
    console.error("[USER_GET]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
