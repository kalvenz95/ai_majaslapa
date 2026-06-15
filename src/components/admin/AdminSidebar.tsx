"use client";

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

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-white/5 bg-[#0b0b16]">
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
  );
}
