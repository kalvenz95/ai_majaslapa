/**
 * Chademy Community — piekļuves scenāriju testi.
 *
 * Izsauc ĪSTOS API maršrutu apstrādātājus pret ĪSTU Postgres.
 * Vienīgais dublieris ir Clerk sesija (clerk-stub.ts), lai varētu
 * izspēlēt dažādus lietotājus. Piekļuves loģika, Prisma vaicājumi
 * un atbildes ir tādas pašas kā produkcijā.
 */
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { __setUser } from "./clerk-stub";

import * as postsRoute from "@/app/api/community/posts/route";
import * as postRoute from "@/app/api/community/posts/[id]/route";
import * as commentsRoute from "@/app/api/community/posts/[id]/comments/route";
import * as likeRoute from "@/app/api/community/posts/[id]/like/route";
import * as saveRoute from "@/app/api/community/posts/[id]/save/route";
import * as notifRoute from "@/app/api/community/notifications/route";
import * as pinRoute from "@/app/api/community/admin/pin/route";
import * as restrictRoute from "@/app/api/community/admin/restrict/route";
import * as coursesRoute from "@/app/api/courses/route";
import * as courseDetailRoute from "@/app/api/courses/[slug]/route";
import * as progressRoute from "@/app/api/progress/route";
import * as streakRoute from "@/app/api/streak/route";
import * as userRoute from "@/app/api/user/route";
import * as userPhoneRoute from "@/app/api/user/phone/route";
import * as userSyncRoute from "@/app/api/user/sync/route";
import * as affiliateMeRoute from "@/app/api/affiliate/me/route";
import { getCommunityAccess } from "@/lib/community";
import { DEFAULT_CATEGORIES } from "@/lib/community-categories";
import { prisma as appPrisma } from "@/lib/prisma";

const prisma = new PrismaClient();

// ── Testa ietvars ────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    passed++;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } else {
    failed++;
    failures.push(name);
    console.log(`  \x1b[31m✗\x1b[0m ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function req(url: string, init?: { method?: string; body?: any }) {
  return new NextRequest(`http://localhost:3000${url}`, {
    method: init?.method ?? "GET",
    ...(init?.body !== undefined
      ? { body: JSON.stringify(init.body), headers: { "Content-Type": "application/json" } }
      : {}),
  } as any);
}

const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

async function json(res: Response) {
  return { status: res.status, body: await res.json().catch(() => null) };
}

// ── Datu sagatavošana ────────────────────────────────────────
async function reset() {
  await prisma.communityNotification.deleteMany();
  await prisma.savedPost.deleteMany();
  await prisma.postMedia.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.postComment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();
  await prisma.communityCategory.deleteMany();

  for (const c of DEFAULT_CATEGORIES) {
    await prisma.communityCategory.create({
      data: {
        slug: c.slug,
        label: c.label,
        emoji: c.emoji,
        color: c.color,
        order: c.order,
        adminOnly: c.adminOnly,
      },
    });
  }
}

async function makeUser(opts: {
  clerkId: string;
  email: string;
  name: string;
  role?: "USER" | "ADMIN" | "OWNER";
  paid?: boolean;
  subscription?: boolean;
}) {
  const user = await prisma.user.create({
    data: {
      clerkId: opts.clerkId,
      email: opts.email,
      name: opts.name,
      role: (opts.role ?? "USER") as any,
    },
  });

  if (opts.paid) {
    await prisma.payment.create({
      data: {
        userId: user.id,
        amount: 2900,
        plan: "PAMATI",
        status: "PAID",
        paidAt: new Date(),
        providerPaymentId: `pi_${opts.clerkId}`,
      },
    });
  }

  if (opts.subscription) {
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: "PAMATI",
        status: "ACTIVE",
        stripeSubscriptionId: `sub_${opts.clerkId}`,
        stripePriceId: "price_test",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 864e5),
      },
    });
  }

  return user;
}

