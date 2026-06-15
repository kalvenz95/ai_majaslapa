import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, EmptyState } from "@/components/admin/ui";
import { formatDateTime } from "@/lib/format";
import { StickyNote } from "lucide-react";

export default async function NotesPage() {
  await requireAdmin();

  const notes = await prisma.adminNote.findMany({
    include: { user: true, admin: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <PageHeader
        title="Piezīmes"
        description="Visas administratoru iekšējās piezīmes par lietotājiem."
      />

      <Card>
        {notes.length === 0 ? (
          <EmptyState
            title="Vēl nav piezīmju"
            hint="Piezīmes var pievienot katra lietotāja profila lapā."
          />
        ) : (
          <div className="divide-y divide-white/5">
            {notes.map((n) => (
              <div key={n.id} className="flex gap-3 px-5 py-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <StickyNote className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/85">{n.note}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/40">
                    <span>Par:</span>
                    <Link
                      href={`/admin/users/${n.userId}`}
                      className="font-medium text-neon-green/80 hover:underline"
                    >
                      {n.user.name || n.user.email}
                    </Link>
                    <span>·</span>
                    <span>{n.admin.name || n.admin.email}</span>
                    <span>·</span>
                    <span>{formatDateTime(n.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
