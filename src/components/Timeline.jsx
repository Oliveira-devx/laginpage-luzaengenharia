import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck, Calculator, HardHat, LineChart, PencilRuler } from "lucide-react";

import SectionHead from "./SectionHead";
import { openTechVisit } from "../config/events";

const etapas = [
  {
    icon: Calculator,
    title: "Simulação e análise de consumo",
    text: "Você informa o valor da conta e analisamos seu histórico de consumo para estimar a economia real.",
    cta: { label: "Fazer simulação", href: "#simulador" },
  },
  {
    icon: CalendarCheck,
    title: "Visita técnica",
    text: "Um técnico avalia telhado, estrutura, sombreamento e padrão de entrada no seu imóvel.",
    cta: { label: "Agendar visita", visit: true },
  },
  {
    icon: PencilRuler,
    title: "Dimensionamento do sistema",
    text: "A engenharia define potência, equipamentos e layout dos módulos, e você recebe a proposta detalhada.",
  },
  {
    icon: HardHat,
    title: "Instalação",
    text: "Equipe qualificada instala o sistema com segurança, e cuidamos da homologação junto à concessionária.",
  },
  {
    icon: LineChart,
    title: "Acompanhamento",
    text: "Depois de ligado, acompanhamos a geração e damos suporte para o sistema render o previsto.",
  },
];

const AUTO_MS = 5200;

export default function Timeline() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  // Avança sozinho enquanto visível, até o usuário interagir
  useEffect(() => {
    if (!auto || !inView || reduce) return undefined;
    const timer = setTimeout(() => setActive((a) => (a + 1) % etapas.length), AUTO_MS);
    return () => clearTimeout(timer);
  }, [active, auto, inView, reduce]);

  const select = (index) => {
    setAuto(false);
    setActive(index);
  };

  const etapa = etapas[active];
  const Icon = etapa.icon;

  return (
    <section className="section rd-section timeline" id="como-funciona" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="COMO FUNCIONA"
          title="DA SIMULAÇÃO À ENERGIA"
          accent="NO SEU TELHADO."
          text="Um processo claro, em cinco etapas, para você saber exatamente o que acontece em cada momento."
        />

        <div className="tl">
          <ol className="tl-steps" style={{ "--tl-progress-n": active / (etapas.length - 1) }}>
            {etapas.map((item, index) => {
              const StepIcon = item.icon;
              const isActive = index === active;
              return (
                <li key={item.title} className={`${isActive ? "is-active" : ""} ${index < active ? "is-done" : ""}`}>
                  <button
                    type="button"
                    className="tl-step"
                    onClick={() => select(index)}
                    aria-expanded={isActive}
                  >
                    <span className="tl-node"><StepIcon size={18} /></span>
                    <span className="tl-step-text">
                      <small>ETAPA {String(index + 1).padStart(2, "0")}</small>
                      <strong>{item.title}</strong>
                    </span>
                    {isActive && auto && inView && !reduce && (
                      <span className="tl-timer" key={active} style={{ animationDuration: `${AUTO_MS}ms` }} aria-hidden="true" />
                    )}
                  </button>

                  {/* No celular, o detalhe abre dentro da própria etapa */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="tl-inline"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <p>{item.text}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          {/* No desktop, painel de detalhe ao lado */}
          <div className="tl-panel glass" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="tl-panel-index">{String(active + 1).padStart(2, "0")}<em>/{String(etapas.length).padStart(2, "0")}</em></span>
                <div className="icon-tile icon-tile-lg"><Icon size={28} /></div>
                <h3>{etapa.title}</h3>
                <p>{etapa.text}</p>

                {etapa.cta && (etapa.cta.visit ? (
                  <button type="button" className="btn btn-pill" onClick={() => openTechVisit("timeline")}>
                    <CalendarCheck size={17} /> {etapa.cta.label}
                  </button>
                ) : (
                  <a className="btn btn-pill" href={etapa.cta.href}>
                    {etapa.cta.label} <ArrowRight size={17} />
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
