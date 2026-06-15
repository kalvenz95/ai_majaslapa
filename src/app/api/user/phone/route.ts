import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Telefona validācija — atļauj +, ciparus, atstarpes, defises, iekavas; min 8 cipari
const schema = z.object({
  phone: z
    .string()
    .trim()
    .min(6)
    .max(40)
    .regex(/^[+]?[\d\s()-]{6,40}$/, "Nederīgs telefona numurs")
    .refine((v) => (v.match(/\d/g)?.length ?? 0) >= 8, "Par īsu numurs"),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const { phone } = schema.parse(await req.json());

    // Saglabā mūsu DB (admin panelis lasa no šejienes)
    await prisma.user.update({
      where: { clerkId: userId },
      data: { phone },
    });

    // Saglabā arī Clerk metadatos (lai pieejams visur, kur lasa Clerk)
    try {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        unsafeMetadata: { phone },
      });
    } catch {
      // Clerk metadatu kļūda nav kritiska — DB ieraksts ir galvenais
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message ?? "Nederīgs numurs" },
        { status: 400 }
      );
    }
    console.error("[USER_PHONE]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
