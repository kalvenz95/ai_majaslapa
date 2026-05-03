"use client";
import { useState, useTransition } from "react";
import Link from "next/link";

type Author = { id: string; name: string | null; avatarUrl: string | null };
type Comment = { id: string; body: string; createdAt: Date | string; author: Author };
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
  comments: Comment[];
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

export default function PostClient({
  post: initialPost,
  currentUser,
}: {
  post: Post;
  currentUser: { id: string; name: string; avatarUrl?: string | null } | null;
}) {
  const [post, setPost] = useState(initialPost);
  const [commentText, setCommentText] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleLike() {
    if (!currentUser) return;
    const res = await fetch(`/api/community/posts/${post.id}/like`, { method: "POST" });
    if (!res.ok) return;
    const { liked, count } = await res.json();
    setPost((prev) => ({ ...prev, liked, _count: { ...prev._count, likes: count } }));
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;

    startTransition(async () => {
      const res = await fetch(`/api/community/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: commentText }),
      });
      if (!res.ok) return;
      const comment = await res.json();
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, comment],
        _count: { ...prev._count, comments: prev._count.comments + 1 },
      }));
      setCommentText("");
    });
  }

  async function handleDeleteComment(commentId: string) {
    const res = await fetch(`/api/community/posts/${post.id}/comments`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    });
    if (!res.ok) return;
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== commentId),
      _count: { ...prev._count, comments: prev._count.comments - 1 },
    }));
  }

  const catColor = CATEGORY_COLORS[post.category] ?? "#00d4ff";

  return (
    <div className="max-w-2xl">
      {/* Atpakaļ */}
      <Link
        href="/dashboard/kopiena"
        className="inline-flex items-center gap-1.5 text-xs font-bold mb-5 transition-opacity hover:opacity-70"
        style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Atpakaļ uz kopienu
      </Link>

      {/* Post */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar name={post.author.name ?? "?"} avatarUrl={post.author.avatarUrl} size={40} />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-black text-white">{post.author.name ?? "Lietotājs"}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: `${catColor}15`, color: catColor }}
              >
                {post.category}
              </span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{timeAgo(post.createdAt)}</div>
          </div>
        </div>

        <h1 className="text-xl font-black text-white mb-3">{post.title}</h1>
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.65)" }}>{post.body}</p>

        {/* Likes */}
        <div className="flex items-center gap-4 mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold transition-all duration-150"
            style={{
              background: post.liked ? "rgba(248,113,113,0.12)" : "rgba(255,255,255,0.05)",
              color: post.liked ? "#f87171" : "rgba(255,255,255,0.5)",
              border: post.liked ? "1px solid rgba(248,113,113,0.3)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {post._count.likes} {post.liked ? "Patīk" : "Patīk"}
          </button>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {post._count.comments} komentāri
          </span>
        </div>
      </div>

      {/* Komentāri */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Komentāri ({post.comments.length})</h2>

        {/* Jauns komentārs */}
        {currentUser ? (
          <form onSubmit={handleComment} className="flex gap-3 mb-5">
            <Avatar name={currentUser.name} avatarUrl={currentUser.avatarUrl} size={36} />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Raksti komentāru..."
                rows={2}
                maxLength={1000}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white mb-2 outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <button
                type="submit"
                disabled={isPending || !commentText.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-opacity"
                style={{ background: "#00ff88", color: "#000", opacity: isPending || !commentText.trim() ? 0.5 : 1 }}
              >
                {isPending ? "Sūta..." : "Komentēt"}
              </button>
            </div>
          </form>
        ) : (
          <div
            className="rounded-xl p-4 mb-5 text-center text-sm"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
          >
            <Link href="/login" style={{ color: "#00ff88" }}>Piesakies</Link>, lai komentētu
          </div>
        )}

        {/* Komentāru saraksts */}
        {post.comments.length === 0 ? (
          <div className="text-center py-8" style={{ color: "rgba(255,255,255,0.3)" }}>
            <div className="text-3xl mb-2">💬</div>
            <div className="text-sm">Pagaidām nav komentāru. Esi pirmais!</div>
          </div>
        ) : (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar name={comment.author.name ?? "?"} avatarUrl={comment.author.avatarUrl} size={32} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-black text-white">{comment.author.name ?? "Lietotājs"}</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{timeAgo(comment.createdAt)}</span>
                  </div>
                  <div
                    className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                    style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)" }}
                  >
                    {comment.body}
                  </div>
                  {currentUser?.id === comment.author.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-xs mt-1 transition-opacity hover:opacity-100"
                      style={{ color: "rgba(255,255,255,0.25)", opacity: 0.6 }}
                    >
                      Dzēst
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
