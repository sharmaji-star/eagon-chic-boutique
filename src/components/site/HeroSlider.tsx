import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = { src: string; alt: string };

export function HeroSlider({ slides, interval = 4200 }: { slides: Slide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((n: number) => setIndex((i) => (n + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [paused, count, interval]);

  return (
    <section
      className="relative overflow-hidden bg-secondary"
      aria-roledescription="carousel"
      aria-label="Eagon Shop wholesale lookbook"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]!.clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setPaused(false);
        if (start === null) return;
        const dx = e.changedTouches[0]!.clientX - start;
        if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
      }}
    >
      <div className="relative h-[62vh] min-h-[380px] w-full sm:h-[78vh] sm:min-h-[520px]">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== index}
            className={`absolute inset-0 size-full object-cover object-[50%_22%] transition-opacity duration-[1100ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/70 to-transparent" />

        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="glass absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 hover:scale-105 sm:left-6 sm:size-12"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="glass absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 hover:scale-105 sm:right-6 sm:size-12"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={`dot-${s.src}`}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-gold" : "w-1.5 bg-foreground/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
