import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { __setUser } from "./clerk-stub";
import { __getAdminNotes, __resetAdminNoteState, __setAdminNoteDeleteFailure } from "./admin-notes-prisma-stub";
import * as notesRoute from "@/app/api/admin/users/[id]/notes/route";

function req(url: string) {
  return new NextRequest(url, { method: "DELETE" });
}

function ctx(id: string) {
  return { params: Promise.resolve({ id }) };
}

async function json(res: Response) {
  return { status: res.status, body: await res.json().catch(() => null) };
}

async function main() {
  __resetAdminNoteState();

  __setUser("clerk_support");
  const ok = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_a1"),
      ctx("user_a")
    )
  );
  assert.equal(ok.status, 200);
  assert.deepEqual(ok.body, { ok: true });
  assert.equal(__getAdminNotes().some((note) => note.id === "note_a1"), false);

  __resetAdminNoteState();
  __setUser("clerk_support");
  const mismatch = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_b1"),
      ctx("user_a")
    )
  );
  assert.equal(mismatch.status, 404);
  assert.deepEqual(mismatch.body, { message: "Nav atrasts" });
  assert.equal(__getAdminNotes().length, 2);

  __setUser("clerk_support");
  const missingQuery = await json(
    await notesRoute.DELETE(req("http://localhost:3000/api/admin/users/user_a/notes"), ctx("user_a"))
  );
  assert.equal(missingQuery.status, 400);
  assert.deepEqual(missingQuery.body, { message: "Trūkst noteId" });

  __setUser("clerk_support");
  const blankQuery = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=   "),
      ctx("user_a")
    )
  );
  assert.equal(blankQuery.status, 400);
  assert.deepEqual(blankQuery.body, { message: "Trūkst noteId" });

  __setUser("clerk_support");
  const missingNote = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=not_existing"),
      ctx("user_a")
    )
  );
  assert.equal(missingNote.status, 404);
  assert.deepEqual(missingNote.body, { message: "Nav atrasts" });

  __setUser(null);
  const anonymous = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_a1"),
      ctx("user_a")
    )
  );
  assert.equal(anonymous.status, 401);
  assert.deepEqual(anonymous.body, { message: "Nepieciešama pieteikšanās" });

  __setUser("clerk_plain_user");
  const insufficient = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_a1"),
      ctx("user_a")
    )
  );
  assert.equal(insufficient.status, 403);
  assert.deepEqual(insufficient.body, { message: "Nav piekļuves šai darbībai" });

  __setUser("clerk_blocked_admin");
  const blocked = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_a1"),
      ctx("user_a")
    )
  );
  assert.equal(blocked.status, 403);
  assert.deepEqual(blocked.body, { message: "Nav piekļuves šai darbībai" });

  __resetAdminNoteState();
  __setAdminNoteDeleteFailure(true);
  __setUser("clerk_support");
  const dbFailure = await json(
    await notesRoute.DELETE(
      req("http://localhost:3000/api/admin/users/user_a/notes?noteId=note_a1"),
      ctx("user_a")
    )
  );
  assert.equal(dbFailure.status, 500);
  assert.deepEqual(dbFailure.body, { message: "Servera kļūda" });
  assert.equal(String(dbFailure.body?.message ?? "").includes("token=sk_live"), false);

  console.log("OK: admin user note delete scope/security checks passed");
}

main().catch((error) => {
  console.error("FAILED: admin user note delete scope/security checks", error);
  process.exit(1);
});
