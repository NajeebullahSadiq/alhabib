import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePath } from "../lib/locale.ts";

export function Missing() {
  const { t } = useTranslation();
  const path = usePath();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-muted">{t("missing")}</p>
      <Link to={path("/")} className="mt-3 inline-flex font-semibold text-brand-deep">{t("nav.home")}</Link>
    </section>
  );
}
