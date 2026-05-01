import type { Metadata } from "next";
import "./globals.css";
import { EditProvider } from "@/context/EditContext";
import EditBar from "@/components/EditBar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Chademy — Nopelni ar AI",
  description: "Praktiska AI mācību platforma latvietiem. Iemācies veidot AI pakalpojumus un pārdot tos uzņēmumiem. Sāc nopelnīt ar mākslīgo intelektu jau šodien.",
  keywords: "AI, mākslīgais intelekts, kursi, nopelnīt, Latvija, Chademy, automatizācija, chatbot",
  openGraph: {
    title: "Chademy — Nopelni ar AI",
    description: "Latvijas pirmā praktiskā AI monetizācijas platforma",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClerkProvider>
          <EditProvider>
            {children}
            <EditBar />
          </EditProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
