"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#05080F" }}>
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">⚠️</div>
        <h2 className="text-2xl font-black text-white mb-3">Kaut kas nogāja greizi</h2>
        <div
          className="rounded-xl p-4 mb-6 text-left"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <p className="text-xs font-mono break-all" style={{ color: "rgba(239,68,68,0.8)" }}>
            {error.message || "Nezināma kļūda"}
          </p>
          {error.digest && (
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              Kļūdas ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: "#a855f7", color: "#fff" }}
          >
            Mēģināt vēlreiz
          </button>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
          >
            Atpakaļ uz login
          </Link>
        </div>
      </div>
    </div>
  );
}
