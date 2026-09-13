"use client";
import { useState } from "react";

type Member = {
  id: string;
  name: string | null;
  email: string;
  restrictedAt: string;
  reason: string | null;
};

/** Ierobežoto dalībnieku saraksts ar iespēju atjaunot tiesības. */
export default function CommunityRestrictions({ initial }: { initial: Member[] }) {
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function restore(userId: string) {
    setBusy(userId);
    try {
      const res = await fetch("/api/community/admin/restrict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, restricted: false }),
      });
      if (res.ok) setRows((prev) => prev.filter((r) => r.id !== userId));
    } finally {
      setBusy(null);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-[#10101c] px-6 py-12 text-center">
        <p className="text-sm font-medium text-white/60">Neviens dalībnieks nav ierobežots</p>
        <p className="mt-1 text-[13px] text-white/35">
          Ierobežot var no kopienas plūsmas — ieraksta izvēlnē “Ierobežot autoru”.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/5 bg-[#10101c]">
      <table className="w-full text-left text-[13px]">
        <thead className="border-b border-white/5 text-white/40">
          <tr>
            <th className="px-4 py-3 font-medium">Dalībnieks</th>
            <th className="px-4 py-3 font-medium">Iemesls</th>
            <th className="px-4 py-3 font-medium">Kopš</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3">
                <div className="font-medium text-white">{m.name || "—"}</div>
                <div className="text-[12px] text-white/40">{m.email}</div>
              </td>
              <td className="px-4 py-3 text-white/60">{m.reason || "—"}</td>
              <td className="px-4 py-3 text-white/40">
                {new Date(m.restrictedAt).toLocaleDateString("lv-LV")}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => restore(m.id)}
                  disabled={busy === m.id}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-60"
                >
                  {busy === m.id ? "…" : "Atjaunot tiesības"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
