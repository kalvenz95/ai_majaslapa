"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YellowGlowBackground } from "@/components/ui/background-components";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <YellowGlowBackground />
      </div>

      {/* Dot grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: "radial-gradient(rgba(168,85,247,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md" style={{ zIndex: 2 }}>
        <form
          action=""
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(13,13,26,0.85)",
            border: "1px solid rgba(168,85,247,0.2)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(168,85,247,0.08)",
          }}
        >
          <div className="p-8">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
              >
                C
              </div>
              <span className="font-bold text-white text-lg tracking-tight">Chademy</span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl font-black text-white leading-tight tracking-tight">
                Laipni lūgts atpakaļ
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Pierakstīties lai turpinātu kursu
              </p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 mb-8">
              <Button type="button" variant="outline" size="lg" className="w-full gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 256 262">
                  <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                  <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                  <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
                  <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                </svg>
                <span>Turpināt ar Google</span>
              </Button>

              <Button type="button" variant="outline" size="lg" className="w-full gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 256 256">
                  <path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
                  <path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z" />
                </svg>
                <span>Turpināt ar Facebook</span>
              </Button>

              <Button type="button" variant="outline" size="lg" className="w-full gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 256 256">
                  <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z" />
                  <path fill="#80cc28" d="M256 121.666H134.335V0H256z" />
                  <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z" />
                  <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z" />
                </svg>
                <span>Turpināt ar Microsoft</span>
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span className="text-xs text-white/30 font-medium">vai</span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Email */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-pasts</Label>
                <Input
                  type="email"
                  required
                  name="email"
                  id="email"
                  placeholder="tu@piemers.lv"
                />
              </div>

              <Button className="w-full" size="lg">
                Turpināt
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-8 py-5 text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-sm text-white/30">
              Nav konta?{" "}
              <Link
                href="#"
                className="text-[#a855f7] hover:text-[#c084fc] font-semibold transition-colors"
              >
                Reģistrēties
              </Link>
            </p>
          </div>
        </form>

        {/* Glow under card */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(168,85,247,0.2), transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      </div>
    </div>
  );
}
