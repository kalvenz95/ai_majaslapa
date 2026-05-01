import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { upsertUser } from "@/lib/subscriptions";

// Izsauc pēc pirmās pieteikšanās — izveido lietotāju DB
export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ message: "Lietotājs nav atrasts" }, { status: 404 });
    }

    const user = await upsertUser({
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || undefined,
      avatarUrl: clerkUser.imageUrl || undefined,
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("[USER_SYNC]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
