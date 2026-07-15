import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { PaymentEmail } from "@/emails/PaymentEmail";
import { ContactEmail } from "@/emails/ContactEmail";
import { createElement } from "react";

// Lazy initialization — novērš build kļūdas bez .env
function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

const FROM = process.env.RESEND_FROM_EMAIL || "noreply@chademy.lv";

export async function sendWelcomeEmail(to: string, name: string) {
  const resend = getResend();
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Laipni lūgts Chademy! 🎉",
    react: createElement(WelcomeEmail, { name }),
  });
}

/**
 * Kontaktu formas ziņa uz komandas kasti. Saņēmējs — CONTACT_EMAIL, ar atkāpi uz
 * OWNER_EMAIL pirmo adresi. replyTo liek sūtītāju, lai var atbildēt tieši no kastes.
 */
export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
  locale?: string;
}) {
  const { name, email, message, locale } = params;
  const to = (process.env.CONTACT_EMAIL || process.env.OWNER_EMAIL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (to.length === 0) throw new Error("CONTACT_EMAIL/OWNER_EMAIL nav uzstādīts");

  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: email,
    subject: `Kontaktu forma: ${name}`,
    react: createElement(ContactEmail, { name, email, message, locale }),
  });

  // Resend neizmet izņēmumu — kļūdu atgriež laukā. Bez šī lietotājs redzētu
  // "Ziņa nosūtīta!", kaut vēstule nekur nav aizgājusi.
  if (error) throw new Error(`Resend: ${error.name} — ${error.message}`);

  return data;
}

export async function sendPaymentConfirmationEmail(
  to: string,
  name: string,
  planName: string,
  amount: number,
  invoiceUrl?: string
) {
  const resend = getResend();
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Maksājums apstiprināts — ${planName}`,
    react: createElement(PaymentEmail, { name, planName, amount, invoiceUrl }),
  });
}
