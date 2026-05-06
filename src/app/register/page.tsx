import { SignUp } from "@clerk/nextjs";
import { YellowGlowBackground } from "@/components/ui/background-components";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <YellowGlowBackground />
      </div>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: "radial-gradient(rgba(168,85,247,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full max-w-md" style={{ zIndex: 2 }}>
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black text-white"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
            >
              C
            </div>
            <span className="font-black text-white text-xl tracking-tight">Chademy</span>
          </Link>
        </div>

        <SignUp
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: {
                background: "rgba(13,13,26,0.92)",
                border: "1px solid rgba(168,85,247,0.2)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                borderRadius: "16px",
                width: "100%",
              },
              headerTitle: { color: "#ffffff", fontSize: "22px", fontWeight: "900" },
              headerSubtitle: { color: "rgba(255,255,255,0.45)" },
              socialButtonsBlockButton: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                borderRadius: "10px",
              },
              socialButtonsBlockButtonText: { color: "#ffffff", fontWeight: "500" },
              dividerLine: { background: "rgba(255,255,255,0.07)" },
              dividerText: { color: "rgba(255,255,255,0.3)" },
              formFieldLabel: { color: "rgba(255,255,255,0.6)" },
              formFieldInput: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                borderRadius: "10px",
              },
              formButtonPrimary: {
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "#ffffff",
                fontWeight: "700",
                borderRadius: "10px",
                border: "none",
              },
              footerActionLink: { color: "#a855f7" },
            },
          }}
        />
      </div>
    </div>
  );
}
