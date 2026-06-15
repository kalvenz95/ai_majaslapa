"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CoursePublishToggle({
  courseId,
  published,
  canEdit,
}: {
  courseId: string;
  published: boolean;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(published);

  async function toggle() {
    if (!canEdit) return;
    setLoading(true);
    const next = !on;
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: next }),
      });
      if (res.ok) {
        setOn(next);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading || !canEdit}
      className={`inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
        on ? "bg-neon-green" : "bg-white/15"
      }`}
      title={on ? "Publicēts" : "Paslēpts"}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      >
        {loading && <Loader2 className="h-3 w-3 animate-spin text-black/60" />}
      </span>
    </button>
  );
}
