"use client";

// Atbalsta: YouTube, Vimeo, Mux, vai tiešs .mp4 URL
// YouTube unlisted (neslēpts): https://www.youtube.com/watch?v=VIDEO_ID
// Vimeo:  https://vimeo.com/VIDEO_ID
// Tiešs:  https://example.com/video.mp4

function getVideoType(url: string): "youtube" | "vimeo" | "direct" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  return "direct";
}

function getYouTubeId(url: string): string | null {
  const match =
    url.match(/[?&]v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/embed\/([^?]+)/);
  return match?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] ?? null;
}

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  const type = getVideoType(url);

  if (type === "youtube") {
    const videoId = getYouTubeId(url);
    if (!videoId) return <VideoError />;

    return (
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
          title={title || "Video lekcija"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </div>
    );
  }

  if (type === "vimeo") {
    const videoId = getVimeoId(url);
    if (!videoId) return <VideoError />;

    return (
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&color=00ff88`}
          title={title || "Video lekcija"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </div>
    );
  }

  // Tiešs video URL
  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <video
        src={url}
        controls
        className="w-full h-full"
        style={{ background: "#000", borderRadius: "16px" }}
        title={title}
      />
    </div>
  );
}

function VideoError() {
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{
        aspectRatio: "16/9",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="text-center">
        <div className="text-3xl mb-2">📹</div>
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Video nav pieejams
        </div>
      </div>
    </div>
  );
}
