import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
  Carrossel com rolagem automática (usado no celular, quando os cards
  ficam lado a lado com scroll horizontal).
  - avança sozinho e volta ao início no fim;
  - só roda quando a seção está visível;
  - pausa ao toque/arrasto e retoma depois de alguns segundos;
  - respeita "reduzir movimento".
*/
export function useAutoCarousel(count, { interval = 4000, resumeAfter = 7000 } = {}) {
  const trackRef = useRef(null);
  const resumeTimer = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);
  const inView = useInView(trackRef, { amount: 0.4 });
  const reduce = useReducedMotion();

  // Só é carrossel quando os cards não cabem lado a lado
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const check = () => setIsCarousel(track.scrollWidth > track.clientWidth + 4);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index) => {
      const track = trackRef.current;
      const card = track?.children[index];
      if (!card) return;
      const padding = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      const left =
        track.scrollLeft +
        card.getBoundingClientRect().left -
        track.getBoundingClientRect().left -
        padding;
      track.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

  // Indicador acompanha a rolagem (automática ou manual)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isCarousel) return undefined;
    const onScroll = () => {
      const padding = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      const base = track.getBoundingClientRect().left + padding;
      const cards = [...track.children];
      let best = 0;
      cards.forEach((card, i) => {
        const d = Math.abs(card.getBoundingClientRect().left - base);
        if (d < Math.abs(cards[best].getBoundingClientRect().left - base)) best = i;
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [isCarousel]);

  const running = isCarousel && inView && !paused && !reduce && count > 1;

  // Avança automaticamente
  useEffect(() => {
    if (!running) return undefined;
    const timer = setTimeout(() => goTo((active + 1) % count), interval);
    return () => clearTimeout(timer);
  }, [active, running, count, interval, goTo]);

  const pauseForUser = useCallback(() => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), resumeAfter);
  }, [resumeAfter]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  return {
    trackRef,
    active,
    isCarousel,
    running,
    interval,
    goTo,
    pauseForUser,
    trackProps: {
      ref: trackRef,
      onTouchStart: pauseForUser,
      onPointerDown: pauseForUser,
      onWheel: pauseForUser,
    },
  };
}

export function CarouselDots({ carousel, labels }) {
  const { isCarousel, active, running, interval, goTo, pauseForUser } = carousel;
  if (!isCarousel) return null;

  return (
    <div className="carousel-dots" role="tablist" aria-label="Navegar entre os itens">
      {labels.map((label, index) => (
        <button
          key={label + index}
          type="button"
          role="tab"
          aria-selected={index === active}
          aria-label={label}
          className={index === active ? "is-active" : ""}
          onClick={() => {
            pauseForUser();
            goTo(index);
          }}
        >
          {index === active && running && (
            <span key={active} style={{ animationDuration: `${interval}ms` }} />
          )}
        </button>
      ))}
    </div>
  );
}
