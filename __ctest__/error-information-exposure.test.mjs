import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const ROOT_ERROR_FILE = new URL("../src/app/error.tsx", import.meta.url);
const DASHBOARD_ERROR_FILE = new URL("../src/app/[locale]/dashboard/error.tsx", import.meta.url);
const ADMIN_HELPER_FILE = new URL("../src/lib/admin.ts", import.meta.url);
const COMMUNITY_HELPER_FILE = new URL("../src/lib/community.ts", import.meta.url);

const genericMessage = "Radās tehniska kļūda. Lūdzu, mēģini vēlreiz.";

async function verifyNoInternalLeak(fileUrl) {
  const source = await readFile(fileUrl, "utf8");

  assert.ok(
    source.includes("getUserFacingErrorMessageLv()"),
    `${fileUrl.pathname} must use a generic user-facing error message`
  );
  assert.ok(
    !source.includes("error.message"),
    `${fileUrl.pathname} must not render raw error.message`
  );
}

await verifyNoInternalLeak(ROOT_ERROR_FILE);
await verifyNoInternalLeak(DASHBOARD_ERROR_FILE);

const helperSource = await readFile(new URL("../src/lib/public-error.ts", import.meta.url), "utf8");
assert.ok(helperSource.includes(genericMessage), "Latvian generic message must remain available");

const adminSource = await readFile(ADMIN_HELPER_FILE, "utf8");
assert.ok(adminSource.includes("adminPublicMessageByStatus"), "admin helper must map public messages");
assert.ok(!adminSource.includes("{ message: err.message }"), "admin API must not expose err.message");

const communitySource = await readFile(COMMUNITY_HELPER_FILE, "utf8");
assert.ok(
  communitySource.includes("communityPublicMessageByStatus"),
  "community helper must map public messages"
);
assert.ok(
  !communitySource.includes("viewer.restrictedReason ||"),
  "community write denial must not leak DB-backed restriction reason"
);
assert.ok(!communitySource.includes("{ error: err.message }"), "community API must not expose err.message");

console.log("OK: error UI sanitization regression checks passed");
