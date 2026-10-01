type EventType = "WEBINAR" | "QA" | "WORKSHOP" | "OTHER";

type LiveEventRecord = {
  id: string;
  title: string;
  description: string | null;
  startAt: Date;
  endAt: Date | null;
  meetUrl: string | null;
  type: EventType;
};

type UserStatus = "ACTIVE" | "BLOCKED";

type UserRecord = {
  clerkId: string;
  status: UserStatus;
};

const initialEvents: LiveEventRecord[] = [
  {
    id: "evt_1",
    title: "Privats mentorings",
    description: "Ieksejas piezimes dalibniekiem",
    startAt: new Date("2026-10-05T10:00:00.000Z"),
    endAt: new Date("2026-10-05T11:00:00.000Z"),
    meetUrl: "https://meet.example.com/private-room",
    type: "WEBINAR",
  },
];

const initialUsers: UserRecord[] = [
  { clerkId: "clerk_member", status: "ACTIVE" },
  { clerkId: "clerk_blocked", status: "BLOCKED" },
];

let events: LiveEventRecord[] = initialEvents.map((event) => ({ ...event }));
let users: UserRecord[] = initialUsers.map((user) => ({ ...user }));

function project<T extends Record<string, unknown>>(row: T, select?: Record<string, boolean>) {
  if (!select) return row;
  return Object.fromEntries(Object.entries(row).filter(([key]) => select[key]));
}

export const prisma = {
  user: {
    findUnique: async ({ where, select }: { where: { clerkId: string }; select?: Record<string, boolean> }) => {
      if (where.clerkId === "clerk_lookup_fail") {
        throw new Error("lookup failed");
      }

      const user = users.find((item) => item.clerkId === where.clerkId) ?? null;
      if (!user || !select) return user;
      return project(user, select);
    },
  },
  liveEvent: {
    findMany: async (args?: { select?: Record<string, boolean> }) => {
      return events.map((event) => project(event, args?.select));
    },
    create: async ({ data }: { data: Omit<LiveEventRecord, "id"> & Partial<Pick<LiveEventRecord, "id">> }) => {
      const event: LiveEventRecord = {
        id: data.id ?? `evt_${events.length + 1}`,
        title: data.title,
        description: data.description ?? null,
        startAt: data.startAt,
        endAt: data.endAt ?? null,
        meetUrl: data.meetUrl ?? null,
        type: data.type,
      };
      events.push(event);
      return event;
    },
  },
};

export function __resetEvents() {
  events = initialEvents.map((event) => ({ ...event }));
  users = initialUsers.map((user) => ({ ...user }));
}
