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
  useReducedMotion,
} from "framer-motion";

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

/* =========================================================
   ANIMAÇÃO DO CONTEÚDO
   ========================================================= */

const infoVariants = {
  initial: {
    opacity: 0,
    x: -35,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: 35,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

/* =========================================================
   ANIMAÇÃO DA CENA
   ========================================================= */

const sceneVariants = {
  initial: {
    opacity: 0,
    x: 45,
    scale: 0.93,
  },

  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -35,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/* =========================================================
   NUVEM
   ========================================================= */

function Cloud({
  top,
  left,
  scale = 1,
  delay = 0,
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        width: "110px",
        height: "35px",
        opacity: 0.8,
        pointerEvents: "none",
        transform: `scale(${scale})`,
      }}
      animate={{
        x: [0, 45, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "110px",
          height: "28px",
          borderRadius: "999px",
          background:
            "rgba(255,255,255,0.62)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "9px",
          left: "18px",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background:
            "rgba(255,255,255,0.7)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "9px",
          left: "50px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background:
            "rgba(255,255,255,0.74)",
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   ESTRELA
   ========================================================= */

function Star({
  top,
  left,
  size = 3,
  delay = 0,
}) {
  return (
    <motion.span
      style={{
        position: "absolute",
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "#ffffff",
        boxShadow:
          "0 0 8px rgba(255,255,255,0.9)",
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.75, 1.25, 0.75],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* =========================================================
   CENA DIA
   ========================================================= */

function DayScene() {
  return (
    <>
      {/* CÉU */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #56baf5 0%, #2788cb 45%, #10517f 100%)",
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      />

      {/* LUZ ATMOSFÉRICA */}
      <motion.div
        style={{
          position: "absolute",
          width: "75%",
          height: "75%",
          top: "-25%",
          right: "-5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,220,115,0.35) 0%, rgba(255,220,115,0.12) 35%, transparent 70%)",
          filter: "blur(15px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SOL */}
      <motion.div
        style={{
          position: "absolute",
          top: "13%",
          right: "17%",
          width: "108px",
          height: "108px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(circle at 40% 35%, #fff7c7 0%, #ffd45c 35%, #f5b82e 72%, #e99c10 100%)",
          boxShadow:
            "0 0 30px rgba(255,207,73,0.85), 0 0 85px rgba(255,199,54,0.42)",
          zIndex: 4,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sun
          size={54}
          strokeWidth={1.7}
          color="#071b2f"
        />
      </motion.div>

      {/* RAIOS */}
      {Array.from({ length: 8 }).map(
        (_, index) => (
          <motion.span
            key={index}
            style={{
              position: "absolute",
              top: "7%",
              right: "19%",
              width: "3px",
              height: "37px",
              borderRadius: "999px",
              background:
                "rgba(255,220,95,0.75)",
              transformOrigin:
                "50% 112px",
              rotate: `${index * 45}deg`,
              zIndex: 2,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scaleY: [0.8, 1.08, 0.8],
            }}
            transition={{
              duration: 2.4,
              delay: index * 0.08,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      )}

      {/* NUVENS */}
      <Cloud
        top="18%"
        left="8%"
        scale={0.78}
      />

      <Cloud
        top="30%"
        left="58%"
        scale={0.55}
        delay={2}
      />

      {/* PARTÍCULAS DE ENERGIA */}
      {[0, 1, 2, 3].map(
        (index) => (
          <motion.span
            key={index}
            style={{
              position: "absolute",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#ffd34f",
              boxShadow:
                "0 0 14px rgba(255,211,79,0.95)",
              left: `${39 + index * 5}%`,
              top: "31%",
              zIndex: 7,
            }}
            animate={{
              y: [0, 70, 130],
              x: [
                0,
                index % 2 ? 6 : -6,
                0,
              ],
              opacity: [0, 1, 0],
              scale: [0.6, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              delay: index * 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      )}
    </>
  );
}

/* =========================================================
   CENA NOITE
   ========================================================= */

function NightScene() {
  const stars = [
    ["12%", "14%", 3, 0],
    ["18%", "31%", 2, 0.5],
    ["11%", "50%", 3, 0.9],
    ["24%", "69%", 2, 1.3],
    ["34%", "82%", 3, 0.3],
    ["41%", "63%", 2, 1.6],
    ["30%", "22%", 2, 0.7],
    ["47%", "13%", 3, 1.1],
    ["16%", "82%", 2, 1.9],
  ];

  return (
    <>
      {/* CÉU NOTURNO */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #061326 0%, #081d34 45%, #06111f 100%)",
        }}
      />

      {/* HALO DA LUA */}
      <motion.div
        style={{
          position: "absolute",
          width: "260px",
          height: "260px",
          top: "-5%",
          right: "4%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,210,102,0.2) 0%, rgba(255,210,102,0.07) 40%, transparent 72%)",
          filter: "blur(10px)",
        }}
        animate={{
          scale: [0.95, 1.08, 0.95],
          opacity: [0.55, 0.95, 0.55],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ESTRELAS */}
      {stars.map(
        (
          [top, left, size, delay],
          index
        ) => (
          <Star
            key={index}
            top={top}
            left={left}
            size={size}
            delay={delay}
          />
        )
      )}

      {/* LUA CHEIA */}
      <motion.div
        style={{
          position: "absolute",
          top: "12%",
          right: "17%",
          width: "112px",
          height: "112px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #fffdf2 0%, #f4e8b8 55%, #d7c889 100%)",
          boxShadow:
            "0 0 30px rgba(248,231,170,0.5), 0 0 90px rgba(248,231,170,0.18)",
          overflow: "hidden",
          zIndex: 5,
        }}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Moon
          size={57}
          color="#071b2f"
          strokeWidth={1.6}
          style={{
            position: "absolute",
            top: "27%",
            left: "25%",
          }}
        />

        <span
          style={{
            position: "absolute",
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background:
              "rgba(173,157,103,0.22)",
            top: "28%",
            left: "63%",
          }}
        />

        <span
          style={{
            position: "absolute",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background:
              "rgba(173,157,103,0.18)",
            top: "56%",
            left: "52%",
          }}
        />

        <span
          style={{
            position: "absolute",
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background:
              "rgba(173,157,103,0.25)",
            top: "69%",
            left: "28%",
          }}
        />
      </motion.div>
    </>
  );
}

/* =========================================================
   CENA PRODUÇÃO
   ========================================================= */

function ProductionScene() {
  return (
    <>
      {/* CÉU */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #123b5d 0%, #1d5c80 48%, #09263d 100%)",
        }}
      />

      {/* SOL / ENERGIA */}
      <motion.div
        style={{
          position: "absolute",
          top: "11%",
          right: "16%",
          width: "104px",
          height: "104px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(circle at 40% 35%, #fff9d3 0%, #ffd967 37%, #f5b82e 75%, #e89c10 100%)",
          boxShadow:
            "0 0 35px rgba(255,209,77,0.9), 0 0 100px rgba(255,199,54,0.4)",
          zIndex: 5,
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Zap
          size={52}
          fill="#071b2f"
          color="#071b2f"
        />
      </motion.div>

      {/* ANÉIS */}
      {[150, 205, 260].map(
        (size, index) => (
          <motion.div
            key={size}
            style={{
              position: "absolute",
              top: "1%",
              right:
                `${6 + index * 3}%`,
              width: `${size}px`,
              height: `${size}px`,
              border:
                "1px solid rgba(245,184,46,0.24)",
              borderRadius: "50%",
            }}
            animate={{
              scale: [0.94, 1.04, 0.94],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration:
                2.2 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        )
      )}

      {/* FLUXO DE ENERGIA */}
      {[0, 1, 2, 3, 4].map(
        (index) => (
          <motion.span
            key={index}
            style={{
              position: "absolute",
              top: "31%",
              left:
                `${36 + index * 6}%`,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#f5b82e",
              boxShadow:
                "0 0 16px rgba(245,184,46,0.95)",
              zIndex: 8,
            }}
            animate={{
              y: [0, 70, 145],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.4],
            }}
            transition={{
              duration: 1.45,
              repeat: Infinity,
              delay: index * 0.25,
              ease: "easeInOut",
            }}
          />
        )
      )}

      {/* MEDIDOR */}
      <motion.div
        style={{
          position: "absolute",
          left: "13%",
          top: "18%",
          display: "flex",
          alignItems: "flex-end",
          gap: "6px",
          height: "65px",
          padding: "10px 12px",
          border:
            "1px solid rgba(255,255,255,0.14)",
          borderRadius: "14px",
          background:
            "rgba(4,20,35,0.34)",
          backdropFilter: "blur(9px)",
          zIndex: 6,
        }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[24, 37, 52, 42].map(
          (height, index) => (
            <motion.span
              key={index}
              style={{
                display: "block",
                width: "7px",
                height: `${height}px`,
                borderRadius: "999px",
                background:
                  "rgba(245,184,46,0.78)",
                transformOrigin:
                  "bottom center",
              }}
              animate={{
                scaleY: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.15,
                delay: index * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )
        )}

        <span
          style={{
            position: "absolute",
            top: "7px",
            left: "12px",
            fontSize: "8px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color:
              "rgba(255,255,255,0.74)",
          }}
        >
          PRODUÇÃO
        </span>
      </motion.div>
    </>
  );
}

/* =========================================================
   CASA
   ========================================================= */

function House() {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "15%",
        transform:
          "translateX(-50%)",
        zIndex: 10,
      }}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* TELHADO */}
      <div
        style={{
          width: 0,
          height: 0,
          marginLeft: "-105px",
          borderLeft:
            "105px solid transparent",
          borderRight:
            "105px solid transparent",
          borderBottom:
            "92px solid rgba(248,249,248,0.95)",
        }}
      />

      {/* CASA */}
      <div
        style={{
          width: "185px",
          height: "105px",
          marginLeft: "-92px",
          marginTop: "-3px",
          borderRadius:
            "0 0 12px 12px",
          background:
            "rgba(248,249,248,0.97)",
          padding:
            "20px 14px 14px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "6px",
            height: "54px",
          }}
        >
          {[0, 1, 2].map(
            (index) => (
              <motion.div
                key={index}
                style={{
                  border:
                    "2px solid rgba(180,198,214,0.85)",
                  background:
                    "linear-gradient(145deg, #1f5072, #0b2942)",
                  borderRadius: "2px",
                }}
                animate={{
                  opacity: [
                    0.72,
                    1,
                    0.72,
                  ],
                }}
                transition={{
                  duration: 2.2,
                  delay: index * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
   ========================================================= */

export default function SolarProcess() {
  const [activeStage, setActiveStage] =
    useState("dia");

  const shouldReduceMotion =
    useReducedMotion();

  const currentStage =
    stages.find(
      (stage) =>
        stage.id === activeStage
    ) || stages[0];

  const Icon = currentStage.icon;

  return (
    <section
      className="section solar-process"
      id="como-funciona"
    >
      <div className="container">

        {/* =========================================
            CABEÇALHO
            ========================================= */}

        <motion.div
          className="section-heading"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 45,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <span className="eyebrow">
            COMO FUNCIONA
          </span>

          <h2>
            DO SOL PARA A SUA
            <span>
              {" "}
              ECONOMIA.
            </span>
          </h2>

          <p>
            Entenda de forma simples como a
            energia solar pode fazer parte do
            seu dia a dia.
          </p>
        </motion.div>

        {/* =========================================
            BLOCO PRINCIPAL
            ========================================= */}

        <motion.div
          className="solar-process-wrapper"

          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 90,
                  scale: 0.94,
                }
          }

          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }

          viewport={{
            once: true,
            amount: 0.18,
          }}

          transition={{
            duration: 1,
            delay: 0.12,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          {/* ABAS */}
          <motion.div
            className="solar-tabs"
            role="tablist"
            aria-label="Etapas da energia solar"

            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scaleX: 0.94,
                  }
            }

            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scaleX: 1,
                  }
            }

            viewport={{
              once: true,
              amount: 0.2,
            }}

            transition={{
              duration: 0.65,
              delay: 0.35,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            {stages.map(
              (stage, index) => {
                const StageIcon =
                  stage.icon;

                const isActive =
                  activeStage ===
                  stage.id;

                return (
                  <motion.button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={
                      isActive
                    }
                    className={`solar-tab ${
                      isActive
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveStage(
                        stage.id
                      )
                    }

                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: -12,
                          }
                    }

                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }

                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}

                    transition={{
                      duration: 0.4,
                      delay:
                        0.4 +
                        index * 0.08,
                    }}

                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -2,
                          }
                    }

                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.98,
                          }
                    }
                  >
                    <span className="solar-tab-icon">
                      <StageIcon size={19} />
                    </span>

                    <span className="solar-tab-text">
                      {stage.label}
                    </span>
                  </motion.button>
                );
              }
            )}
          </motion.div>

          {/* CONTEÚDO */}
          <div className="solar-content">

            {/* INFORMAÇÕES */}
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  currentStage.id
                }
                className="solar-info"
                variants={infoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  className={`solar-icon-large solar-icon-${currentStage.id}`}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    rotate: -10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  <Icon size={34} />
                </motion.div>

                <span className="eyebrow">
                  {currentStage.label}
                </span>

                <h3>
                  {currentStage.title}
                </h3>

                <p>
                  {currentStage.description}
                </p>

                <div className="solar-points">
                  {currentStage.points.map(
                    (
                      point,
                      index
                    ) => (
                      <motion.div
                        className="solar-point"
                        key={point}
                        initial={{
                          opacity: 0,
                          x: -25,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.45,
                          delay:
                            0.15 +
                            index * 0.09,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >
                        <CheckCircle2
                          size={18}
                        />

                        <span>
                          {point}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CENA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  currentStage.id
                }
                className={`solar-visual solar-visual-${currentStage.id}`}
                variants={
                  sceneVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  position:
                    "relative",
                  overflow:
                    "hidden",
                  isolation:
                    "isolate",
                }}
              >
                {/* CENA DIA */}
                {currentStage.id ===
                  "dia" && (
                  <DayScene />
                )}

                {/* CENA NOITE */}
                {currentStage.id ===
                  "noite" && (
                  <NightScene />
                )}

                {/* CENA PRODUÇÃO */}
                {currentStage.id ===
                  "producao" && (
                  <ProductionScene />
                )}

                {/* CASA */}
                <House />

                {/* LINHA DE ENERGIA */}
                <motion.div
                  className="solar-energy-line"
                  animate={{
                    opacity:
                      currentStage.id ===
                      "noite"
                        ? [0.2, 0.45, 0.2]
                        : [0.5, 1, 0.5],

                    scaleX:
                      currentStage.id ===
                      "noite"
                        ? [0.9, 1, 0.9]
                        : [0.82, 1, 0.82],
                  }}
                  transition={{
                    duration:
                      currentStage.id ===
                      "producao"
                        ? 1.2
                        : 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position:
                      "absolute",
                    left: "14%",
                    right: "11%",
                    top: "54%",
                    zIndex: 11,
                  }}
                >
                  <span />

                  <motion.div
                    animate={{
                      x:
                        currentStage.id ===
                        "producao"
                          ? [0, 7, 0]
                          : [0, 4, 0],
                    }}
                    transition={{
                      duration:
                        currentStage.id ===
                        "producao"
                          ? 1.1
                          : 1.9,
                      repeat: Infinity,
                      ease:
                        "easeInOut",
                    }}
                  >
                    <ArrowRight
                      size={18}
                    />
                  </motion.div>
                </motion.div>

                {/* INDICADOR DE PRODUÇÃO */}
                {currentStage.id ===
                  "producao" && (
                  <motion.div
                    style={{
                      position:
                        "absolute",
                      bottom: "10%",
                      right: "10%",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "8px",
                      padding:
                        "8px 12px",
                      border:
                        "1px solid rgba(245,184,46,0.32)",
                      borderRadius:
                        "999px",
                      background:
                        "rgba(5,22,37,0.58)",
                      backdropFilter:
                        "blur(10px)",
                      zIndex: 12,
                    }}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease:
                        "easeInOut",
                    }}
                  >
                    <motion.span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius:
                          "50%",
                        background:
                          "#f5b82e",
                      }}
                      animate={{
                        opacity: [
                          0.3,
                          1,
                          0.3,
                        ],
                        scale: [
                          0.8,
                          1.15,
                          0.8,
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                    />

                    <span
                      style={{
                        color:
                          "rgba(255,255,255,0.84)",
                        fontSize:
                          "10px",
                        fontWeight: 800,
                        letterSpacing:
                          "0.08em",
                      }}
                    >
                      PRODUÇÃO ATIVA
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
}