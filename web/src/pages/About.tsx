import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePath } from "../lib/locale.ts";
import { useTitle } from "../lib/useTitle.ts";

export function About() {
  const { t } = useTranslation();
  const path = usePath();
  useTitle(`${t("about.kicker")} | ${t("meta.name")}`);
  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{t("about.kicker")}</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-tight text-navy">{t("meta.name")}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 text-muted">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <Link to={path("/contact")} className="font-semibold text-brand-deep">{t("about.contact")}</Link>
        </div>
        <div className="grid gap-4">
          <img src="/img/about/main1.webp" alt={t("story.imageAlt")} className="w-full rounded-3xl object-cover" />
          <img src="/img/about/main2.webp" alt={t("about.imageAlt2")} className="max-h-80 w-full rounded-3xl object-cover" />
        </div>
      </div>
    </article>
  );
}
