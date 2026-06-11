"use client";

import { VOICE_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { EmojiIcon } from "@/components/EmojiIcon";

const A = VOICE_MARKET_THEME.accentHex;
const AG = VOICE_MARKET_THEME.accentGradientCss;
const ABg = VOICE_MARKET_THEME.tintBg;
const ABorder = VOICE_MARKET_THEME.tintBorder;

function VideoIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor" /></svg>;
}

function Lesson1Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 8 }}>

      {/* Section 1 — Kas ir AI balss aģents */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>1. sadaļa</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>Kas ir AI balss aģents?</h2>

        {/* Image */}
        <div style={{ borderRadius: 16, overflow: "hidden", border: ABorder, marginBottom: 24, position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=85&fit=crop"
            alt="AI valodas modelis"
            style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.1) 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: `rgba(249,115,22,0.07)`, mixBlendMode: "multiply" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: "24px 28px" }}>
            <div style={{ fontSize: 11, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Mākslīgais intelekts + balss</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>AI, kas runā kā cilvēks —<br />bet strādā 24/7</div>
          </div>
        </div>

        <div style={{ fontSize: 15, color: "#ccc", lineHeight: 1.85, marginBottom: 20 }}>
          <strong style={{ color: "#fff" }}>AI balss aģents</strong> ir programmatūra, kas spēj sarunāties ar cilvēkiem pa tālruni <em>reāllaikā</em> — bez cilvēka klātbūtnes. Tas saprot dabisko valodu, uzdod jautājumus, pieņem lēmumus un atbild ar sintētisku, dabiski skanošu balsi.
        </div>

        {/* 3 key properties */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }} className="grid-3">
          {[
            { icon: "🧠", color: "#a855f7", title: "Saprot valodu", desc: "Atpazīst jautājumus, akcents, saīsinājumus un nestandarta frāzes" },
            { icon: "🎙️", color: A, title: "Runā dabīgi", desc: "ElevenLabs balsis ir tik reālistiskas, ka 80% cilvēku neatpazīst AI" },
            { icon: "⚡", color: "#00ff88", title: "Reaģē nekavējoties", desc: "Atbildes tiek ģenerētas 300–600ms laikā — ātrāk nekā cilvēks domā" },
          ].map((p) => (
            <div key={p.title} style={{ padding: "18px 16px", borderRadius: 12, background: "#0d0d1a", border: `1px solid ${p.color}22` }}>
              <div style={{ marginBottom: 10 }}><EmojiIcon emoji={p.icon} size={22} color={p.color} strokeWidth={1.75} /></div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0d0d1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>Aspekts</div>
            <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>Cilvēks receptors</div>
            <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.06em", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>AI balss aģents</div>
          </div>
          {[
            ["Darba laiks", "8h/dienā, 5 dienas", "24/7, bez pārtraukumiem"],
            ["Vienlaicīgie zvani", "1", "Neierobežoti"],
            ["Izmaksas/mēn", "800€–1500€ (alga)", "15€–60€ (rīki)"],
            ["Kļūdas", "Nogurums, aizmirstība", "Konsistents katru reizi"],
            ["Valodas", "1–2", "Jebkura (latviešu ieskaitot)"],
          ].map(([aspect, human, ai], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ padding: "11px 16px", fontSize: 13, color: "#aaa" }}>{aspect}</div>
              <div style={{ padding: "11px 16px", fontSize: 13, color: "#666", borderLeft: "1px solid rgba(255,255,255,0.04)" }}>{human}</div>
              <div style={{ padding: "11px 16px", fontSize: 13, color: "#00ff88", fontWeight: 600, borderLeft: "1px solid rgba(255,255,255,0.04)" }}>{ai}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)" }} />

      {/* Section 2 — Kā tas darbojas */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>2. sadaļa</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>Kā tas darbojas?</h2>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>
          AI balss aģents strādā kā konveijers — katrs zvans iziet cauri 5 posmiem mazāk kā 1 sekundē.
        </p>

        {/* Flow diagram */}
        <div style={{ borderRadius: 16, border: `1px solid ${ABorder}`, background: "#0a0a14", padding: "32px 24px", marginBottom: 28, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: 0, minWidth: 560, justifyContent: "center" }}>
            {[
              { step: "01", icon: "📱", label: "Klients zvana", sublabel: "Latvijas numurs", color: "#00ff88" },
              { step: "02", icon: "🎙️", label: "Balss → Teksts", sublabel: "Deepgram / Whisper", color: "#00d4ff" },
              { step: "03", icon: "🧠", label: "AI domā", sublabel: "Claude / GPT-4", color: A },
              { step: "04", icon: "🔊", label: "Teksts → Balss", sublabel: "ElevenLabs", color: "#a855f7" },
              { step: "05", icon: "✅", label: "Atbild klientam", sublabel: "< 600ms", color: "#f43f5e" },
            ].map((node, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 90 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: node.color, letterSpacing: "0.1em" }}>SOLIS {node.step}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${node.color}14`, border: `1.5px solid ${node.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {node.icon}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{node.label}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{node.sublabel}</div>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 4px", marginTop: -20 }}>
                    <div style={{ width: 28, height: 1.5, background: `linear-gradient(to right, ${node.color}60, ${arr[i+1].color}60)` }} />
                    <div style={{ fontSize: 10, color: "#333", marginTop: 2 }}>→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "#555" }}>Viss process aizņem </span>
            <span style={{ fontSize: 12, color: A, fontWeight: 700 }}>300–600 milisekundes</span>
            <span style={{ fontSize: 12, color: "#555" }}> — cilvēks to nejūt kā pauzi</span>
          </div>
        </div>

        {/* 3 layers explanation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              layer: "Kārta 1",
              title: "Balss atpazīšana (STT)",
              desc: "Kad klients sāk runāt, mikrofons uztver audio un Deepgram vai Whisper pārveido to tekstā reāllaikā. Šis process ir tik ātrs, ka var apstrādāt 3–5 vārdus jau pirms teikums beidzies.",
              tools: ["Deepgram", "Whisper", "AssemblyAI"],
              color: "#00d4ff",
              icon: "🎙️",
            },
            {
              layer: "Kārta 2",
              title: "AI smadzenes (LLM)",
              desc: "Teksts nonāk valodas modelī (Claude, GPT-4), kuram ir iepriekš iestatīts sistēmas promts ar biznesa informāciju — darba laiki, pakalpojumi, cenas. AI izlemj, ko atbildēt vai kādu darbību veikt.",
              tools: ["Claude Sonnet", "GPT-4o", "Gemini"],
              color: A,
              icon: "🧠",
            },
            {
              layer: "Kārta 3",
              title: "Balss sintēze (TTS)",
              desc: "AI atbilde tiek nosūtīta ElevenLabs, kas to pārvērš dabiskā balsī ar izvēlētu personību un toni. Klients dzird atbildi ar tādu pašu plūstamību kā no dzīva cilvēka.",
              tools: ["ElevenLabs", "Azure TTS", "OpenAI TTS"],
              color: "#a855f7",
              icon: "🔊",
            },
          ].map((layer) => (
            <div key={layer.layer} style={{ display: "flex", gap: 16, padding: "20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${layer.color}18` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${layer.color}14`, border: `1px solid ${layer.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {layer.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: layer.color, letterSpacing: "0.08em" }}>{layer.layer.toUpperCase()}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{layer.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, marginBottom: 10 }}>{layer.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {layer.tools.map((t) => (
                    <span key={t} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: `${layer.color}10`, border: `1px solid ${layer.color}25`, color: layer.color, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div style={{ marginTop: 24, padding: "20px 24px", borderRadius: 12, background: ABg, border: ABorder, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ko tas nozīmē tavai nišai?</div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>
              Zobārstam tas nozīmē: pacients zvana, aģents piedāvā brīvos laikus, rezervē tikšanos un nosūta apstiprinājumu — bez receptores. Restorānam — galda rezervācija naktī plkst. 2:00, kad neviens neatbild.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
function Lesson2Content() {
  const niches = [
    {
      icon: "🦷",
      title: "Zobārstniecība",
      color: "#00d4ff",
      earn: "800€–1 200€",
      volume: "Ļoti augsts",
      why: "Pacientu pieprasījums pēc pierakstiem ir nemainīgs un bieži notiek ārpus darba laika. Aģents pieņem zvanus vakarā un nedēļas nogalēs, kad receptore nav.",
      useCases: ["Pierakstu rezervācija", "Atgādinājumi par vizīti", "Atbildes par cenām un pakalpojumiem", "Steidzamu gadījumu filtrēšana"],
      stat: "~70% zvanu = pieraksts vai jautājums par cenām",
    },
    {
      icon: "🍽️",
      title: "Restorāni & Kafejnīcas",
      color: "#00ff88",
      earn: "500€–900€",
      volume: "Augsts",
      why: "Restorāni saņem simtiem zvanu par galda rezervāciju, ēdienkarti un darba laikiem — it īpaši vakarios, kad darbinieki ir aizņemti. AI aģents atbild uz visiem vienlaicīgi.",
      useCases: ["Galda rezervācija", "Ēdienkartes informācija", "Darba laiki un adrese", "Pasūtījumu pieņemšana (bāze)"],
      stat: "Vidēji 40–80 zvani/dienā vakara stundās",
    },
    {
      icon: "💆",
      title: "Skaistumkopšana & SPA",
      color: "#a855f7",
      earn: "400€–800€",
      volume: "Augsts",
      why: "Skaistumkopšanas saloni bieži palaiž garām klientus, jo meistari nevar atbildēt pie darba. AI aģents rezervē pierakstus pat tad, kad visi speciālisti ir aizņemti.",
      useCases: ["Pierakstu rezervācija pie konkrēta meistara", "Pakalpojumu un cenu skaidrošana", "Atgādinājumi par apmeklējumu", "Atcelšanas apstrāde"],
      stat: "Saloni zaudē 20–30% klientu neatbildētu zvanu dēļ",
    },
    {
      icon: "🏠",
      title: "Nekustamais Īpašums",
      color: "#f97316",
      earn: "1 000€–1 800€",
      volume: "Vidējs",
      why: "Brokeri nevar atbildēt uz katru pirmizrādīšanas pieprasījumu. AI aģents kvalificē lead — noskaidro budžetu, meklēto rajonu un vajadzīgos kvadrātmetrus — pirms brokerim vispār jāsazinās.",
      useCases: ["Lead kvalifikācija (budžets, rajons, istabas)", "Apskates pieteikšana", "Informācija par konkrētiem objektiem", "Kontaktinformācijas vākšana"],
      stat: "Brokeri ietaupa 3–5 st./dienā uz nekvalificētiem zvaniem",
    },
    {
      icon: "🚗",
      title: "Auto Serviss",
      color: "#fbbf24",
      earn: "600€–1 000€",
      volume: "Vidējs",
      why: "Auto servisi saņem daudz zvanu par servisa laiku, cenu aptuveni un automašīnas statusa pārbaudēm. Mehāniķi nevar atbildēt darba laikā — AI aģents to dara.",
      useCases: ["Servisa pierakstu rezervācija", "Aptuvenie cenu aprēķini", "Automašīnas gatavības statuss", "Darba laiki un pakalpojumu saraksts"],
      stat: "30–50% zvanu = standarta jautājumi, kas neprasa mehāniķi",
    },
    {
      icon: "🏥",
      title: "Ģimenes Ārsti & Klīnikas",
      color: "#f43f5e",
      earn: "800€–1 500€",
      volume: "Ļoti augsts",
      why: "Medicīnas iestādēs telefons zvana pastāvīgi. Aģents nodrošina, ka neviens pacients netiek ignorēts — pat agrā rītā vai vakarā, filtrē steidzamas situācijas un novirza uz ārstiem.",
      useCases: ["Pierakstu rezervācija pie ārstiem", "Analīžu rezultātu pieprasījumi", "Recepšu atjaunošanas pieprasījumi", "Steidzamu gadījumu identifikācija"],
      stat: "Klīnikas saņem 100–300 zvanus dienā",
    },
    {
      icon: "🏋️",
      title: "Sporta Zāles & Fitnesa Centri",
      color: "#22c55e",
      earn: "400€–700€",
      volume: "Vidējs",
      why: "Potenciālie biedri bieži zvana vakaros, lai uzzinātu par cenām un nodarbībām. Reģistrators nevar atbildēt pēc darba laika — AI aģents pārdod abonementus 24/7.",
      useCases: ["Cenu un abonementa informācija", "Nodarbību grafika skaidrošana", "Pieteikšanās uz izmēģinājuma treniņu", "Adrese un darba laiki"],
      stat: "50% jaunu biedru lēmums rodas pēc 18:00",
    },
    {
      icon: "⚖️",
      title: "Juridiskie Pakalpojumi",
      color: "#818cf8",
      earn: "1 000€–2 000€",
      volume: "Zems–Vidējs",
      why: "Juristi maksā augstu cenu par savu laiku. AI aģents veic pirmo klientu filtru — noskaidro lietas veidu, steidzamību un budžetu, pirms jurists iesaistās.",
      useCases: ["Konsultācijas pieteikšana", "Lietas veida noskaidrošana", "Juridiskās jomas informācija", "Dokumentu pieprasījumu apstrāde"],
      stat: "Jurists ietaupa 2–4 st./dienā uz sākotnējo filtrēšanu",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 8 }}>

      {/* Intro image */}
      <div style={{ borderRadius: 16, overflow: "hidden", border: ABorder, position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&fit=crop"
          alt="Latvijas biznesi"
          style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.2) 70%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `rgba(249,115,22,0.07)`, mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Latvijas tirgus</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 8 }}>
            8 nišas ar augstu<br />
            <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pieprasījumu pēc AI zvaniem</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Katrs bizness, kas saņem zvanus, ir potenciālais klients.</div>
        </div>
      </div>

      {/* Why these businesses callout */}
      <div style={{ padding: "20px 24px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 16 }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>🎯</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Kāpēc tieši šie biznesi?</div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
            AI balss aģents atmaksājas tur, kur ir <strong style={{ color: "#fff" }}>augsts zvanu apjoms</strong>, <strong style={{ color: "#fff" }}>atkārtoti jautājumi</strong> un <strong style={{ color: "#fff" }}>nepieciešamība strādāt ārpus darba laika</strong>. Šie trīs kritēriji nosaka, kurš bizness ir ideāls pirmais klients.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {["Augsts zvanu apjoms", "Atkārtoti jautājumi", "24/7 pieejamība", "Pierakstu vajadzība"].map((t) => (
              <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Niche cards */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>8 galvenās nišas</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>Kādiem biznesiem tas der Latvijā?</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {niches.map((niche, i) => (
            <div key={niche.title}
              style={{ borderRadius: 16, border: `1px solid ${niche.color}20`, background: "#0d0d1a", overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${niche.color}45`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${niche.color}20`)}
            >
              <div style={{ display: "flex", gap: 0 }}>
                {/* Left accent bar */}
                <div style={{ width: 4, flexShrink: 0, background: `linear-gradient(to bottom, ${niche.color}, ${niche.color}44)` }} />

                <div style={{ padding: "20px 22px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                    {/* Icon + number */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${niche.color}14`, border: `1px solid ${niche.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                        {niche.icon}
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 800, color: niche.color, letterSpacing: "0.06em" }}>#{i + 1}</span>
                    </div>

                    {/* Title + badges */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{niche.title}</span>
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: `${niche.color}14`, border: `1px solid ${niche.color}30`, color: niche.color, fontWeight: 700 }}>
                          {niche.earn}
                        </span>
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#555", fontWeight: 600 }}>
                          Zvanu apjoms: {niche.volume}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{niche.why}</p>
                    </div>
                  </div>

                  {/* Use cases + stat */}
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Ko aģents dara</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {niche.useCases.map((uc) => (
                          <div key={uc} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={niche.color} strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
                            <span style={{ fontSize: 12, color: "#aaa" }}>{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: 10, background: `${niche.color}08`, border: `1px solid ${niche.color}18`, alignSelf: "flex-start", maxWidth: 280 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: niche.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>📊 Fakts</div>
                      <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{niche.stat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Kopsavilkums</div>
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#0d0d1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Niša", "Projekta cena", "Zvanu apjoms", "Prioritāte"].map((h) => (
              <div key={h} style={{ padding: "10px 14px", fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{h}</div>
            ))}
          </div>
          {[
            { name: "Zobārstniecība", price: "800€–1 200€", volume: "Ļoti augsts", priority: "⭐⭐⭐", pColor: "#00d4ff" },
            { name: "Ģimenes ārsti", price: "800€–1 500€", volume: "Ļoti augsts", priority: "⭐⭐⭐", pColor: "#f43f5e" },
            { name: "Restorāni", price: "500€–900€", volume: "Augsts", priority: "⭐⭐⭐", pColor: "#00ff88" },
            { name: "Skaistumkopšana", price: "400€–800€", volume: "Augsts", priority: "⭐⭐⭐", pColor: "#a855f7" },
            { name: "Nekustamais īpašums", price: "1 000€–1 800€", volume: "Vidējs", priority: "⭐⭐", pColor: "#f97316" },
            { name: "Auto serviss", price: "600€–1 000€", volume: "Vidējs", priority: "⭐⭐", pColor: "#fbbf24" },
            { name: "Sporta zāles", price: "400€–700€", volume: "Vidējs", priority: "⭐⭐", pColor: "#22c55e" },
            { name: "Juridiskie pakalpojumi", price: "1 000€–2 000€", volume: "Zems–Vidējs", priority: "⭐", pColor: "#818cf8" },
          ].map((row, i) => (
            <div key={row.name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ padding: "10px 14px", fontSize: 13, color: "#ddd", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{row.name}</div>
              <div style={{ padding: "10px 14px", fontSize: 13, color: row.pColor, fontWeight: 600, borderRight: "1px solid rgba(255,255,255,0.04)" }}>{row.price}</div>
              <div style={{ padding: "10px 14px", fontSize: 13, color: "#666", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{row.volume}</div>
              <div style={{ padding: "10px 14px", fontSize: 13 }}>{row.priority}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final tip */}
      <div style={{ padding: "20px 24px", borderRadius: 12, background: ABg, border: ABorder, display: "flex", gap: 14 }}>
        <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ieteikums pirmajai nišai</div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
            Sāc ar <strong style={{ color: A }}>zobārstniecību vai skaistumkopšanu</strong> — augsts zvanu apjoms, vienkārša saruna (tikai pieraksts), un uzņēmumi labi saprot ROI. Šīs nišas ir ideālas pirmajam demo, ko vari izveidot un parādīt 1 dienā.
          </p>
        </div>
      </div>

    </div>
  );
}

export function VoiceLessonExtraBelowDescription({ lessonId }: { lessonId: string }) {
  if (lessonId === "1-1") return <Lesson1Content />;
  if (lessonId === "1-2") return <Lesson2Content />;
  return null;
}
