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
 *   NEXT_PUBLIC_VAPI_ASSISTANT_SALONS=asst_xxx
 *   NEXT_PUBLIC_VAPI_ASSISTANT_SERVISS=asst_xxx
 */

export const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? "";

export type VoiceAgent = {
  /** Iekšējais atslēgas nosaukums */
  id: string;
  /** Uzņēmuma/scenārija nosaukums kartiņā */
  biz: string;
  /** Īss scenārija apraksts */
  scenario: string;
  /** Ko agents prot — punkti zem kartiņas */
  skills: string[];
  /** Vapi Assistant ID (no env) */
  assistantId: string;
  /** Akcenta krāsa kartiņai */
  accent: string;
  /** RGB akcenta krāsa ēnām/spīdumam ("r,g,b") */
  glow: string;
};

export const VOICE_AGENTS: VoiceAgent[] = [
  {
    id: "chademy",
    biz: "Chademy",
    scenario: "AI mācību konsultants",
    skills: ["Pastāsta par kursiem", "Iesaka piemērotu virzienu", "Atbild uz jautājumiem"],
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_CHADEMY ?? "",
    accent: "#6D5EF3",
    glow: "109,94,243",
  },
  {
    id: "salons",
    biz: "Salons «Glow»",
    scenario: "Pieraksts pie meistara",
    skills: ["Pieraksta uz vizīti", "Iesaka brīvu laiku", "Atgādina pirms vizītes"],
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_SALONS ?? "",
    accent: "#00BFA5",
    glow: "0,191,165",
  },
  {
    id: "serviss",
    biz: "Auto serviss «Drive»",
    scenario: "Pieteikums remontam",
    skills: ["Pieņem pieteikumu", "Noskaidro problēmu", "Savāc kontaktus"],
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_SERVISS ?? "",
    accent: "#FFB86B",
    glow: "255,184,107",
  },
];
