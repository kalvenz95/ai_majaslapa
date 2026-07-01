"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Repeat,
  BookOpen,
  StickyNote,
  Settings,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import type { Role } from "@prisma/client";
import { ROLE_LABELS } from "@/lib/format";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Sākums", icon: LayoutDashboard, roles: ["OWNER", "ADMIN", "SUPPORT"] },
  { href: "/admin/users", label: "Lietotāji", icon: Users, roles: ["OWNER", "ADMIN", "SUPPORT"] },
  { href: "/admin/payments", label: "Maksājumi", icon: CreditCard, roles: ["OWNER", "ADMIN", "SUPPORT"] },
  { href: "/admin/subscriptions", label: "Abonementi", icon: Repeat, roles: ["OWNER", "ADMIN", "SUPPORT"] },
  { href: "/admin/courses", label: "Kursi", icon: BookOpen, roles: ["OWNER", "ADMIN", "SUPPORT"] },
  { href: "/admin/notes", label: "Piezīmes", icon: StickyNote, roles: ["OWNER", "ADMIN", "SUPPORT"] },
  { href: "/admin/settings", label: "Iestatījumi", icon: Settings, roles: ["OWNER"] },
];

export default function AdminSidebar({
  role,
  name,
  email,
}: {
  role: Role;
  name: string | null;
  email: string;
}) {
  const pathname = usePathname();
  const items = NAV.filter((i) => i.roles.includes(role));
  const [open, setOpen] = useState(false);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar — hidden on desktop */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-white/5 bg-[#0b0b16]/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Atvērt izvēlni"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neon-green/10 ring-1 ring-neon-green/30">
            <ShieldCheck className="h-4 w-4 text-neon-green" />
          </div>
          <span className="text-sm font-semibold text-white">Chademy</span>
        </div>
      </div>

      {/* Overlay behind the mobile drawer */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden
          className="fixed inset-0 z-[35] bg-black/55 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-[#0b0b16] transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Close button — only inside the mobile drawer */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Aizvērt izvēlni"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/70 md:hidden"
        >
          <X className="h-4 w-4" />
        </button>

      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-green/10 ring-1 ring-neon-green/30">
          <ShieldCheck className="h-4.5 w-4.5 text-neon-green" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">Chademy</div>
          <div className="text-[11px] font-medium text-neon-green/80">Admin panelis</div>
        </div>
      </div>

      {/* Navigācija */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-neon-green/10 text-neon-green"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] transition-colors ${
                  active ? "text-neon-green" : "text-white/40 group-hover:text-white/70"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Lietotājs apakšā */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-sm font-medium text-white">
              {name || email}
            </div>
            <div className="text-[11px] text-neon-green/70">{ROLE_LABELS[role]}</div>
          </div>
        </div>
      </div>
      </aside>
    </>
  );
}
