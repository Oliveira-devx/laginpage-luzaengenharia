import {
  Sun,
  Cable,
  Wrench,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const services = [
  {
    number: "01",
    title: "ENERGIA SOLAR",
    subtitle: "Projetos e Instalações",
    description:
      "Sistemas fotovoltaicos dimensionados de acordo com o consumo e as necessidades de cada cliente.",
    image: "/images/servico-solar.jpg",
    icon: Sun,
  },
  {
    number: "02",
    title: "INSTALAÇÕES ELÉTRICAS",
    subtitle:
      "Residenciais, Comerciais e Industriais",
    description:
      "Soluções elétricas planejadas para diferentes tipos de ambientes, com foco em segurança e eficiência.",
    image: "/images/servico-eletrica.jpg",
    icon: Cable,
  },
  {
    number: "03",
    title: "LIMPEZA E MANUTENÇÃO",
    subtitle:
      "Painéis sempre limpos, energia sempre máxima",
    description:
      "Cuidados e manutenção para ajudar seu sistema fotovoltaico a manter um bom desempenho ao longo do tempo.",
    image: "/images/servico-manutencao.jpg",
    icon: Wrench,
  },
  {
    number: "04",
    title: "PROJETOS",
    subtitle: "Elétricos e Fotovoltaicos",
    description:
      "Projetos desenvolvidos com planejamento técnico para atender às características de cada instalação.",
    image: "/images/servico-projetos.jpg",
    icon: Ruler,
  },
];

export default function Services() {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      className="section services"
      id="servicos"
    >
      <div className="container">

        {/* ========================================
            CABEÇALHO
            ======================================== */}

        <div className="services-heading">

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -80,
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
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <span className="eyebrow">
              NOSSOS SERVIÇOS
            </span>

            <h2>
              SOLUÇÕES PARA
              <span>
                {" "}
                CADA NECESSIDADE.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 80,
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
              delay: 0.08,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            Da geração de energia aos projetos e
            instalações, reunimos soluções de
            engenharia para diferentes necessidades.
          </motion.p>

        </div>

        {/* ========================================
            CARDS
            ======================================== */}

        <div className="services-grid">

          {services.map(
            (service, index) => {
              const Icon = service.icon;

              const fromLeft =
                index % 2 === 0;

              const direction =
                fromLeft ? -100 : 100;

              return (
                <motion.article
                  key={service.number}
                  className="service-card"

                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: direction,
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
                    amount: 0.2,
                  }}

                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
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

                  {/* ==================================
                      IMAGEM
                      ================================== */}

                  <div className="service-image-wrapper">

                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                      loading="lazy"

                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              scale: 1.12,
                              x: fromLeft
                                ? -24
                                : 24,
                            }
                      }

                      whileInView={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              scale: 1,
                              x: 0,
                            }
                      }

                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}

                      transition={{
                        duration: 1,
                        delay:
                          0.08 +
                          index * 0.1,
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
                              scale: 1.055,
                            }
                      }
                    />

                    {/* OVERLAY */}

                    <motion.div
                      className="service-image-overlay"

                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0.55,
                            }
                      }

                      whileInView={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                            }
                      }

                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}

                      transition={{
                        duration: 0.8,
                        delay:
                          0.15 +
                          index * 0.1,
                        ease: "easeOut",
                      }}
                    />

                    {/* NÚMERO */}

                    <motion.div
                      className="service-number"

                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x:
                                fromLeft
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
                        amount: 0.3,
                      }}

                      transition={{
                        duration: 0.5,
                        delay:
                          0.3 +
                          index * 0.1,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      {service.number}
                    </motion.div>

                    {/* ÍCONE */}

                    <motion.div
                      className="service-icon"

                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              scale: 0.75,
                              y: 10,
                            }
                      }

                      whileInView={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }
                      }

                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}

                      transition={{
                        duration: 0.45,
                        delay:
                          0.38 +
                          index * 0.1,
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
                              rotate: 5,
                              scale: 1.06,
                            }
                      }
                    >
                      <Icon size={22} />
                    </motion.div>

                  </div>

                  {/* ==================================
                      CONTEÚDO
                      ================================== */}

                  <div className="service-content">

                    {/* SUBTÍTULO */}

                    <motion.span
                      className="service-subtitle"

                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x:
                                fromLeft
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
                        amount: 0.25,
                      }}

                      transition={{
                        duration: 0.45,
                        delay:
                          0.35 +
                          index * 0.1,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      {service.subtitle}
                    </motion.span>

                    {/* TÍTULO */}

                    <motion.h3
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x:
                                fromLeft
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
                        amount: 0.25,
                      }}

                      transition={{
                        duration: 0.5,
                        delay:
                          0.4 +
                          index * 0.1,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* DESCRIÇÃO */}

                    <motion.p
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x:
                                fromLeft
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
                        amount: 0.25,
                      }}

                      transition={{
                        duration: 0.5,
                        delay:
                          0.46 +
                          index * 0.1,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      {service.description}
                    </motion.p>

                    {/* LINK */}

                    <motion.a
                      href="#contato"
                      className="service-link"

                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x:
                                fromLeft
                                  ? -20
                                  : 20,
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
                        duration: 0.45,
                        delay:
                          0.54 +
                          index * 0.1,
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
                              x: 6,
                            }
                      }
                    >
                      <span>
                        Quero saber mais
                      </span>

                      <motion.span
                        initial={false}
                        whileHover={{
                          x: 4,
                          y: -4,
                        }}
                      >
                        <ArrowUpRight
                          size={18}
                        />
                      </motion.span>
                    </motion.a>

                  </div>
                </motion.article>
              );
            }
          )}

        </div>
      </div>
    </section>
  );
}