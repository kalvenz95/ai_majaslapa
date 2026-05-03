"use client";
import { useState, useTransition } from "react";
import Link from "next/link";

type Author = { id: string; name: string | null; avatarUrl: string | null };
type Post = {
  id: string;
  title: string;
  body: string;
  category: string;
  pinned: boolean;
  createdAt: Date | string;
  author: Author;
  _count: { likes: number; comments: number };
  liked: boolean;
};

function Avatar({ name, avatarUrl, size = 36 }: { name: string; avatarUrl?: string | null; size?: number }) {
  if (avatarUrl) return <img src={avatarUrl} alt={name} width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="rounded-full flex items-center justify-center font-black text-white shrink-0" style={{ width: size, height: size, fontSize: size * 0.38, background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
      {initials}
    </div>
  );
}

function timeAgo(date: Date | string) {
  const d = new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "tikko";
  if (diff < 3600) return `pirms ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `pirms ${Math.floor(diff / 3600)} st`;
  if (diff < 604800) return `pirms ${Math.floor(diff / 86400)} d`;
  return d.toLocaleDateString("lv-LV", { day: "numeric", month: "short" });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Vispārīgi": "#00d4ff",
  "Jautājumi": "#a855f7",
  "Dalies ar progresu": "#00ff88",
  "Padomi": "#f59e0b",
  "Inspirācija": "#ec4899",
};

export default function CommunityClient({
  initialPosts,
  categories,
  currentUser,
}: {
  initialPosts: Post[];
  categories: string[];
  currentUser: { id: string; name: string; avatarUrl?: string | null } | null;
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState("Visi");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState("Vispārīgi");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const filtered = activeCategory === "Visi" ? posts : posts.filter((p) => p.category === activeCategory);

  async function handleLike(postId: string) {
    if (!currentUser) return;
    const res = await fetch(`/api/community/posts/${postId}/like`, { method: "POST" });
    if (!res.ok) return;
    const { liked, count } = await res.json();
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked, _count: { ...p._count, likes: count } } : p
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!newTitle.trim() || !newBody.trim()) { setError("Aizpildi virsrakstu un tekstu"); return; }

    startTransition(async () => {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: newBody, category: newCategory }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error ?? "Kļūda"); return; }
      const post = await res.json();
      setPosts((prev) => [post, ...prev]);
      setNewTitle(""); setNewBody(""); setShowNewPost(false);
    });
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Kopiena</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Dalies pieredzē, uzdod jautājumus, inspirē citus</p>
        </div>
        {currentUser && (
          <button
            onClick={() => setShowNewPost((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150"
            style={{ background: showNewPost ? "rgba(0,255,136,0.15)" : "#00ff88", color: showNewPost ? "#00ff88" : "#000", border: showNewPost ? "1px solid rgba(0,255,136,0.4)" : "none" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Jauns ieraksts
          </button>
        )}
      </div>

      {/* New post form */}
      {showNewPost && currentUser && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-5 mb-5"
          style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={currentUser.name} avatarUrl={currentUser.avatarUrl} size={36} />
            <span className="text-sm font-bold text-white">{currentUser.name}</span>
          </div>

          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Ieraksta virsraksts..."
            maxLength={120}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-bold text-white mb-3 outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          />

          <textarea
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Ko vēlies padalīties?"
            rows={4}
            maxLength={2000}
            className="w-full rounded-xl px-4 py-2.5 text-sm text-white mb-3 outline-none resize-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          />

          <div className="flex items-center justify-between">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="rounded-xl px-3 py-2 text-xs font-bold outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            >
              {categories.filter((c) => c !== "Visi").map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="flex items-center gap-2">
              {error && <span className="text-xs" style={{ color: "#f87171" }}>{error}</span>}
              <button
                type="button"
                onClick={() => setShowNewPost(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Atcelt
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-opacity"
                style={{ background: "#00ff88", color: "#000", opacity: isPending ? 0.6 : 1 }}
              >
                {isPending ? "Publicē..." : "Publicēt"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Kategoriju tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 shrink-0"
            style={
              activeCategory === cat
                ? { background: "rgba(0,255,136,0.15)", color: "#00ff88", border: "1px solid rgba(0,255,136,0.35)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts saraksts */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.3)" }}>
          <div className="text-4xl mb-3">💬</div>
          <div className="text-sm">Pagaidām nav ierakstu šajā kategorijā</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl p-5 transition-all duration-150"
              style={{
                background: post.pinned ? "rgba(245,158,11,0.04)" : "rgba(255,255,255,0.03)",
                border: post.pinned ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Post header */}
              <div className="flex items-start gap-3 mb-3">
                <Avatar name={post.author.name ?? "?"} avatarUrl={post.author.avatarUrl} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{post.author.name ?? "Lietotājs"}</span>
                    {post.pinned && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>📌 Piesprausts</span>
                    )}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{
                        background: `${CATEGORY_COLORS[post.category] ?? "#00d4ff"}15`,
                        color: CATEGORY_COLORS[post.category] ?? "#00d4ff",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{timeAgo(post.createdAt)}</div>
                </div>
              </div>

              {/* Post content */}
              <Link href={`/dashboard/kopiena/${post.id}`} className="block group" style={{ textDecoration: "none" }}>
                <h3 className="text-sm font-black text-white mb-1.5 group-hover:underline">{post.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {post.body.length > 200 ? post.body.slice(0, 200) + "..." : post.body}
                </p>
              </Link>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 text-xs font-bold transition-all duration-150"
                  style={{ color: post.liked ? "#f87171" : "rgba(255,255,255,0.4)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {post._count.likes}
                </button>
                <Link
                  href={`/dashboard/kopiena/${post.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {post._count.comments} komentāri
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
