import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { __setUser } from "./clerk-stub";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  test("DATABASE_URL nav iestatits admin notes DB testam", { skip: true }, () => {});
} else {
  process.env.DATABASE_URL = databaseUrl;
  process.env.DIRECT_URL = process.env.DIRECT_URL ?? databaseUrl;

  const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

  function request(url: string) {
    return new NextRequest(url, { method: "DELETE" });
  }

  function context(userId: string) {
    return { params: Promise.resolve({ id: userId }) };
  }

  async function resetData() {
    await prisma.adminNote.deleteMany();
    await prisma.user.deleteMany();
  }

  async function seedUser(params: {
    id: string;
    clerkId: string;
    email: string;
    role: Role;
    status?: UserStatus;
  }) {
    return prisma.user.create({
      data: {
        id: params.id,
        clerkId: params.clerkId,
        email: params.email,
        role: params.role,
        status: params.status ?? UserStatus.ACTIVE,
      },
    });
  }

  test("admin piezīmes dzēšana ir ierobežota ar mērķa userId", async () => {
    await resetData();

    await seedUser({ id: "admin_1", clerkId: "clerk_support", email: "support@example.test", role: Role.SUPPORT });
    await seedUser({ id: "user_a", clerkId: "clerk_user_a", email: "usera@example.test", role: Role.USER });
    await seedUser({ id: "user_b", clerkId: "clerk_user_b", email: "userb@example.test", role: Role.USER });

    await prisma.adminNote.createMany({
      data: [
        { id: "note_a1", userId: "user_a", adminId: "admin_1", note: "A note" },
        { id: "note_b1", userId: "user_b", adminId: "admin_1", note: "B note" },
      ],
    });

    __setUser("clerk_support");
    const route = await import("@/app/api/admin/users/[id]/notes/route");

    const mismatchResponse = await route.DELETE(
      request("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_b1"),
      context("user_a")
    );

    assert.equal(mismatchResponse.status, 404);
    const mismatchBody = await mismatchResponse.json();
    assert.deepEqual(mismatchBody, { message: "Nav atrasts" });

    const notesAfterMismatch = await prisma.adminNote.findMany({ orderBy: { id: "asc" } });
    assert.equal(notesAfterMismatch.length, 2);
    assert.deepEqual(notesAfterMismatch.map((note) => note.id), ["note_a1", "note_b1"]);

    const okResponse = await route.DELETE(
      request("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_a1"),
      context("user_a")
    );

    assert.equal(okResponse.status, 200);
    assert.deepEqual(await okResponse.json(), { ok: true });

    const remaining = await prisma.adminNote.findMany({ orderBy: { id: "asc" } });
    assert.deepEqual(remaining.map((note) => note.id), ["note_b1"]);
  });
}
