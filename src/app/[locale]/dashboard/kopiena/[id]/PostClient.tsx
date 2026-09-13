"use client";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { PostCard } from "@/components/community/PostCard";
import { CommentThread } from "@/components/community/CommentThread";
import { Composer } from "@/components/community/Composer";
import type {
  CommunityCategoryDef,
  CommunityComment,
  CommunityMe,
  CommunityPost,
} from "@/components/community/types";

export default function PostClient({
  post: initialPost,
  initialComments,
  categories,
  me,
}: {
  post: CommunityPost;
  initialComments: CommunityComment[];
  categories: CommunityCategoryDef[];
  me: CommunityMe;
}) {
  const router = useRouter();
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);
  const [editing, setEditing] = useState(false);

  async function like() {
    const before = { liked: post.liked, likeCount: post.likeCount };
    setPost((p) => ({ ...p, liked: !p.liked, likeCount: p.likeCount + (p.liked ? -1 : 1) }));
    const res = await fetch(`/api/community/posts/${post.id}/like`, { method: "POST" });
    if (!res.ok) return setPost((p) => ({ ...p, ...before }));
    const data = await res.json();
    setPost((p) => ({ ...p, liked: data.liked, likeCount: data.count }));
  }

  async function save() {
    const before = post.saved;
    setPost((p) => ({ ...p, saved: !p.saved }));
    const res = await fetch(`/api/community/posts/${post.id}/save`, { method: "POST" });
    if (!res.ok) return setPost((p) => ({ ...p, saved: before }));
    const data = await res.json();
    setPost((p) => ({ ...p, saved: data.saved }));
  }

  async function remove() {
    const res = await fetch(`/api/community/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) router.push("/dashboard/kopiena");
  }

  async function pin(id: string, pinned: boolean) {
    const res = await fetch("/api/community/admin/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, pinned }),
    });
    if (res.ok) setPost((p) => ({ ...p, pinned }));
  }

  return (
    <div className="c-scope" style={{ maxWidth: 760 }}>
      <Link
        href="/dashboard/kopiena"
        className="c-action"
        style={{ marginBottom: "var(--c-gap-2)", marginLeft: -11 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Atpakaļ uz kopienu
      </Link>

      {editing ? (
        <Composer
          me={me}
          categories={categories}
          editing={post}
          onDone={(updated) => {
            setPost(updated);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="c-rise">
          <PostCard
            post={post}
            me={me}
            categories={categories}
            detail
            onLike={like}
            onSave={save}
            onDelete={remove}
            onEdit={() => setEditing(true)}
            onPin={pin}
          />
        </div>
      )}

      <CommentThread
        postId={post.id}
        comments={comments}
        me={me}
        onChange={(next) => {
          setComments(next);
          setPost((p) => ({ ...p, commentCount: next.length }));
        }}
      />
    </div>
  );
}
