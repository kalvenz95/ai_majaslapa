type EventType = "WEBINAR" | "QA" | "WORKSHOP" | "OTHER";
type Role = "OWNER" | "ADMIN" | "SUPPORT" | "USER";
type UserStatus = "ACTIVE" | "BLOCKED";

type LiveEventRecord = {
  id: string;
  title: string;
  description: string | null;
  startAt: Date;
  endAt: Date | null;
  meetUrl: string | null;
  type: EventType;
};

type UserRecord = {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: Role;
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
  { id: "usr_user", clerkId: "clerk_user", email: "user@test.local", name: "User", role: "USER", status: "ACTIVE" },
  { id: "usr_support", clerkId: "clerk_support", email: "support@test.local", name: "Support", role: "SUPPORT", status: "ACTIVE" },
  { id: "usr_admin", clerkId: "clerk_admin", email: "admin@test.local", name: "Admin", role: "ADMIN", status: "ACTIVE" },
  { id: "usr_owner", clerkId: "clerk_owner", email: "owner@test.local", name: "Owner", role: "OWNER", status: "ACTIVE" },
  { id: "usr_owner_blocked", clerkId: "clerk_owner_blocked", email: "owner-blocked@test.local", name: "Blocked Owner", role: "OWNER", status: "BLOCKED" },
];

let events: LiveEventRecord[] = initialEvents.map((event) => ({ ...event }));
let users: UserRecord[] = initialUsers.map((user) => ({ ...user }));
let failCreate = false;

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
    create: async ({ data, select }: { data: Partial<UserRecord> & { clerkId: string; email: string }; select?: Record<string, boolean> }) => {
      const user: UserRecord = {
        id: data.id ?? `usr_${users.length + 1}`,
        clerkId: data.clerkId,
        email: data.email,
        name: data.name ?? null,
        role: (data.role as Role | undefined) ?? "USER",
        status: (data.status as UserStatus | undefined) ?? "ACTIVE",
      };
      users.push(user);
      if (!select) return user;
      return project(user, select);
    },
    update: async ({ where, data, select }: { where: { id: string }; data: Partial<UserRecord>; select?: Record<string, boolean> }) => {
      const idx = users.findIndex((item) => item.id === where.id);
      if (idx < 0) throw new Error("user not found");
      users[idx] = { ...users[idx], ...data };
      if (!select) return users[idx];
      return project(users[idx], select);
    },
  },
  liveEvent: {
    findMany: async (args?: { select?: Record<string, boolean> }) => {
      return events.map((event) => project(event, args?.select));
    },
    create: async ({ data }: { data: Omit<LiveEventRecord, "id"> & Partial<Pick<LiveEventRecord, "id">> }) => {
      if (failCreate) {
        throw new Error("event create failed");
      }

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
  failCreate = false;
}

export function __getEventsCount() {
  return events.length;
}

export function __setCreateFailure(enabled: boolean) {
  failCreate = enabled;
}
