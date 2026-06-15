import Link from "next/link";

/** Kartīte ar statistiku dashboardam */
export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "text-neon-green",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#10101c] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]">
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-medium text-white/50">{label}</span>
        {Icon && <Icon className={`h-[18px] w-[18px] ${accent}`} />}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</div>
      {sub && <div className="mt-1 text-[12px] text-white/40">{sub}</div>}
    </div>
  );
}

/** Krāsu kodēts statusa badge */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "green" | "amber" | "red" | "blue" | "neutral" | "purple";
}) {
  const tones: Record<string, string> = {
    green: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    red: "bg-red-500/10 text-red-400 ring-red-500/20",
    blue: "bg-sky-500/10 text-sky-400 ring-sky-500/20",
    purple: "bg-purple-500/10 text-purple-400 ring-purple-500/20",
    neutral: "bg-white/5 text-white/60 ring-white/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-medium ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Lapas virsraksts ar darbībām labajā pusē */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-white/45">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

/** Tabulas konteiners */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/5 bg-[#10101c] ${className}`}>
      {children}
    </div>
  );
}

/** Tukša stāvokļa paziņojums */
export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium text-white/60">{title}</p>
      {hint && <p className="mt-1 text-[13px] text-white/35">{hint}</p>}
    </div>
  );
}

/** Poga kā saite */
export function LinkButton({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-neon-green text-black hover:bg-neon-green/90"
      : "border border-white/10 text-white/70 hover:bg-white/5 hover:text-white";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}
