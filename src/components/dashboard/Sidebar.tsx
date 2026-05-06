"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const NAV = [
  {
    href: "/dashboard",
    label: "Sākums",
    exact: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/dashboard/kursi",
    label: "Akadēmija",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/sablonji",
    label: "Šabloni",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/outreach",
    label: "Skripti",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/kalkulators",
    label: "Kalkulators",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    href: "/dashboard/kopiena",
    label: "Sabiedrība",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/dashboard/rikki",
    label: "AI Rīki",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const SECONDARY = [
  { href: "/dashboard/profils", label: "Profils" },
  { href: "/dashboard/abonemets", label: "Abonements" },
  { href: "/dashboard/kalendars", label: "Kalendārs" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100%",
        width: "var(--d-side-w, 220px)",
        display: "flex",
        flexDirection: "column",
        background: "rgba(5,8,15,0.98)",
        borderRight: "1px solid var(--d-border)",
        zIndex: 50,
        padding: "20px 12px",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", marginBottom: 28, padding: "0 4px" }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: "linear-gradient(135deg, #00ff88, #00d4ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 900, color: "#000", flexShrink: 0,
          fontFamily: "'Inter Tight', sans-serif",
        }}>C</div>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em", color: "#fff" }}>
          Chademy
        </span>
      </Link>

      {/* Primary nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {NAV.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`d-nav-link${active ? " active" : ""}`}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        {/* Divider */}
        <div style={{ height: 1, background: "var(--d-border)", margin: "10px 4px" }} />

        {/* Secondary nav */}
        {SECONDARY.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`d-nav-link${active ? " active" : ""}`}
              style={{ fontSize: 12 }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — upgrade card + user */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Upgrade card */}
        <div style={{
          background: "rgba(0,255,136,0.05)",
          border: "1px solid rgba(0,255,136,0.12)",
          borderRadius: 12,
          padding: "12px 14px",
        }}>
          <span className="d-chip d-chip-accent" style={{ marginBottom: 8, display: "inline-flex" }}>BUILD</span>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Pāriet uz Build paketi</div>
          <div style={{ fontSize: 11, color: "var(--d-ink3)", lineHeight: 1.4, marginBottom: 10 }}>1:1 zvani + proposal review</div>
          <Link href="/#pricing" style={{
            display: "block", textAlign: "center",
            background: "#00ff88", color: "#000",
            borderRadius: 8, padding: "7px 10px",
            fontSize: 11, fontWeight: 700, textDecoration: "none",
          }}>
            Skatīt →
          </Link>
        </div>

        {/* User row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px" }}>
          <UserButton />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--d-ink2)" }}>Mans konts</div>
          </div>
        </div>

        {/* Back to site */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 11, color: "var(--d-ink3)", textDecoration: "none",
          padding: "4px 4px", transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--d-ink2)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--d-ink3)")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Atpakaļ uz sākumlapu
        </Link>
      </div>
    </aside>
  );
}
