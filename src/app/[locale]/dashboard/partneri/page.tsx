"use client";
import { useEffect, useState } from "react";

interface Referral {
  id: string;
  name: string;
  status: "JOINED" | "PURCHASED";
  plan: string | null;
  amountCents: number;
  joinedAt: string;
  purchasedAt: string | null;
}

interface AffiliateData {
  code: string;
  discountPct: number;
  active: boolean;
  shareUrl: string;
  stats: { signups: number; purchases: number; revenueCents: number; conversionPct: number };
  referrals: Referral[];
}

const PLAN_NAMES: Record<string, string> = {
  PAMATI: "Satura Speciālists",
  IZAUGSME: "Digitālais Speciālists",
  MEISTARS: "AI Aģentu Eksperts",
};

function eur(cents: number) {
  return `€${(cents / 100).toFixed(0)}`;
}

export default function PartneriDashboardPage() {
  const [data, setData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<"code" | "url" | null>(null);

  useEffect(() => {
    fetch("/api/affiliate/me")
      .then((r) => r.json())
      .then((d) => {
        if (d && d.code) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function copy(text: string, which: "code" | "url") {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(which);
      setTimeout(() => setCopied(null), 1800);
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Ielādē…
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Partneru programma</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Neizdevās ielādēt partnera datus. Mēģini vēlreiz vēlāk.
        </p>
      </div>
    );
  }

  const stats = [
    { label: "Pievienojušies", value: data.stats.signups, hint: "cilvēki ar tavu kodu", color: "#a855f7" },
    { label: "Iegādājušies", value: data.stats.purchases, hint: "veikuši pirkumu", color: "#00ff88" },
    { label: "Konversija", value: `${data.stats.conversionPct}%`, hint: "pirkumi / pievienošanās", color: "#f97316" },
    { label: "Ieņēmumi caur kodu", value: eur(data.stats.revenueCents), hint: "kopā samaksāts", color: "#38bdf8" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Partneru programma</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        Dalies ar savu kodu — cilvēki saņem {data.discountPct}% atlaidi, tu seko rezultātiem.
      </p>

      {/* Kods + dalīšanās saite */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(0,255,136,0.06))",
          border: "1px solid rgba(168,85,247,0.25)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
              Tavs partnera kods
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#fff",
                }}
              >
                {data.code}
              </span>
              <button
                type="button"
                onClick={() => copy(data.code, "code")}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "7px 14px",
                  borderRadius: 9,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {copied === "code" ? "Nokopēts ✓" : "Kopēt kodu"}
              </button>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "rgba(0,0,0,0.25)",
              borderRadius: 14,
              padding: "12px 20px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 900, color: "#00ff88", lineHeight: 1 }}>
              {data.discountPct}%
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>atlaide apmeklētājam</div>
          </div>
        </div>

        {/* Dalīšanās saite */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Dalīšanās saite
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              readOnly
              value={data.shareUrl}
              onFocus={(e) => e.currentTarget.select()}
              style={{
                flex: "1 1 260px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                padding: "11px 14px",
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
            <button
              type="button"
              onClick={() => copy(data.shareUrl, "url")}
              style={{
                fontSize: 13,
                fontWeight: 700,
                padding: "11px 20px",
                borderRadius: 10,
                border: "none",
                background: "#00ff88",
                color: "#04120a",
                cursor: "pointer",
              }}
            >
              {copied === "url" ? "Nokopēts ✓" : "Kopēt saiti"}
            </button>
          </div>
        </div>
      </div>

      {/* Statistika */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 8 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.hint}</div>
          </div>
        ))}
      </div>

      {/* Saraksts */}
      <h2 className="text-lg font-bold text-white mb-4">Pieteikumi</h2>
      {data.referrals.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.12)" }}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌱</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Vēl nav pieteikumu</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 380, margin: "0 auto" }}>
            Dalies ar savu kodu vai saiti — tiklīdz kāds to izmantos, tas parādīsies šeit.
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 520 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)", textAlign: "left" }}>
                  {["Lietotājs", "Statuss", "Plāns", "Summa", "Datums"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.referrals.map((r) => {
                  const purchased = r.status === "PURCHASED";
                  return (
                    <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <td style={{ padding: "12px 16px", color: "#fff", fontWeight: 500 }}>{r.name}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "3px 9px",
                            borderRadius: 999,
                            background: purchased ? "rgba(0,255,136,0.12)" : "rgba(168,85,247,0.12)",
                            color: purchased ? "#00ff88" : "#c99bff",
                          }}
                        >
                          {purchased ? "Iegādājies" : "Pievienojies"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>
                        {r.plan ? PLAN_NAMES[r.plan] ?? r.plan : "—"}
                      </td>
                      <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>
                        {r.amountCents > 0 ? eur(r.amountCents) : "—"}
                      </td>
                      <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {new Date(r.purchasedAt ?? r.joinedAt).toLocaleDateString("lv-LV")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
