import { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet, ScrollRestoration, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Menu, X } from "lucide-react";
import { SITE } from "../data/catalog.ts";
import i18n from "../i18n/index.ts";
import { isLocale, usePath, useSwitchLocale } from "../lib/locale.ts";
import type { Locale } from "../lib/locale.ts";
import { generalLink } from "../lib/whatsapp.ts";

const LOCALES: { id: Locale; label: string; lang: string }[] = [
  { id: "en", label: "EN", lang: "en" },
  { id: "fa", label: "دری", lang: "fa-AF" },
  { id: "ps", label: "پښتو", lang: "ps-AF" },
];

function itemClass(active: boolean, night: boolean): string {
  const focus = "whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua";
  if (night) {
    return `rounded-full px-3 py-2 text-sm no-underline ${focus} ${active ? "bg-white/15 font-semibold text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`;
  }
  return `rounded-full px-3 py-2 text-sm no-underline ${focus} ${active ? "bg-mist font-semibold text-brand-deep" : "text-ink"}`;
}

export function LocaleGate() {
  const { locale } = useParams();
  const location = useLocation();
  if (!isLocale(locale)) {
    return <Navigate to={`/en${location.pathname}${location.search}${location.hash}`} replace />;
  }
  return <Layout locale={locale} />;
}

export function ToEnglish() {
  const location = useLocation();
  const base = location.pathname === "/" ? "/en" : `/en${location.pathname}`;
  return <Navigate to={`${base}${location.search}${location.hash}`} replace />;
}

