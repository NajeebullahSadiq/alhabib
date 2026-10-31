import { useTranslation } from "react-i18next";
import { GalleryGrid } from "../components/GalleryGrid.tsx";
import { GALLERY } from "../data/catalog.ts";
import { useTitle } from "../lib/useTitle.ts";

export function GalleryPage() {
  const { t } = useTranslation();
  useTitle(`${t("gallery.title")} | ${t("meta.name")}`);
  const images = GALLERY.map((image) => {
    const n = image.src.match(/img(\d+)/)?.[1] ?? "";
    return { ...image, alt: t("gallery.image", { n }) };
  });
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{t("gallery.title")}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight text-navy">{t("gallery.pageTitle")}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t("gallery.intro")}</p>
      <div className="mt-8">
        <GalleryGrid images={images} />
      </div>
    </section>
  );
}
