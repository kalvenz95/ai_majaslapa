"use client";
import { useEffect, useState } from "react";
import E from "@/components/E";

const rotatingWords = ["Chatbot", "Video", "Voice Agent", "Automatizāciju", "AI Attēlus"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden animated-gradient grid-overlay">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff88] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00d4ff] opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7] opacity-[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Top badge */}
      <div className="badge-neon mb-8 animate-fade-in">
        <E id="hero-badge">🇱🇻 Latvijas pirmā AI monetizācijas platforma</E>
      </div>

      {/* Headline */}
      <h1 className="text-center max-w-5xl mx-auto px-6 animate-slide-up">
        <span className="block text-5xl md:text-7xl font-black leading-tight text-white mb-2">
          <E id="hero-h1-1">Iemācies veidot</E>
        </span>
        <span
          className={`block text-5xl md:text-7xl font-black leading-tight gradient-text-green neon-text-green transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {rotatingWords[wordIndex]}
        </span>
        <span className="block text-5xl md:text-7xl font-black leading-tight text-white mt-2">
          <E id="hero-h1-3">un pārdod uzņēmumiem</E>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mt-8 text-center max-w-2xl mx-auto px-6 text-gray-400 text-lg md:text-xl leading-relaxed animate-fade-in">
        <strong className="text-white">Chademy</strong>{" "}
        <E id="hero-sub-1">— praktiska AI platforma latviešu valodā. Soli pa solim iemācies AI pakalpojumus un sāc pārdot tos reāliem uzņēmumiem.</E>
        <span className="text-[#00ff88]"> <E id="hero-sub-2">Bez teorijas. Tikai rezultāti.</E></span>
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center animate-slide-up">
        <a
          href="#start"
          className="btn-primary px-8 py-4 rounded-xl font-bold text-lg"
        >
          <E id="hero-cta-1">Sākt ceļu uz €500 →</E>
        </a>
        <a
          href="#courses"
          className="btn-secondary px-8 py-4 rounded-xl font-semibold text-lg"
        >
          <E id="hero-cta-2">Skatīt kursus</E>
        </a>
      </div>

      {/* Social proof */}
      <div className="mt-12 flex flex-wrap justify-center gap-8 px-6 animate-fade-in">
        {[
          { number: "8+", label: "AI pakalpojumi" },
          { number: "100%", label: "Praktisks saturs" },
          { number: "€500+", label: "Pirmie ienākumi" },
          { number: "LV", label: "Latviešu valodā" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-black gradient-text-green">{stat.number}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Ritini</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#00ff88] to-transparent" />
      </div>

      {/* Hero floating cards */}
      <div className="absolute right-8 top-1/3 hidden xl:block animate-float">
        <div className="glass rounded-2xl p-4 w-48">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
            <span className="text-xs text-gray-400">Pārdošana</span>
          </div>
          <div className="text-2xl font-black text-white">€850</div>
          <div className="text-xs text-gray-500">Pirmais klients</div>
          <div className="mt-2 h-1 rounded-full bg-gray-800">
            <div className="h-1 rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff]" style={{width:"75%"}} />
          </div>
        </div>
      </div>

      <div className="absolute left-8 top-1/2 hidden xl:block" style={{animationDelay:"2s"}}>
        <div className="glass rounded-2xl p-4 w-52 animate-float">
          <div className="text-xs text-gray-500 mb-2">✓ Kurss pabeigts</div>
          <div className="font-semibold text-white text-sm">Voice Agents ar Vapi</div>
          <div className="flex gap-1 mt-2">
            {["🤖","💼","💰"].map((e, i) => (
              <span key={i} className="text-base">{e}</span>
            ))}
          </div>
          <div className="mt-2 badge-neon text-xs">+€300/mēn</div>
        </div>
      </div>
    </section>
  );
}
