import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export const metadata = {
  title: "Nav piekļuves — Chademy",
  robots: { index: false, follow: false },
};

export default function NoAccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08080f] px-4 text-center">
      <div className="max-w-md">
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
          <ShieldAlert className="h-7 w-7 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Nav piekļuves</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/45">
          Tavam kontam nav administratora tiesību, lai piekļūtu šim panelim. Ja
          uzskati, ka tā ir kļūda, sazinies ar platformas īpašnieku.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href="/lv/dashboard"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            Uz manu profilu
          </Link>
          <SignOutButton redirectUrl="/admin/login">
            <button className="rounded-lg bg-neon-green px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-neon-green/90">
              Iziet
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
