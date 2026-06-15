import type { Metadata } from "next";
import "./globals.css";
import { EditProvider } from "@/context/EditContext";
import { routing } from "@/i18n/routing";
import { ClerkProvider } from "@clerk/nextjs";
import { headers } from "next/headers";
import { lvLV } from "@/lib/clerkLv";

/** Default fallback when middleware header is unavailable (edge cases / tooling). */
export const metadata: Metadata = {
  title: {
    default: "Chademy",
    template: "%s — Chademy",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const locale =
    h.get("x-next-intl-locale") ?? h.get("X-NEXT-INTL-LOCALE") ?? routing.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ClerkProvider localization={lvLV}>
          <EditProvider>
            {children}
          </EditProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
