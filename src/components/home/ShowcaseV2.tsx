"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight, Play, Pause, Mic, Phone, Check, Upload } from "lucide-react";

/* ── Website samples — real projects we've built ───────────────────── */
const SITES = [
  {
    title: "La Skrundo",
    niche: "Itāļu kafejnīca un restorāns",
    img: "/portfolio/la-skrundo.png",
    url: "https://la-skrundo.vercel.app",
    accent: "#00BFA5",
    glow: "0,191,165",
  },
  {
    title: "Dessert Eagle",
    niche: "Premium auto detailing studija",
    img: "/portfolio/dessert-deagle.png",
    url: "https://dessert-deagle-site.vercel.app",
    accent: "#6D5EF3",
    glow: "109,94,243",
  },
  {
    title: "Pity Store",
    niche: "Luksusa mājdzīvnieku zīmols",
    img: "/portfolio/pity-store.png",
    url: "https://pity-store.vercel.app/",
    accent: "#FFB86B",
    glow: "255,184,107",
  },
];

/* ── Voice agent samples — playable call recordings ────────────────── */
const VOICE_SAMPLES = [
  {
    biz: "Restorāns «Rīga»",
    scenario: "Galdiņa rezervācija",
    src: "/audio/restorans.mp3",
    fallback: 24,
    line: "«Labvakar! Vēlos rezervēt galdiņu četrām personām sestdien...»",
    result: "Rezervācija apstiprināta",
  },
  {
    biz: "Salons «Glow»",
    scenario: "Pieraksts pie meistara",
    src: "/audio/skaistumkopsana.mp3",
    fallback: 19,
    line: "«Sveiki! Gribu pierakstīties uz matu griezumu nākamnedēļ...»",
    result: "Pieraksts izveidots · piektdien 14:00",
  },
  {
    biz: "Auto serviss «Drive»",
    scenario: "Pieteikums remontam",
    src: "/audio/autoserviss.mp3",
    fallback: 27,
    line: "«Man jāpiesaka auto uz riepu maiņu, kad ir brīvs laiks?»",
    result: "Pieteikums reģistrēts · zvana atpakaļ",
  },
];

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const ACCENT = "#6D5EF3";
const ACCENT_2 = "#00BFA5";

/* Static waveform shape — bars animate (scaleY) only while playing. */
const WAVE = [0.35, 0.6, 0.45, 0.85, 0.55, 0.4, 0.9, 0.65, 1, 0.5, 0.75, 0.45, 0.8, 0.6, 0.35, 0.7, 0.5, 0.88, 0.55, 0.4, 0.72, 0.5, 0.62, 0.42];

