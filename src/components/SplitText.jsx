import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EVENTS } from "../config/events";

/*
  Animação de entrada lateral alternada:
  1ª linha entra pela DIREITA, 2ª pela ESQUERDA, 3ª pela direita...
  Use <SplitLines> para títulos quebrados em linhas e <Side> para
  textos de apoio que continuam a alternância.
*/

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 1.15;

/* Fica true quando a tela de inicialização termina */
export function useAppReady() {
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && window.__luzaReady === true
  );

  useEffect(() => {
    if (ready) return undefined;
    const onReady = () => setReady(true);
    window.addEventListener(EVENTS.READY, onReady);
    return () => window.removeEventListener(EVENTS.READY, onReady);
  }, [ready]);

  return ready;
}

const sideVariant = {
  hidden: ({ from, distance }) => ({
    opacity: 0,
    x: from === "right" ? distance : -distance,
    filter: "blur(8px)",
  }),
  visible: ({ delay = 0 }) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION, ease: EASE, delay },
  }),
};

function useTrigger(waitForReady) {
  const reduce = useReducedMotion();
  const ready = useAppReady();

  if (reduce) {
    return { initial: false };
  }

  if (waitForReady) {
    return { initial: "hidden", animate: ready ? "visible" : "hidden" };
  }

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.35 },
  };
}

const opposite = (side) => (side === "right" ? "left" : "right");

export function SplitLines({
  as = "h2",
  lines,
  className,
  first = "right",
  delay = 0,
  stagger = 0.2,
  distance = 90,
  waitForReady = false,
}) {
  const Tag = motion[as];
  const trigger = useTrigger(waitForReady);
  const label = lines.map((line) => line.text).join(" ");

  return (
    <Tag className={className} aria-label={label} {...trigger}>
      {lines.map((line, index) => [
        index > 0 ? " " : null,
        <motion.span
          key={line.text}
          aria-hidden="true"
          className={`split-line ${line.accent ? "split-accent" : "split-plain"}`}
          variants={sideVariant}
          custom={{
            from: index % 2 === 0 ? first : opposite(first),
            distance,
            delay: delay + index * stagger,
          }}
        >
          {line.text}
        </motion.span>,
      ])}
    </Tag>
  );
}

export function Side({
  as = "p",
  from = "right",
  delay = 0,
  distance = 70,
  waitForReady = false,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as];
  const trigger = useTrigger(waitForReady);

  return (
    <Tag
      className={className}
      variants={sideVariant}
      custom={{ from, distance, delay }}
      {...trigger}
      {...rest}
    >
      {children}
    </Tag>
  );
}
