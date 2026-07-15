/**
 * Vapi balss aģentu konfigurācija mājaslapas dzīvajiem demo zvaniem.
 *
 * Iestatīšana:
 * 1. Vapi dashboard → Account → paņem PUBLIC key (tas ir drošs frontendā).
 * 2. Izveido asistentu(s) un nokopē katra Assistant ID.
 * 3. Ieliec vērtības `.env.local` failā (skat. mainīgos zemāk).
 * 4. Vapi asistentā iestati Max Call Duration ~120 s, lai demo nemaksā par daudz.
 *
 * .env.local:
 *   NEXT_PUBLIC_VAPI_PUBLIC_KEY=pk_xxx
 *   NEXT_PUBLIC_VAPI_ASSISTANT_CHADEMY=asst_xxx
 *   NEXT_PUBLIC_VAPI_ASSISTANT_AUTOSALONS=asst_xxx
 */

export const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? "";

export type VoiceAgent = {
  /** Iekšējais atslēgas nosaukums — arī tulkojumu atslēga (LiveVoice.agents.<id>) */
  id: string;
  /** Uzņēmuma zīmola nosaukums kartiņā — netulkojas */
  biz: string;
  /** Vapi Assistant ID (no env) */
  assistantId: string;
  /** Akcenta krāsa kartiņai */
  accent: string;
  /** Otrā akcenta krāsa (pogu/avatara gradienta beigas) */
  accent2: string;
  /** Avatara ikonas gradients */
  avatarGrad: string;
  /** RGB akcenta krāsa ēnām/spīdumam ("r,g,b") */
  glow: string;
};

export const VOICE_AGENTS: VoiceAgent[] = [
  {
    id: "chademy",
    biz: "Chademy",
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_CHADEMY ?? "",
    accent: "#6f5cf5",
    accent2: "#9b8cf5",
    avatarGrad: "linear-gradient(135deg,#7c6ef0,#5647c9)",
    glow: "111,92,245",
  },
  {
    id: "autosalons",
    biz: "Silverline Motors",
    assistantId:
      process.env.NEXT_PUBLIC_VAPI_ASSISTANT_AUTOSALONS ??
      "5bd2d9f5-96ce-43dc-8d74-6202041f6b75",
    accent: "#f0975a",
    accent2: "#e0679a",
    avatarGrad: "linear-gradient(135deg,#f0a15e,#e0679a)",
    glow: "240,151,90",
  },
];
