import { prisma } from "@/lib/prisma";
import CalendarClient from "./CalendarClient";

export default async function KalendarsPage() {
  const events = await prisma.liveEvent.findMany({
    where: { startAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    orderBy: { startAt: "asc" },
  });

  return <CalendarClient events={events} />;
}
