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
      <div className="text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-3">Kaut kas nogāja greizi</h2>
        <p className="text-gray-400 mb-6">Lūdzu mēģini vēlreiz.</p>
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
