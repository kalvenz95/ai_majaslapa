"use client";

const points = [
  { icon: "⚡", text: "Pieprasīta prasme biznesā" },
  { icon: "🧠", text: "Nav nepieciešama programmēšana" },
  { icon: "💼", text: "Pakalpojumi, ko uzņēmumi jau meklē" },
  { icon: "💰", text: "Iespēja veidot ikmēneša ienākumus" },
];

export default function WhyAI() {
  return (
    <section className="relative py-20 px-6 flex justify-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main card */}
      <div
        className="relative w-full"
        style={{
          maxWidth: "960px",
          background: "linear-gradient(160deg, rgba(0,20,30,0.95) 0%, rgba(2,10,20,0.98) 100%)",
          border: "1px solid rgba(0,255,200,0.2)",
          borderRadius: "28px",
          padding: "clamp(28px, 6vw, 64px)",
          boxShadow: "0 0 60px rgba(0,212,255,0.06), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,255,200,0.08)",
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }}
        />

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "#00d4ff",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#00d4ff", boxShadow: "0 0 6px #00d4ff" }}
            />
            AI ir jaunā biznesa prasme
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-center font-black mb-10"
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            color: "#fff",
          }}
        >
          Kāpēc šī prasme ir{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00ff88, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tik pieprasīta?
          </span>
        </h2>

        {/* Inner info card */}
        <div
          className="mb-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,255,200,0.1)",
            borderRadius: "16px",
            padding: "clamp(20px, 4vw, 32px)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <div key={p.text} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.15)",
                  }}
                >
                  {p.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-black text-sm"
                    style={{ color: "#00d4ff" }}
                  >
                    +
                  </span>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {p.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div
          className="mb-10 space-y-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "12px",
            padding: "clamp(16px, 3vw, 24px)",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.75" }}
          >
            Mākslīgais intelekts kļūst par vienu no augstāk novērtētajām un pieprasītākajām prasmēm
            biznesā — uzņēmumiem ir vajadzīgi cilvēki, kas ar to palīdz samazināt izmaksas, strādāt
            efektīvāk un iegūt vairāk klientu.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.75" }}
          >
            Mēs parādām, kā izveidot augstvērtīgu AI pakalpojumu un produktu, un soli pa solim
            iemācām, kā to piedāvāt uzņēmumiem un attīstīt kā savu ikmēneša ienākumu avotu.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#courses"
            className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #00ff88)",
              color: "#000",
              boxShadow: "0 0 30px rgba(0,212,255,0.25), 0 8px 24px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 50px rgba(0,212,255,0.45), 0 8px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 30px rgba(0,212,255,0.25), 0 8px 24px rgba(0,0,0,0.3)";
            }}
          >
            Skatīt, kā tas strādā →
          </a>
        </div>
      </div>
    </section>
  );
}
