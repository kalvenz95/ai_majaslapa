"use client";
import { useState } from "react";

interface Tool {
  name: string; desc: string; tag: string; price: string; url: string; color: string;
}

export default function ToolsClient({ tools, tags }: { tools: Tool[]; tags: string[] }) {
  const [active, setActive] = useState("Visi");
  const filtered = active === "Visi" ? tools : tools.filter(t => t.tag === active);

  return (
    <>
      {/* Tag filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {tags.map(tag => (
          <button key={tag} onClick={() => setActive(tag)}
            className={`d-chip${active === tag ? " d-chip-accent" : ""}`}
            style={{ cursor: "pointer", border: "none" }}>
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {filtered.map(t => (
          <div key={t.name} className="d-card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div className="d-display" style={{ fontSize: 20, color: "var(--d-ink)" }}>{t.name}</div>
              <span className="d-chip" style={{ fontSize: 10 }}>{t.tag}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--d-ink2)", lineHeight: 1.4, marginBottom: 16 }}>{t.desc}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--d-border)" }}>
              <span className="d-mono" style={{ fontSize: 11, color: "var(--d-ink3)" }}>{t.price}</span>
              <a href={t.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: t.color, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                Atvērt →
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
