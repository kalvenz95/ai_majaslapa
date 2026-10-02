import { Role, UserStatus } from "@prisma/client";

type TestUser = {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: Role;
  status: UserStatus;
};

type TestNote = {
  id: string;
  userId: string;
  adminId: string;
  note: string;
};

const users: TestUser[] = [
  {
    id: "admin_support",
    clerkId: "clerk_support",
    email: "support@chademy.com",
    name: "Support",
    role: Role.SUPPORT,
    status: UserStatus.ACTIVE,
  },
  {
    id: "admin_blocked",
    clerkId: "clerk_blocked_admin",
    email: "blocked-admin@chademy.com",
    name: "Blocked admin",
    role: Role.ADMIN,
    status: UserStatus.BLOCKED,
  },
  {
    id: "plain_user",
    clerkId: "clerk_plain_user",
    email: "user@chademy.com",
    name: "Plain user",
    role: Role.USER,
    status: UserStatus.ACTIVE,
  },
];

const seedNotes: TestNote[] = [
  { id: "note_a1", userId: "user_a", adminId: "admin_support", note: "A note" },
  { id: "note_b1", userId: "user_b", adminId: "admin_support", note: "B note" },
];

let notes: TestNote[] = seedNotes.map((note) => ({ ...note }));
let failDelete = false;

function pick<T extends Record<string, unknown>>(row: T, select?: Record<string, boolean>) {
  if (!select) return row;
  return Object.fromEntries(Object.entries(row).filter(([key]) => select[key]));
}

export function __resetAdminNoteState() {
  notes = seedNotes.map((note) => ({ ...note }));
  failDelete = false;
}

export function __setAdminNoteDeleteFailure(value: boolean) {
  failDelete = value;
}

export function __getAdminNotes() {
  return notes.map((note) => ({ ...note }));
}

export const prisma = {
  user: {
    findUnique: async ({ where, select }: { where: { clerkId: string }; select?: Record<string, boolean> }) => {
      const user = users.find((item) => item.clerkId === where.clerkId) ?? null;
      if (!user) return null;
      return pick(user as unknown as Record<string, unknown>, select) as unknown;
    },
    create: async () => {
      throw new Error("Unexpected prisma.user.create call in admin-note test stub");
    },
    update: async () => {
      throw new Error("Unexpected prisma.user.update call in admin-note test stub");
    },
  },
  adminNote: {
    create: async ({ data }: { data: { userId: string; adminId: string; note: string } }) => {
      const created = {
        id: `note_${notes.length + 1}`,
        userId: data.userId,
        adminId: data.adminId,
        note: data.note,
      };
      notes.push(created);
      return created;
    },
    deleteMany: async ({ where }: { where: { id: string; userId: string } }) => {
      if (failDelete) {
        throw new Error("Simulated DB failure token=sk_live_secret /src/private");
      }

      const before = notes.length;
      notes = notes.filter((item) => !(item.id === where.id && item.userId === where.userId));
      const after = notes.length;
      return { count: before - after };
    },
  },
};
