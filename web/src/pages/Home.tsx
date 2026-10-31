import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GalleryGrid } from "../components/GalleryGrid.tsx";
import { ProductCard } from "../components/ProductCard.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { ProductCinema } from "../components/studio/ProductCinema.tsx";
import { ProductStage } from "../components/studio/ProductStage.tsx";
import { CATALOG, GALLERY } from "../data/catalog.ts";
import { useLocale, usePath } from "../lib/locale.ts";
import { useTitle } from "../lib/useTitle.ts";
import { generalLink } from "../lib/whatsapp.ts";

const amberBtn = "rounded-full bg-amber px-5 py-3 font-semibold text-amber-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-ink";
const heroAmber = "rounded-full bg-amber px-4 py-2.5 text-sm font-semibold text-amber-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-ink lg:text-base";
const heroGhost = "rounded-full border border-white/35 px-4 py-2.5 text-sm font-semibold text-white no-underline hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua lg:text-base";

export function Home() {
  const { t } = useTranslation();
  const locale = useLocale();
  const path = usePath();
  useTitle(t("meta.homeTitle"));
  const featured = CATALOG.filter((item) => item.line === "featured");
  const rtl = locale !== "en";
  const [viewportRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", direction: rtl ? "rtl" : "ltr" });
  useEffect(() => {
    embla?.reInit({ align: "start", containScroll: "trimSnaps", direction: rtl ? "rtl" : "ltr" });
  }, [embla, rtl]);

  const categories = [
    { href: path("/water-tanks"), title: t("lines.tanks"), text: t("lines.tanksText"), image: "/img/products/thumb_1767440632_8835.jpg" },
    { href: path("/pipes"), title: t("lines.pipes"), text: t("lines.pipesText"), image: "/img/products/thumb_1767615787_8082.jpg" },
    { href: path("/bottles"), title: t("lines.bottles"), text: t("lines.bottlesText"), image: "/img/products/thumb_1765784168_2058.jpg" },
    { href: path("/ballers"), title: t("lines.ballers"), text: t("lines.ballersText"), image: "/img/products/thumb_1767507788_6152.jpg" },
  ];
  const reasons = [
    { title: t("reasons.quality"), text: t("reasons.qualityText") },
    { title: t("reasons.eco"), text: t("reasons.ecoText") },
    { title: t("reasons.delivery"), text: t("reasons.deliveryText") },
    { title: t("reasons.certified"), text: t("reasons.certifiedText") },
  ];
  const ticker = [t("marquee.tanks"), t("marquee.pipes"), t("marquee.bottles"), t("marquee.ballers"), t("marquee.city")];
  const gallery = GALLERY.map((image) => {
    const n = image.src.match(/img(\d+)/)?.[1] ?? "";
    return { ...image, alt: t("gallery.image", { n }) };
  });
  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;
  const chips = [t("hero.premium"), t("hero.bulk"), t("hero.guarantee")];

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-white lg:min-h-[calc(100svh-6.75rem)]">
        <div className="relative max-lg:h-[58svh] shrink-0 lg:absolute lg:inset-0">
          <ProductStage mode="hero" label={t("hero.imageAlt")} eager />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-night to-transparent lg:hidden" />
        </div>
        <div className="hero-scrim pointer-events-none absolute inset-0 hidden lg:block" />
        <div className="night-grain pointer-events-none absolute inset-0 hidden lg:block" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-6 lg:min-h-[calc(100svh-6.75rem)] lg:py-4">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-aqua uppercase">{t("hero.eyebrow")}</p>
            <h1 className="max-w-[18ch] pe-14 font-display text-[clamp(2.05rem,4.15vw,4.25rem)] leading-[0.98] tracking-tight lg:pe-0">{t("hero.title")}</h1>
            <p className="mt-3 max-w-md text-sm leading-snug text-white/80 lg:text-[0.95rem]">{t("hero.lede")}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link to={path("/quote")} className={heroAmber}>{t("nav.quote")}</Link>
              <a href={generalLink(t("wa.hello"))} target="_blank" rel="noreferrer" className={heroGhost}>WhatsApp</a>
            </div>
            <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
              {chips.map((item) => (
                <li key={item} className="rounded-full border border-white/25 px-3 py-1 text-sm text-white/85">{item}</li>
              ))}
            </ul>
            <dl className="mt-3 grid gap-3 border-t border-white/15 pt-3 text-sm text-white/75 sm:grid-cols-2">
              <div>
                <dt className="font-display text-base text-white">{t("hero.bulkTitle")}</dt>
                <dd className="mt-1">{t("hero.bulkText")}</dd>
              </div>
              <div>
                <dt className="font-display text-base text-white">{t("hero.guaranteeTitle")}</dt>
                <dd className="mt-1">{t("hero.guaranteeText")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-night" aria-hidden>
        <div className="marquee-track flex w-max gap-10 py-3 font-display text-sm font-semibold tracking-wide text-white/80">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-10">
              {ticker.map((item) => (
                <span key={`${copy}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ProductCinema />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="mb-8 max-w-[12em] font-display text-4xl tracking-tight text-navy sm:text-5xl">{t("lines.title")}</h2>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              key={category.href}
              to={category.href}
              className={`group relative flex min-h-80 flex-col justify-end overflow-hidden bg-navy text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${
                index === 0 ? "md:col-span-4 md:min-h-[34rem]" : index === 1 ? "md:col-span-2 md:min-h-[34rem]" : "min-h-80 md:col-span-3"
              }`}
            >
              <img src={category.image} alt="" className="ken-burns absolute inset-0 h-full w-full object-contain p-8" />
              <div className="relative z-10 bg-gradient-to-t from-night via-night/90 to-transparent p-5 pt-24">
                <strong className="block font-display text-3xl text-white">{category.title}</strong>
                <span className="mt-1 block max-w-sm text-sm text-white/80">{category.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl tracking-tight text-navy sm:text-5xl">{t("best.title")}</h2>
            <p className="mt-2 text-muted">{t("best.text")}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label={t("best.prev")} onClick={() => embla?.scrollPrev()} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"><PrevIcon size={18} /></button>
            <button type="button" aria-label={t("best.next")} onClick={() => embla?.scrollNext()} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"><NextIcon size={18} /></button>
          </div>
        </div>
        <div className="overflow-hidden" ref={viewportRef}>
          <div className="flex gap-4">
            {featured.map((product) => (
              <div key={product.id} className="min-w-0 flex-[0_0_86%] py-2 sm:flex-[0_0_46%] lg:flex-[0_0_32%]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 pb-24">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <article key={reason.title} className={index % 2 === 1 ? "md:mt-20" : ""}>
              <p className="font-display text-5xl text-aqua">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-2xl text-navy">{reason.title}</h3>
              <p className="mt-2 max-w-md text-muted">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl tracking-tight text-navy sm:text-5xl">{t("meta.name")}</h2>
          <p className="mt-5 text-lg text-muted">{t("about.p1")}</p>
          <Link to={path("/about")} className="mt-5 inline-flex font-semibold text-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">{t("story.more")}</Link>
        </div>
        <div className="relative pb-16 lg:col-span-7">
          <img src="/img/brand/banner-bg2.jpg" alt={t("hero.imageAlt")} className="w-full bg-white object-contain shadow-[0_24px_60px_rgba(16,20,51,0.16)]" />
          <img src="/img/about/main2.webp" alt={t("story.imageAlt")} className="absolute bottom-0 start-6 w-36 border-4 border-paper object-cover shadow-lg sm:w-52" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-stretch gap-6 px-4 pb-24 lg:grid-cols-12">
        <figure className="bg-navy p-8 text-white lg:col-span-5">
          <figcaption className="mb-6 flex items-center gap-3">
            <img src="/img/testimonials/test1.webp" alt="" className="h-14 w-14 rounded-full object-cover" />
            <span>
              <strong className="block font-display text-lg">{t("testimonials.farid")}</strong>
              <span className="text-sm text-white/70">{t("testimonials.faridPlace")}</span>
            </span>
          </figcaption>
          <blockquote className="m-0 font-display text-2xl leading-snug text-white">{t("testimonials.faridText")}</blockquote>
        </figure>
        <figure className="border-s-4 border-aqua bg-white p-8 lg:col-span-7 lg:mt-16">
          <figcaption className="mb-5 flex items-center gap-3">
            <img src="/img/testimonials/test2.webp" alt="" className="h-16 w-16 rounded-full object-cover" />
            <span>
              <strong className="block font-display text-lg text-navy">{t("testimonials.naved")}</strong>
              <span className="text-sm text-muted">{t("testimonials.navedPlace")}</span>
            </span>
          </figcaption>
          <blockquote className="m-0 text-lg text-ink">{t("testimonials.navedText")}</blockquote>
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-tight text-navy sm:text-5xl">{t("gallery.title")}</h2>
          <Link to={path("/gallery")} className="font-semibold text-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">{t("gallery.more")}</Link>
        </div>
        <p className="mb-6 max-w-2xl text-muted">{t("gallery.intro")}</p>
        <GalleryGrid images={gallery} limit={6} />
      </section>

      <section className="bg-night text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">{t("cta.title")}</h2>
            <p className="mt-3 text-lg text-white/78">{t("cta.text")}</p>
          </div>
          <Link to={path("/quote")} className={amberBtn}>{t("nav.quote")}</Link>
        </div>
      </section>
    </>
  );
}
