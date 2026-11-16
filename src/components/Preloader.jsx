import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EVENTS } from "../config/events";

const MIN_DURATION = 2200;
const PANEL_GAP = 12;

/*
  Calcula quantos painéis (em pé, proporção 2:3) cabem para
  preencher a tela inteira: colunas pela largura, linhas pela altura.
*/
function getPanelGrid() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Poucos painéis, bem grandes: 2 no celular, 3 no tablet, 4 no computador
  const cols = vw < 600 ? 2 : vw < 1100 ? 3 : vw < 1800 ? 4 : 5;
  const width = (vw - PANEL_GAP * (cols + 1)) / cols;
  const height = width * 1.5;
  // Linhas suficientes para cobrir a altura (as sobras ficam cortadas nas bordas)
  const rows = Math.ceil((vh + PANEL_GAP) / (height + PANEL_GAP)) + 1;
  return { cols, rows, width, height };
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [grid] = useState(getPanelGrid);
  const reduce = useReducedMotion();

  useEffect(() => {
    const start = performance.now();
    let frame;
    let loaded = document.readyState === "complete";

    const onLoad = () => {
      loaded = true;
    };

    window.addEventListener("load", onLoad);

    const tick = (now) => {
      const elapsed = now - start;
      const target = Math.min(elapsed / MIN_DURATION, loaded ? 1 : 0.9);

      setProgress((current) => Math.max(current, target));

      if (elapsed >= MIN_DURATION && loaded) {
        setProgress(1);
        setTimeout(() => setVisible(false), 250);
        return;
      }

      // Segurança: nunca prende o usuário por mais de 5s
      if (elapsed > 5000) {
        setVisible(false);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    document.documentElement.classList.add("is-loading");

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("is-loading");

      // Libera as animações de entrada do hero enquanto a cortina sobe
      window.__luzaReady = true;
      window.dispatchEvent(new Event(EVENTS.READY));
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          role="status"
          aria-label="Carregando o site da Luza Engenharia"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Painéis solares: colunas ímpares descem do topo, pares sobem da base */}
          <div
            className="preloader-panels"
            aria-hidden="true"
            style={{
              gridTemplateColumns: `repeat(${grid.cols}, ${grid.width}px)`,
              gap: PANEL_GAP,
              padding: PANEL_GAP,
            }}
          >
            {Array.from({ length: grid.cols }).map((_, col) => {
              const fromTop = col % 2 === 0;
              return (
                <motion.div
                  key={col}
                  className="preloader-panel-col"
                  style={{ gap: PANEL_GAP }}
                  initial={reduce ? { opacity: 0 } : { y: fromTop ? "-110vh" : "110vh" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{
                    duration: reduce ? 0.4 : 1.3,
                    delay: reduce ? 0 : 0.05 + col * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {Array.from({ length: grid.rows }).map((__, row) => (
                    <img
                      key={row}
                      src="/images/painel-solar.webp"
                      alt=""
                      width={Math.round(grid.width)}
                      height={Math.round(grid.height)}
                      decoding="async"
                      draggable="false"
                    />
                  ))}
                </motion.div>
              );
            })}
          </div>

          <div className="preloader-veil" aria-hidden="true" />
          <div className="preloader-glow" aria-hidden="true" />

          <div className="preloader-inner">
            <div className="preloader-sun" aria-hidden="true">
              <motion.span
                className="preloader-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="preloader-core"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.img
              src="/images/logo-luza-light.webp"
              alt="Luza Engenharia"
              className="preloader-logo"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="preloader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Transformando sol em economia
            </motion.p>

            <div className="preloader-bar">
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>

            <span className="preloader-percent">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
