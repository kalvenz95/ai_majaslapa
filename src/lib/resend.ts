import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { PaymentEmail } from "@/emails/PaymentEmail";
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
