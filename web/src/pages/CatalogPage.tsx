import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductCard, productLabel } from "../components/ProductCard.tsx";
import { CATALOG } from "../data/catalog.ts";
import type { Category, Line } from "../data/catalog.ts";
import { useTitle } from "../lib/useTitle.ts";

const lines: Array<Line | "all"> = ["all", "featured", "simple", "standard", "catalog"];

export function CatalogPage({
  category,
  titleKey,
  introKey,
  tankFilters = false,
}: {
  category: Category | "all";
  titleKey: string;
  introKey: string;
  tankFilters?: boolean;
}) {
  const { t } = useTranslation();
  const title = t(titleKey);
  useTitle(`${title} | ${t("meta.name")}`);
  const [params, setParams] = useSearchParams();
  const [minLitres, setMinLitres] = useState("");
  const [shape, setShape] = useState("all");
  const [query, setQuery] = useState("");
  const line = (params.get("line") ?? "all") as Line | "all";

  const products = useMemo(() => {
    const min = Number(minLitres);
    const needle = query.trim().toLowerCase();
    return CATALOG.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (tankFilters && line !== "all" && product.line !== line) return false;
      if (min && (product.liters == null || product.liters < min)) return false;
      if (shape !== "all" && product.shape !== shape) return false;
      const label = productLabel(t, product);
      if (needle && !`${product.name} ${label} ${product.category} ${product.line ?? ""}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [category, line, minLitres, query, shape, t, tankFilters]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{t("catalog.kicker")}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-navy">{title}</h1>
      <p className="mt-3 max-w-3xl text-muted">{t(introKey)}</p>
      <div className="mt-6 flex flex-wrap items-end gap-3">
        {category === "all" && (
          <label className="grid text-sm text-muted">
            {t("catalog.search")}
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-xl border border-line bg-white px-3 py-2 text-ink" placeholder={t("catalog.searchPh")} />
          </label>
        )}
        {tankFilters && (
          <>
            <div className="flex flex-wrap gap-2">
              {lines.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    const next = new URLSearchParams(params);
                    if (item === "all") next.delete("line");
                    else next.set("line", item);
                    setParams(next);
                  }}
                  className={`rounded-full px-3 py-2 text-sm ${line === item ? "bg-navy text-white" : "border border-line bg-white"}`}
                >
                  {t(`line.${item}`)}
                </button>
              ))}
            </div>
            <label className="grid text-sm text-muted">
              {t("catalog.min")}
              <input value={minLitres} onChange={(event) => setMinLitres(event.target.value)} inputMode="numeric" className="w-32 rounded-xl border border-line bg-white px-3 py-2 text-ink" placeholder="500" />
            </label>
            <label className="grid text-sm text-muted">
              {t("catalog.shape")}
              <select value={shape} onChange={(event) => setShape(event.target.value)} className="rounded-xl border border-line bg-white px-3 py-2 text-ink">
                <option value="all">{t("shape.all")}</option>
                <option value="bottle">{t("shape.bottle")}</option>
                <option value="capsule">{t("shape.capsule")}</option>
              </select>
            </label>
          </>
        )}
      </div>
      <p className="mt-4 text-sm text-muted">{t("catalog.count", { count: products.length })}</p>
      {products.length === 0 ? (
        <p className="mt-6 text-muted">{t("catalog.empty")}</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}
