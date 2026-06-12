"use client";

import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { Magnetic } from "@/components/Magnetic";

export default function FinalCTAV2() {
  return (
    <section style={{
      position: "relative", overflow: "hidden", textAlign: "center",
      background: "#0A0A0E", padding: "160px 0 0",
    }}>
      {/* AI imagery — subtle texture behind the closing CTA */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.55 }}>
        <Image src="/ai/cta-bg.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center right" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(72% 80% at 50% 38%, rgba(10,10,14,0.45), #0A0A0E 82%)" }} />
      </div>

      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(55% 60% at 50% 110%, rgba(109,94,243,0.30), transparent 70%)," +
          "radial-gradient(35% 40% at 12% 0%, rgba(0,191,165,0.10), transparent 60%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        maskImage: "radial-gradient(60% 55% at 50% 45%, #000 0%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(60% 55% at 50% 45%, #000 0%, transparent 80%)",
      }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        <Reveal><span className="v2-eyebrow v2-eyebrow--light">Sāc šodien</span></Reveal>
        <Reveal delay={0.08}>
          <h2 className="v2-h2" style={{ fontSize: "clamp(48px, 9vw, 110px)", color: "#fff", margin: "20px 0 24px" }}>
            Sāc jau <span className="v2-grad">šodien</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 auto 44px", maxWidth: 480 }}>
            Izvēlies sev piemērotāko virzienu un sper pirmo soli AI jomā.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <Magnetic>
            <a
              href="#pricing"
              className="btn-primary"
              style={{ textDecoration: "none", fontSize: 18, padding: "19px 44px", borderRadius: 16, fontWeight: 700, fontFamily: "var(--font-sans)" }}
            >
              Sākt bezmaksas →
            </a>
          </Magnetic>
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 30, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            {["Latviešu valodā", "Bez programmēšanas", "Aktīva kopiena", "Gatavas veidnes"].map((item) => (
              <span key={item} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", display: "inline-block" }} />
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Giant brand watermark anchoring the page */}
      <div aria-hidden style={{ position: "relative", marginTop: 70, overflow: "hidden", lineHeight: 0.78 }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(110px, 19vw, 300px)", letterSpacing: "-0.05em",
          textAlign: "center", whiteSpace: "nowrap", userSelect: "none",
          background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.015) 85%)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          color: "transparent", WebkitTextFillColor: "transparent",
          transform: "translateY(16%)",
        }}>
          CHADEMY
        </div>
      </div>
    </section>
  );
}
