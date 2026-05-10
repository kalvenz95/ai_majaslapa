"use client";

export default function CTA() {
  return (
    <section style={{ padding: "140px 0", borderTop: "1px solid var(--line)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 100%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%), radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 50%)" }} />

      {/* Image row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, margin: "0 auto 64px", maxWidth: 920, padding: "0 32px" }}>
        <div style={{ aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", border: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
          <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
        </div>
        <div style={{ aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", border: "1px solid var(--line-2)", background: "var(--bg-2)", marginTop: 32 }}>
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
        </div>
        <div style={{ aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", border: "1px solid var(--line-2)", background: "var(--bg-2)" }}>
          <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
          <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
          Sāc šodien
        </span>

        <h2 style={{ fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 0.94, letterSpacing: "-0.04em", fontWeight: 600, margin: "16px auto 28px", maxWidth: "14ch" }}>
          Tavs pirmais klients{" "}
          <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
            sākas šeit
          </span>
        </h2>

        <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 560, margin: "0 auto", lineHeight: 1.55 }}>
          Izvēlies virzienu, apgūsti prasmes un pārvērt tās ienākumos.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
          <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            Sākt bez maksas →
          </a>
          <a href="#courses" className="btn-ghost" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            Skatīt visus kursus
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 40, fontSize: 13, color: "var(--ink-2)" }}>
          {["Latviešu valodā", "Praktiski kursi", "Gatavas veidnes", "Aktīva kopiena"].map((item) => (
            <span key={item} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", flexShrink: 0, display: "inline-block" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
