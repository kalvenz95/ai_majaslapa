"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Avatar, Icon, timeAgo } from "./ui";

type Notification = {
  id: string;
  type: "POST_COMMENT" | "COMMENT_REPLY" | "ANNOUNCEMENT";
  read: boolean;
  createdAt: string;
  postId: string | null;
  postTitle: string | null;
  actorName: string | null;
  actorAvatar: string | null;
};

function describe(n: Notification) {
  const who = n.actorName ?? "Kāds";
  switch (n.type) {
    case "POST_COMMENT":
      return `${who} komentēja tavu ierakstu`;
    case "COMMENT_REPLY":
      return `${who} atbildēja uz tavu komentāru`;
    case "ANNOUNCEMENT":
      return "Jauns Chademy paziņojums";
  }
}

/** Kopienas paziņojumu zvaniņš. */
export function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/community/notifications");
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.items ?? []);
      setUnread(data.unread ?? 0);
    } catch {
      // klusi — zvaniņš nav kritisks
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    load();
    // Atsvaidzina reizi minūtē, kamēr cilne ir redzama
    const t = setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, 60_000);
    return () => clearInterval(t);
  }, [load]);

  async function markAll() {
    setUnread(0);
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await fetch("/api/community/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).catch(() => null);
  }

  async function openItem(n: Notification) {
    setOpen(false);
    if (!n.read) {
      setUnread((u) => Math.max(0, u - 1));
      setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      await fetch("/api/community/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: n.id }),
      }).catch(() => null);
    }
    if (n.postId) router.push(`/dashboard/kopiena/${n.postId}`);
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className={`c-action${unread > 0 ? " c-action--on" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={unread > 0 ? `Paziņojumi (${unread} jauni)` : "Paziņojumi"}
        aria-expanded={open}
        style={{ padding: 9, position: "relative" }}
      >
        <Icon.Bell />
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              borderRadius: 999,
              background: "var(--accent)",
              color: "var(--accent-ink)",
              fontSize: 10,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 30 }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="c-card c-rise"
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              zIndex: 31,
              width: "min(340px, calc(100vw - 32px))",
              maxHeight: 400,
              overflowY: "auto",
              padding: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px 10px",
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>
                Paziņojumi
              </span>
              {unread > 0 && (
                <button
                  type="button"
                  className="c-action"
                  style={{ fontSize: 11.5, padding: "4px 7px" }}
                  onClick={markAll}
                >
                  Atzīmēt visus
                </button>
              )}
            </div>

            {!loaded && (
              <div style={{ padding: "12px 8px", fontSize: 12.5, color: "var(--ink-3)" }}>
                Ielādē…
              </div>
            )}

            {loaded && items.length === 0 && (
              <div style={{ padding: "12px 8px", fontSize: 12.5, color: "var(--ink-3)" }}>
                Pagaidām nav paziņojumu.
              </div>
            )}

            {items.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => openItem(n)}
                className="c-action"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "9px 8px",
                  textAlign: "left",
                  background: n.read ? "transparent" : "color-mix(in oklab, var(--accent) 8%, transparent)",
                }}
              >
                <Avatar name={n.actorName} avatarUrl={n.actorAvatar} size={28} />
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: n.read ? 500 : 700,
                      color: "var(--ink)",
                      lineHeight: 1.45,
                    }}
                  >
                    {describe(n)}
                  </span>
                  {n.postTitle && (
                    <span
                      style={{
                        display: "block",
                        fontSize: 11.5,
                        color: "var(--ink-3)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {n.postTitle}
                    </span>
                  )}
                  <span style={{ display: "block", fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>
                    {timeAgo(n.createdAt)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
