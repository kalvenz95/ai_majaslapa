import { NextRequest } from "next/server";
import { __setUser } from "./clerk-stub";
import { __resetEvents } from "./events-access-prisma-stub";
import * as eventsRoute from "@/app/api/events/route";

let passed = 0;
let failed = 0;

function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    passed++;
    console.log(`  [PASS] ${name}`);
    return;
  }

  failed++;
  console.log(`  [FAIL] ${name}${detail ? ` - ${detail}` : ""}`);
}

async function json(res: Response) {
  return { status: res.status, body: await res.json().catch(() => null) };
}

function req(url: string, init?: { method?: string; body?: unknown }) {
  return new NextRequest(`http://localhost:3000${url}`, {
    method: init?.method ?? "GET",
    ...(init?.body !== undefined
      ? { body: JSON.stringify(init.body), headers: { "Content-Type": "application/json" } }
      : {}),
  } as RequestInit);
}

async function main() {
  console.log("\nEVENT API access-control tests");

  __resetEvents();

  __setUser(null);
  const anonGet = await json(await eventsRoute.GET());
  check("Anonymous GET /api/events -> 200", anonGet.status === 200, `received ${anonGet.status}`);
  check("Anonymous GET omits meetUrl", anonGet.body?.[0]?.meetUrl === undefined, JSON.stringify(anonGet.body?.[0]));
  check("Anonymous GET omits description", anonGet.body?.[0]?.description === undefined, JSON.stringify(anonGet.body?.[0]));

  __setUser("clerk_member");
  const activeGet = await json(await eventsRoute.GET());
  check("Active user GET /api/events -> 200", activeGet.status === 200, `received ${activeGet.status}`);
  check("Active user GET includes meetUrl", activeGet.body?.[0]?.meetUrl === "https://meet.example.com/private-room");
  check("Active user GET includes description", activeGet.body?.[0]?.description === "Ieksejas piezimes dalibniekiem");

  __setUser("clerk_blocked");
  const blockedGet = await json(await eventsRoute.GET());
  check("Blocked user GET /api/events -> 403", blockedGet.status === 403, `received ${blockedGet.status}`);

  __setUser("clerk_lookup_fail");
  const lookupFailGet = await json(await eventsRoute.GET());
  check("Lookup failure GET /api/events -> 403", lookupFailGet.status === 403, `received ${lookupFailGet.status}`);

  __setUser(null);
  const anonPost = await json(
    await eventsRoute.POST(
      req("/api/events", {
        method: "POST",
        body: {
          title: "Jauns pasakums",
          description: "Apraksts",
          startAt: "2026-10-20T10:00:00.000Z",
          endAt: "2026-10-20T11:00:00.000Z",
          meetUrl: "https://meet.example.com/new",
          type: "WEBINAR",
        },
      })
    )
  );
  check("Anonymous POST /api/events -> 401", anonPost.status === 401, `received ${anonPost.status}`);

  __setUser("clerk_blocked");
  const blockedPost = await json(
    await eventsRoute.POST(
      req("/api/events", {
        method: "POST",
        body: {
          title: "Blocked user event",
          description: "Should not be created",
          startAt: "2026-10-21T10:00:00.000Z",
          endAt: "2026-10-21T11:00:00.000Z",
          meetUrl: "https://meet.example.com/blocked",
          type: "WEBINAR",
        },
      })
    )
  );
  check("Blocked user POST /api/events -> 403", blockedPost.status === 403, `received ${blockedPost.status}`);

  __setUser("clerk_lookup_fail");
  const lookupFailPost = await json(
    await eventsRoute.POST(
      req("/api/events", {
        method: "POST",
        body: {
          title: "Lookup fail event",
          description: "Should not be created",
          startAt: "2026-10-22T10:00:00.000Z",
          endAt: "2026-10-22T11:00:00.000Z",
          meetUrl: "https://meet.example.com/lookup-fail",
          type: "WEBINAR",
        },
      })
    )
  );
  check("Lookup failure POST /api/events -> 403", lookupFailPost.status === 403, `received ${lookupFailPost.status}`);

  __setUser("clerk_member");
  const activePost = await json(
    await eventsRoute.POST(
      req("/api/events", {
        method: "POST",
        body: {
          title: "Jauns pasakums",
          description: "Apraksts",
          startAt: "2026-10-20T10:00:00.000Z",
          endAt: "2026-10-20T11:00:00.000Z",
          meetUrl: "https://meet.example.com/new",
          type: "WEBINAR",
        },
      })
    )
  );
  check("Active user POST /api/events -> 201", activePost.status === 201, `received ${activePost.status}`);
  check("Active user POST includes meetUrl", activePost.body?.meetUrl === "https://meet.example.com/new");

  console.log(`\nSummary: ${passed} passed, ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
