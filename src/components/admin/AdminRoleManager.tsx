"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserCog, ShieldX } from "lucide-react";
import type { Role } from "@prisma/client";

type AdminRow = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};

const ROLES: { value: Role; label: string }[] = [
  { value: "OWNER", label: "Īpašnieks" },
  { value: "ADMIN", label: "Administrators" },
  { value: "SUPPORT", label: "Atbalsts" },
  { value: "USER", label: "Lietotājs (noņemt piekļuvi)" },
];

const ROLE_LABEL: Record<Role, string> = {
  OWNER: "Īpašnieks",
  ADMIN: "Administrators",
  SUPPORT: "Atbalsts",
  USER: "Lietotājs",
};

export default function AdminRoleManager({
  admins,
  currentUserId,
}: {
  admins: AdminRow[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("ADMIN");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function assign(targetEmail: string, targetRole: Role) {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, role: targetRole }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.message || "Neizdevās");
      setMsg({ type: "ok", text: "Loma atjaunināta!" });
      setEmail("");
      router.refresh();
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "Kļūda" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Pievienot/mainīt lomu */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1 block text-[12px] font-medium text-white/50">
            Lietotāja e-pasts
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vards@example.com"
            className="w-full rounded-lg border border-white/10 bg-[#0b0b16] px-3 py-2 text-[13px] text-white placeholder:text-white/30 focus:border-neon-green/40 focus:outline-none"
          />
        </label>
        <label>
          <span className="mb-1 block text-[12px] font-medium text-white/50">Loma</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="rounded-lg border border-white/10 bg-[#0b0b16] px-3 py-2 text-[13px] text-white focus:border-neon-green/40 focus:outline-none"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value} className="bg-[#0b0b16]">
                {r.label}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => assign(email, role)}
          disabled={loading || !email.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neon-green px-4 py-2 text-[13px] font-semibold text-black hover:bg-neon-green/90 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserCog className="h-4 w-4" />}
          Piešķirt
        </button>
      </div>

      {msg && (
        <p className={`text-[13px] ${msg.type === "ok" ? "text-emerald-400" : "text-red-400"}`}>
          {msg.text}
        </p>
      )}

      {/* Esošie admini */}
      <div className="rounded-lg border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left text-[12px] uppercase tracking-wide text-white/35">
              <th className="px-4 py-2.5 font-medium">Administrators</th>
              <th className="px-4 py-2.5 font-medium">Loma</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{a.name || "—"}</div>
                  <div className="text-[12px] text-white/40">{a.email}</div>
                </td>
                <td className="px-4 py-3 text-white/70">{ROLE_LABEL[a.role]}</td>
                <td className="px-4 py-3 text-right">
                  {a.id !== currentUserId && (
                    <button
                      onClick={() => assign(a.email, "USER")}
                      disabled={loading}
                      className="inline-flex items-center gap-1 text-[12px] text-white/40 transition-colors hover:text-red-400"
                    >
                      <ShieldX className="h-3.5 w-3.5" /> Noņemt
                    </button>
                  )}
                  {a.id === currentUserId && (
                    <span className="text-[12px] text-white/25">tu</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