function Layout({ locale }: { locale: Locale }) {
  const { t } = useTranslation();
  const path = usePath();
  const switchLocale = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const night = location.pathname === `/${locale}` || location.pathname === `/${locale}/`;

  useEffect(() => {
    document.documentElement.lang = locale === "fa" ? "fa-AF" : locale === "ps" ? "ps-AF" : "en";
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
    void i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  const mainLinks = [
    { to: path("/"), label: t("nav.home"), end: true },
    { to: path("/about"), label: t("nav.about"), end: false },
    { to: path("/products"), label: t("nav.products"), end: false },
    { to: path("/bottles"), label: t("nav.bottles"), end: false },
    { to: path("/pipes"), label: t("nav.pipes"), end: false },
    { to: path("/ballers"), label: t("nav.ballers"), end: false },
    { to: path("/gallery"), label: t("nav.gallery"), end: false },
    { to: path("/contact"), label: t("nav.contact"), end: false },
  ];
  const tankLinks = [
    { to: path("/water-tanks"), label: t("nav.allTanks") },
    { to: path("/water-tanks?line=featured"), label: t("line.featured") },
    { to: path("/water-tanks?line=simple"), label: t("line.simple") },
    { to: path("/water-tanks?line=standard"), label: t("line.standard") },
    { to: path("/water-tanks?line=catalog"), label: t("line.catalog") },
  ];

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-amber focus:px-3 focus:py-2">{t("nav.skip")}</a>
      <div className="bg-navy text-sm text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
          <span className="inline-flex items-center gap-2"><MapPin size={16} aria-hidden /> {t("city")}</span>
          <a className="text-white no-underline" href={generalLink(t("wa.hello"))}>{SITE.phoneDisplay}</a>
        </div>
      </div>
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${night ? "border-white/10 bg-night/90 text-white" : "border-line bg-white/95"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <NavLink to={path("/")} className={`flex items-center gap-3 no-underline ${night ? "text-white" : "text-navy"}`}>
            <img src="/img/brand/logo.png" alt="" className="h-12 w-12 object-contain" />
            <span className="hidden xl:block">
              <strong className="block font-display text-sm tracking-tight">{t("meta.name")}</strong>
            </span>
          </NavLink>
          <nav className="hidden items-center gap-1 lg:flex" aria-label={t("nav.primary")}>
            {mainLinks.slice(0, 3).map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => itemClass(isActive, night)}>{link.label}</NavLink>
            ))}
            <div className="group relative">
              <NavLink to={path("/water-tanks")} className={({ isActive }) => itemClass(isActive, night)}>{t("nav.tanks")}</NavLink>
              <div className={`invisible absolute start-0 top-full z-20 grid min-w-48 rounded-2xl border p-2 opacity-0 shadow-lg group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${night ? "border-white/10 bg-[#101433]" : "border-line bg-white"}`}>
                {tankLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className={`rounded-xl px-3 py-2 text-sm no-underline ${night ? "text-white hover:bg-white/10" : "text-ink hover:bg-mist"}`}>{link.label}</NavLink>
                ))}
              </div>
            </div>
            {mainLinks.slice(3).map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => itemClass(isActive, night)}>{link.label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1" role="group" aria-label={t("nav.language")}>
              {LOCALES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  lang={item.lang}
                  onClick={() => switchLocale(item.id)}
                  className={`rounded-full px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${item.id === "en" ? "" : "font-bahij"} ${locale === item.id ? (night ? "bg-white font-semibold text-navy" : "bg-navy text-white") : night ? "text-white/80" : "text-ink"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <NavLink to={path("/quote")} className="hidden rounded-full bg-amber px-4 py-2 text-sm font-semibold text-amber-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-ink sm:inline-flex">{t("nav.quote")}</NavLink>
            <button type="button" className={`rounded-full border px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua lg:hidden ${night ? "border-white/25 bg-white/5 text-white" : "border-line bg-white text-ink"}`} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
              {open ? <X size={18} /> : <Menu size={18} />}
              <span className="sr-only">{t("nav.menu")}</span>
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className={`grid border-t px-4 py-3 lg:hidden ${night ? "border-white/10 bg-night" : "border-line bg-white"}`} aria-label={t("nav.mobile")}>
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => itemClass(isActive, night)}>{link.label}</NavLink>
            ))}
            {tankLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={`rounded-full px-3 py-2 text-sm no-underline ${night ? "text-white/85" : "text-ink"}`}>{link.label}</NavLink>
            ))}
            <NavLink to={path("/quote")} className="mt-2 rounded-full bg-amber px-4 py-3 text-center font-semibold text-amber-ink no-underline">{t("nav.quote")}</NavLink>
          </nav>
        )}
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="mt-16 bg-navy text-slate-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-white">
              <img src="/img/brand/logo.png" alt="" className="h-12 w-12 object-contain" />
            </div>
            <p>{t("footer.blurb")}</p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-base text-white">{t("nav.explore")}</h2>
            <NavLink to={path("/about")} className="block py-1 text-slate-200 no-underline">{t("nav.about")}</NavLink>
            <NavLink to={path("/products")} className="block py-1 text-slate-200 no-underline">{t("nav.products")}</NavLink>
            <NavLink to={path("/water-tanks")} className="block py-1 text-slate-200 no-underline">{t("nav.tanks")}</NavLink>
            <NavLink to={path("/gallery")} className="block py-1 text-slate-200 no-underline">{t("nav.gallery")}</NavLink>
            <NavLink to={path("/privacy")} className="block py-1 text-slate-200 no-underline">{t("nav.privacy")}</NavLink>
          </div>
          <div>
            <h2 className="mb-2 font-display text-base text-white">{t("nav.contact")}</h2>
            <p className="inline-flex items-center gap-2"><MapPin size={16} aria-hidden /> {t("city")}</p>
            <a className="mt-1 inline-flex items-center gap-2 text-slate-200 no-underline" href={`mailto:${SITE.email}`}><Mail size={16} aria-hidden /> {SITE.email}</a>
            <a className="mt-1 block text-slate-200 no-underline" href={generalLink(t("wa.hello"))}>WhatsApp {SITE.phoneDisplay}</a>
            <a className="mt-1 block text-slate-200 no-underline" href={`https://wa.me/${SITE.salesWa}`}>{t("footer.orders", { phone: SITE.salesDisplay })}</a>
          </div>
          <div>
            <h2 className="mb-2 font-display text-base text-white">{t("nav.follow")}</h2>
            {SITE.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="block py-1 text-slate-200 no-underline">{social.label}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-sm">{t("footer.rights", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
      <a href={generalLink(t("wa.hello"))} target="_blank" rel="noreferrer" aria-label={t("nav.whatsapp")} className="fixed end-4 bottom-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1fa855] shadow-lg">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
          <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" />
        </svg>
      </a>
      <ScrollRestoration />
    </>
  );
}
