"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  slug: string;
  label: string;
  emoji: string;
  color: string;
  order: number;
  adminOnly: boolean;
  active: boolean;
};

/** Kopienas kategoriju pārvaldība — tikai OWNER/ADMIN. */
export default function CommunityCategoryManager({ initial }: { initial: Category[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({
    slug: "",
    label: "",
    emoji: "💬",
    color: "#6D5EF3",
    order: 50,
    adminOnly: false,
  });

  async function patch(id: string, data: Partial<Category>) {
    setBusy(id);
    setError("");
    try {
      const res = await fetch(`/api/community/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Neizdevās saglabāt");
        return;
      }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...json } : r)));
    } finally {
      setBusy(null);
    }
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy("new");
    setError("");
    try {
      const res = await fetch("/api/community/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Neizdevās izveidot");
        return;
      }
      setRows((prev) => [...prev, json].sort((a, b) => a.order - b.order));
      setDraft({ slug: "", label: "", emoji: "💬", color: "#6D5EF3", order: 50, adminOnly: false });
      setCreating(false);
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-[13px] text-red-400">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#10101c]">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-white/5 text-white/40">
            <tr>
              <th className="px-4 py-3 font-medium">Kategorija</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Kārtība</th>
              <th className="px-4 py-3 font-medium">Tikai admins</th>
              <th className="px-4 py-3 font-medium">Redzama</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                      style={{ background: `${c.color}1f`, border: `1px solid ${c.color}44` }}
                    >
                      {c.emoji}
                    </span>
                    <input
                      defaultValue={c.label}
                      onBlur={(e) => {
                        if (e.target.value !== c.label) patch(c.id, { label: e.target.value });
                      }}
                      className="w-40 rounded-md border border-transparent bg-transparent px-2 py-1 text-white outline-none hover:border-white/10 focus:border-white/20"
                    />
                    <input
                      type="color"
                      defaultValue={c.color}
                      onBlur={(e) => {
                        if (e.target.value.toUpperCase() !== c.color.toUpperCase())
                          patch(c.id, { color: e.target.value });
                      }}
                      className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                      aria-label={`${c.label} krāsa`}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-white/40">{c.slug}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min={0}
                    max={99}
                    defaultValue={c.order}
                    onBlur={(e) => {
                      const v = Number(e.target.value);
                      if (v !== c.order) patch(c.id, { order: v });
                    }}
                    className="w-14 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white outline-none focus:border-white/25"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={c.adminOnly}
                    disabled={busy === c.id}
                    onChange={(e) => patch(c.id, { adminOnly: e.target.checked })}
                    className="h-4 w-4 accent-neon-green"
                    aria-label="Tikai admins drīkst publicēt"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={c.active}
                    disabled={busy === c.id}
                    onChange={(e) => patch(c.id, { active: e.target.checked })}
                    className="h-4 w-4 accent-neon-green"
                    aria-label="Redzama kopienā"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {creating ? (
        <form
          onSubmit={create}
          className="flex flex-wrap items-end gap-3 rounded-xl border border-white/5 bg-[#10101c] p-4"
        >
          <label className="text-[12px] text-white/50">
            Slug
            <input
              required
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              placeholder="jauna-kategorija"
              className="mt-1 block w-44 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[13px] text-white outline-none focus:border-white/25"
            />
          </label>
          <label className="text-[12px] text-white/50">
            Nosaukums
            <input
              required
              value={draft.label}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              className="mt-1 block w-44 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[13px] text-white outline-none focus:border-white/25"
            />
          </label>
          <label className="text-[12px] text-white/50">
            Emoji
            <input
              value={draft.emoji}
              onChange={(e) => setDraft({ ...draft, emoji: e.target.value })}
              className="mt-1 block w-16 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[13px] text-white outline-none focus:border-white/25"
            />
          </label>
          <label className="text-[12px] text-white/50">
            Krāsa
            <input
              type="color"
              value={draft.color}
              onChange={(e) => setDraft({ ...draft, color: e.target.value })}
              className="mt-1 block h-8 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
            />
          </label>
          <label className="flex items-center gap-2 text-[12px] text-white/50">
            <input
              type="checkbox"
              checked={draft.adminOnly}
              onChange={(e) => setDraft({ ...draft, adminOnly: e.target.checked })}
              className="h-4 w-4 accent-neon-green"
            />
            Tikai admins
          </label>
          <button
            type="submit"
            disabled={busy === "new"}
            className="rounded-lg bg-neon-green px-3 py-1.5 text-[13px] font-medium text-black hover:bg-neon-green/90 disabled:opacity-60"
          >
            Pievienot
          </button>
          <button
            type="button"
            onClick={() => setCreating(false)}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-[13px] text-white/70 hover:bg-white/5"
          >
            Atcelt
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          + Jauna kategorija
        </button>
      )}
    </div>
  );
}
