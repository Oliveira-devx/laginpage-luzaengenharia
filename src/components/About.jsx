import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      icon: ShieldCheck,
      title: "Qualidade e segurança",
      description:
        "Soluções pensadas para oferecer eficiência, segurança e confiabilidade em cada etapa.",
    },
    {
      icon: Target,
      title: "Projeto personalizado",
      description:
        "Cada sistema é dimensionado considerando o consumo e as necessidades específicas do cliente.",
    },
    {
      icon: Zap,
      title: "Tecnologia e eficiência",
      description:
        "Utilizamos engenharia e tecnologia para buscar o melhor aproveitamento da energia.",
    },
  ];

  const leftColumnAnimation = shouldReduceMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          x: -110,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
        viewport: {
          once: true,
          amount: 0.2,
        },
        transition: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  const rightColumnAnimation = shouldReduceMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          x: 110,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
        viewport: {
          once: true,
          amount: 0.2,
        },
        transition: {
          duration: 0.9,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return (
    <section
      className="section about"
      id="sobre"
    >
      <div className="container">
        <div className="about-grid">

          {/* ========================================
              COLUNA DA ESQUERDA
              IMAGEM VEM DA ESQUERDA
              ======================================== */}

          <motion.div
            className="about-visual"
            {...leftColumnAnimation}
          >
            {/* IMAGEM */}
            <motion.div
              className="about-image-wrapper"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      scale: 0.96,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1,
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.015,
                    }
              }
            >
              <img
                src="/images/sobre-luza.jpg"
                alt="Profissional trabalhando em uma instalação de energia solar"
                className="about-image"
                loading="lazy"
              />

              <div className="about-image-overlay" />
            </motion.div>

            {/* CARD DE LOCALIZAÇÃO */}
            <motion.div
              className="about-location-card"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -45,
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
                duration: 0.65,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 4,
                    }
              }
            >
              <div className="about-location-icon">
                <MapPin size={19} />
              </div>

              <div>
                <strong>
                  Teresina — PI
                </strong>

                <span>
                  Atendimento em PI • MA • CE
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================
              COLUNA DA DIREITA
              CONTEÚDO VEM DA DIREITA
              ======================================== */}

          <motion.div
            className="about-content"
            {...rightColumnAnimation}
          >
            {/* EYEBROW */}
            <motion.span
              className="eyebrow"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 35,
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
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              SOBRE A LUZA
            </motion.span>

            {/* TÍTULO */}
            <motion.h2
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 45,
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
                duration: 0.6,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              ENGENHARIA QUE
              <span>
                {" "}
                TRANSFORMA.
              </span>
            </motion.h2>

            {/* TEXTO PRINCIPAL */}
            <motion.p
              className="about-lead"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 45,
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
                duration: 0.55,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              A Luza Engenharia nasceu com o propósito
              de transformar a energia solar em uma
              solução inteligente para pessoas e
              empresas.
            </motion.p>

            {/* DESCRIÇÃO */}
            <motion.p
              className="about-description"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 45,
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
                duration: 0.55,
                delay: 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Atuamos com engenharia, tecnologia e
              transparência para desenvolver soluções
              que façam sentido para cada realidade.
              Nosso trabalho começa entendendo a
              necessidade do cliente e termina com uma
              solução projetada para buscar eficiência,
              segurança e qualidade.
            </motion.p>

            {/* DIFERENCIAIS */}
            <div className="about-features">
              {features.map(
                (feature, index) => {
                  const FeatureIcon =
                    feature.icon;

                  return (
                    <motion.div
                      className="about-feature"
                      key={feature.title}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: 55,
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
                        duration: 0.5,
                        delay:
                          0.42 +
                          index * 0.11,
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
                      <motion.div
                        className="about-feature-icon"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                scale: 1.06,
                                rotate: 2,
                              }
                        }
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        <FeatureIcon size={19} />
                      </motion.div>

                      <div>
                        <h3>
                          {feature.title}
                        </h3>

                        <p>
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>

            {/* LINK */}
            <motion.a
              href="#servicos"
              className="about-link"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 35,
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
                duration: 0.5,
                delay: 0.76,
                ease: [0.22, 1, 0.36, 1],
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
                Conheça nossas soluções
              </span>

              <ArrowRight size={18} />
            </motion.a>

            {/* CONFIANÇA */}
            <motion.div
              className="about-trust"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 35,
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
                duration: 0.5,
                delay: 0.83,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CheckCircle2 size={17} />

              <span>
                Engenharia, transparência e
                compromisso em cada projeto.
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}