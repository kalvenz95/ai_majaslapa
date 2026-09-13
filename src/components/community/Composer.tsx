"use client";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Avatar, Icon } from "./ui";
import type { CommunityCategoryDef, CommunityMedia, CommunityMe, CommunityPost } from "./types";

/**
 * Ieraksta kompozers — izveido jaunu vai rediģē esošu.
 *
 * Faili tiek sūtīti TIEŠI uz Vercel Blob; `/api/community/upload`
 * izsniedz īslaicīgu marķieri tikai apmaksātam dalībniekam, tāpēc
 * augšupielāde nav iespējama bez piekļuves.
 */
export function Composer({
  me,
  categories,
  editing,
  onDone,
  onCancel,
}: {
  me: CommunityMe;
  categories: CommunityCategoryDef[];
  /** Ja padots — rediģēšanas režīms */
  editing?: CommunityPost;
  onDone: (post: CommunityPost) => void;
  onCancel?: () => void;
}) {
  const postable = categories.filter((c) => !c.adminOnly || me.isStaff);

  const [title, setTitle] = useState(editing?.title ?? "");
  const [body, setBody] = useState(editing?.body ?? "");
  const [category, setCategory] = useState(
    editing?.category ?? postable[0]?.slug ?? "diskusijas"
  );
  const [media, setMedia] = useState<CommunityMedia[]>(editing?.media ?? []);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);

  const activeCat = postable.find((c) => c.slug === category);

  async function handleFiles(files: FileList | null, kind: "image" | "video") {
    if (!files?.length) return;
    setError("");

    const remaining = 6 - media.length;
    const chosen = Array.from(files).slice(0, remaining);
    if (chosen.length === 0) {
      setError("Maksimums 6 pielikumi vienam ierakstam");
      return;
    }

    for (const file of chosen) {
      setUploading(file.name);
      try {
        const blob = await upload(`kopiena/${Date.now()}-${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/community/upload",
          clientPayload: kind,
        });
        setMedia((prev) => [
          ...prev,
          { type: kind === "video" ? "VIDEO" : "IMAGE", url: blob.url },
        ]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Augšupielāde neizdevās";
        setError(
          msg.includes("too large") || msg.includes("maximumSize")
            ? kind === "video"
              ? "Video ir par lielu (maks. 50 MB)"
              : "Attēls ir par lielu (maks. 8 MB)"
            : msg
        );
      } finally {
        setUploading(null);
      }
    }
  }

  function addLink() {
    const url = window.prompt("Ielīmē saiti (https://...)");
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) throw new Error();
      setMedia((prev) => [...prev, { type: "LINK", url: parsed.toString() }]);
    } catch {
      setError("Nederīga saite");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (title.trim().length < 3) return setError("Virsraksts par īsu");
    if (!body.trim()) return setError("Pievieno tekstu");

    setBusy(true);
    try {
      const payload = { title: title.trim(), body: body.trim(), category, media };
      const res = await fetch(
        editing ? `/api/community/posts/${editing.id}` : "/api/community/posts",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Neizdevās saglabāt");
        return;
      }
      onDone(data);
      if (!editing) {
        setTitle("");
        setBody("");
        setMedia([]);
      }
    } catch {
      setError("Savienojuma kļūda");
    } finally {
      setBusy(false);
    }
  }

  // Ierobežotam dalībniekam kompozers netiek rādīts vispār
  if (!me.canPost) {
    return (
      <div
        className="c-card"
        style={{ padding: "16px 18px", marginBottom: "var(--c-gap-3)" }}
      >
        <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>
          {me.restrictedReason || "Tava iespēja publicēt kopienā ir īslaicīgi ierobežota."}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="c-card c-rise"
      style={{ padding: "18px 18px 14px", marginBottom: "var(--c-gap-3)" }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar name={me.name} avatarUrl={me.avatarUrl} size={40} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <input
            className="c-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              editing ? "Virsraksts" : "Ar ko vēlies padalīties?"
            }
            maxLength={140}
            style={{ fontWeight: 700, fontSize: 15, marginBottom: 9 }}
          />

          <textarea
            className="c-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={activeCat?.hint ?? "Uzraksti vairāk..."}
            maxLength={5000}
            rows={4}
          />

          {/* Pievienotie pielikumi */}
          {media.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {media.map((m, i) => (
                <div
                  key={`${m.url}-${i}`}
                  style={{
                    position: "relative",
                    width: m.type === "LINK" ? "auto" : 86,
                    height: m.type === "LINK" ? "auto" : 60,
                    maxWidth: 260,
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    background: "var(--c-raised)",
                  }}
                >
                  {m.type === "IMAGE" && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={m.url}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                  {m.type === "VIDEO" && (
                    <video
                      src={m.url}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      muted
                    />
                  )}
                  {m.type === "LINK" && (
                    <div
                      style={{
                        padding: "8px 28px 8px 10px",
                        fontSize: 11.5,
                        color: "var(--ink-2)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 240,
                      }}
                    >
                      🔗 {m.url.replace(/^https?:\/\//, "")}
                    </div>
                  )}
                  <button
                    type="button"
                    aria-label="Noņemt pielikumu"
                    onClick={() => setMedia((prev) => prev.filter((_, j) => j !== i))}
                    className="c-action"
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      padding: 4,
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      borderRadius: 7,
                    }}
                  >
                    <Icon.X />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploading && (
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 8 }}>
              Augšupielādē {uploading}…
            </div>
          )}

          {/* Rīkjosla */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid var(--line)",
            }}
          >
            <button
              type="button"
              className="c-action"
              onClick={() => imageInput.current?.click()}
              disabled={media.length >= 6}
            >
              <Icon.Image /> Attēls
            </button>
            <button
              type="button"
              className="c-action"
              onClick={() => videoInput.current?.click()}
              disabled={media.length >= 6}
            >
              <Icon.Video /> Video
            </button>
            <button
              type="button"
              className="c-action"
              onClick={addLink}
              disabled={media.length >= 6}
            >
              <Icon.Link /> Saite
            </button>

            <select
              className="c-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Kategorija"
              style={{ width: "auto", padding: "7px 12px", fontSize: 12.5, fontWeight: 650 }}
            >
              {postable.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>

            <div style={{ flex: 1 }} />

            {onCancel && (
              <button type="button" className="c-btn c-btn-ghost c-btn-sm" onClick={onCancel}>
                Atcelt
              </button>
            )}
            <button type="submit" className="c-btn c-btn-primary c-btn-sm" disabled={busy}>
              {busy ? "Saglabā…" : editing ? "Saglabāt" : "Publicēt"}
            </button>
          </div>

          {error && (
            <div style={{ fontSize: 12.5, color: "#F0648C", marginTop: 9 }} role="alert">
              {error}
            </div>
          )}
        </div>
      </div>

      <input
        ref={imageInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files, "image");
          e.target.value = "";
        }}
      />
      <input
        ref={videoInput}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        hidden
        onChange={(e) => {
          handleFiles(e.target.files, "video");
          e.target.value = "";
        }}
      />
    </form>
  );
}
