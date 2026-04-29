"use client";
import E from "@/components/E";

const footerLinks = {
  Platforma: ["Kursi", "Cenas", "Kopiena", "Sertifikāti", "Veidņu glabātuve"],
  Kursi: ["AI Faceless Video", "AI Attēli", "Website Chatbot", "WhatsApp Bot", "Voice Agents", "Make.com / n8n"],
  Uzņēmums: ["Par Chademy", "Misija", "Kontakti", "Blog", "Privātuma politika"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-8 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
                <span className="text-black font-black text-sm">C</span>
              </div>
              <span className="font-black text-xl tracking-tight">
                Chad<span className="gradient-text-green">emy</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              <E id="footer-brand-desc">Latvijas pirmā praktiskā AI monetizācijas platforma. Iemācies, izveido, pārdod.</E>
            </p>
            <div className="mt-6 flex gap-3">
              {["𝕏", "in", "▶"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-sm text-gray-500 hover:text-[#00ff88] hover:border-[#00ff88]/30 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider"><E id="footer-newsletter-label">Saņem bezmaksas AI padomus</E></p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tava@epasts.lv"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff88]/40"
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
              <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">{category}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <span><E id="footer-copyright">© 2025 Chademy. Visas tiesības aizsargātas.</E></span>
          <div className="flex items-center gap-2">
            <span>Veidots ar</span>
            <span className="text-[#00ff88]">♥</span>
            <span>Latvijā</span>
            <span className="ml-2">🇱🇻</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Noteikumi</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privātums</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
