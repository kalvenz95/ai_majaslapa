"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type LocaleCode = "lv" | "en";

const LOCALES: { code: LocaleCode; native: string }[] = [
  { code: "lv", native: "Latviešu" },
  { code: "en", native: "English" },
];

/** Inline SVG flags — crisp at any size, no external CDN dependency. */
function Flag({ code }: { code: LocaleCode }) {
  const common: React.CSSProperties = {
    width: 22,
    height: 16,
    borderRadius: 4,
    flexShrink: 0,
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
    display: "block",
  };

  if (code === "lv") {
    return (
      <svg viewBox="0 0 20 12" style={common} aria-hidden>
        <rect width="20" height="12" fill="#9D2235" />
        <rect y="5" width="20" height="2" fill="#fff" />
      </svg>
    );
  }
  // English → Union Jack
  return (
    <svg viewBox="0 0 60 36" style={common} aria-hidden>
      <clipPath id="ujRound">
        <rect width="60" height="36" rx="3" />
      </clipPath>
      <clipPath id="ujDiag">
        <path d="M30,18 L60,0 V0 H60 M30,18 L60,36 H60 M30,18 L0,36 H0 M30,18 L0,0 H0 Z" />
      </clipPath>
      <g clipPath="url(#ujRound)">
        <rect width="60" height="36" fill="#012169" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="7" />
        <path d="M0,0 L60,36 M60,0 L0,36" clipPath="url(#ujDiag)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  );
}

function LocaleToggle({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const t = useTranslations("Lang");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /** next-intl can return '' on `/lv`/`/en`; empty href breaks next/link locale switching */
  const pathWithoutLocale = !pathname || pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    borderRadius: 10,
    padding: "6px 10px",
    border: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "var(--line)"}`,
    color: dark ? "rgba(255,255,255,0.85)" : "var(--ink-2)",
    background: dark
      ? (open ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)")
      : (open ? "var(--bg-1)" : "var(--bg-2)"),
    fontFamily: "Inter Tight, sans-serif",
    fontWeight: 700,
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
  };

  function switchLocale(next: LocaleCode) {
    setOpen(false);
    if (next === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathWithoutLocale}${hash}`, { locale: next });
  }

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={triggerStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 35%, transparent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = dark ? "rgba(255,255,255,0.18)" : "var(--line)";
        }}
      >
        <Flag code={locale} />
        <span>{t(locale)}</span>
        <svg
          width="11" height="11" viewBox="0 0 12 12" fill="none"
          style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "none", opacity: 0.6 }}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: 168,
              transformOrigin: "top right",
              background: "var(--bg-1)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: 6,
              boxShadow: "0 20px 44px -16px rgba(17,17,17,0.22), 0 2px 8px -2px rgba(17,17,17,0.06)",
              zIndex: 60,
            }}
          >
            {LOCALES.map(({ code, native }) => {
              const active = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => switchLocale(code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    textAlign: "left",
                    fontSize: 13,
                    borderRadius: 9,
                    padding: "9px 12px",
                    border: "none",
                    color: active ? "var(--ink)" : "var(--ink-2)",
                    background: active ? "color-mix(in oklab, var(--accent) 12%, transparent)" : "transparent",
                    fontFamily: "Inter Tight, sans-serif",
                    fontWeight: active ? 700 : 600,
                    cursor: "pointer",
                    transition: "background 0.15s ease, color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Flag code={code} />
                  <span style={{ flex: 1 }}>{native}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "var(--ink-3)" }}>
                    {t(code)}
                  </span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--accent)" }}>
                      <path d="M3 7.5L6 10.5L11 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The homepage opens on a dark hero — use light nav colours while at the top.
     Once scrolled (glass bg appears) or on other pages, revert to dark text. */
  const isHome = pathname === "/" || pathname === "";
  const overDark = isHome && !scrolled && !menuOpen;
  const logoInk = overDark ? "#fff" : "var(--ink)";
  const linkInk = overDark ? "rgba(255,255,255,0.72)" : "var(--ink-3)";
  const linkInkHover = overDark ? "#fff" : "var(--ink)";
  const barInk = overDark ? "#fff" : "var(--ink)";

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
          <span className="font-display" style={{ fontSize: 22, color: logoInk, fontWeight: 800, letterSpacing: "-0.02em", transition: "color 0.3s ease" }}>
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
                color: linkInk,
                transition: "color 0.15s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkInkHover)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkInk)}
            >
              {link.label}
            </a>
          ))}
          <LocaleToggle dark={overDark} />
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
                  color: linkInk,
                  transition: "color 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkInkHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkInk)}
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
                    color: linkInk,
                    transition: "color 0.15s ease",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkInkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkInk)}
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
          <LocaleToggle dark={overDark} />
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
                background: barInk,
                transition: "all 0.2s ease",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: barInk,
                transition: "all 0.2s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: barInk,
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
