"use client";

import { SignIn } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08080f] px-4 py-12">
      {/* Fons — radiālie neon spīdumi */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,255,136,0.10), transparent 70%), radial-gradient(50% 50% at 80% 100%, rgba(0,212,255,0.06), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(0,255,136,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/10 ring-1 ring-neon-green/30">
            <ShieldCheck className="h-6 w-6 text-neon-green" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Admin panelis</h1>
          <p className="mt-1.5 text-sm text-white/45">
            Pieslēdzies ar savu Chademy administratora kontu
          </p>
        </div>

        <SignIn
          routing="hash"
          fallbackRedirectUrl="/admin"
          signUpUrl="/admin/login"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: {
                background: "rgba(16,16,28,0.92)",
                border: "1px solid rgba(0,255,136,0.18)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,255,136,0.06)",
                borderRadius: "16px",
                width: "100%",
              },
              headerTitle: { color: "#ffffff", fontWeight: "800" },
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
                background: "#00ff88",
                color: "#08080f",
                fontWeight: "700",
                borderRadius: "10px",
                border: "none",
              },
              footerActionLink: { color: "#00ff88" },
              identityPreviewText: { color: "rgba(255,255,255,0.6)" },
              identityPreviewEditButton: { color: "#00ff88" },
            },
          }}
        />

        <p className="mt-6 text-center text-[12px] text-white/30">
          Tikai pilnvarotiem administratoriem. Visas darbības tiek reģistrētas.
        </p>
      </div>
    </div>
  );
}
