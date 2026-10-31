import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../data/catalog.ts";
import type { Product } from "../data/catalog.ts";
import { useLocale, usePath } from "../lib/locale.ts";
import { orderLink } from "../lib/whatsapp.ts";

export function productLabel(translate: (key: string, options?: { defaultValue?: string }) => string, product: Product): string {
  return translate(`products.${product.id}`, { defaultValue: product.name });
}

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const locale = useLocale();
  const path = usePath();
  const name = productLabel(t, product);
  const ask = product.price == null;
  const price = formatPrice(product.price, locale, t("price.ask"), t("price.currency"));
  const bits = [t(`category.${product.category}`)];
  if (product.line) bits.push(t(`line.${product.line}`));
  if (product.shape) bits.push(t(`shape.${product.shape}`));
  const text = [t("wa.hello"), t("wa.visit"), `${t("wa.need")} ${name}`, ask ? "" : `${t("wa.listed")} ${price}`].filter(Boolean).join("\n");
  const href = path(`/product/${product.id}`);

  return (
    <article className="film-card flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <Link to={href} className="film-still-wrap block p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">
        <span className="film-still">
          <img src={product.image} alt={name} className="h-56 w-full object-contain" loading="lazy" />
          <span className="film-sweep" aria-hidden />
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-bold tracking-widest text-aqua uppercase">{bits.join(" · ")}</p>
        <h3 className="font-display text-lg tracking-tight text-navy">
          <Link to={href} className="no-underline">{name}</Link>
        </h3>
        <p className={`font-display font-bold ${ask ? "text-muted" : "text-navy"}`}>{price}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Link to={href} className="rounded-full bg-navy px-3 py-2 text-sm font-semibold text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">{t("product.details")}</Link>
          <a href={orderLink(text)} target="_blank" rel="noreferrer" className="rounded-full border border-line px-3 py-2 text-sm font-semibold text-navy no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
