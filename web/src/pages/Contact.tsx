import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin } from "lucide-react";
import { SITE } from "../data/catalog.ts";
import { useTitle } from "../lib/useTitle.ts";
import { generalLink, waLink } from "../lib/whatsapp.ts";

export function Contact() {
  const { t } = useTranslation();
  useTitle(`${t("contact.title")} | ${t("meta.name")}`);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    if (!name || !message) {
      setError(t("contact.error"));
      setLink("");
      return;
    }
    setError("");
    const text = [t("wa.hello"), `${t("contact.name")}: ${name}`, email && `${t("contact.email")}: ${email}`, phone && `${t("contact.phone")}: ${phone}`, address && `${t("contact.address")}: ${address}`, "", message].filter(Boolean).join("\n");
    const href = waLink(SITE.phoneWa, text);
    setLink(href);
    window.open(href, "_blank", "noopener");
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
      <div>
        <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{t("contact.kicker")}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-navy">{t("contact.title")}</h1>
        <p className="mt-3 text-muted">{t("contact.lede")}</p>
        <ul className="mt-6 grid list-none gap-3 p-0">
          <li className="inline-flex items-center gap-2"><MapPin size={18} aria-hidden /> {t("city")}</li>
          <li><a className="inline-flex items-center gap-2 text-brand-deep" href={`mailto:${SITE.email}`}><Mail size={18} aria-hidden /> {SITE.email}</a></li>
          <li><a className="text-brand-deep" href={generalLink(t("wa.hello"))}>WhatsApp {SITE.phoneDisplay}</a></li>
          <li><a className="text-brand-deep" href={`https://wa.me/${SITE.salesWa}`}>{t("contact.orders", { phone: SITE.salesDisplay })}</a></li>
        </ul>
      </div>
      <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border border-line bg-white p-5" noValidate>
        <label className="grid gap-1 text-sm text-muted">{t("contact.name")}
          <input name="name" className="rounded-xl border border-line px-3 py-2 text-ink" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm text-muted">{t("contact.email")}
            <input name="email" type="email" className="rounded-xl border border-line px-3 py-2 text-ink" />
          </label>
          <label className="grid gap-1 text-sm text-muted">{t("contact.phone")}
            <input name="phone" className="rounded-xl border border-line px-3 py-2 text-ink" />
          </label>
        </div>
        <label className="grid gap-1 text-sm text-muted">{t("contact.address")}
          <input name="address" className="rounded-xl border border-line px-3 py-2 text-ink" />
        </label>
        <label className="grid gap-1 text-sm text-muted">{t("contact.message")}
          <textarea name="message" className="min-h-32 rounded-xl border border-line px-3 py-2 text-ink" />
        </label>
        {error && <p className="text-sm text-rose-800">{error}</p>}
        <button type="submit" className="rounded-full bg-navy px-5 py-3 font-semibold text-white">{t("contact.send")}</button>
        {link && <a href={link} target="_blank" rel="noreferrer" className="font-semibold text-brand-deep">{t("contact.open")}</a>}
      </form>
    </section>
  );
}
