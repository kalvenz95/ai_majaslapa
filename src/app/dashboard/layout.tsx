import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StreakTracker } from "@/components/dashboard/StreakTracker";
import { upsertUser } from "@/lib/subscriptions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userId: string | null = null;
  let authError: string | null = null;

  try {
    const result = await auth();
    userId = result.userId;
  } catch (e) {
    authError = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  }

  if (authError) {
    return (
      <div style={{ background: "#050508", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔑</div>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 12 }}>Autentifikācijas kļūda</h2>
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: 16, textAlign: "left", marginBottom: 20 }}>
            <code style={{ color: "rgba(239,68,68,0.9)", fontSize: 12, wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{authError}</code>
          </div>
          <a href="/" style={{ color: "#a855f7", fontSize: 14 }}>← Atpakaļ uz sākumlapu</a>
        </div>
      </div>
    );
  }

  if (!userId) redirect("/login");

  try {
    const clerkUser = await currentUser();
    if (clerkUser) {
      await upsertUser({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || undefined,
        avatarUrl: clerkUser.imageUrl || undefined,
      }).catch(() => null);
    }
  } catch {
    // DB nav pieejama
  }

  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      <StreakTracker />
      <Sidebar />
      <main style={{ marginLeft: "var(--d-side-w, 220px)", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 28px" }}>{children}</div>
      </main>
    </div>
  );
}
