import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductStage } from "./ProductStage.tsx";
import { productLabel } from "../ProductCard.tsx";
import { CATALOG, formatPrice } from "../../data/catalog.ts";
import { useLocale, usePath } from "../../lib/locale.ts";

const CLIP = 4200;

export function ProductCinema() {
  const { t } = useTranslation();
  const locale = useLocale();
  const path = usePath();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const indexRef = useRef(0);
  const playingRef = useRef(true);
  const acc = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (playingRef.current) {
        acc.current += dt;
        if (acc.current >= CLIP) {
          acc.current %= CLIP;
          const next = (indexRef.current + 1) % CATALOG.length;
          indexRef.current = next;
          setIndex(next);
        }
        const progress = Math.min(1, acc.current / CLIP);
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        meterRef.current?.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const thumb = rail?.querySelector<HTMLElement>(`[data-i="${index}"]`);
    if (!rail || !thumb) return;
    const railBox = rail.getBoundingClientRect();
    const thumbBox = thumb.getBoundingClientRect();
    const delta = thumbBox.left + thumbBox.width / 2 - (railBox.left + railBox.width / 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }, [index]);

  const product = CATALOG[index];
  const name = productLabel(t, product);
  const price = formatPrice(product.price, locale, t("price.ask"), t("price.currency"));

  const jump = (next: number) => {
    acc.current = 0;
    indexRef.current = next;
    setIndex(next);
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
    meterRef.current?.setAttribute("aria-valuenow", "0");
  };

  return (
    <section className="bg-night text-white" aria-labelledby="cinema-title">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-20">
        <h2 id="cinema-title" className="max-w-[12em] font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] tracking-tight">
          {t("cinema.title")}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-white/80">{t("cinema.text")}</p>
      </div>
      <div className="relative h-[74svh] min-h-[520px]">
        <ProductStage mode="film" image={product.image} label={name} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-night via-night/88 to-transparent px-4 pb-5 pt-24">
          <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-xs font-bold tracking-[0.18em] text-aqua uppercase">
                  {t("cinema.now")} · {t(`category.${product.category}`)}
                </p>
                <Link
                  to={path(`/product/${product.id}`)}
                  className="mt-1 block font-display text-3xl tracking-tight text-white underline decoration-aqua decoration-2 underline-offset-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua sm:text-4xl"
                >
                  {name}
                </Link>
                <p className={`mt-2 font-display text-xl ${product.price == null ? "text-white/70" : "text-white"}`}>{price}</p>
              </div>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={playing}
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-night/70 px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
              >
                {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                {playing ? t("cinema.pause") : t("cinema.play")}
              </button>
            </div>
            <div
              ref={meterRef}
              className="h-1 w-full overflow-hidden bg-white/15"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              aria-label={t("cinema.now")}
            >
              <div ref={barRef} className="film-progress" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-4">
        <ul ref={railRef} className="cinema-rail flex list-none gap-2 overflow-x-auto p-0 pb-2" aria-label={t("cinema.title")}>
          {CATALOG.map((item, i) => {
            const active = i === index;
            const thumbName = productLabel(t, item);
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  data-i={i}
                  aria-current={active ? "true" : undefined}
                  aria-label={thumbName}
                  onClick={() => jump(i)}
                  className={`relative h-[4.5rem] w-[4.5rem] overflow-hidden border-2 bg-[#101433] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${active ? "border-aqua" : "border-white/15"}`}
                >
                  <img src={item.image} alt="" className="h-full w-full object-contain" loading="lazy" />
                  {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-aqua" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-aqua/80 to-transparent" aria-hidden />
    </section>
  );
}
