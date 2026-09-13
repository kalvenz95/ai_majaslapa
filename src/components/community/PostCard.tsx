"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Avatar, CategoryChip, Icon, MemberBadge, joinedLabel, timeAgo } from "./ui";
import { MediaGrid } from "./MediaGrid";
import type { CommunityCategoryDef, CommunityMe, CommunityPost } from "./types";

/**
 * Viens ieraksts plūsmā vai detaļu skatā.
 * Rediģēšanas/dzēšanas pogas rāda tikai autoram un moderatoram —
 * serveris to pārbauda vēlreiz, šis ir tikai UI.
 */
export function PostCard({
  post,
  me,
  categories,
  detail = false,
  onLike,
  onSave,
  onDelete,
  onEdit,
  onPin,
  onRestrict,
}: {
  post: CommunityPost;
  me: CommunityMe;
  categories: CommunityCategoryDef[];
  /** Detaļu skatā rāda pilnu tekstu un nav saites uz sevi */
  detail?: boolean;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (post: CommunityPost) => void;
  onPin?: (id: string, pinned: boolean) => void;
  onRestrict?: (authorId: string, authorName: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthor = me.id === post.author.id;
  const canEdit = isAuthor;
  const canDelete = isAuthor || me.isStaff;
  const joined = joinedLabel(post.author.joinedAt);

  const truncated =
    !detail && post.body.length > 280 ? post.body.slice(0, 280).trimEnd() + "…" : post.body;

  return (
    <article
      className={`c-card${detail ? "" : " c-card--interactive"}${post.pinned ? " c-card--pinned" : ""}`}
      style={{ padding: "18px 18px 10px" }}
    >
      {/* Galvene */}
      <header style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
        <Avatar name={post.author.name} avatarUrl={post.author.avatarUrl} size={40} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
              {post.author.name ?? "Dalībnieks"}
            </span>
            <MemberBadge plan={post.author.plan} isStaff={post.author.isStaff} />
          </div>

          <div className="c-meta" style={{ marginTop: 2, display: "flex", gap: 7, flexWrap: "wrap" }}>
            <span>{timeAgo(post.createdAt)}</span>
            {post.editedAt && <span>· rediģēts</span>}
            {joined && detail && <span>· kopienā kopš {joined}</span>}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {post.pinned && (
            <span
              className="c-chip"
              style={{
                color: "#FFB86B",
                background: "color-mix(in oklab, #FFB86B 13%, transparent)",
                borderColor: "color-mix(in oklab, #FFB86B 30%, transparent)",
              }}
            >
              <Icon.Pin /> Piesprausts
            </span>
          )}

          {(canEdit || canDelete || me.isStaff) && (
            <div style={{ position: "relative" }}>
              <button
                type="button"
                className="c-action"
                aria-label="Vairāk darbību"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                style={{ padding: 6 }}
              >
                <Icon.More />
              </button>

              {menuOpen && (
                <>
                  {/* Aizver, klikšķinot jebkur citur */}
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 20 }}
                    onClick={() => setMenuOpen(false)}
                    aria-hidden
                  />
                  <div
                    className="c-card"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 6px)",
                      zIndex: 21,
                      minWidth: 168,
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {canEdit && onEdit && (
                      <button
                        type="button"
                        className="c-action"
                        style={{ justifyContent: "flex-start" }}
                        onClick={() => {
                          setMenuOpen(false);
                          onEdit(post);
                        }}
                      >
                        Rediģēt
                      </button>
                    )}
                    {me.isStaff && onPin && (
                      <button
                        type="button"
                        className="c-action"
                        style={{ justifyContent: "flex-start" }}
                        onClick={() => {
                          setMenuOpen(false);
                          onPin(post.id, !post.pinned);
                        }}
                      >
                        {post.pinned ? "Atspraust" : "Piespraust"}
                      </button>
                    )}
                    {canDelete && (
                      <button
                        type="button"
                        className="c-action"
                        style={{ justifyContent: "flex-start", color: "#F0648C" }}
                        onClick={() => {
                          setMenuOpen(false);
                          if (window.confirm("Dzēst šo ierakstu?")) onDelete(post.id);
                        }}
                      >
                        Dzēst
                      </button>
                    )}
                    {/* Moderators var apturēt sveša dalībnieka rakstīšanu */}
                    {me.isStaff && !isAuthor && !post.author.isStaff && onRestrict && (
                      <button
                        type="button"
                        className="c-action"
                        style={{ justifyContent: "flex-start", color: "#F0648C" }}
                        onClick={() => {
                          setMenuOpen(false);
                          onRestrict(post.author.id, post.author.name ?? "dalībnieku");
                        }}
                      >
                        Ierobežot autoru
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Saturs */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ marginBottom: 8 }}>
          <CategoryChip slug={post.category} categories={categories} />
        </div>

        {detail ? (
          <>
            <h1 className="c-title" style={{ fontSize: 21, marginBottom: 10 }}>
              {post.title}
            </h1>
            <p className="c-body">{post.body}</p>
          </>
        ) : (
          <Link
            href={`/dashboard/kopiena/${post.id}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <h2 className="c-title" style={{ fontSize: 16, marginBottom: 6 }}>
              {post.title}
            </h2>
            <p className="c-body">{truncated}</p>
          </Link>
        )}

        <MediaGrid media={post.media} />
      </div>

      {/* Darbības */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 12,
          paddingTop: 6,
          borderTop: "1px solid var(--line)",
        }}
      >
        <button
          type="button"
          className={`c-action${post.liked ? " c-action--like-on" : ""}`}
          onClick={() => onLike(post.id)}
          aria-pressed={post.liked}
          aria-label={post.liked ? "Noņemt patīk" : "Patīk"}
        >
          <Icon.Heart filled={post.liked} />
          {post.likeCount > 0 ? post.likeCount : ""}
        </button>

        {detail ? (
          <span className="c-action" style={{ cursor: "default" }}>
            <Icon.Comment />
            {post.commentCount}
          </span>
        ) : (
          <Link href={`/dashboard/kopiena/${post.id}`} className="c-action">
            <Icon.Comment />
            {post.commentCount > 0 ? post.commentCount : "Komentēt"}
          </Link>
        )}

        <div style={{ flex: 1 }} />

        <button
          type="button"
          className={`c-action${post.saved ? " c-action--on" : ""}`}
          onClick={() => onSave(post.id)}
          aria-pressed={post.saved}
          aria-label={post.saved ? "Noņemt no saglabātajiem" : "Saglabāt"}
        >
          <Icon.Bookmark filled={post.saved} />
          {post.saved ? "Saglabāts" : "Saglabāt"}
        </button>
      </footer>
    </article>
  );
}
