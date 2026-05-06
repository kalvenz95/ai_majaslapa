"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-6">
      <div className="text-center max-w-lg w-full">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-3">Kaut kas nogāja greizi</h2>
        <div
          className="rounded-xl p-4 mb-4 text-left"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          <p className="text-sm font-mono break-all" style={{ color: "rgba(239,68,68,0.9)" }}>
            {error.message || "(nav ziņojuma)"}
          </p>
          {error.digest && (
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              digest: {error.digest}
            </p>
          )}
        </div>
        <button
          onClick={reset}
          className="btn-primary px-6 py-3 rounded-xl font-semibold"
        >
          Mēģināt vēlreiz
        </button>
      </div>
    </div>
  );
}
