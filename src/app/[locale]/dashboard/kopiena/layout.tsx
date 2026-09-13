// Kopienas stili tiek ielādēti tikai šajā maršrutā, lai neietekmētu
// pārējo platformu. Dizaina tokeni nāk no globals.css.
import "@/styles/community.css";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
