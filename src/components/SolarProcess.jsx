import { useState } from "react";

import {
  Sun,
  Moon,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const stages = [
  {
    id: "dia",
    label: "DIA",
    icon: Sun,
    title: "Durante o dia",
    description:
      "Os painéis solares captam a luz do sol e transformam essa energia em eletricidade para o imóvel.",
    points: [
      "Captação da luz solar",
      "Geração de energia",
      "Alimentação dos equipamentos",
    ],
  },

  {
    id: "noite",
    label: "NOITE",
    icon: Moon,
    title: "Durante a noite",
    description:
      "Quando não há geração solar, o imóvel utiliza a energia disponível da rede elétrica conforme o sistema instalado.",
    points: [
      "Sem geração solar direta",
      "Uso da energia disponível",
      "Sistema preparado para o ciclo diário",
    ],
  },

  {
    id: "producao",
    label: "PRODUÇÃO",
    icon: Zap,
    title: "Sua energia em ação",
    description:
      "O sistema é dimensionado de acordo com o perfil de consumo para buscar o melhor aproveitamento da energia solar.",
    points: [
      "Dimensionamento personalizado",
      "Monitoramento da produção",
      "Mais eficiência energética",
    ],
  },
];

const contentVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const visualVariants = {
  initial: {
    opacity: 0,
    scale: 0.94,
  },

  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 1.03,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function SolarProcess() {
  const [activeStage, setActiveStage] = useState("dia");

  const currentStage =
    stages.find((stage) => stage.id === activeStage) ||
    stages[0];

  const Icon = currentStage.icon;

  return (
    <section
      className="section solar-process"
      id="como-funciona"
    >
      <div className="container">

        {/* CABEÇALHO */}
        <ScrollReveal>
          <div className="section-heading">
            <span className="eyebrow">
              COMO FUNCIONA
            </span>

            <h2>
              DO SOL PARA A SUA
              <span> ECONOMIA.</span>
            </h2>

            <p>
              Entenda de forma simples como a energia
              solar pode fazer parte do seu dia a dia.
            </p>
          </div>
        </ScrollReveal>

        {/* BLOCO PRINCIPAL */}
        <ScrollReveal delay={0.1}>
          <div className="solar-process-wrapper">

            {/* TABS */}
            <div
              className="solar-tabs"
              role="tablist"
              aria-label="Etapas da energia solar"
            >
              {stages.map((stage) => {
                const StageIcon = stage.icon;

                const isActive =
                  activeStage === stage.id;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`solar-tab ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveStage(stage.id)
                    }
                  >
                    <span className="solar-tab-icon">
                      <StageIcon size={19} />
                    </span>

                    <span className="solar-tab-text">
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CONTEÚDO */}
            <div className="solar-content">

              {/* LADO ESQUERDO */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  className="solar-info"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div
                    className={`solar-icon-large solar-icon-${currentStage.id}`}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: -8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Icon size={34} />
                  </motion.div>

                  <span className="eyebrow">
                    {currentStage.label}
                  </span>

                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05,
                    }}
                  >
                    {currentStage.title}
                  </motion.h3>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                    }}
                  >
                    {currentStage.description}
                  </motion.p>

                  <div className="solar-points">
                    {currentStage.points.map(
                      (point, index) => (
                        <motion.div
                          key={point}
                          className="solar-point"
                          initial={{
                            opacity: 0,
                            x: -12,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            delay:
                              0.14 + index * 0.08,
                          }}
                        >
                          <CheckCircle2 size={18} />

                          <span>
                            {point}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* LADO DIREITO */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  className={`solar-visual solar-visual-${currentStage.id}`}
                  variants={visualVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="solar-orbit">

                    {/* ELEMENTO PRINCIPAL */}
                    <motion.div
                      className={`solar-sun solar-state-${currentStage.id}`}
                      animate={
                        currentStage.id === "dia"
                          ? {
                              scale: [1, 1.05, 1],
                            }
                          : currentStage.id === "noite"
                          ? {
                              scale: [1, 1.03, 1],
                            }
                          : {
                              scale: [1, 1.06, 1],
                              rotate: [0, -3, 3, 0],
                            }
                      }
                      transition={{
                        duration:
                          currentStage.id === "producao"
                            ? 2.4
                            : 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon size={45} />
                    </motion.div>

                    {/* CASA */}
                    <motion.div
                      className="solar-house"
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="house-roof" />

                      <div className="house-body">
                        <div className="solar-panel" />
                        <div className="solar-panel" />
                        <div className="solar-panel" />
                      </div>
                    </motion.div>

                  </div>

                  {/* LINHA DE ENERGIA */}
                  <motion.div
                    className="solar-energy-line"
                    initial={{
                      opacity: 0,
                      scaleX: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <span />

                    <motion.div
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </motion.div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}