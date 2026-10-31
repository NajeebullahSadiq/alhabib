import { useTranslation } from "react-i18next";
import { SITE } from "../data/catalog.ts";
import { useTitle } from "../lib/useTitle.ts";

export function Privacy() {
  const { t } = useTranslation();
  useTitle(`${t("privacy.title")} | ${t("meta.name")}`);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl tracking-tight text-navy">{t("privacy.title")}</h1>
      <div className="mt-4 grid gap-3 text-muted">
        <p>{t("privacy.p1")}</p>
        <p>{t("privacy.p2", { email: SITE.email, phone: SITE.phoneDisplay })}</p>
        <p>{t("privacy.p3")}</p>
      </div>
    </article>
  );
}