function VoiceSampleCard({ sample, index }: { sample: (typeof VOICE_SAMPLES)[number]; index: number }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(sample.fallback);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedName, setUploadedName] = useState<string | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };
  useEffect(() => () => stopTimer(), []);

  /* Revoke the previous object URL whenever it changes or the card unmounts. */
  useEffect(() => {
    return () => { if (uploadedUrl) URL.revokeObjectURL(uploadedUrl); };
  }, [uploadedUrl]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUploadedUrl(url);
    setUploadedName(f.name);
    setCur(0);
    setDur(sample.fallback);
    setPlaying(false);
    stopTimer();
    // Reload the <audio> element with the new source.
    requestAnimationFrame(() => audioRef.current?.load());
    e.target.value = "";
  };

  const tick = () => {
    const a = audioRef.current;
    if (a && a.duration && isFinite(a.duration) && a.duration > 0 && !a.paused) {
      // real audio is playing
      setDur(a.duration);
      setCur(a.currentTime);
      if (a.ended) {
        setPlaying(false);
        setCur(0);
        stopTimer();
      }
    } else {
      // no audio file — simulate progress so the demo still reads
      setCur((prev) => {
        const next = prev + 0.1;
        if (next >= dur) {
          setPlaying(false);
          stopTimer();
          return 0;
        }
        return next;
      });
    }
  };

  const toggle = () => {
    const a = audioRef.current;
    if (playing) {
      a?.pause();
      setPlaying(false);
      stopTimer();
    } else {
      try {
        void a?.play().catch(() => {});
      } catch {
        /* file missing — simulation handles it */
      }
      setPlaying(true);
      stopTimer();
      timerRef.current = window.setInterval(tick, 100);
    }
  };

  const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;

  return (
    <Reveal delay={0.05 * index}>
      <article
        style={{
          position: "relative",
          borderRadius: 22,
          overflow: "hidden",
          background: "#0C0C12",
          border: "1px solid rgba(255,255,255,0.10)",
          padding: "22px 22px 20px",
          boxShadow: playing
            ? `0 30px 70px -28px rgba(109,94,243,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 22px 56px -30px rgba(13,13,20,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          transition: "box-shadow 0.35s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* top glow */}
        <div aria-hidden style={{ position: "absolute", top: -70, left: "50%", transform: "translateX(-50%)", width: 280, height: 160, pointerEvents: "none", background: `radial-gradient(50% 60% at 50% 40%, rgba(109,94,243,${playing ? 0.4 : 0.22}), transparent 75%)`, filter: "blur(6px)", transition: "background 0.35s ease" }} />

        {/* header */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg, ${ACCENT}, #8B7BFF)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 8px 20px -6px rgba(109,94,243,0.6)` }}>
            <Phone size={17} strokeWidth={2.2} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sample.biz}</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>{sample.scenario}</div>
          </div>
          <span style={{ fontSize: 9.5, fontFamily: "JetBrains Mono, monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A89DFF", background: "rgba(109,94,243,0.14)", border: "1px solid rgba(109,94,243,0.3)", borderRadius: 999, padding: "4px 9px" }}>AI</span>
        </div>

        {/* transcript line */}
        <p style={{ position: "relative", fontSize: 12.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.55, margin: "0 0 16px", fontStyle: "italic" }}>
          {sample.line}
        </p>

        {/* player row */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 13, marginTop: "auto" }}>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Apturēt" : "Atskaņot"}
            style={{
              width: 46, height: 46, borderRadius: 999, flexShrink: 0, cursor: "pointer",
              border: "none", display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${ACCENT}, #8B7BFF)`, color: "#fff",
              boxShadow: `0 10px 26px -8px rgba(109,94,243,0.7)`,
              transition: "transform 0.18s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.07)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
          >
            {playing ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" style={{ marginLeft: 2 }} />}
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* waveform */}
            <div style={{ display: "flex", alignItems: "center", gap: 2.5, height: 28, marginBottom: 7 }}>
              {WAVE.map((s, i) => {
                const active = (i / WAVE.length) * 100 <= pct;
                return (
                  <span
                    key={i}
                    className={playing ? "v2-wave-bar" : undefined}
                    style={{
                      flex: 1,
                      height: `${Math.max(18, s * 100)}%`,
                      borderRadius: 2,
                      transformOrigin: "center",
                      animationDelay: `${i * 0.06}s`,
                      background: active
                        ? `linear-gradient(180deg, ${ACCENT}, ${ACCENT_2})`
                        : "rgba(255,255,255,0.16)",
                      transition: "background 0.2s ease",
                    }}
                  />
                );
              })}
            </div>
            {/* time */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.45)" }}>
              <span>{fmt(cur)}</span>
              <span>{fmt(dur)}</span>
            </div>
          </div>
          {/* hidden native audio — plays uploaded file or the bundled sample */}
          <audio
            ref={audioRef}
            src={uploadedUrl ?? sample.src}
            preload="none"
            onEnded={() => { setPlaying(false); setCur(0); stopTimer(); }}
            onLoadedMetadata={(e) => {
              const d = (e.currentTarget as HTMLAudioElement).duration;
              if (d && isFinite(d) && d > 0) setDur(d);
            }}
          />
        </div>

        {/* upload own recording (plays locally in your browser) */}
        <div style={{ position: "relative", marginTop: 14 }}>
          <input ref={fileRef} type="file" accept="audio/*" onChange={onFile} style={{ display: "none" }} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "9px 12px", borderRadius: 11, cursor: "pointer",
              background: uploadedName ? "rgba(0,191,165,0.10)" : "rgba(255,255,255,0.04)",
              border: `1px dashed ${uploadedName ? "rgba(0,191,165,0.45)" : "rgba(255,255,255,0.18)"}`,
              color: uploadedName ? ACCENT_2 : "rgba(255,255,255,0.6)",
              fontSize: 11.5, fontWeight: 600, transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = uploadedName ? "rgba(0,191,165,0.65)" : "rgba(255,255,255,0.32)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = uploadedName ? "rgba(0,191,165,0.45)" : "rgba(255,255,255,0.18)"; }}
          >
            {uploadedName ? <Check size={13} strokeWidth={3} /> : <Upload size={13} strokeWidth={2.2} />}
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
              {uploadedName ? `${uploadedName} · uzspied ▶` : "Augšupielādēt savu ierakstu"}
            </span>
          </button>
        </div>

        {/* outcome */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, fontWeight: 600, color: ACCENT_2 }}>
          <span style={{ width: 18, height: 18, borderRadius: 999, flexShrink: 0, background: ACCENT_2, color: "#04221D", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Check size={11} strokeWidth={3.2} />
          </span>
          {sample.result}
        </div>
      </article>
    </Reveal>
  );
}

function SiteCard({ site, index }: { site: (typeof SITES)[number]; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={0.05 * index} style={{ height: "100%" }}>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 22,
          overflow: "hidden",
          textDecoration: "none",
          background: "var(--bg-1)",
          border: `1px solid ${hover ? `rgba(${site.glow},0.5)` : "var(--line)"}`,
          boxShadow: hover
            ? `0 34px 80px -30px rgba(${site.glow},0.5), 0 10px 24px -12px rgba(17,17,17,0.12)`
            : "var(--shadow-sm)",
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.34s cubic-bezier(0.16,1,0.3,1), box-shadow 0.34s ease, border-color 0.3s ease",
        }}
      >
        {/* Browser-framed screenshot */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#FF5F57" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#FEBC2E" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#28C840" }} />
            <span style={{ marginLeft: 8, fontSize: 10.5, color: "var(--ink-4)", fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          </div>
          <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "var(--bg-2)" }}>
            <Image
              src={site.img}
              alt={`${site.title} — ${site.niche}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "top", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
            />
            {/* hover view pill */}
            <span style={{
              position: "absolute", top: 12, right: 12,
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 11.5, fontWeight: 700, color: "#fff",
              padding: "6px 12px", borderRadius: 999,
              background: `rgba(${site.glow},0.92)`, backdropFilter: "blur(4px)",
              boxShadow: `0 8px 20px -6px rgba(${site.glow},0.7)`,
              opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}>
              Apskatīt <ArrowUpRight size={13} strokeWidth={2.6} />
            </span>
          </div>
        </div>

        {/* footer */}
        <div style={{ padding: "18px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 9, height: 9, borderRadius: 999, flexShrink: 0, background: site.accent, boxShadow: `0 0 10px ${site.accent}` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.2 }}>{site.title}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{site.niche}</div>
          </div>
          <ArrowUpRight size={18} strokeWidth={2.2} color={hover ? site.accent : "var(--ink-4)"} style={{ flexShrink: 0, transition: "color 0.25s ease" }} />
        </div>
      </a>
    </Reveal>
  );
}

export default function ShowcaseV2() {
  return (
    <section id="paraugi" style={{ padding: "140px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, margin: "0 auto 72px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">Mūsu klienti</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(38px, 6vw, 76px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              Paraugi, ko esam <span className="v2-grad">izveidojuši</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
              Īsti mājaslapu projekti un balss aģentu zvani — tieši tāda līmeņa darbus tu iemācīsies veidot un pārdot.
            </p>
          </Reveal>
        </div>

        {/* Websites */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
            <h3 className="showcase-subhead" style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.025em", color: "var(--ink)", margin: 0 }}>
              Mājaslapu paraugi
            </h3>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontSize: 12.5, color: "var(--ink-3)", fontWeight: 500 }}>Klikšķini, lai apskatītu →</span>
          </div>
        </Reveal>
        <div className="showcase-sites-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 90 }}>
          {SITES.map((s, i) => <SiteCard key={s.title} site={s} index={i} />)}
        </div>

        {/* Voice agents */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Mic size={19} strokeWidth={2.2} color={ACCENT} />
              <h3 className="showcase-subhead" style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.025em", color: "var(--ink)", margin: 0 }}>
                Balss aģentu paraugi
              </h3>
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontSize: 12.5, color: "var(--ink-3)", fontWeight: 500 }}>Uzspied ▶ un klausies</span>
          </div>
        </Reveal>
        <div className="showcase-voice-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {VOICE_SAMPLES.map((v, i) => <VoiceSampleCard key={v.biz} sample={v} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .showcase-sites-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .showcase-voice-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .showcase-sites-grid { grid-template-columns: 1fr !important; }
          .showcase-voice-grid { grid-template-columns: 1fr !important; }
          .showcase-subhead { font-size: 19px !important; }
        }
      `}</style>
    </section>
  );
}
