import { requirePermission } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/admin/ui";
import AdminRoleManager from "@/components/admin/AdminRoleManager";

export default async function SettingsPage() {
  // Tikai īpašnieks (OWNER)
  const admin = await requirePermission("settings.manage");

  const admins = await prisma.user.findMany({
    where: { role: { in: ["OWNER", "ADMIN", "SUPPORT"] } },
    select: { id: true, name: true, email: true, role: true },
    orderBy: { role: "asc" },
  });

  const platform = {
    name: "Chademy",
    supportEmail: process.env.RESEND_FROM_EMAIL ?? "—",
    currency: "EUR",
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "—",
    paymentProvider: "Stripe",
  };

  return (
    <div>
      <PageHeader
        title="Iestatījumi"
        description="Platformas konfigurācija un administratoru pārvaldība."
      />

      <div className="space-y-6">
        {/* Platformas info */}
        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">Platformas informācija</h2>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Info label="Platformas nosaukums" value={platform.name} />
            <Info label="Atbalsta e-pasts" value={platform.supportEmail} />
            <Info label="Noklusējuma valūta" value={platform.currency} />
            <Info label="Maksājumu provaiders" value={platform.paymentProvider} />
            <Info label="Mājaslapas URL" value={platform.appUrl} />
          </dl>
          <p className="mt-4 text-[12px] text-white/35">
            Šie iestatījumi tiek konfigurēti ar vides mainīgajiem (.env) Vercel projektā.
          </p>
        </Card>

        {/* Admin pārvaldība */}
        <Card className="p-5">
          <h2 className="mb-1 text-sm font-semibold text-white">Administratoru pārvaldība</h2>
          <p className="mb-4 text-[13px] text-white/40">
            Piešķir vai noņem piekļuvi admin panelim. Lietotājam vispirms jābūt
            reģistrētam platformā.
          </p>
          <AdminRoleManager admins={admins} currentUserId={admin.id} />
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] uppercase tracking-wide text-white/35">{label}</dt>
      <dd className="mt-1 text-sm text-white/80">{value}</dd>
    </div>
  );
}
