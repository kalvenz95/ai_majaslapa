"use client";
import E from "@/components/E";

const testimonials = [
  {
    name: "Mārtiņš K.",
    role: "Freelancer, Rīga",
    avatar: "M",
    color: "from-[#6633ee] to-[#4f46e5]",
    text: "Pēc 3 nedēļām Chademy ieguvu pirmo klientu — restorānu Rīgā. €350 par chatbot uzstādīšanu. Tagad strādāju ar 4 klientiem un nopelnu vairāk nekā pamata darbā.",
    earn: "+€1,400/mēn",
    course: "Website Chatbot",
  },
  {
    name: "Laura B.",
    role: "Satura veidotāja, Jūrmala",
    avatar: "L",
    color: "from-[#a855f7] to-[#ec4899]",
    text: "AI faceless video kurss bija tieši tas, ko meklēju. Vienkāršs, prakstisks, bez liekām teorijām. Tagad vadu sociālo mediju saturu 3 vietējiem uzņēmumiem.",
    earn: "+€900/mēn",
    course: "AI Faceless Video",
  },
  {
    name: "Raivis D.",
    role: "Mārketinga speciālists",
    avatar: "R",
    color: "from-[#f59e0b] to-[#ef4444]",
    text: "Voice agent Vapi kursā saliku kopā visu sistēmu zobārstemd. Klients ir sajūsmā — automātiski piezvanīšanas atgādinājumi. Iekasēju €800 vienreiz + €200/mēn support.",
    earn: "+€800 + €200/mēn",
    course: "Voice Agents",
  },
  {
    name: "Sintija M.",
    role: "Uzņēmēja, Liepāja",
    avatar: "S",
    color: "from-[#6633ee] to-[#6366f1]",
    text: "Make.com workflow kurss man atvēra acis. Automātiski e-pasti, CRM, rēķini — viss bez rokām. Pārdodu šo kā pakalpojumu un man ir 5 ikmēneša klienti.",
    earn: "+€1,200/mēn",
    course: "Make.com Workflow",
  },
  {
    name: "Andris T.",
    role: "IT speciālists, Rīga",
    avatar: "A",
    color: "from-[#7c3aed] to-[#6633ee]",
    text: "WhatsApp automācija zobārstniecībai Rīgā — €600 projekts, izpildīts 4 dienās. Build Pack saturs ir nākamā līmeņa. Iesaku visiem, kas grib nopietnus ienākumus.",
    earn: "+€600 vienreiz",
    course: "WhatsApp Automācija",
  },
  {
    name: "Elīna V.",
    role: "Grafikas dizainere",
    avatar: "E",
    color: "from-[#ec4899] to-[#f59e0b]",
    text: "AI attēlu kurss papildināja manos dizaina pakalpojumus. Tagad piedāvāju klientiem arī AI reklāmas bannerus. Darba apjoms dubultojies, laiks — uz pusēm.",
    earn: "+€600/mēn",
    course: "AI Attēlu Ģenerēšana",
  },
];

const stats = [
  { value: "€1,200+", label: "Vidējie mēneša ienākumi pēc 60 dienām" },
  { value: "3 ned.", label: "Vidējais laiks līdz pirmajam klientam" },
  { value: "94%", label: "Studentu apmierinātības rādītājs" },
  { value: "350+", label: "Aktīvi studenti Latvijā" },
];

export default function Testimonials() {
  return (
    <section id="results" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6633ee]/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-neon mb-4 inline-block">
            <E id="testimonials-badge">🏆 Reāli rezultāti</E>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mb-4">
            <E id="testimonials-h2-1">Studenti, kas</E>{" "}
            <span className="gradient-text-cyan"><E id="testimonials-h2-accent">jau nopelna</E></span>
          </h2>
          <p className="text-[#52525b] text-lg max-w-xl mx-auto">
            <E id="testimonials-subtitle">Latvieši, kas izmantoja Chademy un sāka pārdot AI pakalpojumus reāliem uzņēmumiem.</E>
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="text-3xl font-black gradient-text-green mb-1">{s.value}</div>
              <div className="text-xs text-[#71717a] leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 card-hover flex flex-col gap-4 relative">
              {/* Quote mark */}
              <div className="absolute top-4 right-5 text-4xl text-black/5 font-serif select-none">"</div>

              {/* Course tag */}
              <div className="tag text-xs self-start">{t.course}</div>

              {/* Text */}
              <p className="text-[#374151] text-sm leading-relaxed flex-1">"<E id={`t-${t.name.replace(/\s/g,'-')}-text`}>{t.text}</E>"</p>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-3 border-t border-black/5">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-sm text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[#18181b] text-sm"><E id={`t-${t.name.replace(/\s/g,'-')}-name`}>{t.name}</E></div>
                    <div className="text-xs text-[#71717a]"><E id={`t-${t.name.replace(/\s/g,'-')}-role`}>{t.role}</E></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#6633ee]"><E id={`t-${t.name.replace(/\s/g,'-')}-earn`}>{t.earn}</E></div>
                  <div className="text-xs text-[#9ca3af]">ienākumi</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
