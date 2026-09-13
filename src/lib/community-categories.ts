/**
 * Kopienas kategorijas.
 *
 * Šis fails der GAN serverī, GAN klientā (nav "server-only") — klients
 * to lieto tikai krāsām/nosaukumiem. Patiesais saraksts dzīvo DB tabulā
 * `CommunityCategory`, lai admins tās var rediģēt bez deploya; šie ir
 * sākotnējie ieraksti (seed) un rezerves variants, ja DB vēl tukša.
 *
 * Krāsas atvasinātas no zīmola paletes (`globals.css`):
 * --accent #6D5EF3 · --accent-2 #00BFA5 · --accent-3 #FFB86B
 */

export type CategoryDef = {
  slug: string;
  label: string;
  emoji: string;
  color: string;
  order: number;
  adminOnly: boolean;
  /** Īss paskaidrojums kompozera izvēlnē */
  hint?: string;
};

export const DEFAULT_CATEGORIES: CategoryDef[] = [
  {
    slug: "uzvaras",
    label: "Uzvaras",
    emoji: "🏆",
    color: "#FFB86B",
    order: 0,
    adminOnly: false,
    hint: "Pirmais klients, pirmie ienākumi, pabeigta mājaslapa, AI asistents, balss aģents, jauna sadarbība",
  },
  {
    slug: "jautajumi",
    label: "Jautājumi",
    emoji: "❓",
    color: "#6D5EF3",
    order: 1,
    adminOnly: false,
    hint: "Kaut kas nesanāk? Jautā kopienai",
  },
  {
    slug: "ai-idejas",
    label: "AI idejas",
    emoji: "💡",
    color: "#00BFA5",
    order: 2,
    adminOnly: false,
    hint: "Idejas, ko varētu uzbūvēt ar AI",
  },
  {
    slug: "ai-riki",
    label: "AI rīki",
    emoji: "🤖",
    color: "#4FD8C4",
    order: 3,
    adminOnly: false,
    hint: "Rīki, ko atradi un iesaki citiem",
  },
  {
    slug: "klienti-bizness",
    label: "Klienti un bizness",
    emoji: "💼",
    color: "#F08A5D",
    order: 4,
    adminOnly: false,
    hint: "Cenas, piedāvājumi, klientu atrašana, līgumi",
  },
  {
    slug: "kursu-jautajumi",
    label: "Kursu jautājumi",
    emoji: "🎓",
    color: "#9A8CF7",
    order: 5,
    adminOnly: false,
    hint: "Jautājumi par Chademy lekcijām un uzdevumiem",
  },
  {
    slug: "diskusijas",
    label: "Diskusijas",
    emoji: "💬",
    color: "#8E8AA8",
    order: 6,
    adminOnly: false,
    hint: "Viss pārējais",
  },
  {
    slug: "chademy-jaunumi",
    label: "Chademy jaunumi",
    emoji: "📢",
    color: "#E9A23B",
    order: 7,
    adminOnly: true,
    hint: "Oficiāli paziņojumi — publicē tikai Chademy komanda",
  },
];

export const DEFAULT_CATEGORY_SLUG = "diskusijas";
export const ANNOUNCEMENT_CATEGORY_SLUG = "chademy-jaunumi";

/** Ātrā piekļuve pēc slug (rezerves variants, ja DB kategorija pazudusi). */
export const CATEGORY_BY_SLUG: Record<string, CategoryDef> = Object.fromEntries(
  DEFAULT_CATEGORIES.map((c) => [c.slug, c])
);

/** Drošs krāsas/nosaukuma nolasījums arī nezināmam slug. */
export function categoryFallback(slug: string): CategoryDef {
  return (
    CATEGORY_BY_SLUG[slug] ?? {
      slug,
      label: slug,
      emoji: "💬",
      color: "#8E8AA8",
      order: 99,
      adminOnly: false,
    }
  );
}

// ── Filtri (feed augšā) ──────────────────────────────────────
export type FeedSort = "jaunakie" | "popularakie";

export const FEED_FILTERS: { key: string; label: string; sort?: FeedSort; category?: string }[] = [
  { key: "jaunakie", label: "Jaunākie", sort: "jaunakie" },
  { key: "popularakie", label: "Populārākie", sort: "popularakie" },
  { key: "uzvaras", label: "🏆 Uzvaras", category: "uzvaras" },
  { key: "jautajumi", label: "❓ Jautājumi", category: "jautajumi" },
  { key: "ai-idejas", label: "💡 AI idejas", category: "ai-idejas" },
  { key: "klienti-bizness", label: "💼 Klienti un bizness", category: "klienti-bizness" },
];
