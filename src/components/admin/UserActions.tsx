"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Plan } from "@prisma/client";
import { Ban, Check, ShieldCheck, ShieldOff, Loader2 } from "lucide-react";

type Action =
  | { action: "block" }
  | { action: "unblock" }
  | { action: "setPlan"; plan: Plan }
  | { action: "grantAccess"; plan: Plan; months?: number }
  | { action: "revokeAccess" };

const PLANS: Plan[] = ["PAMATI", "IZAUGSME", "MEISTARS"];
const PLAN_LABEL: Record<Plan, string> = {
  PAMATI: "Pamati",
  IZAUGSME: "Izaugsme",
  MEISTARS: "Meistars",
};

export default function UserActions({
  userId,
  isBlocked,
  hasSubscription,
  currentPlan,
  canEdit,
  canEditPayments,
}: {
  userId: string;
  isBlocked: boolean;
  hasSubscription: boolean;
  currentPlan: Plan | null;
  canEdit: boolean;
  canEditPayments: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [grantPlan, setGrantPlan] = useState<Plan>(currentPlan ?? "PAMATI");

  async function run(key: string, body: Action) {
    setLoading(key);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || "Darbība neizdevās");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kļūda");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
          {error}
        </div>
      )}

      {/* Piekļuves pārvaldība */}
      {canEditPayments && (
        <div className="space-y-2.5">
          <div className="text-[12px] font-medium uppercase tracking-wide text-white/35">
            Piekļuve
          </div>
          <div className="flex items-center gap-2">
            <select
              value={grantPlan}
              onChange={(e) => setGrantPlan(e.target.value as Plan)}
              className="flex-1 rounded-lg border border-white/10 bg-[#0b0b16] px-3 py-2 text-[13px] text-white focus:border-neon-green/40 focus:outline-none"
            >
              {PLANS.map((p) => (
                <option key={p} value={p} className="bg-[#0b0b16]">
                  {PLAN_LABEL[p]}
                </option>
              ))}
            </select>
            {hasSubscription ? (
              <ActionBtn
                onClick={() => run("setPlan", { action: "setPlan", plan: grantPlan })}
                loading={loading === "setPlan"}
                icon={Check}
              >
                Mainīt paku
              </ActionBtn>
            ) : (
              <ActionBtn
                onClick={() =>
                  run("grant", { action: "grantAccess", plan: grantPlan, months: 12 })
                }
                loading={loading === "grant"}
                icon={ShieldCheck}
                variant="primary"
              >
                Piešķirt piekļuvi
              </ActionBtn>
            )}
          </div>
          {hasSubscription && (
            <ActionBtn
              full
              onClick={() => run("revoke", { action: "revokeAccess" })}
              loading={loading === "revoke"}
              icon={ShieldOff}
            >
              Atcelt piekļuvi (abonementu)
            </ActionBtn>
          )}
          {!hasSubscription && (
            <p className="text-[12px] text-white/35">
              Manuālā piešķiršana izveido piekļuvi uz 12 mēnešiem bez Stripe maksājuma.
            </p>
          )}
        </div>
      )}

      {/* Bloķēšana */}
      {canEdit && (
        <div className="space-y-2.5 border-t border-white/5 pt-4">
          <div className="text-[12px] font-medium uppercase tracking-wide text-white/35">
            Konts
          </div>
          {isBlocked ? (
            <ActionBtn
              full
              onClick={() => run("unblock", { action: "unblock" })}
              loading={loading === "unblock"}
              icon={Check}
              variant="primary"
            >
              Atjaunot piekļuvi kontam
            </ActionBtn>
          ) : (
            <ActionBtn
              full
              danger
              onClick={() => run("block", { action: "block" })}
              loading={loading === "block"}
              icon={Ban}
            >
              Bloķēt lietotāju
            </ActionBtn>
          )}
        </div>
      )}

      {!canEdit && !canEditPayments && (
        <p className="text-[13px] text-white/35">
          Tev nav tiesību mainīt šī lietotāja datus (tikai skatīšanās).
        </p>
      )}
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  loading,
  icon: Icon,
  variant = "ghost",
  danger,
  full,
}: {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "primary" | "ghost";
  danger?: boolean;
  full?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors disabled:opacity-50";
  const styles = danger
    ? "border border-red-500/20 text-red-400 hover:bg-red-500/10"
    : variant === "primary"
    ? "bg-neon-green text-black hover:bg-neon-green/90"
    : "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white";
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${base} ${styles} ${full ? "w-full" : ""}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  );
}
