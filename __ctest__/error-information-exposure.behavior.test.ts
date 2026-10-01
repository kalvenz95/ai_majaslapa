import assert from "node:assert/strict";
import { __setUser } from "@clerk/nextjs/server";
import { AdminError, adminApiError } from "@/lib/admin";
import { CommunityError, communityApiError } from "@/lib/community";
import { POST as uploadPost } from "@/app/api/community/upload/route";

function doesNotLeak(text: string, forbidden: string[]) {
  for (const marker of forbidden) {
    assert.equal(
      text.includes(marker),
      false,
      `User-facing response leaks sensitive marker: ${marker}`
    );
  }
}

async function testAdminHelper() {
  const sensitive = "Prisma P2002 at /src/lib/admin.ts token=sk_live_123";
  const response = adminApiError(new AdminError(sensitive, 403));
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body?.message, "Nav piekļuves šai darbībai");
  doesNotLeak(String(body?.message ?? ""), ["Prisma", "P2002", "/src/", "sk_live_"]);
}

async function testCommunityHelper() {
  const restrictedReasonLeak = "restrictedReason: maksājuma strīds, DB row=42";
  const response = communityApiError(new CommunityError(restrictedReasonLeak, 403));
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body?.error, "Nav piekļuves šai darbībai");
  doesNotLeak(String(body?.error ?? ""), ["restrictedReason", "DB row=", "maksājuma strīds"]);
}

async function testUploadRoutePublicOutput() {
  __setUser(null);

  const response = await uploadPost(
    {
      json: async () => ({ clientPayload: "image" }),
    } as any
  );

  const body = await response.json();
  assert.equal(response.status, 401);
  assert.equal(body?.error, "Nepieciešama pieteikšanās");
  doesNotLeak(String(body?.error ?? ""), ["Prisma", "/src/", "restrictedReason", "token="]);
}

async function main() {
  await testAdminHelper();
  await testCommunityHelper();
  await testUploadRoutePublicOutput();
  console.log("OK: behavioral public error output checks passed");
}

main().catch((error) => {
  console.error("FAILED: behavioral error information exposure test", error);
  process.exit(1);
});
