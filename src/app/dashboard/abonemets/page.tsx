"use client";
import { useEffect, useState } from "react";
import { stripeApi } from "@/lib/api";
import { PLAN_NAMES, PLAN_PRICES } from "@/lib/stripe";
import Link from "next/link";

interface Subscription {
  plan: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface UserData {
  subscription: Subscription | null;
}

export default function AboneмetsPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openingPortal, setOpeningPortal] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(({ user }) => {
        setUserData({ subscription: user?.subscription ?? null });
        setLoading(false);
      });
  }, []);

  async function openPortal() {
    setOpeningPortal(true);
    try {
      const { url } = await stripeApi.openPortal();
      window.location.href = url;
    } catch {
      setOpeningPortal(false);
    }
  }

  const sub = userData?.subscription;
  const isActive = sub?.status === "ACTIVE" || sub?.status === "TRIALING";

  const planColors: Record<string, string> = {
    PAMATI: "#a855f7",
    IZAUGSME: "#00ff88",
    MEISTARS: "#f97316",
  };

  const statusLabels: Record<string, string> = {
    ACTIVE: "Aktīvs",
    TRIALING: "Izmēģinājums",
    CANCELED: "Atcelts",
    PAST_DUE: "Kavēts maksājums",
    INCOMPLETE: "Nepilnīgs",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Ielādē...
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Abonements</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        Pārvaldi savu plānu, rēķinus un maksājuma metodi
      </p>

      {isActive && sub ? (
        <div className="space-y-4">
          {/* Active plan card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: `${planColors[sub.plan] || "#00ff88"}08`,
              border: `1px solid ${planColors[sub.plan] || "#00ff88"}25`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: planColors[sub.plan] || "#00ff88" }}
                >
                  Aktīvais plāns
                </div>
                <div className="text-2xl font-black text-white">
                  {PLAN_NAMES[sub.plan as keyof typeof PLAN_NAMES] || sub.plan}
                </div>
                <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  €{PLAN_PRICES[sub.plan as keyof typeof PLAN_PRICES] || "—"}/mēnesī
                </div>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: `${planColors[sub.plan] || "#00ff88"}20`,
                  color: planColors[sub.plan] || "#00ff88",
                }}
              >
                {statusLabels[sub.status] || sub.status}
              </span>
            </div>

            {/* Period info */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Nākamais rēķins
                </div>
                <div className="text-sm font-bold text-white">
                  {new Date(sub.currentPeriodEnd).toLocaleDateString("lv-LV", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Atjaunošana
                </div>
                <div className="text-sm font-bold" style={{ color: sub.cancelAtPeriodEnd ? "#ef4444" : "#00ff88" }}>
                  {sub.cancelAtPeriodEnd ? "Atcelts perioda beigās" : "Automātiska"}
                </div>
              </div>
            </div>

            {/* Manage button */}
            <button
              onClick={openPortal}
              disabled={openingPortal}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: planColors[sub.plan] || "#00ff88",
                color: "#000",
                cursor: openingPortal ? "wait" : "pointer",
              }}
            >
              {openingPortal ? "Atver portālu..." : "Pārvaldīt abonementu →"}
            </button>
          </div>

          {/* Info */}
          <div
            className="rounded-xl p-4 text-sm"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Caur Stripe portālu vari: mainīt plānu, atcelt abonementu, lejupielādēt rēķinus,
            atjaunot maksājuma karti.
          </div>
        </div>
      ) : (
        /* No subscription */
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div className="text-4xl mb-3">💎</div>
          <div className="text-xl font-black text-white mb-2">Nav aktīva abonementa</div>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            Izvēlies plānu, lai piekļūtu kursiem un sāktu savu AI karjeru.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-6 py-3 rounded-xl font-bold text-sm"
            style={{ background: "#a855f7", color: "#fff", textDecoration: "none" }}
          >
            Skatīt plānus →
          </Link>
        </div>
      )}
    </div>
  );
}
