# Chademy audit follow-up (2026-10-01)

## Scope
- Verified latest origin/master state and previous fixes:
  - Stripe webhook idempotency and duplicate affiliate credit prevention.
  - Blocked-user access enforcement.
  - Event API access control.
  - Public error response sanitization.
- Implemented missing integration where regressions were confirmed.
- Collected migration/test evidence and reviewed remaining API authz gaps.

## Repository status checked
- origin/master: 859d3456ee2e600bef14bc6952f4094ab3bcb61f
- Referenced event API commit: 4b5e6efc78234d8d1a3da9924f27723a63cce2d7
- Result: exact hash is not in origin/master; equivalent area exists but with drift in GET behavior.

## Confirmed status of previous fixes

### 1) Stripe webhook idempotency + duplicate affiliate credits
- Status: Present in master.
- Evidence:
  - Idempotent payment/duplicate path handling in src/lib/stripe-webhook-payment.ts.
  - Conflict-safe affiliate credit insert in src/lib/affiliate-credit.ts.
  - Migration/backfill safeguards in prisma/migrations/20260929120000_referral_payment_credit/migration.sql.

### 2) Blocked-user access enforcement
- Status: Present on key protected surfaces.
- Evidence:
  - Shared blocker in src/lib/user-access.ts.
  - Used across dashboard and multiple API routes.

### 3) Event API access control
- Status before follow-up: Partial (GET allowed anonymous and blocked users with redacted payload).
- Status after follow-up: Fixed to strict auth and blocked-user enforcement for GET and POST.

### 4) Sanitized public error responses
- Status before follow-up: Partial (dashboard auth error leaked raw exception text).
- Status after follow-up: Fixed to generic user-facing message while keeping server logs.

## Changes implemented in this follow-up
- src/app/api/events/route.ts
  - GET now returns:
    - 401 for unauthenticated,
    - 403 for blocked users,
    - 200 only for authenticated non-blocked users.
  - POST now consistently uses shared blocked-user guard (assertNotBlocked) with defensive logging.
- src/app/[locale]/dashboard/layout.tsx
  - Replaced raw auth exception rendering with generic public-safe message from src/lib/public-error.ts.
  - Added server-side logging for diagnostics.
- __ctest__/events-access.run.ts
  - Updated expectations to match hardened access policy (GET anonymous=401, blocked=403).

## Migration and deployment evidence
- Local disposable DB migration/test validation was reported successful by QA review:
  - prisma migrate deploy plus prisma migrate status on disposable Postgres.
  - Stripe webhook tests passed (__ctest__/stripe-webhook-*.test.ts).
- Missing evidence in repository:
  - No checked-in CI workflow artifacts for this fix area.
  - No staging/production deployment logs or Stripe replay records in repo.

## Prioritized remaining backlog

### P0 (do next)
1. Add explicit role or permission control for POST /api/events (currently authenticated + non-blocked, but no staff or admin gate).
2. Add route-level regression tests for event permissions (non-admin denied create, staff or admin allowed).

### P1
1. Expand authz audit tests for high-value endpoints (courses, progress, streak, Stripe routes) to assert blocked-user denial consistently.
2. Add CI workflow coverage for __ctest__ security regressions to preserve guarantees over time.

### P2
1. Add an operations runbook artifact template for migration and deploy evidence (migration output, deployment ID, webhook replay proof).

## Open decisions
1. Should event viewing be authenticated user only (current behavior) or community-paid members only?
2. Should event creation be limited to OWNER and ADMIN only, or include SUPPORT?
3. Where to store immutable deployment evidence for audit traceability (repo docs vs release system)?
