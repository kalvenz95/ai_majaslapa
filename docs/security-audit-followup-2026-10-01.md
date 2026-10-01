# Chademy audit follow-up (2026-10-01)

## Scope
- Verified latest `origin/master` status and previously reported fixes.
- Revalidated migrations and integration tests on disposable databases.
- Rechecked `/api/events` policy impact and compatibility.
- Consolidated authorization findings into confirmed defects vs unresolved business rules.

## Repository and revision context
- `origin/master`: `859d3456ee2e600bef14bc6952f4094ab3bcb61f`
- Referenced event API commit: `4b5e6efc78234d8d1a3da9924f27723a63cce2d7`
- Result: exact hash is not in `origin/master`; behavior-equivalent area exists with later drift.
- Tested working branch: `audit/followup-security-20261001` (isolated worktree).

## Status of previously reported fixes

### Stripe webhook idempotency + duplicate affiliate credits
- **Status:** Confirmed present in `master`.
- **Evidence:**
  - `src/lib/stripe-webhook-payment.ts` duplicate/paid flow handling.
  - `src/lib/affiliate-credit.ts` uses `ON CONFLICT ("paymentId") DO NOTHING`.
  - `prisma/migrations/20260929120000_referral_payment_credit/migration.sql` creates ledger + idempotent backfill.

### Blocked-user access enforcement
- **Status:** Confirmed present on audited routes.
- **Evidence:**
  - Shared guard in `src/lib/user-access.ts`.
  - Enforcement verified by integration scenarios in `__ctest__/run.ts` for courses, progress, streak, user, user phone, user sync, affiliate.

### Event API access control
- **Status before follow-up:** partial and drifted from earlier report.
- **Final status after follow-up:**
  - `GET /api/events` keeps public browsing behavior (anonymous and blocked users receive redacted public fields).
  - Authenticated non-blocked users receive full fields (including description + meetUrl).
  - `POST /api/events` remains authenticated + blocked-user guarded.
  - Infrastructure/lookup failures in block-check paths return `500` with generic message.

### Sanitized public error responses
- **Status:** Confirmed improved.
- **Evidence:**
  - `src/app/[locale]/dashboard/layout.tsx` no longer renders raw auth exception details.
  - Uses generic safe message from `src/lib/public-error.ts`.

## `/api/events` policy + compatibility review
- Previous behavior on `master`: anonymous `GET /api/events` returned redacted records (no `description`, no `meetUrl`).
- During follow-up, strict-auth `401` GET behavior was introduced, then reverted to preserve existing public browsing behavior because no repository product requirement was found that mandates auth for event browsing.
- In-repo public consumers inspection:
  - No direct consumer of `/api/events` found under `src/` (dashboard calendar reads DB directly via server component).
  - Compatibility risk remains for **external/unknown consumers** that may call `/api/events`; preserving `200` anonymous redacted response avoids a breaking change.

## `__ctest__/run.ts` failure investigation

### Initial failure type 1 (environment/setup)
- **Observed:** `PrismaClientInitializationError` (`DATABASE_URL` missing).
- **Cause:** test runner requires explicit DB env vars; earlier execution lacked disposable DB setup.
- **Classification:** environment/setup failure (not application regression).

### Initial failure type 2 (test expectation mismatch)
- **Observed:** 2 assertions failed after DB was provided:
  1. `kļūdas teksts ir aizslēgtais paziņojums`
  2. `iemesls tiek parādīts`
- **Cause:** tests expected old detailed 403 messages, but current API intentionally returns sanitized generic 403 (`Nav piekļuves šai darbībai`) via shared public error mapping.
- **Classification:** test expectation drift, not runtime regression.
- **Action:** updated `__ctest__/run.ts` assertions to match current sanitized contract and explicitly assert no restricted reason leakage.

## Disposable DB migration + integration evidence

### Fresh database validation
- DB: disposable Postgres container (`postgres:16-alpine`), database `chademy_fresh`.
- Migrations: `prisma migrate deploy` applied both migrations successfully:
  - `20260929115900_baseline`
  - `20260929120000_referral_payment_credit`
- Integration suites:
  - `__ctest__/run.ts`: **62/62 passed**.
  - `__ctest__/stripe-webhook-db.integration.test.ts`: **4/4 passed**.

### Existing pre-fix database simulation validation
- DB: disposable Postgres database `chademy_prefix`.
- Setup: baseline SQL applied first, then referral-credit migration SQL applied (simulates upgrading pre-fix schema state).
- Integration suites:
  - `__ctest__/run.ts`: **62/62 passed**.
  - `__ctest__/stripe-webhook-db.integration.test.ts`: **4/4 passed**.

### Deployment/migration production evidence
- **Unverified in repository:** no audited staging/production deployment records, no production migration logs, no Stripe replay audit artifacts.
- Production deployment/migration status remains intentionally unverified.

## Consolidated authorization backlog

### Confirmed defects (code-level)
1. **Missing role gate on event creation**
   - Priority: **P0**
   - Route: `POST /api/events` (`src/app/api/events/route.ts`)
   - Impact: any authenticated non-blocked user can create official events.
   - Evidence: handler checks auth + blocked status, but not role/permission.
   - Acceptance criteria:
     - Only allowed roles (decision pending) can create events.
     - Unauthorized role receives `403`.
     - Regression tests cover allowed and denied role paths.

2. **No CI enforcement for security regression suites**
   - Priority: **P1**
   - Scope: `__ctest__` suites are manual-only in repo.
   - Impact: regressions can reappear without automated signal.
   - Evidence: no checked-in CI workflow for these tests.
   - Acceptance criteria:
     - CI runs key suites (`events-access`, `run.ts`, stripe idempotency integration) on PR.
     - Failing suite blocks merge.

### Confirmed hardening status (already addressed)
- Event GET public/private field separation preserved; no private fields for anonymous/blocked.
- Block-check infra failures now return generic `500` instead of `403`.
- Dashboard auth error details are sanitized.

### Unresolved business rules (not defects yet)
1. Should event browsing remain public-redacted or require authentication/member status?
2. Which roles may create events (`OWNER/ADMIN` only vs include `SUPPORT`)?
3. Where should immutable deployment evidence live (repo docs vs release system)?

## Test execution status ledger
- Failed (initial):
  - `__ctest__/run.ts` without DB env (`DATABASE_URL` missing) — setup issue.
  - `__ctest__/run.ts` with outdated assertions — expectation drift (2 failed checks).
- Re-run after fixes: all targeted suites passed.
- Skipped: none.
- Blocked: none.
