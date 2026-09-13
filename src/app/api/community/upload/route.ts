import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireCommunityWriter, CommunityError } from "@/lib/community";

/**
 * Kopienas failu augšupielāde (Vercel Blob, klienta puses augšupielāde).
 *
 * Fails NEIET caur šo serveri — pārlūks to sūta tieši uz Blob ar
 * īslaicīgu marķieri, ko šis maršruts izsniedz TIKAI pēc tam, kad
 * apstiprināta apmaksāta kopienas piekļuve. Tas apiet Vercel 4.5MB
 * ķermeņa limitu, tāpēc der arī īsiem video.
 *
 * Vajag `BLOB_READ_WRITE_TOKEN` env mainīgo (Vercel Blob store).
 */

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // ── Piekļuves pārbaude PIRMS marķiera izsniegšanas ──
        // Bez apmaksas marķieris netiek izsniegts vispār.
        const viewer = await requireCommunityWriter();

        const kind = clientPayload === "video" ? "video" : "image";

        return {
          allowedContentTypes: kind === "video" ? VIDEO_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
          // Piesaista augšupielādi lietotājam — noder revīzijai
          tokenPayload: JSON.stringify({ userId: viewer.id }),
        };
      },
      onUploadCompleted: async () => {
        // Fails tiek piesaistīts ierakstam, kad lietotājs to publicē.
        // Šeit nekas nav jādara — atstāts apzināti tukšs.
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof CommunityError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    const message = err instanceof Error ? err.message : "Augšupielāde neizdevās";
    console.error("[COMMUNITY_UPLOAD]", err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
