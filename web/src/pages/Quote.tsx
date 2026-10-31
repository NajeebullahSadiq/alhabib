import { useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productLabel } from "../components/ProductCard.tsx";
import { CATALOG, SITE, formatPrice } from "../data/catalog.ts";
import type { Category } from "../data/catalog.ts";
import { useLocale } from "../lib/locale.ts";
import { useTitle } from "../lib/useTitle.ts";
import { waLink } from "../lib/whatsapp.ts";

const groups: Category[] = ["tanks", "pipes", "bottles", "ballers"];

export function Quote() {
  const { t } = useTranslation();
  const locale = useLocale();
  useTitle(`${t("quote.title")} | ${t("meta.name")}`);
  const [params] = useSearchParams();
  const preselect = params.get("product");
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [mail, setMail] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const bulk = data.get("bulk") === "yes";
    if (!name || !phone) {
      setError(t("quote.error"));
      return;
    }
    const picks = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="pick"]:checked'));
    const lines = picks.map((box) => {
      const product = CATALOG.find((item) => item.id === box.value);
      const qty = form.querySelector<HTMLInputElement>(`input[data-qty="${box.value}"]`)?.value || "1";
      const label = product ? productLabel(t, product) : box.value;
      const price = formatPrice(product?.price ?? null, locale, t("price.ask"), t("price.currency"));
      return `${qty} × ${label} (${price})`;
    });
    setError("");
    const text = [
      t("wa.hello"),
      t("wa.quoteTitle"),
      `${t("quote.name")}: ${name}`,
      `${t("quote.phone")}: ${phone}`,
      city && `${t("quote.city")}: ${city}`,
      "",
      lines.length ? `${t("wa.products")}\n${lines.join("\n")}` : t("wa.advise"),
      bulk ? t("wa.bulk") : "",
      message && `\n${message}`,
    ].filter(Boolean).join("\n");
    const href = waLink(SITE.salesWa, text);
    setLink(href);
    setMail(`mailto:${SITE.email}?subject=${encodeURIComponent(t("wa.quoteTitle"))}&body=${encodeURIComponent(text)}`);
    window.open(href, "_blank", "noopener");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{t("quote.kicker")}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-navy">{t("quote.title")}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t("quote.lede", { phone: SITE.salesDisplay })}</p>
      <form key={preselect ?? "quote"} onSubmit={onSubmit} className="mt-8 grid gap-8" noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm text-muted">{t("quote.name")}
            <input name="name" className="rounded-xl border border-line bg-white px-3 py-2 text-ink" />
          </label>
          <label className="grid gap-1 text-sm text-muted">{t("quote.phone")}
            <input name="phone" className="rounded-xl border border-line bg-white px-3 py-2 text-ink" />
          </label>
          <label className="grid gap-1 text-sm text-muted">{t("quote.city")}
            <input name="city" className="rounded-xl border border-line bg-white px-3 py-2 text-ink" />
          </label>
          <label className="flex items-end gap-2 text-sm text-ink">
            <input type="checkbox" name="bulk" value="yes" />
            {t("quote.bulk")}
          </label>
        </div>
        {groups.map((group) => (
          <fieldset key={group} className="grid gap-2 border-0 p-0">
            <legend className="mb-2 font-display text-xl text-navy">{t(`categoryPlural.${group}`)}</legend>
            {CATALOG.filter((product) => product.category === group).map((product) => {
              const label = productLabel(t, product);
              return (
                <label key={product.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-line bg-white p-2 sm:grid-cols-[auto_4.5rem_1fr_auto]">
                  <input type="checkbox" name="pick" value={product.id} defaultChecked={product.id === preselect} />
                  <img src={product.image} alt="" className="hidden h-14 w-16 rounded-lg bg-mist object-contain sm:block" />
                  <span><strong>{label}</strong><br /><span className="text-sm text-muted">{formatPrice(product.price, locale, t("price.ask"), t("price.currency"))}</span></span>
                  <input type="number" min={1} defaultValue={1} data-qty={product.id} aria-label={t("quote.qty", { name: label })} className="w-16 rounded-lg border border-line px-2 py-1" />
                </label>
              );
            })}
          </fieldset>
        ))}
        <label className="grid gap-1 text-sm text-muted">{t("quote.message")}
          <textarea name="message" className="min-h-28 rounded-xl border border-line bg-white px-3 py-2 text-ink" />
        </label>
        {error && <p className="text-sm text-rose-800">{error}</p>}
        <button type="submit" className="w-fit rounded-full bg-amber px-5 py-3 font-semibold text-amber-ink">{t("quote.send")}</button>
        {link && <a href={link} target="_blank" rel="noreferrer" className="font-semibold text-brand-deep">{t("quote.open")}</a>}
        {mail && <a href={mail} className="font-semibold text-brand-deep">{t("quote.email")}</a>}
      </form>
    </section>
  );
}
