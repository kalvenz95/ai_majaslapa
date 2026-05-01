import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { upsertUser } from "@/lib/subscriptions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  // Sinhrona lietotāja izveide DB pēc pirmās pieteikšanās
  const clerkUser = await currentUser();
  if (clerkUser) {
    await upsertUser({
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || undefined,
      avatarUrl: clerkUser.imageUrl || undefined,
    }).catch(() => null); // Klusina kļūdas DB nav iestatīta
  }

  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      <Sidebar />
      <main className="ml-60 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
