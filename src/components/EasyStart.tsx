"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "✦",
    title: "Nav nepieciešama programmēšana",
    color: "#00d4ff",
  },
  {
    icon: "✦",
    title: "Soli pa solim struktūra",
    color: "#00ff88",
  },
  {
    icon: "✦",
    title: "Praktisks pielietojums",
    color: "#a855f7",
  },
];

export default function EasyStart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 px-6 flex justify-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Card */}
      <div
        ref={sectionRef}
        className="relative w-full"
        style={{
          maxWidth: "920px",
          background: "linear-gradient(150deg, #0b0f14 0%, #0f1c24 100%)",
          border: "1px solid rgba(0,255,200,0.18)",
          borderRadius: "28px",
          padding: "clamp(28px, 6vw, 64px)",
          boxShadow:
            "0 0 80px rgba(0,212,255,0.05), 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(0,255,200,0.07)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
          }}
        />

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,212,255,0.07)",
              border: "1px solid rgba(0,212,255,0.22)",
              color: "#00d4ff",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#00d4ff", boxShadow: "0 0 6px #00d4ff" }}
            />
            Sāc bez tehniskām zināšanām
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-center font-black text-white mb-8"
          style={{
            fontSize: "clamp(24px, 3.5vw, 40px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Nav jābūt{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00ff88, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tehniskam,
          </span>{" "}
          lai sāktu
        </h2>

        {/* Text block */}
        <div
          className="mb-10 space-y-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "14px",
            padding: "clamp(18px, 3vw, 28px)",
          }}
        >
          <p
            style={{
              color: "#bcd0d8",
              fontSize: "15px",
              lineHeight: "1.75",
            }}
          >
            Nav nepieciešamas programmēšanas vai sarežģītas datorprasmes. Apmācība ir veidota{" "}
            <span
              style={{
                color: "#00d4ff",
                textShadow: "0 0 12px rgba(0,212,255,0.4)",
                fontWeight: 600,
              }}
            >
              soli pa solim
            </span>{" "}
            — vari sekot līdzi un uzreiz pielietot.
          </p>
          <p
            style={{
              color: "#bcd0d8",
              fontSize: "15px",
              lineHeight: "1.75",
            }}
          >
            Tu apgūsti prasmes, kuras jau šobrīd tiek izmantotas uzņēmumos, un kļūsti par daļu no
            jomas, kas strauji attīstās.
          </p>
        </div>

        {/* Feature points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${f.color}18`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${0.2 + i * 0.12}s, transform 0.5s ease ${0.2 + i * 0.12}s`,
              }}
            >
              <span
                className="text-xs font-black"
                style={{ color: f.color, textShadow: `0 0 10px ${f.color}80` }}
              >
                {f.icon}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {f.title}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              color: "#000",
              boxShadow: "0 0 28px rgba(0,212,255,0.22), 0 8px 24px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 50px rgba(0,212,255,0.45), 0 12px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 28px rgba(0,212,255,0.22), 0 8px 24px rgba(0,0,0,0.3)";
            }}
          >
            Pievienoties platformai →
          </a>
        </div>
      </div>
    </section>
  );
}
