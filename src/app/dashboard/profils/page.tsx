import { auth, currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";

export default async function ProfilsPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Profils</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        Pārvaldi savu kontu, e-pastu un drošību
      </p>

      {/* Clerk User Profile — pilna konta pārvaldība */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <UserProfile
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
              },
              card: {
                background: "rgba(13,13,26,0.95)",
                border: "none",
                boxShadow: "none",
                borderRadius: "0",
                width: "100%",
              },
              navbar: {
                background: "rgba(5,8,15,0.8)",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              },
              navbarButton: {
                color: "rgba(255,255,255,0.6)",
              },
              navbarButtonIcon: {
                color: "rgba(255,255,255,0.4)",
              },
              pageScrollBox: {
                padding: "24px",
              },
              formButtonPrimary: {
                background: "#00ff88",
                color: "#000",
                fontWeight: "700",
              },
              headerTitle: {
                color: "#ffffff",
              },
              headerSubtitle: {
                color: "rgba(255,255,255,0.5)",
              },
              profileSectionTitle: {
                color: "rgba(255,255,255,0.7)",
              },
              formFieldLabel: {
                color: "rgba(255,255,255,0.6)",
              },
              formFieldInput: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
