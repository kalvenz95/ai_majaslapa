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
  /** Iekšējais atslēgas nosaukums */
  id: string;
  /** Uzņēmuma/scenārija nosaukums kartiņā */
  biz: string;
  /** Īss scenārija apraksts */
  scenario: string;
  /** Sarunas valoda, ja atšķiras no latviešu (rāda čipu kartiņā), piem. "Angliski" */
  lang?: string;
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
    lang: "Latviski",
    skills: ["Pastāsta par kursiem", "Iesaka piemērotu virzienu", "Atbild uz jautājumiem"],
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_CHADEMY ?? "",
    accent: "#6D5EF3",
    glow: "109,94,243",
  },
  {
    id: "autosalons",
    biz: "Silverline Motors",
    scenario: "Auto salona konsultants",
    lang: "Angliski",
    skills: ["Pastāsta par pieejamiem auto", "Nosaka darba laikus", "Piesaka testa braucienu"],
    assistantId:
      process.env.NEXT_PUBLIC_VAPI_ASSISTANT_AUTOSALONS ??
      "5bd2d9f5-96ce-43dc-8d74-6202041f6b75",
    accent: "#FFB86B",
    glow: "255,184,107",
  },
];
