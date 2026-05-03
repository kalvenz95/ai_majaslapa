"use client";
import { useState } from "react";

const testimonials = [
  {
    name: "Mārtiņš K.",
    role: "Freelancer, Rīga",
    avatar: "M",
    color: "from-[#00ff88] to-[#00d4ff]",
    accentColor: "#00ff88",
    text: "Pēc 3 nedēļām Chademy uzrunāju pirmo klientu — restorānu Rīgā. Chatbot uzstādīšana aizgāja gludi, klients bija apmierināts. Tagad strādāju ar 4 klientiem paralēli pamata darbam.",
    rate: "€1,400/mēn",
    course: "Website Chatbot",
  },
  {
    name: "Laura B.",
    role: "Satura veidotāja, Jūrmala",
    avatar: "L",
    color: "from-[#a855f7] to-[#ec4899]",
    accentColor: "#a855f7",
    text: "AI faceless video kurss bija tieši tas, ko meklēju. Vienkāršs, prakstisks, bez liekām teorijām. Tagad vadu sociālo mediju saturu 3 vietējiem uzņēmumiem un pati plānoju savu laiku.",
    rate: "€900/mēn",
    course: "AI Faceless Video",
  },
  {
    name: "Raivis D.",
    role: "Mārketinga speciālists",
    avatar: "R",
    color: "from-[#f59e0b] to-[#ef4444]",
    accentColor: "#f59e0b",
    text: "Voice aģentu sistēmu zobārstniecībai saliku kopā pēc kursa. Klients ir sajūsmā — automātiski zvanu atgādinājumi strādā bez iejaukšanās. Projekts — €800, plus €200/mēn uzturēšana.",
    rate: "€800 + €200/mēn",
    course: "Voice Agents",
  },
  {
    name: "Sintija M.",
    role: "Uzņēmēja, Liepāja",
    avatar: "S",
    color: "from-[#00d4ff] to-[#6366f1]",
    accentColor: "#00d4ff",
    text: "Make.com workflow kurss man atvēra acis. Automātiski e-pasti, CRM, rēķini — viss bez rokām. Tagad piedāvāju šo kā pakalpojumu — man ir 5 pastāvīgi klienti.",
    rate: "€1,200/mēn",
    course: "Make.com Workflow",
  },
  {
    name: "Andris T.",
    role: "IT speciālists, Rīga",
    avatar: "A",
    color: "from-[#10b981] to-[#00ff88]",
    accentColor: "#10b981",
    text: "WhatsApp automāciju zobārstniecībai Rīgā pabeidzu 4 dienās. Build Pack saturs ir detalizēts un prakstisks — viss, kas nepieciešams, lai sāktu piedāvāt šādus risinājumus.",
    rate: "€600 projekts",
    course: "WhatsApp Automācija",
  },
  {
    name: "Elīna V.",
    role: "Grafikas dizainere",
    avatar: "E",
    color: "from-[#ec4899] to-[#f59e0b]",
    accentColor: "#ec4899",
    text: "AI attēlu kurss papildināja manus dizaina pakalpojumus. Tagad piedāvāju klientiem arī AI reklāmas bannerus. Darba apjoms dubultojies, bet laiks uz to — uz pusēm.",
    rate: "€600/mēn",
    course: "AI Attēlu Ģenerēšana",
  },
];

const stats = [
  { value: "3 ned.", label: "Vidējais laiks līdz pirmajam klientam" },
  { value: "94%", label: "Studentu apmierinātības rādītājs" },
  { value: "350+", label: "Aktīvi studenti Latvijā" },
  { value: "6+", label: "Kursā apgūstamie pakalpojumi" },
];

export default function Testimonials() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="results" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00d4ff] opacity-[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="badge-neon mb-4 inline-block"
            style={{ background: "rgba(0,212,255,0.1)", borderColor: "rgba(0,212,255,0.3)", color: "#00d4ff" }}
          >
            🏆 Reāli piemēri
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
            Cilvēki, kas jau{" "}
            <span className="gradient-text-cyan neon-text-cyan">strādā ar šiem pakalpojumiem</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Piemēri, kā Chademy prasmes var pārvērst reālos pakalpojumos uzņēmumiem.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <div className="text-2xl font-black gradient-text-green mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {testimonials.map((t, i) => {
            const isOpen = open === i;
            return (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: isOpen
                    ? `linear-gradient(135deg, ${t.accentColor}10, ${t.accentColor}04)`
                    : "rgba(255,255,255,0.03)",
                  boxShadow: isOpen ? `0 0 0 1px ${t.accentColor}25` : "none",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-sm text-black shrink-0`}
                  >
                    {t.avatar}
                  </div>

                  {/* Name + role */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white leading-none">{t.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{t.role}</div>
                  </div>

                  {/* Course tag */}
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-lg font-semibold hidden sm:block shrink-0"
                    style={{ background: `${t.accentColor}18`, color: t.accentColor, border: `1px solid ${t.accentColor}30` }}
                  >
                    {t.course}
                  </span>

                  {/* Rate */}
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold" style={{ color: t.accentColor }}>{t.rate}</div>
                  </div>

                  {/* Chevron */}
                  <svg
                    className="w-4 h-4 text-gray-500 shrink-0"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Quote */}
                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div className="px-5 pb-4">
                    <div
                      className="rounded-xl p-4 text-sm text-gray-300 leading-relaxed italic"
                      style={{ background: "rgba(255,255,255,0.04)", borderLeft: `3px solid ${t.accentColor}50` }}
                    >
                      "{t.text}"
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-lg font-semibold sm:hidden"
                        style={{ background: `${t.accentColor}18`, color: t.accentColor, border: `1px solid ${t.accentColor}30` }}
                      >
                        {t.course}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
