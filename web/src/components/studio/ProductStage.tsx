import { lazy, Suspense, useEffect, useRef, useState } from "react";

const StudioCanvas = lazy(() => import("./StudioCanvas.tsx"));

export type StageMode = "hero" | "film" | "product";

const HERO_STILL = "/img/products/thumb_1767440632_8835.jpg";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useStagePresence(eager: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(eager);
  const [visible, setVisible] = useState(eager);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "280px", threshold: 0.01 },
    );
    const play = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    preload.observe(node);
    play.observe(node);
    return () => {
      preload.disconnect();
      play.disconnect();
    };
  }, []);
  return { ref, seen, visible };
}

function useWideScreen() {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setWide(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return wide;
}

function useEndSign() {
  const [sign, setSign] = useState(() => (document.documentElement.dir === "rtl" ? -1 : 1));
  useEffect(() => {
    const read = () => setSign(document.documentElement.dir === "rtl" ? -1 : 1);
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);
  return sign;
}

function QuietStage({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-end bg-night p-6">
      <p className="font-display text-lg text-white/80">{label}</p>
    </div>
  );
}

export function ProductStage({
  mode,
  image,
  label,
  eager = false,
  className,
}: {
  mode: StageMode;
  image?: string;
  label: string;
  eager?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, seen, visible } = useStagePresence(eager && !reduced);
  const wide = useWideScreen();
  const endSign = useEndSign();
  const [ready, setReady] = useState(false);
  const still = mode === "hero" ? HERO_STILL : image ?? HERO_STILL;

  return (
    <div
      ref={ref}
      className={`relative h-full w-full overflow-hidden bg-night ${mode === "product" ? "cursor-grab active:cursor-grabbing" : ""} ${className ?? ""}`}
      style={mode === "product" ? { touchAction: "pan-y" } : undefined}
      role="img"
      aria-label={label}
    >
      {reduced ? (
        <img src={still} alt="" className="h-full w-full object-contain p-6" />
      ) : (
        <>
          {seen && (
            <Suspense fallback={<QuietStage label={label} />}>
              <StudioCanvas
                mode={mode}
                image={image}
                active={visible}
                wide={wide}
                endSign={endSign}
                onReady={() => setReady(true)}
              />
            </Suspense>
          )}
          {!ready && <QuietStage label={label} />}
        </>
      )}
    </div>
  );
}
