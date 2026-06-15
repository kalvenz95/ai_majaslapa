import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin panelis — Chademy",
  robots: { index: false, follow: false },
};

// Vienmēr dinamisks — admin dati nedrīkst tikt kešoti
export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Servera puses aizsardzība — pāradresē, ja nav admin lomas
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#08080f] text-white">
      <AdminSidebar role={admin.role} name={admin.name} email={admin.email} />
      <main className="ml-64 min-h-screen">
        <div className="mx-auto max-w-7xl px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
