"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Send } from "lucide-react";

type Note = {
  id: string;
  note: string;
  createdAt: string;
  adminName: string;
};

export default function UserNotes({
  userId,
  initialNotes,
  canAdd,
}: {
  userId: string;
  initialNotes: Note[];
  canAdd: boolean;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function add() {
    if (!text.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: text }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || "Neizdevās saglabāt");
      }
      setText("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kļūda");
    } finally {
      setSaving(false);
    }
  }

  async function remove(noteId: string) {
    setDeleting(noteId);
    try {
      const res = await fetch(
        `/api/admin/users/${userId}/notes?noteId=${noteId}`,
        { method: "DELETE" }
      );
      if (res.ok) router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  const fmt = (d: string) =>
    new Intl.DateTimeFormat("lv-LV", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(d));

  return (
    <div className="space-y-3">
      {canAdd && (
        <div>
          <div className="flex items-start gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              placeholder="Pievienot iekšēju piezīmi par lietotāju…"
              className="flex-1 resize-none rounded-lg border border-white/10 bg-[#0b0b16] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-neon-green/40 focus:outline-none"
            />
            <button
              onClick={add}
              disabled={saving || !text.trim()}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-neon-green px-3 text-[13px] font-medium text-black transition-colors hover:bg-neon-green/90 disabled:opacity-40"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          {error && <p className="mt-1 text-[12px] text-red-400">{error}</p>}
        </div>
      )}

      <div className="space-y-2">
        {initialNotes.length === 0 && (
          <p className="text-[13px] text-white/30">Vēl nav piezīmju.</p>
        )}
        {initialNotes.map((n) => (
          <div
            key={n.id}
            className="group rounded-lg border border-white/5 bg-[#0b0b16] px-3 py-2.5"
          >
            <p className="text-[13px] text-white/80">{n.note}</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[11px] text-white/35">
                {n.adminName} · {fmt(n.createdAt)}
              </span>
              {canAdd && (
                <button
                  onClick={() => remove(n.id)}
                  disabled={deleting === n.id}
                  className="text-white/25 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                >
                  {deleting === n.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
