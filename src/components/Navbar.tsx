"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Kursi", href: "#courses" },
  { label: "Cenas", href: "#pricing" },
  { label: "Par mums", href: "#about" },
  { label: "Rezultāti", href: "#results" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
            <span className="text-black font-black text-sm">C</span>
          </div>
          <span className="font-black text-xl tracking-tight">
            Chad<span className="gradient-text-green">emy</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover:text-[#00ff88]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Pieslēgties
          </a>
          <a
            href="#start"
            className="btn-primary text-sm px-5 py-2.5 rounded-lg font-semibold"
          >
            Sākt bezmaksas →
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-[#00ff88] transition-colors text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="neon-line my-2" />
          <a href="#start" className="btn-primary text-center py-3 rounded-xl font-semibold">
            Sākt bezmaksas →
          </a>
        </div>
      )}
    </nav>
  );
}
