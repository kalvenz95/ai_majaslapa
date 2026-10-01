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
  check("Anonymous GET /api/events -> 401", anonGet.status === 401, `received ${anonGet.status}`);
  check("Anonymous GET has no event payload", !Array.isArray(anonGet.body), JSON.stringify(anonGet.body));

  __setUser("clerk_member");
  const activeGet = await json(await eventsRoute.GET());
  check("Active user GET /api/events -> 200", activeGet.status === 200, `received ${activeGet.status}`);
  check("Active user GET includes meetUrl", activeGet.body?.[0]?.meetUrl === "https://meet.example.com/private-room");
  check("Active user GET includes description", activeGet.body?.[0]?.description === "Ieksejas piezimes dalibniekiem");

  __setUser("clerk_blocked");
  const blockedGet = await json(await eventsRoute.GET());
  check("Blocked user GET /api/events -> 403", blockedGet.status === 403, `received ${blockedGet.status}`);
  check("Blocked GET has no event payload", !Array.isArray(blockedGet.body), JSON.stringify(blockedGet.body));

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
  check("Anonymous POST does not return created event", anonPost.body?.meetUrl === undefined, JSON.stringify(anonPost.body));

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
  check("Blocked POST does not return created event", blockedPost.body?.meetUrl === undefined, JSON.stringify(blockedPost.body));

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
