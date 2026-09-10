import {
  MapPin,
  Building2,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

const indicators = [
  {
    value: "03",
    label: "ESTADOS",
    description: "PI • MA • CE",
    icon: MapPin,
  },
  {
    value: "01",
    label: "BASE",
    description: "Teresina — PI",
    icon: Building2,
  },
  {
    value: "100%",
    label: "PERSONALIZADO",
    description: "Projetos para cada necessidade",
    icon: SlidersHorizontal,
  },
  {
    value: "01",
    label: "PROPÓSITO",
    description: "Energia como solução inteligente",
    icon: Sparkles,
  },
];

/* =========================================
   CONTADOR
   ========================================= */

function AnimatedValue({ value, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  const [displayValue, setDisplayValue] =
    useState(
      shouldReduceMotion ? value : "0"
    );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const numericValue = Number(
      value.replace(/\D/g, "")
    );

    const suffix = value.includes("%")
      ? "%"
      : "";

    const leadingZero =
      !value.includes("%") &&
      numericValue < 10;

    let animationFrame;
    let startTime = null;

    const duration = 900;

    const startCounter = () => {
      const animate = (time) => {
        if (startTime === null) {
          startTime = time;
        }

        const elapsed =
          time - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );

        const current = Math.round(
          numericValue * eased
        );

        const formatted =
          leadingZero && current < 10
            ? `0${current}`
            : `${current}`;

        setDisplayValue(
          `${formatted}${suffix}`
        );

        if (progress < 1) {
          animationFrame =
            requestAnimationFrame(
              animate
            );
        }
      };

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    const timeout = setTimeout(
      startCounter,
      delay * 1000
    );

    return () => {
      clearTimeout(timeout);

      if (animationFrame) {
        cancelAnimationFrame(
          animationFrame
        );
      }
    };
  }, [value, delay, shouldReduceMotion]);

  return (
    <motion.span
      className="impact-value"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.9,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {displayValue}
    </motion.span>
  );
}

/* =========================================
   IMPACT
   ========================================= */

export default function Impact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="section impact"
      id="impacto"
    >
      <div className="container">

        {/* =====================================
            CABEÇALHO
            ===================================== */}

        <div className="impact-heading">

          {/* TÍTULO — ESQUERDA */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -100,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="eyebrow">
              NOSSO IMPACTO
            </span>

            <h2>
              ENERGIA QUE GERA
              <span>
                {" "}
                TRANSFORMAÇÃO.
              </span>
            </h2>
          </motion.div>

          {/* TEXTO — DIREITA */}
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 100,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Uma atuação próxima,
            personalizada e orientada para
            transformar energia solar em
            soluções eficientes.
          </motion.p>

        </div>

        {/* =====================================
            CARDS
            ===================================== */}

        <div className="impact-grid">

          {indicators.map(
            (indicator, index) => {
              const Icon = indicator.icon;

              const comesFromLeft =
                index % 2 === 0;

              const initialX =
                comesFromLeft
                  ? -100
                  : 100;

              return (
                <motion.article
                  key={indicator.label}
                  className="impact-card"

                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: initialX,
                        }
                  }

                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }

                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}

                  transition={{
                    duration: 0.75,
                    delay: index * 0.12,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}

                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -7,
                        }
                  }
                >

                  {/* TOPO */}
                  <motion.div
                    className="impact-card-top"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        0.15 +
                        index * 0.12,
                    }}
                  >

                    <motion.div
                      className="impact-icon"
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              scale: 0.7,
                              opacity: 0,
                            }
                      }
                      whileInView={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: 1,
                              opacity: 1,
                            }
                      }
                      viewport={{
                        once: true,
                        amount: 0.4,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          0.18 +
                          index * 0.12,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      <Icon size={20} />
                    </motion.div>

                    <span className="impact-index">
                      0{index + 1}
                    </span>

                  </motion.div>

                  {/* NÚMERO */}
                  <AnimatedValue
                    value={indicator.value}
                    delay={
                      0.25 +
                      index * 0.12
                    }
                  />

                  {/* TÍTULO */}
                  <motion.h3
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: comesFromLeft
                              ? -30
                              : 30,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        0.35 +
                        index * 0.12,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    {indicator.label}
                  </motion.h3>

                  {/* DESCRIÇÃO */}
                  <motion.p
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: comesFromLeft
                              ? -25
                              : 25,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        0.42 +
                        index * 0.12,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    {indicator.description}
                  </motion.p>

                  {/* LINHA */}
                  <motion.div
                    className="impact-line"
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            scaleX: 0,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scaleX: 1,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        0.5 +
                        index * 0.12,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    style={{
                      transformOrigin:
                        comesFromLeft
                          ? "left center"
                          : "right center",
                    }}
                  />

                </motion.article>
              );
            }
          )}

        </div>
      </div>
    </section>
  );
}