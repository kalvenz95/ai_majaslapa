import { Link } from "@/i18n/navigation";
import type { CommunityDenyReason } from "@/lib/community";
import { DEFAULT_CATEGORIES } from "@/lib/community-categories";

/**
 * Aizslēgtais stāvoklis — ko redz lietotājs BEZ apmaksātas piekļuves.
 *
 * Šeit netiek ielādēts NEVIENS kopienas ieraksts: serveris pat nevaicā
 * DB, ja piekļuve liegta. Rāda tikai to, kas dalībniekus sagaida iekšā.
 */
export function CommunityLocked({ reason }: { reason: CommunityDenyReason }) {
  const blocked = reason === "BLOCKED";

  return (
    <div className="c-scope" style={{ position: "relative", maxWidth: 620, margin: "0 auto" }}>
      <div className="c-lock-glow" aria-hidden />

      <div
        className="c-card c-rise"
        style={{ padding: "40px 32px", textAlign: "center", position: "relative" }}
      >
        <div
          aria-hidden
          style={{
            width: 60,
            height: 60,
            margin: "0 auto 22px",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            background: "color-mix(in oklab, var(--accent) 13%, transparent)",
            border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 className="c-title" style={{ fontSize: 23, marginBottom: 12 }}>
          Chademy Community
        </h1>

        <p
          className="c-body"
          style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 420, margin: "0 auto 8px" }}
        >
          {blocked
            ? "Tavs konts ir apturēts. Sazinies ar Chademy atbalstu, lai atjaunotu piekļuvi."
            : "Chademy Community ir pieejama tikai aktīvajiem Chademy dalībniekiem."}
        </p>

        {!blocked && (
          <p style={{ fontSize: 13, color: "var(--ink-3)", margin: "0 auto 26px", maxWidth: 380 }}>
            Iegādājies jebkuru Chademy paku, lai pievienotos.
          </p>
        )}

        {!blocked && (
          <Link href="/#pricing" className="c-btn c-btn-primary" style={{ marginBottom: 32 }}>
            Skatīt kursus
          </Link>
        )}

        {blocked && (
          <Link href="/kontakti" className="c-btn c-btn-ghost" style={{ marginBottom: 32 }}>
            Sazināties ar atbalstu
          </Link>
        )}

        {/* Priekšskatījums — kategorijas bez satura */}
        {!blocked && (
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
                marginBottom: 14,
              }}
            >
              Kas tevi sagaida iekšā
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                justifyContent: "center",
              }}
            >
              {DEFAULT_CATEGORIES.filter((c) => !c.adminOnly).map((c) => (
                <span
                  key={c.slug}
                  className="c-chip"
                  style={{
                    color: c.color,
                    background: `color-mix(in oklab, ${c.color} 12%, transparent)`,
                    borderColor: `color-mix(in oklab, ${c.color} 28%, transparent)`,
                  }}
                >
                  <span aria-hidden>{c.emoji}</span>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