// ── Testi ────────────────────────────────────────────────────
async function main() {
  process.env.OWNER_EMAIL = "owner@chademy.com";
  await reset();

  const paid = await makeUser({
    clerkId: "clerk_paid",
    email: "maksatajs@test.lv",
    name: "Maksātājs Ozols",
    paid: true,
  });
  const free = await makeUser({
    clerkId: "clerk_free",
    email: "bezmaksas@test.lv",
    name: "Bez Maksas",
  });
  const paid2 = await makeUser({
    clerkId: "clerk_paid2",
    email: "otrs@test.lv",
    name: "Otrs Dalībnieks",
    paid: true,
  });
  const admin = await makeUser({
    clerkId: "clerk_admin",
    email: "admin@chademy.com",
    name: "Admins",
    role: "ADMIN",
  });
  const subOnly = await makeUser({
    clerkId: "clerk_sub",
    email: "abonents@test.lv",
    name: "Tikai Abonents",
    subscription: true,
  });

  // ── TEST 1 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 1 — nepieteicies apmeklētājs\x1b[0m");
  __setUser(null);
  {
    const r = await json(await postsRoute.GET(req("/api/community/posts")));
    check("GET /posts → 401", r.status === 401, `saņemts ${r.status}`);
    check("neatgriež nevienu ierakstu", !r.body?.posts, JSON.stringify(r.body).slice(0, 80));

    const access = await getCommunityAccess();
    check("lapa: piekļuve liegta (UNAUTHENTICATED)", !access.ok && access.reason === "UNAUTHENTICATED");
  }

  // ── TEST 2 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 2 — reģistrēts, bet nav pircis\x1b[0m");
  __setUser("clerk_free");
  {
    const r = await json(await postsRoute.GET(req("/api/community/posts")));
    check("GET /posts → 403", r.status === 403, `saņemts ${r.status}`);
    check(
      "kļūdas teksts ir aizslēgtais paziņojums",
      r.body?.error === "Chademy Community ir pieejama tikai aktīvajiem Chademy dalībniekiem.",
      String(r.body?.error)
    );

    const access = await getCommunityAccess();
    check("lapa: aizslēgts stāvoklis (NO_ACCESS)", !access.ok && access.reason === "NO_ACCESS");

    const c = await json(
      await postsRoute.POST(req("/api/community/posts", { method: "POST", body: { title: "Mēģinājums", body: "Teksts" } }))
    );
    check("POST /posts → 403 (nevar publicēt)", c.status === 403, `saņemts ${c.status}`);
  }

  // ── TEST 3 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 3 — apmaksāts dalībnieks\x1b[0m");
  __setUser("clerk_paid");
  {
    const r = await json(await postsRoute.GET(req("/api/community/posts")));
    check("GET /posts → 200", r.status === 200, `saņemts ${r.status}`);
    check("saņem kategorijas", Array.isArray(r.body?.categories) && r.body.categories.length === 8);

    const access = await getCommunityAccess();
    check("lapa: piekļuve atļauta", access.ok === true);
    check("skatītājam ir iegādātā paka", access.ok && access.viewer.plan === "PAMATI");
  }

  // ── TEST 5 (pirms 4, lai būtu ieraksts) ───────────────────
  console.log("\n\x1b[1mTEST 5 — apmaksāts dalībnieks izveido ierakstu\x1b[0m");
  let postId = "";
  {
    const r = await json(
      await postsRoute.POST(
        req("/api/community/posts", {
          method: "POST",
          body: {
            title: "Mans pirmais klients!",
            body: "Šodien parakstīju pirmo līgumu par mājaslapu ar AI.",
            category: "uzvaras",
            media: [{ type: "LINK", url: "https://chademy.com" }],
          },
        })
      )
    );
    check("POST /posts → 201", r.status === 201, `saņemts ${r.status} ${JSON.stringify(r.body).slice(0, 120)}`);
    check("kategorija saglabāta", r.body?.category === "uzvaras");
    check("pielikums saglabāts", r.body?.media?.length === 1);
    check("autora e-pasts NETIEK atklāts", r.body && !JSON.stringify(r.body).includes("maksatajs@test.lv"));
    postId = r.body?.id ?? "";

    const admOnly = await json(
      await postsRoute.POST(
        req("/api/community/posts", {
          method: "POST",
          body: { title: "Viltus paziņojums", body: "Teksts", category: "chademy-jaunumi" },
        })
      )
    );
    check("dalībnieks NEVAR publicēt 📢 Chademy jaunumos → 403", admOnly.status === 403, `saņemts ${admOnly.status}`);

    const like = await json(await likeRoute.POST(req(`/api/community/posts/${postId}/like`, { method: "POST" }), ctx(postId)));
    check("patīk strādā", like.status === 200 && like.body?.liked === true);

    const save = await json(await saveRoute.POST(req(`/api/community/posts/${postId}/save`, { method: "POST" }), ctx(postId)));
    check("saglabāšana strādā", save.status === 200 && save.body?.saved === true);
  }

  // ── TEST 4 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 4 — tiešs ieraksta URL bez apmaksas\x1b[0m");
  __setUser("clerk_free");
  {
    const r = await json(await postRoute.GET(req(`/api/community/posts/${postId}`), ctx(postId)));
    check("GET /posts/[id] → 403", r.status === 403, `saņemts ${r.status}`);
    check("ieraksta saturs NENOPLŪST", !r.body?.title && !r.body?.body, JSON.stringify(r.body).slice(0, 80));

    __setUser(null);
    const anon = await json(await postRoute.GET(req(`/api/community/posts/${postId}`), ctx(postId)));
    check("nepieteicies → 401", anon.status === 401, `saņemts ${anon.status}`);
    check("nepieteicies neredz saturu", !anon.body?.title);
  }

  // ── TEST 6 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 6 — svešs dalībnieks mēģina rediģēt\x1b[0m");
  __setUser("clerk_paid2");
  {
    const r = await json(
      await postRoute.PATCH(
        req(`/api/community/posts/${postId}`, { method: "PATCH", body: { title: "Nolaupīts virsraksts" } }),
        ctx(postId)
      )
    );
    check("PATCH sveša ieraksta → 403", r.status === 403, `saņemts ${r.status}`);

    const after = await prisma.post.findUnique({ where: { id: postId } });
    check("virsraksts DB nav mainījies", after?.title === "Mans pirmais klients!", String(after?.title));

    const del = await json(await postRoute.DELETE(req(`/api/community/posts/${postId}`, { method: "DELETE" }), ctx(postId)));
    check("DELETE sveša ieraksta → 403", del.status === 403, `saņemts ${del.status}`);
    check("ieraksts joprojām eksistē", (await prisma.post.count({ where: { id: postId } })) === 1);

    const pin = await json(
      await pinRoute.POST(req("/api/community/admin/pin", { method: "POST", body: { postId, pinned: true } }))
    );
    check("parasts dalībnieks nevar piespraust → 403", pin.status === 403, `saņemts ${pin.status}`);
  }

  // ── Paziņojumi ────────────────────────────────────────────
  console.log("\n\x1b[1mPAPILDU — paziņojumi\x1b[0m");
  {
    const c = await json(
      await commentsRoute.POST(
        req(`/api/community/posts/${postId}/comments`, { method: "POST", body: { body: "Apsveicu!" } }),
        ctx(postId)
      )
    );
    check("komentārs izveidots → 201", c.status === 201, `saņemts ${c.status}`);

    __setUser("clerk_paid");
    const n = await json(await notifRoute.GET());
    check("autors saņēma paziņojumu par komentāru", n.body?.unread === 1, `unread=${n.body?.unread}`);
    check("paziņojuma tips pareizs", n.body?.items?.[0]?.type === "POST_COMMENT");

    __setUser("clerk_paid2");
    const own = await json(await notifRoute.GET());
    check("komentētājs NEredz sveša lietotāja paziņojumus", own.body?.unread === 0, `unread=${own.body?.unread}`);
  }

  // ── Ierobežošana ──────────────────────────────────────────
  console.log("\n\x1b[1mPAPILDU — dalībnieka ierobežošana\x1b[0m");
  {
    __setUser("clerk_admin");
    const r = await json(
      await restrictRoute.POST(
        req("/api/community/admin/restrict", {
          method: "POST",
          body: { userId: paid2.id, restricted: true, reason: "Spams" },
        })
      )
    );
    check("admins ierobežo dalībnieku → 200", r.status === 200, `saņemts ${r.status}`);

    __setUser("clerk_paid2");
    const p = await json(
      await postsRoute.POST(req("/api/community/posts", { method: "POST", body: { title: "Vēl spams", body: "Teksts" } }))
    );
    check("ierobežotais NEVAR publicēt → 403", p.status === 403, `saņemts ${p.status}`);
    check("iemesls tiek parādīts", p.body?.error === "Spams", String(p.body?.error));

    const read = await json(await postsRoute.GET(req("/api/community/posts")));
    check("ierobežotais JOPROJĀM var lasīt → 200", read.status === 200, `saņemts ${read.status}`);

    __setUser("clerk_admin");
    await restrictRoute.POST(
      req("/api/community/admin/restrict", { method: "POST", body: { userId: paid2.id, restricted: false } })
    );
    __setUser("clerk_paid2");
    const again = await json(
      await postsRoute.POST(req("/api/community/posts", { method: "POST", body: { title: "Atkal varu", body: "Teksts" } }))
    );
    check("pēc atjaunošanas atkal var publicēt → 201", again.status === 201, `saņemts ${again.status}`);
    if (again.body?.id) await prisma.post.delete({ where: { id: again.body.id } });
  }

  // ── TEST 7 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 7 — admins dzēš ierakstu\x1b[0m");
  __setUser("clerk_admin");
  {
    const acc = await getCommunityAccess();
    check("admins piekļūst bez apmaksas", acc.ok === true && acc.viewer.isStaff === true);

    const pin = await json(
      await pinRoute.POST(req("/api/community/admin/pin", { method: "POST", body: { postId, pinned: true } }))
    );
    check("admins var piespraust → 200", pin.status === 200 && pin.body?.pinned === true);

    const ann = await json(
      await postsRoute.POST(
        req("/api/community/posts", {
          method: "POST",
          body: { title: "Jauns modulis pieejams", body: "Šodien atvērts 3. modulis.", category: "chademy-jaunumi" },
        })
      )
    );
    check("admins var publicēt paziņojumu → 201", ann.status === 201, `saņemts ${ann.status}`);
    check("paziņojums automātiski piesprausts", ann.body?.pinned === true);
    const annNotifs = await prisma.communityNotification.count({ where: { type: "ANNOUNCEMENT" } });
    check("paziņojums izsūtīts dalībniekiem", annNotifs === 2, `izsūtīts ${annNotifs} (gaidīti 2 apmaksātie)`);

    const del = await json(await postRoute.DELETE(req(`/api/community/posts/${postId}`, { method: "DELETE" }), ctx(postId)));
    check("admins dzēš sveša autora ierakstu → 200", del.status === 200, `saņemts ${del.status}`);
    check("ieraksts izdzēsts no DB", (await prisma.post.count({ where: { id: postId } })) === 0);
    check(
      "komentāri dzēsti līdzi (kaskāde)",
      (await prisma.postComment.count({ where: { postId } })) === 0
    );
  }

  // ── TEST 8 ────────────────────────────────────────────────
  console.log("\n\x1b[1mTEST 8 — apmaksa noņemta / atmaksāta\x1b[0m");
  {
    __setUser("clerk_paid");
    const before = await getCommunityAccess();
    check("pirms: piekļuve ir", before.ok === true);

    // Maksājums atmaksāts — vairs nav PAID
    await prisma.payment.updateMany({ where: { userId: paid.id }, data: { status: "REFUNDED" } });

    const after = await getCommunityAccess();
    check("pēc atmaksas: piekļuve liegta", !after.ok && after.reason === "NO_ACCESS");

    const r = await json(await postsRoute.GET(req("/api/community/posts")));
    check("GET /posts → 403", r.status === 403, `saņemts ${r.status}`);

    // Konts bloķēts administrācijā
    await prisma.payment.updateMany({ where: { userId: paid.id }, data: { status: "PAID" } });
    await prisma.user.update({ where: { id: paid.id }, data: { status: "BLOCKED" } });
    const blocked = await getCommunityAccess();
    check("bloķēts konts: piekļuve liegta arī ar apmaksu", !blocked.ok && blocked.reason === "BLOCKED");

    const blockedCourseSlug = `blocked-access-${Date.now()}`;
    const blockedCourse = await prisma.course.create({
      data: {
        title: "Blocked Access Test",
        slug: blockedCourseSlug,
        description: "test",
        planRequired: "PAMATI",
        order: 999,
        color: "#a855f7",
        icon: "🎯",
        published: true,
      },
    });
    const blockedLesson = await prisma.lesson.create({
      data: {
        courseId: blockedCourse.id,
        title: "Ievadlekcija",
        order: 1,
        isFree: true,
        videoUrl: "https://example.com/video.mp4",
      },
    });

    const coursesList = await json(await coursesRoute.GET());
    check("bloķēts konts: GET /api/courses → 403", coursesList.status === 403, `saņemts ${coursesList.status}`);

    const courseOne = await json(
      await courseDetailRoute.GET(
        req(`/api/courses/${blockedCourseSlug}`),
        { params: Promise.resolve({ slug: blockedCourseSlug }) }
      )
    );
    check("bloķēts konts: GET /api/courses/[slug] → 403", courseOne.status === 403, `saņemts ${courseOne.status}`);

    const progressPost = await json(
      await progressRoute.POST(
        req("/api/progress", {
          method: "POST",
          body: { lessonId: blockedLesson.id, completed: true, watchedSeconds: 120 },
        })
      )
    );
    check("bloķēts konts: POST /api/progress → 403", progressPost.status === 403, `saņemts ${progressPost.status}`);

    const progressGet = await json(await progressRoute.GET(req("/api/progress")));
    check("bloķēts konts: GET /api/progress → 403", progressGet.status === 403, `saņemts ${progressGet.status}`);

    const streakGet = await json(await streakRoute.GET());
    check("bloķēts konts: GET /api/streak → 403", streakGet.status === 403, `saņemts ${streakGet.status}`);

    const streakPost = await json(await streakRoute.POST());
    check("bloķēts konts: POST /api/streak → 403", streakPost.status === 403, `saņemts ${streakPost.status}`);

    const userGet = await json(await userRoute.GET());
    check("bloķēts konts: GET /api/user → 403", userGet.status === 403, `saņemts ${userGet.status}`);

    const phonePost = await json(
      await userPhoneRoute.POST(
        req("/api/user/phone", { method: "POST", body: { phone: "+37120000000" } })
      )
    );
    check("bloķēts konts: POST /api/user/phone → 403", phonePost.status === 403, `saņemts ${phonePost.status}`);

    const syncPost = await json(await userSyncRoute.POST());
    check("bloķēts konts: POST /api/user/sync → 403", syncPost.status === 403, `saņemts ${syncPost.status}`);

    const affiliateGet = await json(await affiliateMeRoute.GET());
    check("bloķēts konts: GET /api/affiliate/me → 403", affiliateGet.status === 403, `saņemts ${affiliateGet.status}`);

    await prisma.user.update({ where: { id: paid.id }, data: { status: "ACTIVE" } });

    const unblockedUser = await json(await userRoute.GET());
    check("atbloķēts konts: GET /api/user atkal strādā", unblockedUser.status === 200, `saņemts ${unblockedUser.status}`);

    const unblockedProgress = await json(
      await progressRoute.POST(
        req("/api/progress", {
          method: "POST",
          body: { lessonId: blockedLesson.id, completed: true, watchedSeconds: 180 },
        })
      )
    );
    check("atbloķēts konts: POST /api/progress atkal strādā", unblockedProgress.status === 200, `saņemts ${unblockedProgress.status}`);

    const originalFindUnique = appPrisma.user.findUnique;
    (appPrisma.user.findUnique as any) = async () => {
      throw new Error("Simulated DB lookup failure");
    };
    try {
      const failClosedUser = await json(await userRoute.GET());
      check(
        "DB lookup kļūda: blocked-check nevar apiet (fail-closed)",
        failClosedUser.status !== 200,
        `saņemts ${failClosedUser.status}`
      );
    } finally {
      (appPrisma.user.findUnique as any) = originalFindUnique;
    }
  }

  // ── Lēmums: abonements NEDOD piekļuvi ─────────────────────
  console.log("\n\x1b[1mPAPILDU — abonements bez PAID maksājuma\x1b[0m");
  {
    __setUser("clerk_sub");
    const acc = await getCommunityAccess();
    check(
      "aktīvs abonements bez PAID maksājuma → NAV piekļuves (Kalvja lēmums)",
      !acc.ok && acc.reason === "NO_ACCESS",
      acc.ok ? "piekļuve tika dota" : ""
    );
  }

  // ── Kopsavilkums ──────────────────────────────────────────
  console.log(`\n${"─".repeat(56)}`);
  console.log(
    failed === 0
      ? `\x1b[32m\x1b[1mVISI ${passed} TESTI IZTURĒTI\x1b[0m`
      : `\x1b[31m\x1b[1m${failed} NEIZTURĒTI\x1b[0m (${passed} izturēti)\n${failures.map((f) => "  · " + f).join("\n")}`
  );

  await prisma.$disconnect();
  process.exit(failed === 0 ? 0 : 1);
}

main().catch(async (e) => {
  console.error("\x1b[31mTestu kļūda:\x1b[0m", e);
  await prisma.$disconnect();
  process.exit(1);
});
