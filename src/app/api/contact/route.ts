import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
  locale: z.string().trim().max(8).optional(),
});

// Publisks — nosūta kontaktu formas ziņu komandai.
// Kļūdas atgriež kā kodu, nevis tekstu — tulkojumu izvēlas klients pēc lokāles.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await sendContactEmail(data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
    }
    console.error("[CONTACT]", err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
