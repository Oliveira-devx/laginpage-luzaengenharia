import {
  ArrowRight,
  Calculator,
  MapPin,
  Sun,
} from "lucide-react";

import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";
import { createWhatsAppUrl } from "../config/whatsapp";

/* =========================================================
   ANIMAÇÕES
   ========================================================= */

const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroBadgeVariants = {
  hidden: {
    opacity: 0,
    y: -15,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section
      className="hero hero-fullscreen"
      id="inicio"
    >
      {/* =====================================================
          VÍDEO DE FUNDO
          ===================================================== */}

      <div className="hero-background">

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-solar.jpeg"
          aria-hidden="true"
        >
          <source
            src="/videos/hero-solar.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-overlay" />

      </div>

      {/* =====================================================
          CONTEÚDO PRINCIPAL
          ===================================================== */}

      <div className="container hero-container">

        {/* ===================================================
            LADO ESQUERDO
            =================================================== */}

        <motion.div
          className="hero-content"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* BADGE */}

          <motion.div
            className="hero-badge"
            variants={heroBadgeVariants}
          >
            <Sun size={16} />

            <span>
              ENERGIA INTELIGENTE
            </span>
          </motion.div>

          {/* CONTEÚDO */}

          <ScrollReveal>
            <motion.div
              variants={heroContainerVariants}
            >

              {/* TÍTULO */}

              <motion.h1
                variants={heroItemVariants}
              >
                PARE DE PAGAR CARO
                <span>
                  {" "}PELA SUA ENERGIA.
                </span>
              </motion.h1>

              {/* DESCRIÇÃO */}

              <motion.p
                className="hero-description"
                variants={heroItemVariants}
              >
                Descubra quanto você pode economizar
                com um sistema solar projetado para
                o seu consumo.
              </motion.p>

              {/* BOTÕES */}

              <motion.div
                className="hero-actions"
                variants={heroItemVariants}
              >

                <motion.a
                  href="#simulador"
                  className="btn btn-primary hero-main-button"
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Calculator size={19} />

                  <span>
                    CALCULAR MINHA ECONOMIA
                  </span>
                </motion.a>

                <motion.a
                  href={createWhatsAppUrl(
                    "Olá! Vim pelo site da Luza Engenharia e gostaria de falar com um especialista."
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <span>
                    FALAR COM UM ESPECIALISTA
                  </span>

                  <ArrowRight size={18} />
                </motion.a>

              </motion.div>

              {/* LOCALIZAÇÃO */}

              <motion.div
                className="hero-location"
                variants={heroItemVariants}
              >
                <MapPin size={16} />

                <span>
                  Atendimento em PI • MA • CE
                </span>
              </motion.div>

            </motion.div>
          </ScrollReveal>

        </motion.div>

        {/* ===================================================
            CARD DE ECONOMIA
            =================================================== */}

        <motion.div
          className="hero-economy"
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
        >

          <div className="hero-economy-header">

            <div>

              <span className="hero-economy-label">
                SIMULAÇÃO
              </span>

              <h2 className="hero-economy-title">
                Potencial de economia
              </h2>

            </div>

            <motion.div
              className="hero-economy-icon"
              animate={{
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sun size={24} />
            </motion.div>

          </div>

          <div className="hero-economy-main">

            <small>
              ECONOMIA ESTIMADA
            </small>

            <motion.div
              className="hero-economy-value"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 1,
              }}
            >
              R$ 480
            </motion.div>

            <span className="hero-economy-month">
              /mês*
            </span>

          </div>

          <div className="hero-economy-grid">

            <motion.div
              className="hero-economy-item"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 1.05,
              }}
            >
              <span>
                Conta atual
              </span>

              <strong>
                R$ 650
              </strong>
            </motion.div>

            <motion.div
              className="hero-economy-item"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 1.15,
              }}
            >
              <span>
                Conta estimada
              </span>

              <strong>
                R$ 170
              </strong>
            </motion.div>

          </div>

          <p className="hero-economy-note">
            *Exemplo ilustrativo. A economia real
            depende do consumo, tarifa, localização
            e dimensionamento do sistema.
          </p>

        </motion.div>

      </div>

      {/* =====================================================
          INDICADOR DE SCROLL
          ===================================================== */}

      <motion.div
        className="hero-scroll"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 1.4,
        }}
      >
        <span>
          ROLE PARA DESCOBRIR
        </span>

        <motion.div
          className="hero-scroll-line"
          animate={{
            scaleY: [0.4, 1, 0.4],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </motion.div>

    </section>
  );
}