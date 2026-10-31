import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductCard, productLabel } from "../components/ProductCard.tsx";
import { ProductStage } from "../components/studio/ProductStage.tsx";
import { CATALOG, SITE, findProduct, formatPrice } from "../data/catalog.ts";
import { useLocale, usePath } from "../lib/locale.ts";
import { useTitle } from "../lib/useTitle.ts";
import { orderLink } from "../lib/whatsapp.ts";

export function ProductPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const locale = useLocale();
  const path = usePath();
  const product = findProduct(id);
  const name = product ? productLabel(t, product) : "";
  useTitle(product ? `${name} | ${t("meta.name")}` : `${t("nav.products")} | ${t("meta.name")}`);

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-display text-3xl text-navy">{t("product.missing")}</h1>
        <Link to={path("/products")} className="mt-4 inline-flex font-semibold text-brand-deep">{t("product.browse")}</Link>
      </section>
    );
  }

  const price = formatPrice(product.price, locale, t("price.ask"), t("price.currency"));
  const text = [t("wa.hello"), t("wa.visit"), `${t("wa.need")} ${name}`, product.price == null ? "" : `${t("wa.listed")} ${price}`].filter(Boolean).join("\n");
  const related = CATALOG.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="h-[70vh] min-h-[420px] overflow-hidden rounded-[1.75rem] bg-night">
          <ProductStage mode="product" image={product.image} label={name} eager />
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">
            {[t(`category.${product.category}`), product.line ? t(`line.${product.line}`) : "", product.shape ? t(`shape.${product.shape}`) : ""].filter(Boolean).join(" · ")}
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-navy">{name}</h1>
          <p className={`mt-3 font-display text-2xl font-bold ${product.price == null ? "text-muted" : "text-navy"}`}>{price}</p>
          <p className="mt-4 text-muted">{t(`pages.${product.category === "tanks" ? "tanksIntro" : product.category === "bottles" ? "bottlesIntro" : product.category === "pipes" ? "pipesIntro" : "ballersIntro"}`)}</p>
          {product.category === "tanks" && <p className="mt-3 text-muted">{t("product.warranty")}</p>}
          {product.category === "pipes" && <p className="mt-3 text-muted">{t("product.pipeNote")}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={orderLink(text)} target="_blank" rel="noreferrer" className="rounded-full bg-amber px-5 py-3 font-semibold text-amber-ink no-underline">{t("product.order")}</a>
            <Link to={path(`/quote?product=${product.id}`)} className="rounded-full border border-line bg-white px-5 py-3 font-semibold text-navy no-underline">{t("product.add")}</Link>
          </div>
          <p className="mt-4 text-sm text-muted">{t("product.salesNote", { sales: SITE.salesDisplay, general: SITE.phoneDisplay })}</p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 font-display text-2xl text-navy">{t("product.related")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
    </article>
  );
}
