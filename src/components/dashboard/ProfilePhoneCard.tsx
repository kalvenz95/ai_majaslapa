"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Check, Loader2, Pencil } from "lucide-react";

export default function ProfilePhoneCard({ phone }: { phone: string | null }) {
  const router = useRouter();
  const [editing, setEditing] = useState(!phone);
  const [value, setValue] = useState(phone ?? "+371 ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: value }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.message || "Neizdevās saglabāt");
      setEditing(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kļūda");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.25)" }}
          >
            <Phone className="h-4 w-4" style={{ color: "#00ff88" }} />
          </div>
          <div className="min-w-0">
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Telefona numurs
            </div>
            {!editing ? (
              <div className="text-sm font-bold text-white truncate">
                {phone || "Nav norādīts"}
              </div>
            ) : (
              <input
                type="tel"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                placeholder="+371 2X XXX XXX"
                className="mt-1 w-full max-w-[220px] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
                autoFocus
              />
            )}
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
          >
            <Pencil className="h-3.5 w-3.5" />
            {phone ? "Mainīt" : "Pievienot"}
          </button>
        ) : (
          <button
            onClick={save}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-bold shrink-0 disabled:opacity-50"
            style={{ background: "#00ff88", color: "#05080f" }}
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            Saglabāt
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs" style={{ color: "#f87171" }}>{error}</p>}
    </div>
  );
}
