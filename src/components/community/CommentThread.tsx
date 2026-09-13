"use client";
import { useMemo, useState } from "react";
import { Avatar, Icon, timeAgo } from "./ui";
import type { CommunityComment, CommunityMe } from "./types";

/** Viens komentārs + tā atbildes. */
function CommentRow({
  comment,
  replies,
  me,
  onReply,
  onEdit,
  onDelete,
}: {
  comment: CommunityComment;
  replies: CommunityComment[];
  me: CommunityMe;
  onReply: (parentId: string, body: string) => Promise<boolean>;
  onEdit: (id: string, body: string) => Promise<boolean>;
  onDelete: (id: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [editDraft, setEditDraft] = useState(comment.body);
  const [busy, setBusy] = useState(false);

  const isAuthor = me.id === comment.author.id;

  async function submitReply(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setBusy(true);
    const ok = await onReply(comment.id, draft.trim());
    setBusy(false);
    if (ok) {
      setDraft("");
      setReplying(false);
    }
  }

  async function submitEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editDraft.trim()) return;
    setBusy(true);
    const ok = await onEdit(comment.id, editDraft.trim());
    setBusy(false);
    if (ok) setEditing(false);
  }

  return (
    <div style={{ display: "flex", gap: 11 }}>
      <Avatar name={comment.author.name} avatarUrl={comment.author.avatarUrl} size={32} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
            {comment.author.name ?? "Dalībnieks"}
          </span>
          {comment.author.isStaff && (
            <span
              className="c-chip"
              style={{
                color: "var(--accent)",
                background: "color-mix(in oklab, var(--accent) 13%, transparent)",
                borderColor: "color-mix(in oklab, var(--accent) 32%, transparent)",
              }}
            >
              Chademy
            </span>
          )}
          <span className="c-meta">
            {timeAgo(comment.createdAt)}
            {comment.editedAt ? " · rediģēts" : ""}
          </span>
        </div>

        {editing ? (
          <form onSubmit={submitEdit} style={{ marginTop: 7 }}>
            <textarea
              className="c-input"
              value={editDraft}
              onChange={(e) => setEditDraft(e.target.value)}
              rows={2}
              maxLength={2000}
              style={{ minHeight: 58 }}
            />
            <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
              <button type="submit" className="c-btn c-btn-primary c-btn-sm" disabled={busy}>
                Saglabāt
              </button>
              <button
                type="button"
                className="c-btn c-btn-ghost c-btn-sm"
                onClick={() => {
                  setEditing(false);
                  setEditDraft(comment.body);
                }}
              >
                Atcelt
              </button>
            </div>
          </form>
        ) : (
          <p className="c-body" style={{ marginTop: 4, fontSize: 13.5 }}>
            {comment.body}
          </p>
        )}

        {!editing && (
          <div style={{ display: "flex", gap: 2, marginTop: 4, marginLeft: -11 }}>
            {me.canPost && (
              <button
                type="button"
                className="c-action"
                style={{ fontSize: 12 }}
                onClick={() => setReplying((v) => !v)}
              >
                Atbildēt
              </button>
            )}
            {isAuthor && me.canPost && (
              <button
                type="button"
                className="c-action"
                style={{ fontSize: 12 }}
                onClick={() => setEditing(true)}
              >
                Rediģēt
              </button>
            )}
            {(isAuthor || me.isStaff) && (
              <button
                type="button"
                className="c-action"
                style={{ fontSize: 12, color: "#F0648C" }}
                onClick={() => {
                  if (window.confirm("Dzēst šo komentāru?")) onDelete(comment.id);
                }}
              >
                Dzēst
              </button>
            )}
          </div>
        )}

        {replying && (
          <form onSubmit={submitReply} style={{ marginTop: 8 }}>
            <textarea
              className="c-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Atbilde lietotājam ${comment.author.name ?? "dalībniekam"}…`}
              rows={2}
              maxLength={2000}
              style={{ minHeight: 58 }}
              autoFocus
            />
            <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
              <button type="submit" className="c-btn c-btn-primary c-btn-sm" disabled={busy}>
                {busy ? "Sūta…" : "Atbildēt"}
              </button>
              <button
                type="button"
                className="c-btn c-btn-ghost c-btn-sm"
                onClick={() => setReplying(false)}
              >
                Atcelt
              </button>
            </div>
          </form>
        )}

        {/* Atbildes */}
        {replies.length > 0 && (
          <div
            style={{
              marginTop: 14,
              paddingLeft: 14,
              borderLeft: "1px solid var(--line)",
              display: "grid",
              gap: 14,
            }}
          >
            {replies.map((r) => (
              <CommentRow
                key={r.id}
                comment={r}
                replies={[]}
                me={me}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Komentāru saraksts + jauna komentāra forma. */
export function CommentThread({
  postId,
  comments,
  me,
  onChange,
}: {
  postId: string;
  comments: CommunityComment[];
  me: CommunityMe;
  onChange: (comments: CommunityComment[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { roots, repliesOf } = useMemo(() => {
    const roots = comments.filter((c) => !c.parentId);
    const repliesOf = new Map<string, CommunityComment[]>();
    for (const c of comments) {
      if (!c.parentId) continue;
      const list = repliesOf.get(c.parentId) ?? [];
      list.push(c);
      repliesOf.set(c.parentId, list);
    }
    return { roots, repliesOf };
  }, [comments]);

  async function post(body: string, parentId: string | null): Promise<boolean> {
    setError("");
    const res = await fetch(`/api/community/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, parentId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Neizdevās nosūtīt");
      return false;
    }
    onChange([...comments, data]);
    return true;
  }

  async function edit(id: string, body: string): Promise<boolean> {
    const res = await fetch(`/api/community/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    onChange(
      comments.map((c) => (c.id === id ? { ...c, body: data.body, editedAt: data.editedAt } : c))
    );
    return true;
  }

  async function remove(id: string) {
    const res = await fetch(`/api/community/comments/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    // Dzēšot vecāku, pazūd arī atbildes
    onChange(comments.filter((c) => c.id !== id && c.parentId !== id));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setBusy(true);
    const ok = await post(draft.trim(), null);
    setBusy(false);
    if (ok) setDraft("");
  }

  return (
    <section style={{ marginTop: "var(--c-gap-3)" }}>
      <h2
        className="c-title"
        style={{ fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}
      >
        <Icon.Comment />
        {comments.length === 0
          ? "Komentāri"
          : `${comments.length} ${comments.length === 1 ? "komentārs" : "komentāri"}`}
      </h2>

      {me.canPost ? (
        <form onSubmit={submit} className="c-card" style={{ padding: 14, marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 11 }}>
            <Avatar name={me.name} avatarUrl={me.avatarUrl} size={32} />
            <div style={{ flex: 1 }}>
              <textarea
                className="c-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Pievieno komentāru…"
                rows={2}
                maxLength={2000}
                style={{ minHeight: 58 }}
              />
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}
              >
                {error && (
                  <span style={{ fontSize: 12, color: "#F0648C", alignSelf: "center" }}>
                    {error}
                  </span>
                )}
                <button
                  type="submit"
                  className="c-btn c-btn-primary c-btn-sm"
                  disabled={busy || !draft.trim()}
                >
                  {busy ? "Sūta…" : "Komentēt"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="c-card" style={{ padding: 14, marginBottom: 18, fontSize: 13, color: "var(--ink-3)" }}>
          {me.restrictedReason || "Tava iespēja rakstīt kopienā ir īslaicīgi ierobežota."}
        </div>
      )}

      {roots.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--ink-3)", padding: "8px 2px" }}>
          Vēl nav komentāru. Esi pirmais.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 20 }}>
          {roots.map((c) => (
            <CommentRow
              key={c.id}
              comment={c}
              replies={repliesOf.get(c.id) ?? []}
              me={me}
              onReply={(parentId, body) => post(body, parentId)}
              onEdit={edit}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
