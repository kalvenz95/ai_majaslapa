"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2, Lock, Unlock, Video } from "lucide-react";
import type { Plan } from "@prisma/client";

type Lesson = {
  id: string;
  title: string;
  videoUrl: string | null;
  duration: number | null;
  isFree: boolean;
  order: number;
};

type Course = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  level: string | null;
  planRequired: Plan;
  color: string;
};

const PLANS: { value: Plan; label: string }[] = [
  { value: "PAMATI", label: "Pamati" },
  { value: "IZAUGSME", label: "Izaugsme" },
  { value: "MEISTARS", label: "Meistars" },
];

const inputCls =
  "w-full rounded-lg border border-white/10 bg-[#0b0b16] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-neon-green/40 focus:outline-none";

export default function CourseEditor({
  course,
  lessons,
  canEdit,
}: {
  course: Course;
  lessons: Lesson[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState(course);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Jaunas nodarbības forma
  const [newLesson, setNewLesson] = useState({ title: "", videoUrl: "", duration: "" });
  const [addingLesson, setAddingLesson] = useState(false);
  const [busyLesson, setBusyLesson] = useState<string | null>(null);

  function set(k: keyof Course, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function saveCourse() {
    setSaving(true);
    setError(null);
    setSavedMsg(null);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category || null,
          level: form.level || null,
          planRequired: form.planRequired,
          color: form.color,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || "Neizdevās saglabāt");
      }
      setSavedMsg("Saglabāts!");
      router.refresh();
      setTimeout(() => setSavedMsg(null), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kļūda");
    } finally {
      setSaving(false);
    }
  }

  async function addLesson() {
    if (!newLesson.title.trim()) return;
    setAddingLesson(true);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newLesson.title,
          videoUrl: newLesson.videoUrl || undefined,
          duration: newLesson.duration ? parseInt(newLesson.duration, 10) : undefined,
        }),
      });
      if (res.ok) {
        setNewLesson({ title: "", videoUrl: "", duration: "" });
        router.refresh();
      }
    } finally {
      setAddingLesson(false);
    }
  }

  async function patchLesson(id: string, body: Record<string, unknown>) {
    setBusyLesson(id);
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusyLesson(null);
    }
  }

  async function deleteLesson(id: string) {
    setBusyLesson(id);
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setBusyLesson(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Kursa iestatījumi */}
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-white/5 bg-[#10101c] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">Kursa iestatījumi</h2>
          <div className="space-y-3">
            <Field label="Nosaukums">
              <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} disabled={!canEdit} />
            </Field>
            <Field label="Apraksts">
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className={inputCls} disabled={!canEdit} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Kategorija">
                <input value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} className={inputCls} disabled={!canEdit} />
              </Field>
              <Field label="Līmenis">
                <input value={form.level ?? ""} onChange={(e) => set("level", e.target.value)} className={inputCls} disabled={!canEdit} />
              </Field>
            </div>
            <Field label="Nepieciešamā paka">
              <select value={form.planRequired} onChange={(e) => set("planRequired", e.target.value)} className={inputCls} disabled={!canEdit}>
                {PLANS.map((p) => (
                  <option key={p.value} value={p.value} className="bg-[#10101c]">{p.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Krāsa">
              <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} className="h-9 w-full cursor-pointer rounded-lg border border-white/10 bg-[#0b0b16]" disabled={!canEdit} />
            </Field>
          </div>

          {error && <p className="mt-3 text-[12px] text-red-400">{error}</p>}

          {canEdit && (
            <button
              onClick={saveCourse}
              disabled={saving}
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-neon-green px-4 py-2 text-[13px] font-semibold text-black hover:bg-neon-green/90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {savedMsg || "Saglabāt izmaiņas"}
            </button>
          )}
        </div>
      </div>

      {/* Nodarbības */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-white/5 bg-[#10101c]">
          <div className="border-b border-white/5 px-5 py-3.5">
            <h2 className="text-sm font-semibold text-white">
              Nodarbības <span className="text-white/35">({lessons.length})</span>
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            {lessons.map((l, i) => (
              <div key={l.id} className="flex items-center gap-3 px-5 py-3">
                <span className="w-6 text-center text-[13px] text-white/30">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">{l.title}</div>
                  <div className="flex items-center gap-2 text-[12px] text-white/35">
                    {l.videoUrl ? (
                      <span className="inline-flex items-center gap-1 text-neon-green/70">
                        <Video className="h-3 w-3" /> Video
                      </span>
                    ) : (
                      <span>Nav video</span>
                    )}
                    {l.duration ? <span>· {Math.round(l.duration / 60)} min</span> : null}
                  </div>
                </div>
                {canEdit && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => patchLesson(l.id, { isFree: !l.isFree })}
                      disabled={busyLesson === l.id}
                      title={l.isFree ? "Bezmaksas (priekšskatījums)" : "Slēgta — vajag abonementu"}
                      className={`rounded-md p-1.5 transition-colors ${
                        l.isFree ? "text-emerald-400 hover:bg-emerald-500/10" : "text-white/40 hover:bg-white/5"
                      }`}
                    >
                      {l.isFree ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => deleteLesson(l.id)}
                      disabled={busyLesson === l.id}
                      className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      {busyLesson === l.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {lessons.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-white/35">Vēl nav nodarbību.</p>
            )}
          </div>

          {/* Pievienot nodarbību */}
          {canEdit && (
            <div className="border-t border-white/5 p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  value={newLesson.title}
                  onChange={(e) => setNewLesson((n) => ({ ...n, title: e.target.value }))}
                  placeholder="Nodarbības nosaukums"
                  className={inputCls}
                />
                <input
                  value={newLesson.videoUrl}
                  onChange={(e) => setNewLesson((n) => ({ ...n, videoUrl: e.target.value }))}
                  placeholder="Video URL (YouTube/Vimeo/mp4)"
                  className={inputCls}
                />
                <button
                  onClick={addLesson}
                  disabled={addingLesson || !newLesson.title.trim()}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[13px] font-medium text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-40"
                >
                  {addingLesson ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Pievienot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-white/50">{label}</span>
      {children}
    </label>
  );
}
