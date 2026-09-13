"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Composer } from "./Composer";
import { PostCard } from "./PostCard";
import { NotificationBell } from "./NotificationBell";
import { Icon } from "./ui";
import type { CommunityCategoryDef, CommunityMe, CommunityPost } from "./types";

type Filter = { key: string; label: string; sort?: string; category?: string };

/** Filtri pēc uzdevuma: Jaunākie, Populārākie + 4 kategorijas. */
const FILTERS: Filter[] = [
  { key: "jaunakie", label: "Jaunākie", sort: "jaunakie" },
  { key: "popularakie", label: "Populārākie", sort: "popularakie" },
  { key: "uzvaras", label: "🏆 Uzvaras", category: "uzvaras" },
  { key: "jautajumi", label: "❓ Jautājumi", category: "jautajumi" },
  { key: "ai-idejas", label: "💡 AI idejas", category: "ai-idejas" },
  { key: "klienti-bizness", label: "💼 Klienti un bizness", category: "klienti-bizness" },
];

export function CommunityFeed({
  initialPosts,
  initialTotal,
  initialPages,
  categories,
  me,
  savedOnly = false,
}: {
  initialPosts: CommunityPost[];
  initialTotal: number;
  initialPages: number;
  categories: CommunityCategoryDef[];
  me: CommunityMe;
  /** Saglabāto ierakstu skats */
  savedOnly?: boolean;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState("jaunakie");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(initialPages);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [composing, setComposing] = useState(false);
  const [editing, setEditing] = useState<CommunityPost | null>(null);
  const first = useRef(true);

  const active = FILTERS.find((f) => f.key === filter) ?? FILTERS[0];

  const load = useCallback(
    async (nextPage: number, replace: boolean) => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        if (active.category) qs.set("category", active.category);
        if (active.sort) qs.set("sort", active.sort);
        if (savedOnly) qs.set("saved", "1");
        qs.set("page", String(nextPage));

        const res = await fetch(`/api/community/posts?${qs}`);
        if (!res.ok) return;
        const data = await res.json();
        setPosts((prev) => (replace ? data.posts : [...prev, ...data.posts]));
        setPages(data.pages);
        setTotal(data.total);
        setPage(nextPage);
      } finally {
        setLoading(false);
      }
    },
    [active, savedOnly]
  );

  // Pārlādē, mainot filtru (izlaiž pirmo renderi — dati jau ir no servera)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    load(1, true);
  }, [filter, load]);

  function patch(id: string, changes: Partial<CommunityPost>) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }

  async function like(id: string) {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    // Optimistiski, ar atgriešanu atpakaļ, ja serveris atsaka
    patch(id, { liked: !post.liked, likeCount: post.likeCount + (post.liked ? -1 : 1) });
    const res = await fetch(`/api/community/posts/${id}/like`, { method: "POST" });
    if (!res.ok) {
      patch(id, { liked: post.liked, likeCount: post.likeCount });
      return;
    }
    const data = await res.json();
    patch(id, { liked: data.liked, likeCount: data.count });
  }

  async function save(id: string) {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    patch(id, { saved: !post.saved });
    const res = await fetch(`/api/community/posts/${id}/save`, { method: "POST" });
    if (!res.ok) {
      patch(id, { saved: post.saved });
      return;
    }
    const data = await res.json();
    if (savedOnly && !data.saved) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      patch(id, { saved: data.saved });
    }
  }

  async function remove(id: string) {
    const snapshot = posts;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    const res = await fetch(`/api/community/posts/${id}`, { method: "DELETE" });
    if (!res.ok) setPosts(snapshot);
    else setTotal((t) => Math.max(0, t - 1));
  }

  async function pin(id: string, pinned: boolean) {
    const res = await fetch("/api/community/admin/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, pinned }),
    });
    if (res.ok) load(1, true);
  }

  async function restrict(authorId: string, authorName: string) {
    const reason = window.prompt(
      `Apturēt ${authorName} rakstīšanu kopienā? Iemesls (redzēs dalībnieks):`,
      "Neatbilstošs saturs kopienā."
    );
    if (reason === null) return;
    const res = await fetch("/api/community/admin/restrict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: authorId, restricted: true, reason }),
    });
    const data = await res.json().catch(() => ({}));
    window.alert(
      res.ok
        ? `${authorName} vairs nevar publicēt kopienā. Atjaunot var admin panelī.`
        : data.error || "Neizdevās ierobežot"
    );
  }

  return (
    <div className="c-scope">
      {/* Galvene */}
      <header className="c-header">
        <div style={{ minWidth: 0 }}>
          <h1 className="c-title c-title-page">
            {savedOnly ? "Saglabātie" : "Chademy Community"}
          </h1>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
            {savedOnly
              ? "Ieraksti, ko atzīmēji vēlākai lasīšanai"
              : `Privātā Chademy dalībnieku zona · ${total} ${total === 1 ? "ieraksts" : "ieraksti"}`}
          </p>
        </div>

        <div className="c-header-actions">
          <NotificationBell />
          <Link
            href={savedOnly ? "/dashboard/kopiena" : "/dashboard/kopiena/saglabatie"}
            className="c-action"
            aria-label={savedOnly ? "Visa plūsma" : "Saglabātie ieraksti"}
            style={{ padding: 9 }}
          >
            <Icon.Bookmark filled={savedOnly} />
          </Link>
          {!savedOnly && me.canPost && (
            <button
              type="button"
              className="c-btn c-btn-primary"
              onClick={() => {
                setEditing(null);
                setComposing((v) => !v);
              }}
              aria-expanded={composing}
            >
              <Icon.Plus />
              Jauns ieraksts
            </button>
          )}
        </div>
      </header>

      {/* Kompozers */}
      {editing && (
        <Composer
          me={me}
          categories={categories}
          editing={editing}
          onDone={(updated) => {
            patch(updated.id, updated);
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      {composing && !editing && !savedOnly && (
        <Composer
          me={me}
          categories={categories}
          onDone={(created) => {
            setPosts((prev) => [created, ...prev]);
            setTotal((t) => t + 1);
            setComposing(false);
          }}
          onCancel={() => setComposing(false)}
        />
      )}

      {/* Filtri */}
      {!savedOnly && (
        <div className="c-filters-row" style={{ marginBottom: "var(--c-gap-3)" }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="c-filter"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Plūsma */}
      {posts.length === 0 ? (
        <div
          className="c-card"
          style={{ padding: "44px 24px", textAlign: "center" }}
        >
          <div style={{ fontSize: 30, marginBottom: 10 }} aria-hidden>
            {savedOnly ? "🔖" : "💬"}
          </div>
          <div style={{ fontSize: 14, fontWeight: 650, color: "var(--ink)", marginBottom: 5 }}>
            {savedOnly ? "Nav saglabātu ierakstu" : "Šeit vēl nav ierakstu"}
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
            {savedOnly
              ? "Atzīmē ierakstu ar grāmatzīmi, lai atrastu to šeit."
              : me.canPost
                ? "Esi pirmais, kas padalās."
                : "Drīz šeit parādīsies pirmie ieraksti."}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "var(--c-gap-2)" }}>
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="c-rise"
              style={{ animationDelay: `${Math.min(i, 6) * 40}ms` }}
            >
              <PostCard
                post={post}
                me={me}
                categories={categories}
                onLike={like}
                onSave={save}
                onDelete={remove}
                onEdit={(p) => {
                  setComposing(false);
                  setEditing(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onPin={pin}
                onRestrict={restrict}
              />
            </div>
          ))}
        </div>
      )}

      {/* Vairāk */}
      {page < pages && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--c-gap-3)" }}>
          <button
            type="button"
            className="c-btn c-btn-ghost"
            onClick={() => load(page + 1, false)}
            disabled={loading}
          >
            {loading ? "Ielādē…" : "Rādīt vairāk"}
          </button>
        </div>
      )}
    </div>
  );
}
