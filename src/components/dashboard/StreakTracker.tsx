"use client";
import { useEffect } from "react";

export function StreakTracker() {
  useEffect(() => {
    fetch("/api/streak", { method: "POST" }).catch(() => null);
  }, []);
  return null;
}
