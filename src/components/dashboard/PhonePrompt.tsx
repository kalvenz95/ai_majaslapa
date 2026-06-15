"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Loader2, X } from "lucide-react";

/**
 * Parādās dashboardā, ja lietotājam vēl nav telefona numura.
 * Savāc telefonu pēc reģistrācijas (strādā arī ar Google/Facebook login).
 */
export default function PhonePrompt({ needsPhone }: { needsPhone: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(needsPhone);
  const [phone, setPhone] = useState("+371 ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function save() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.message || "Neizdevās saglabāt");
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kļūda");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-white/30 transition-colors hover:text-white/70"
          aria-label="Aizvērt"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/10 ring-1 ring-neon-green/30">
          <Phone className="h-6 w-6 text-neon-green" />
        </div>

        <h2 className="text-lg font-bold text-white">Pievieno savu telefona numuru</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
          Lai mēs varētu ar tevi sazināties par tavu mācību progresu un svarīgiem
          paziņojumiem, lūdzu, ievadi savu telefona numuru.
        </p>

        <div className="mt-5">
          <label className="mb-1.5 block text-[13px] font-medium text-white/60">
            Telefona numurs
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder="+371 2X XXX XXX"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30"
            autoFocus
          />
          {error && <p className="mt-2 text-[13px] text-red-400">{error}</p>}
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-white/45 transition-colors hover:text-white/70"
          >
            Vēlāk
          </button>
          <button
            onClick={save}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neon-green px-5 py-2.5 text-[13px] font-semibold text-black transition-colors hover:bg-neon-green/90 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Saglabāt
          </button>
        </div>
      </div>
    </div>
  );
}
