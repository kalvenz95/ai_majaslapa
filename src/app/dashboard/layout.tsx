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

  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch {
    redirect("/login");
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
    // DB nav pieejama — turpina bez lietotāja datu saglabāšanas
  }

  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      <StreakTracker />
      <Sidebar />
      <main className="ml-60 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
