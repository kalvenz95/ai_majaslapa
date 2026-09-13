"use client";
import { categoryFallback } from "@/lib/community-categories";
import type { CommunityCategoryDef } from "./types";

/** Avatars ar iniciāļu rezerves variantu. */
export function Avatar({
  name,
  avatarUrl,
  size = 40,
}: {
  name: string | null;
  avatarUrl?: string | null;
  size?: number;
}) {
  const label = name?.trim() || "Dalībnieks";

  if (avatarUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={avatarUrl}
        alt={label}
        width={size}
        height={size}
        className="c-avatar"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="c-avatar-fallback"
      aria-hidden
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials || "?"}
    </div>
  );
}

/** "pirms 5 min" — latviski. */
export function timeAgo(date: string | Date) {
  const d = new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "tikko";
  if (diff < 3600) return `pirms ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `pirms ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `pirms ${Math.floor(diff / 86400)} d`;
  return d.toLocaleDateString("lv-LV", { day: "numeric", month: "short", year: "numeric" });
}

/** Pievienošanās datums profila plāksnītei. */
export function joinedLabel(date?: string | Date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("lv-LV", { month: "long", year: "numeric" });
}

/** Kategorijas čips ar savu krāsu. */
export function CategoryChip({
  slug,
  categories,
}: {
  slug: string;
  categories?: CommunityCategoryDef[];
}) {
  const cat = categories?.find((c) => c.slug === slug) ?? categoryFallback(slug);
  return (
    <span
      className="c-chip"
      style={{
        color: cat.color,
        background: `color-mix(in oklab, ${cat.color} 14%, transparent)`,
        borderColor: `color-mix(in oklab, ${cat.color} 32%, transparent)`,
      }}
    >
      <span aria-hidden>{cat.emoji}</span>
      {cat.label}
    </span>
  );
}

/** Maza plāksnīte — "Chademy komanda" vai iegādātā paka. */
export function MemberBadge({ plan, isStaff }: { plan?: string | null; isStaff?: boolean }) {
  if (isStaff) {
    return (
      <span
        className="c-chip"
        style={{
          color: "var(--accent)",
          background: "color-mix(in oklab, var(--accent) 14%, transparent)",
          borderColor: "color-mix(in oklab, var(--accent) 34%, transparent)",
        }}
      >
        Chademy komanda
      </span>
    );
  }
  if (!plan) return null;

  const names: Record<string, string> = {
    PAMATI: "Satura Speciālists",
    IZAUGSME: "AI Biznesa Automatizācija",
    MEISTARS: "AI Aģentu Eksperts",
  };
  return (
    <span className="c-chip" style={{ color: "var(--ink-3)", borderColor: "var(--line)" }}>
      {names[plan] ?? plan}
    </span>
  );
}

// ── Ikonas (inline, lai nebūtu papildu atkarību) ─────────────
const s = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Icon = {
  Heart: ({ filled }: { filled?: boolean }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s} fill={filled ? "currentColor" : "none"}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Comment: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Bookmark: ({ filled }: { filled?: boolean }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s} fill={filled ? "currentColor" : "none"}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Pin: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" {...s}>
      <path d="M12 17v5" /><path d="M9 10.76V5h6v5.76l2 3.24H7z" />
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Image: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s}>
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  Video: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s}>
      <path d="M23 7l-7 5 7 5z" /><rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  Link: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Lock: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  More: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
    </svg>
  ),
  X: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" {...s}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};
