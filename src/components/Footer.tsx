"use client";
import E from "@/components/E";

const footerLinks = {
  Platforma: ["Kursi", "Cenas", "Kopiena", "Sertifikāti", "Veidņu glabātuve"],
  Kursi: ["AI Faceless Video", "AI Attēli", "Website Chatbot", "WhatsApp Bot", "Voice Agents", "Make.com / n8n"],
  Uzņēmums: ["Par Chademy", "Misija", "Kontakti", "Blog", "Privātuma politika"],
};

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] pt-16 pb-8 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6633ee]/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6633ee] to-[#4f46e5] flex items-center justify-center">
                <span className="text-white font-black text-sm">C</span>
              </div>
              <span className="font-black text-xl tracking-tight text-[#18181b]">
                Chad<span className="gradient-text-green">emy</span>
              </span>
            </div>
            <p className="text-[#71717a] text-sm leading-relaxed max-w-xs">
              <E id="footer-brand-desc">Latvijas pirmā praktiskā AI monetizācijas platforma. Iemācies, izveido, pārdod.</E>
            </p>
            <div className="mt-6 flex gap-3">
              {["𝕏", "in", "▶"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-sm text-[#71717a] hover:text-[#6633ee] hover:border-[#6633ee]/25 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-[#71717a] mb-2 uppercase tracking-wider"><E id="footer-newsletter-label">Saņem bezmaksas AI padomus</E></p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tava@epasts.lv"
                  className="flex-1 bg-black/[0.04] border border-black/[0.08] rounded-lg px-3 py-2 text-sm text-[#18181b] placeholder-[#9ca3af] focus:outline-none focus:border-[#6633ee]/40"
                />
                <button className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-[#18181b] text-sm mb-4 uppercase tracking-wider">{category}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#71717a] hover:text-[#18181b] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="neon-line mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9ca3af]">
          <span><E id="footer-copyright">© 2025 Chademy. Visas tiesības aizsargātas.</E></span>
          <div className="flex items-center gap-2">
            <span>Veidots ar</span>
            <span className="text-[#6633ee]">♥</span>
            <span>Latvijā</span>
            <span className="ml-2">🇱🇻</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#52525b] transition-colors">Noteikumi</a>
            <a href="#" className="hover:text-[#52525b] transition-colors">Privātums</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
