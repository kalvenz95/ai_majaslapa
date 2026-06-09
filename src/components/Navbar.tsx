"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function LocaleToggle() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Lang");

  const pathWithoutLocale = !pathname || pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  const base: React.CSSProperties = {
    fontSize: 11,
    borderRadius: 6,
    padding: "5px 9px",
    textDecoration: "none",
    border: "1px solid var(--line)",
    color: "var(--ink-3)",
    background: "transparent",
    fontFamily: "Inter Tight, sans-serif",
    fontWeight: 700,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
  };

  const active: React.CSSProperties = {
    ...base,
    borderColor: "color-mix(in oklab, var(--accent) 45%, transparent)",
    color: "var(--accent-ink)",
    background: "var(--accent)",
  };

  function switchLocale(next: "lv" | "en") {
    if (next === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathWithoutLocale}${hash}`, { locale: next });
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <button type="button" onClick={() => switchLocale("lv")} aria-pressed={locale === "lv"} style={locale === "lv" ? active : base}>
        {t("lv")}
      </button>
      <button type="button" onClick={() => switchLocale("en")} aria-pressed={locale === "en"} style={locale === "en" ? active : base}>
        {t("en")}
      </button>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("Navbar");
  const navLinks = [
    { label: t("courses"), href: "#courses" as const },
    { label: t("pricing"), href: "#pricing" as const },
    { label: t("about"), href: "#about" as const },
    { label: t("results"), href: "#results" as const },
  ];

  const { isSignedIn, isLoaded } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed full-width positioner */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "14px 16px 0",
          pointerEvents: "none",
        }}
      >
        {/* Floating pill */}
        <nav
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px 10px 14px",
            borderRadius: 999,
            border: `1px solid ${scrolled ? "var(--line)" : "color-mix(in oklab, var(--line) 70%, transparent)"}`,
            background: scrolled
              ? "color-mix(in oklab, var(--bg) 88%, transparent)"
              : "color-mix(in oklab, var(--bg) 70%, transparent)",
            backdropFilter: "blur(20px) saturate(1.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            boxShadow: scrolled
              ? "0 8px 32px -8px rgba(0,0,0,0.10), 0 1px 0 0 rgba(255,255,255,0.5) inset"
              : "none",
            transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
            pointerEvents: "auto",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 17, fontFamily: "Inter Tight, sans-serif", flexShrink: 0, boxShadow: "0 0 14px color-mix(in oklab, var(--accent) 30%, transparent)" }}>
              C
            </div>
            <span style={{ fontSize: 18, color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.025em", fontFamily: "Inter Tight, sans-serif" }}>
              Chademy
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{ alignItems: "center", gap: 28 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: 13.5, color: "var(--ink-3)", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: locale + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LocaleToggle />
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
              {!isLoaded ? (
                <div style={{ width: 80, height: 32, borderRadius: 999, background: "var(--bg-2)" }} />
              ) : isSignedIn ? (
                <>
                  <Link href="/dashboard" style={{ fontSize: 13, color: "var(--ink-3)", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                  >{t("myAccount")}</Link>
                  <UserButton />
                </>
              ) : (
                <>
                  <SignInButton mode="redirect">
                    <button style={{ fontSize: 13, color: "var(--ink-3)", background: "none", border: "none", cursor: "pointer", fontWeight: 500, transition: "color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                    >{t("signIn")}</button>
                  </SignInButton>
                  <SignUpButton mode="redirect">
                    <button style={{ fontSize: 13, fontWeight: 600, padding: "8px 18px", borderRadius: 999, background: "var(--accent)", color: "var(--accent-ink)", border: "none", cursor: "pointer", transition: "opacity 0.15s, transform 0.15s", fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.01em" }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.02)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                    >{t("signUp")}</button>
                  </SignUpButton>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "flex", flexDirection: "column", gap: 5, padding: "6px 4px", background: "none", border: "none", cursor: "pointer" }} className="md:hidden" type="button" aria-expanded={menuOpen} aria-label="Menu">
              <span style={{ display: "block", width: 20, height: 1.5, background: "var(--ink)", transition: "transform 0.22s cubic-bezier(0.32,0.72,0,1), opacity 0.22s", transformOrigin: "center", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
              <span style={{ display: "block", width: 20, height: 1.5, background: "var(--ink)", transition: "opacity 0.22s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 20, height: 1.5, background: "var(--ink)", transition: "transform 0.22s cubic-bezier(0.32,0.72,0,1)", transformOrigin: "center", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden" style={{ maxWidth: 1040, margin: "8px auto 0", background: "color-mix(in oklab, var(--bg) 92%, transparent)", border: "1px solid var(--line)", borderRadius: 20, padding: "20px 20px 16px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", flexDirection: "column", gap: 2, pointerEvents: "auto" }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: "var(--ink-2)", padding: "12px 4px", textDecoration: "none", borderBottom: "1px solid var(--line)", display: "block", fontWeight: 500 }}>
                {link.label}
              </a>
            ))}
            <div style={{ paddingTop: 14 }}>
              {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Link href="/dashboard" style={{ fontSize: 15, color: "var(--ink-2)", textDecoration: "none" }}>{t("myAccount")}</Link>
                  <UserButton />
                </div>
              ) : (
                <SignUpButton mode="redirect">
                  <button style={{ width: "100%", justifyContent: "center", fontSize: 14, fontWeight: 600, padding: "12px 20px", borderRadius: 999, background: "var(--accent)", color: "var(--accent-ink)", border: "none", cursor: "pointer" }}>
                    {t("signUp")}
                  </button>
                </SignUpButton>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
