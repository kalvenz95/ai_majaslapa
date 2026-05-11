"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const navLinks = [
  { label: "Kursi", href: "#courses" },
  { label: "Cenas", href: "#pricing" },
  { label: "Par mums", href: "#about" },
  { label: "Rezultāti", href: "#results" },
];

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.3s ease, border-color 0.3s ease, padding 0.3s ease",
        background: scrolled ? "color-mix(in oklab, var(--bg) 90%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "var(--accent)", color: "var(--accent-ink)",
            display: "grid", placeItems: "center",
            fontWeight: 800, fontSize: 16, fontFamily: "Inter Tight, sans-serif",
          }}>C</div>
          <span className="font-display" style={{ fontSize: 18, color: "var(--ink)" }}>
            Chademy
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ alignItems: "center", gap: 32 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: 14, color: "var(--ink-3)", transition: "color 0.15s ease", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
          {!isLoaded ? (
            <div style={{ width: 96, height: 32, borderRadius: 10, background: "var(--bg-2)" }} />
          ) : isSignedIn ? (
            <>
              <a href="/dashboard" style={{ fontSize: 14, color: "var(--ink-3)", transition: "color 0.15s ease", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}>
                Mans konts
              </a>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="redirect">
                <button style={{ fontSize: 14, color: "var(--ink-3)", transition: "color 0.15s ease", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}>
                  Pieslēgties
                </button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px", borderRadius: 10 }}>
                  Sākt bezmaksas →
                </button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "flex", flexDirection: "column", gap: 5, padding: 8, background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)", transition: "all 0.2s ease", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)", transition: "all 0.2s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)", transition: "all 0.2s ease", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          margin: "8px 16px 0",
          background: "var(--bg-1)",
          border: "1px solid var(--line)",
          borderRadius: 18,
          padding: 24,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, color: "var(--ink-2)", padding: "12px 4px", textDecoration: "none", borderBottom: "1px solid var(--line)", display: "block" }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: 16 }}>
            {isSignedIn ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <a href="/dashboard" style={{ fontSize: 15, color: "var(--ink-2)", textDecoration: "none" }}>Mans konts</a>
                <UserButton />
              </div>
            ) : (
              <SignUpButton mode="redirect">
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Sākt bezmaksas →
                </button>
              </SignUpButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
