import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/* Contador animado que dispara ao entrar na tela */
export default function Counter({ value, prefix = "", suffix = "", pad = false, duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setCurrent(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCurrent(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, duration]);

  const rounded = Math.round(current);
  const text = new Intl.NumberFormat("pt-BR").format(rounded);

  return (
    <span ref={ref} className="counter" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {pad && rounded < 10 ? `0${text}` : text}
      {suffix}
    </span>
  );
}
