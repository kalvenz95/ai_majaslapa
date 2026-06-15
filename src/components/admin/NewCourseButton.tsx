"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, X } from "lucide-react";
import type { Plan } from "@prisma/client";

const PLANS: { value: Plan; label: string }[] = [
  { value: "PAMATI", label: "Pamati" },
  { value: "IZAUGSME", label: "Izaugsme" },
  { value: "MEISTARS", label: "Meistars" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[āàá]/g, "a").replace(/[ēèé]/g, "e").replace(/[īìí]/g, "i")
    .replace(/[ōòó]/g, "o").replace(/[ūùú]/g, "u").replace(/[čć]/g, "c")
    .replace(/[ģ]/g, "g").replace(/[ķ]/g, "k").replace(/[ļ]/g, "l")
    .replace(/[ņ]/g, "n").replace(/[š]/g, "s").replace(/[ž]/g, "z")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function NewCourseButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    level: "",
    planRequired: "PAMATI" as Plan,
  });

  function update(k: keyof typeof form, v: string) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "title") next.slug = slugify(v);
      return next;
    });
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.message || "Neizdevās izveidot");
      setOpen(false);
      setForm({ title: "", slug: "", description: "", category: "", level: "", planRequired: "PAMATI" });
      router.push(`/admin/courses/${j.course.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kļūda");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-neon-green px-3 py-1.5 text-[13px] font-semibold text-black transition-colors hover:bg-neon-green/90"
      >
        <Plus className="h-4 w-4" /> Jauns kurss
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#10101c] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Jauns kurss</h3>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Field label="Nosaukums">
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className={inputCls}
                  placeholder="piem. AI satura pamati"
                />
              </Field>
              <Field label="Slug (URL)">
                <input
                  value={form.slug}
                  onChange={(e) => update("slug", e.target.value)}
                  className={inputCls}
                  placeholder="ai-satura-pamati"
                />
              </Field>
              <Field label="Apraksts">
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                  className={inputCls}
                  placeholder="Īss kursa apraksts…"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Kategorija">
                  <input value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls} placeholder="Saturs" />
                </Field>
                <Field label="Līmenis">
                  <input value={form.level} onChange={(e) => update("level", e.target.value)} className={inputCls} placeholder="Iesācējs" />
                </Field>
              </div>
              <Field label="Nepieciešamā paka">
                <select
                  value={form.planRequired}
                  onChange={(e) => update("planRequired", e.target.value)}
                  className={inputCls}
                >
                  {PLANS.map((p) => (
                    <option key={p.value} value={p.value} className="bg-[#10101c]">
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 px-3 py-2 text-[13px] text-white/60 hover:bg-white/5"
              >
                Atcelt
              </button>
              <button
                onClick={submit}
                disabled={loading || !form.title || !form.slug || !form.description}
                className="inline-flex items-center gap-1.5 rounded-lg bg-neon-green px-4 py-2 text-[13px] font-semibold text-black hover:bg-neon-green/90 disabled:opacity-40"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Izveidot
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-[#0b0b16] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-neon-green/40 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-white/50">{label}</span>
      {children}
    </label>
  );
}
