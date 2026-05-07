"use client";
import E from "@/components/E";

const footerLinks = {
  Platforma: ["Kursi", "Cenas", "Kopiena", "Sertifikāti", "Veidņu glabātuve"],
  Kursi: ["Sociālo tīklu pārvaldība", "Mājaslapas & automatizācija", "WhatsApp automatizācija", "Balss aģenti", "AI rīki"],
  Uzņēmums: ["Par Chademy", "Misija", "Kontakti", "Privātuma politika"],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", paddingTop: 64, paddingBottom: 32, padding: "64px 24px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: "var(--accent)", color: "var(--accent-ink)",
                display: "grid", placeItems: "center",
                fontWeight: 800, fontSize: 16, fontFamily: "Inter Tight, sans-serif",
              }}>C</div>
              <span className="font-display" style={{ fontSize: 18, color: "var(--ink)" }}>Chademy</span>
            </div>
            <p style={{ color: "var(--ink-3)", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
              <E id="footer-brand-desc">Latvijas pirmā praktiskā AI monetizācijas platforma. Iemācies, izveido, pārdod.</E>
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
              {["𝕏", "in", "▶"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="card"
                  style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--ink-3)", borderRadius: 9, textDecoration: "none", transition: "color 0.15s ease, border-color 0.15s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-3)"; e.currentTarget.style.borderColor = "var(--line)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "JetBrains Mono, monospace" }}>
                <E id="footer-newsletter-label">Saņem bezmaksas AI padomus</E>
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="tava@epasts.lv"
                  style={{
                    flex: 1, background: "var(--bg-2)", border: "1px solid var(--line)",
                    borderRadius: 10, padding: "9px 12px", fontSize: 14, color: "var(--ink)",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--line-2)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                />
                <button className="btn-primary" style={{ padding: "9px 16px", borderRadius: 10, fontSize: 14 }}>→</button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ fontWeight: 600, color: "var(--ink)", fontSize: 12, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "JetBrains Mono, monospace" }}>{category}</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ fontSize: 14, color: "var(--ink-3)", textDecoration: "none", transition: "color 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="neon-line" style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, fontSize: 13, color: "var(--ink-4)" }}>
          <span><E id="footer-copyright">© 2025 Chademy. Visas tiesības aizsargātas.</E></span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Veidots ar</span>
            <span style={{ color: "var(--accent)" }}>♥</span>
            <span>Latvijā</span>
            <span>🇱🇻</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ color: "var(--ink-4)", textDecoration: "none", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-4)")}>Noteikumi</a>
            <a href="#" style={{ color: "var(--ink-4)", textDecoration: "none", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-4)")}>Privātums</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
