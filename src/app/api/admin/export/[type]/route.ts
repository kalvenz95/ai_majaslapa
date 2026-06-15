import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";
import { toCsv, csvResponse } from "@/lib/csv";
import {
  PLAN_LABELS,
  SUBSCRIPTION_LABELS,
  PAYMENT_LABELS,
  USER_STATUS_LABELS,
} from "@/lib/format";

function dateStr() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    await requireApiPermission("data.export");
    const { type } = await params;

    if (type === "users") {
      const users = await prisma.user.findMany({
        include: { subscription: true, _count: { select: { payments: true } } },
        orderBy: { createdAt: "desc" },
      });
      const rows = users.map((u) => ({
        vards: u.name ?? "",
        epasts: u.email,
        telefons: u.phone ?? "",
        loma: u.role,
        statuss: USER_STATUS_LABELS[u.status],
        paka: u.subscription ? PLAN_LABELS[u.subscription.plan] : "",
        abonements: u.subscription ? SUBSCRIPTION_LABELS[u.subscription.status] : "Nav",
        maksajumi: u._count.payments,
        registrejas: u.createdAt.toISOString(),
        pedeja_aktivitate: u.lastLoginAt?.toISOString() ?? "",
      }));
      const csv = toCsv(rows, [
        { key: "vards", header: "Vārds" },
        { key: "epasts", header: "E-pasts" },
        { key: "telefons", header: "Telefons" },
        { key: "loma", header: "Loma" },
        { key: "statuss", header: "Statuss" },
        { key: "paka", header: "Paka" },
        { key: "abonements", header: "Abonements" },
        { key: "maksajumi", header: "Maksājumu skaits" },
        { key: "registrejas", header: "Reģistrējās" },
        { key: "pedeja_aktivitate", header: "Pēdējā aktivitāte" },
      ]);
      return csvResponse(csv, `lietotaji-${dateStr()}.csv`);
    }

    if (type === "payments") {
      const payments = await prisma.payment.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
      const rows = payments.map((p) => ({
        lietotajs: p.user.name ?? p.user.email,
        epasts: p.user.email,
        summa_eur: (p.amount / 100).toFixed(2),
        valuta: p.currency.toUpperCase(),
        paka: p.plan ? PLAN_LABELS[p.plan] : "",
        statuss: PAYMENT_LABELS[p.status],
        provaiders: p.provider,
        datums: (p.paidAt ?? p.createdAt).toISOString(),
        rekins: p.invoiceUrl ?? "",
      }));
      const csv = toCsv(rows, [
        { key: "lietotajs", header: "Lietotājs" },
        { key: "epasts", header: "E-pasts" },
        { key: "summa_eur", header: "Summa (EUR)" },
        { key: "valuta", header: "Valūta" },
        { key: "paka", header: "Paka" },
        { key: "statuss", header: "Statuss" },
        { key: "provaiders", header: "Provaiders" },
        { key: "datums", header: "Datums" },
        { key: "rekins", header: "Rēķins" },
      ]);
      return csvResponse(csv, `maksajumi-${dateStr()}.csv`);
    }

    if (type === "subscriptions") {
      const subs = await prisma.subscription.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
      const rows = subs.map((s) => ({
        lietotajs: s.user.name ?? s.user.email,
        epasts: s.user.email,
        paka: PLAN_LABELS[s.plan],
        statuss: SUBSCRIPTION_LABELS[s.status],
        sakas: s.currentPeriodStart.toISOString(),
        beidzas: s.currentPeriodEnd.toISOString(),
        atcels_perioda_beigas: s.cancelAtPeriodEnd ? "Jā" : "Nē",
      }));
      const csv = toCsv(rows, [
        { key: "lietotajs", header: "Lietotājs" },
        { key: "epasts", header: "E-pasts" },
        { key: "paka", header: "Paka" },
        { key: "statuss", header: "Statuss" },
        { key: "sakas", header: "Sākās" },
        { key: "beidzas", header: "Beidzas" },
        { key: "atcels_perioda_beigas", header: "Atcels perioda beigās" },
      ]);
      return csvResponse(csv, `abonementi-${dateStr()}.csv`);
    }

    return Response.json({ message: "Nezināms eksporta tips" }, { status: 400 });
  } catch (err) {
    return adminApiError(err);
  }
}
