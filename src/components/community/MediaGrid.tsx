"use client";
import type { CommunityMedia } from "./types";

/** Ieraksta pielikumi — attēli, video, saites. */
export function MediaGrid({ media }: { media: CommunityMedia[] }) {
  if (!media?.length) return null;

  const visual = media.filter((m) => m.type !== "LINK");
  const links = media.filter((m) => m.type === "LINK");

  return (
    <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
      {visual.length > 0 && (
        <div className="c-media-grid" data-count={Math.min(visual.length, 4)}>
          {visual.slice(0, 4).map((m, i) => (
            <div
              key={m.id ?? `${m.url}-${i}`}
              className={`c-media-item c-media-item--${m.type === "VIDEO" ? "video" : "image"}`}
              style={
                // Pirmais attēls no trim aizņem visu rindu
                visual.length === 3 && i === 0 ? { gridColumn: "span 2" } : undefined
              }
            >
              {m.type === "VIDEO" ? (
                <video
                  src={m.url}
                  poster={m.thumbnailUrl ?? undefined}
                  controls
                  preload="metadata"
                  playsInline
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={m.url} alt={m.title ?? ""} loading="lazy" />
              )}
            </div>
          ))}
        </div>
      )}

      {links.map((m, i) => (
        <a
          key={m.id ?? `${m.url}-${i}`}
          href={m.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="c-link-preview"
          onClick={(e) => e.stopPropagation()}
        >
          <span aria-hidden style={{ fontSize: 17 }}>
            🔗
          </span>
          <span style={{ minWidth: 0 }}>
            <span
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 650,
                color: "var(--ink)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {m.title ?? m.url.replace(/^https?:\/\//, "").split("/")[0]}
            </span>
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
              {m.description ?? m.url}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
