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

  /** next-intl can return '' on `/lv`/`/en`; empty href breaks next/link locale switching */
  const pathWithoutLocale = !pathname || pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  const baseStyle: React.CSSProperties = {
    fontSize: 12,
    borderRadius: 8,
    padding: "6px 10px",
    textDecoration: "none",
    border: "1px solid var(--line)",
    color: "var(--ink-2)",
    background: "var(--bg-2)",
    fontFamily: "Inter Tight, sans-serif",
    fontWeight: 600,
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
  };

  const activeStyle: React.CSSProperties = {
    ...baseStyle,
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
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <button type="button" onClick={() => switchLocale("lv")} aria-pressed={locale === "lv"} style={locale === "lv" ? activeStyle : baseStyle}>
        {t("lv")}
      </button>
      <button type="button" onClick={() => switchLocale("en")} aria-pressed={locale === "en"} style={locale === "en" ? activeStyle : baseStyle}>
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, border-color 0.3s ease, padding 0.3s ease",
        background: scrolled ? "color-mix(in oklab, var(--bg) 90%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: "var(--accent)",
              color: "var(--accent-ink)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
              fontSize: 20,
              fontFamily: "Inter Tight, sans-serif",
              flexShrink: 0,
              boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 35%, transparent)",
            }}
          >
            C
          </div>
          <span className="font-display" style={{ fontSize: 22, color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Chademy
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ alignItems: "center", gap: 32 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 14,
                color: "var(--ink-3)",
                transition: "color 0.15s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
            >
              {link.label}
            </a>
          ))}
          <LocaleToggle />
        </div>

        {/* CTA */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
          {!isLoaded ? (
            <div style={{ width: 96, height: 32, borderRadius: 10, background: "var(--bg-2)" }} />
          ) : isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                style={{
                  fontSize: 14,
                  color: "var(--ink-3)",
                  transition: "color 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              >
                {t("myAccount")}
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="redirect">
                <button
                  style={{
                    fontSize: 14,
                    color: "var(--ink-3)",
                    transition: "color 0.15s ease",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                >
                  {t("signIn")}
                </button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="btn-primary" style={{ fontSize: 13, padding: "9px 18px", borderRadius: 10 }}>
                  {t("signUp")}
                </button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <LocaleToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            type="button"
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transition: "all 0.2s ease",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transition: "all 0.2s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transition: "all 0.2s ease",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            margin: "8px 16px 0",
            background: "var(--bg-1)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                padding: "12px 4px",
                textDecoration: "none",
                borderBottom: "1px solid var(--line)",
                display: "block",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: 16 }}>
            {isSignedIn ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link href="/dashboard" style={{ fontSize: 15, color: "var(--ink-2)", textDecoration: "none" }}>
                  {t("myAccount")}
                </Link>
                <UserButton />
              </div>
            ) : (
              <SignUpButton mode="redirect">
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  {t("signUp")}
                </button>
              </SignUpButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
