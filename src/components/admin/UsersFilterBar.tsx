"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";

const FILTERS = [
  { value: "all", label: "Visi" },
  { value: "paid", label: "Samaksājuši" },
  { value: "unpaid", label: "Nav samaksājuši" },
  { value: "active", label: "Aktīvs abonements" },
  { value: "expired", label: "Beidzies abonements" },
];

const PLANS = [
  { value: "", label: "Visas pakas" },
  { value: "PAMATI", label: "Pamati" },
  { value: "IZAUGSME", label: "Izaugsme" },
  { value: "MEISTARS", label: "Meistars" },
];

export default function UsersFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") ?? "");
  const currentFilter = params.get("filter") ?? "all";
  const currentPlan = params.get("plan") ?? "";

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page"); // atiestatīt lapošanu, mainot filtru
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  // Meklēšana ar debounce
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== (params.get("search") ?? "")) setParam("search", search);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Meklēšana */}
      <div className="relative max-w-sm flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Meklēt pēc vārda, e-pasta vai telefona…"
          className="w-full rounded-lg border border-white/10 bg-[#10101c] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-neon-green/40 focus:outline-none focus:ring-1 focus:ring-neon-green/30"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Statusa filtri */}
        <div className="flex flex-wrap gap-1 rounded-lg border border-white/10 bg-[#10101c] p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setParam("filter", f.value === "all" ? "" : f.value)}
              className={`rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                currentFilter === f.value || (f.value === "all" && !params.get("filter"))
                  ? "bg-neon-green/10 text-neon-green"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Pakas filtrs */}
        <select
          value={currentPlan}
          onChange={(e) => setParam("plan", e.target.value)}
          className="rounded-lg border border-white/10 bg-[#10101c] px-3 py-2 text-[13px] text-white/70 focus:border-neon-green/40 focus:outline-none"
        >
          {PLANS.map((p) => (
            <option key={p.value} value={p.value} className="bg-[#10101c]">
              {p.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
