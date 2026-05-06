const TOOLS = [
  { name: "Vapi", desc: "Voice aģenti, zems latency", tag: "Voice", price: "no $0.05/min", url: "https://vapi.ai", color: "#00ff88" },
  { name: "Vonage", desc: "Latvijas virtuālie numuri", tag: "Telefonija", price: "no €5/mēn", url: "https://vonage.com", color: "#00d4ff" },
  { name: "Claude", desc: "Skriptu rakstīšana, build", tag: "LLM", price: "$20/mēn Pro", url: "https://claude.ai", color: "#a855f7" },
  { name: "ElevenLabs", desc: "AI balss faceless video", tag: "Audio", price: "no $5/mēn", url: "https://elevenlabs.io", color: "#f59e0b" },
  { name: "Make.com", desc: "Workflow automatizācija", tag: "Workflow", price: "no €9/mēn", url: "https://make.com", color: "#00ff88" },
  { name: "n8n", desc: "Open-source automatizācija", tag: "Workflow", price: "self-host: bezmaksas", url: "https://n8n.io", color: "#ec4899" },
  { name: "Voiceflow", desc: "Chatbot vizuālais builder", tag: "Chatbot", price: "no $50/mēn", url: "https://voiceflow.com", color: "#00d4ff" },
  { name: "Midjourney", desc: "AI bildes biznesam", tag: "Image", price: "no $10/mēn", url: "https://midjourney.com", color: "#a855f7" },
  { name: "Runway", desc: "AI video editēšana", tag: "Video", price: "no $15/mēn", url: "https://runwayml.com", color: "#f59e0b" },
  { name: "CapCut", desc: "Video montāža + subtitri", tag: "Video", price: "bezmaksas / Pro $8/mēn", url: "https://capcut.com", color: "#00ff88" },
  { name: "Canva", desc: "AI dizains un banneri", tag: "Design", price: "bezmaksas / Pro €13/mēn", url: "https://canva.com", color: "#00d4ff" },
  { name: "ChatGPT", desc: "Teksta ģenerēšana, idejas", tag: "LLM", price: "bezmaksas / Plus $20/mēn", url: "https://chatgpt.com", color: "#ec4899" },
];

const TAGS = ["Visi", "Voice", "LLM", "Workflow", "Chatbot", "Audio", "Image", "Video", "Telefonija", "Design"];

import { Suspense } from "react";
import ToolsClient from "./ToolsClient";

export default function RikkiPage() {
  return (
    <div style={{ color: "var(--d-ink)" }}>
      <h1 className="d-section-title">AI rīku katalogs</h1>
      <p style={{ color: "var(--d-ink3)", fontSize: 14, marginBottom: 28 }}>
        Tikai pārbaudīti rīki, ko izmanto pasniedzēji un studenti
      </p>
      <Suspense>
        <ToolsClient tools={TOOLS} tags={TAGS} />
      </Suspense>
    </div>
  );
}
