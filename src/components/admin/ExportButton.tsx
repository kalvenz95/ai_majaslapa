"use client";

import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";

/** Lejupielādē CSV no /api/admin/export/[type], saglabājot pašreizējos filtrus. */
export default function ExportButton({
  type,
  label = "Eksportēt CSV",
}: {
  type: "users" | "payments" | "subscriptions";
  label?: string;
}) {
  const params = useSearchParams();
  const qs = params.toString();
  const href = `/api/admin/export/${type}${qs ? `?${qs}` : ""}`;

  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}
