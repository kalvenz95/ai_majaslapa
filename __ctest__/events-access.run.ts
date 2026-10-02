import { NextRequest } from "next/server";
import { __setUser } from "./clerk-stub";
import { __getEventsCount, __resetEvents, __setCreateFailure } from "./events-access-prisma-stub";
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

function eventPayload(title: string) {
  return {
    title,
    description: "Apraksts",
    startAt: "2026-10-20T10:00:00.000Z",
    endAt: "2026-10-20T11:00:00.000Z",
    meetUrl: "https://meet.example.com/new",
    type: "WEBINAR",
  };
}

async function main() {
  console.log("\nEVENT API access-control tests");

  __resetEvents();

  __setUser(null);
  const anonGet = await json(await eventsRoute.GET());
  check("Anonymous GET /api/events -> 200", anonGet.status === 200, `received ${anonGet.status}`);
  check("Anonymous GET omits meetUrl", anonGet.body?.[0]?.meetUrl === undefined, JSON.stringify(anonGet.body?.[0]));
  check("Anonymous GET omits description", anonGet.body?.[0]?.description === undefined, JSON.stringify(anonGet.body?.[0]));

  __setUser("clerk_user");
  const activeGet = await json(await eventsRoute.GET());
  check("Active user GET /api/events -> 200", activeGet.status === 200, `received ${activeGet.status}`);
  check("Active user GET includes meetUrl", activeGet.body?.[0]?.meetUrl === "https://meet.example.com/private-room");
  check("Active user GET includes description", activeGet.body?.[0]?.description === "Ieksejas piezimes dalibniekiem");

  __setUser("clerk_owner_blocked");
  const blockedGet = await json(await eventsRoute.GET());
  check("Blocked user GET /api/events -> 403", blockedGet.status === 403, `received ${blockedGet.status}`);

  __setUser("clerk_lookup_fail");
  const lookupFailGet = await json(await eventsRoute.GET());
  check("Lookup failure GET /api/events -> 403", lookupFailGet.status === 403, `received ${lookupFailGet.status}`);

  __setUser(null);
  const countBeforeAnonPost = __getEventsCount();
  const anonPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Anon") })));
  check("Anonymous POST /api/events -> 401", anonPost.status === 401, `received ${anonPost.status}`);
  check("Anonymous POST does not create event", __getEventsCount() === countBeforeAnonPost);

  __setUser("clerk_user");
  const countBeforeUserPost = __getEventsCount();
  const userPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("User") })));
  check("Regular USER POST /api/events -> 403", userPost.status === 403, `received ${userPost.status}`);
  check("Regular USER POST does not create event", __getEventsCount() === countBeforeUserPost);

  __setUser("clerk_support");
  const countBeforeSupportPost = __getEventsCount();
  const supportPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Support") })));
  check("SUPPORT POST /api/events -> 403", supportPost.status === 403, `received ${supportPost.status}`);
  check("SUPPORT POST does not create event", __getEventsCount() === countBeforeSupportPost);

  __setUser("clerk_owner_blocked");
  const countBeforeBlockedOwnerPost = __getEventsCount();
  const blockedOwnerPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Blocked owner") })));
  check("Blocked OWNER POST /api/events -> 403", blockedOwnerPost.status === 403, `received ${blockedOwnerPost.status}`);
  check("Blocked OWNER POST does not create event", __getEventsCount() === countBeforeBlockedOwnerPost);

  __setUser("clerk_lookup_fail");
  const countBeforeLookupFailPost = __getEventsCount();
  const lookupFailPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Lookup fail") })));
  check("Authorization lookup failure POST /api/events -> 500", lookupFailPost.status === 500, `received ${lookupFailPost.status}`);
  const lookupBodyRaw = JSON.stringify(lookupFailPost.body ?? {});
  check("Lookup failure POST is sanitized", !lookupBodyRaw.toLowerCase().includes("lookup failed"), lookupBodyRaw);
  check("Lookup failure POST does not create event", __getEventsCount() === countBeforeLookupFailPost);

  __setUser("clerk_admin");
  const countBeforeAdminPost = __getEventsCount();
  const adminPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Admin event") })));
  check("ADMIN POST /api/events -> 201", adminPost.status === 201, `received ${adminPost.status}`);
  check("ADMIN POST creates exactly one event", __getEventsCount() === countBeforeAdminPost + 1);
  check("ADMIN POST stores intended title", adminPost.body?.title === "Admin event", JSON.stringify(adminPost.body));
  check("ADMIN POST stores intended meetUrl", adminPost.body?.meetUrl === "https://meet.example.com/new", JSON.stringify(adminPost.body));

  __setUser("clerk_owner");
  const countBeforeOwnerPost = __getEventsCount();
  const ownerPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Owner event") })));
  check("OWNER POST /api/events -> 201", ownerPost.status === 201, `received ${ownerPost.status}`);
  check("OWNER POST creates exactly one event", __getEventsCount() === countBeforeOwnerPost + 1);
  check("OWNER POST stores intended title", ownerPost.body?.title === "Owner event", JSON.stringify(ownerPost.body));

  __setCreateFailure(true);
  __setUser("clerk_admin");
  const countBeforeInfraFailPost = __getEventsCount();
  const infraFailPost = await json(await eventsRoute.POST(req("/api/events", { method: "POST", body: eventPayload("Infra fail") })));
  check("Infrastructure failure POST /api/events -> 500", infraFailPost.status === 500, `received ${infraFailPost.status}`);
  const infraBodyRaw = JSON.stringify(infraFailPost.body ?? {});
  check("Infrastructure failure POST is sanitized", !infraBodyRaw.toLowerCase().includes("event create failed"), infraBodyRaw);
  check("Infrastructure failure POST does not create event", __getEventsCount() === countBeforeInfraFailPost);

  console.log(`\nSummary: ${passed} passed, ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
