import {
  ArrowRight,
  CalendarCheck,
  Calculator,
  MapPin,
  MessageCircle,
  Star,
  Sun,
} from "lucide-react";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";
import { SplitLines, Side, useAppReady } from "./SplitText";
import { createWhatsAppUrl } from "../config/whatsapp";
import { openTechVisit, sendBillToSimulator } from "../config/events";
import { calcularEconomia, formatBRL, formatNumber } from "../config/energia";

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

const EXAMPLE_BILL = 650;
const example = calcularEconomia(EXAMPLE_BILL);

export default function Hero() {
  const [bill, setBill] = useState("650");
  const value = Number(bill.replace(/\D/g, "")) || 0;
  const result = useMemo(() => calcularEconomia(value), [value]);
  const ready = useAppReady();

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
          animate={ready ? "visible" : "hidden"}
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

              <div className="hero-split">
                <div className="hero-split-text">
                {/* TÍTULO */}

                  {/* 1ª linha entra pela direita, 2ª pela esquerda */}
                  <SplitLines
                    as="h1"
                    waitForReady
                    delay={0.25}
                    lines={[
                      { text: "PARE DE PAGAR CARO PELA SUA" },
                      { text: "ENERGIA.", accent: true },
                    ]}
                  />

                  {/* DESCRIÇÃO — continua a alternância (direita) */}

                  <Side
                    className="hero-description"
                    from="right"
                    delay={0.7}
                    waitForReady
                  >
                    Energia solar projetada por engenheiros
                    para o seu consumo. Calcule sua economia
                    agora e receba uma visita técnica gratuita.
                  </Side>
                </div>

                {/* EXEMPLO COMPACTO — apenas no celular */}
                <motion.a
                  href="#simulador"
                  className="hero-mini"
                  variants={heroItemVariants}
                  aria-label={`Exemplo: conta de ${formatBRL(EXAMPLE_BILL)} com economia de ${formatBRL(example.economiaMensal)} por mês. Ver simulação.`}
                >
                  <span className="hero-mini-tag">
                    <Sun size={11} />
                    EXEMPLO
                  </span>

                  <div className="hero-mini-row">
                    <small>Conta hoje</small>
                    <s>{formatBRL(EXAMPLE_BILL)}</s>
                  </div>

                  <div className="hero-mini-row">
                    <small>Com solar</small>
                    <b>{formatBRL(example.novaConta)}</b>
                  </div>

                  <div className="hero-mini-save">
                    <small>Economia</small>
                    <strong>{formatBRL(example.economiaMensal)}</strong>
                    <em>/mês</em>
                  </div>

                  <span className="hero-mini-badge">
                    −{formatNumber(example.percentual * 100)}%
                  </span>

                  <span className="hero-mini-cta">
                    Simular a minha <ArrowRight size={11} />
                  </span>
                </motion.a>
              </div>

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

                <motion.button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => openTechVisit("hero")}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <CalendarCheck size={18} />
                  <span>AGENDAR VISITA TÉCNICA</span>
                </motion.button>

              </motion.div>

              {/* LOCALIZAÇÃO */}

              <motion.div
                className="hero-proof"
                variants={heroItemVariants}
              >
                <div className="hero-proof-stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span>
                  Projeto, homologação e instalação
                  <strong> em um só lugar</strong>
                </span>
                <span className="hero-proof-divider" />
                <span className="hero-location">
                  <MapPin size={15} />
                  PI • MA • CE
                </span>
              </motion.div>

              <motion.a
                className="hero-whatsapp-link"
                variants={heroItemVariants}
                href={createWhatsAppUrl(
                  "Olá! Vim pelo site da Luza Engenharia e gostaria de falar com um especialista."
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} />
                Prefere conversar? Fale com um especialista agora
                <ArrowRight size={15} />
              </motion.a>

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
          animate={ready ? {
            opacity: 1,
            x: 0,
            scale: 1,
          } : undefined}
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
                SIMULAÇÃO INSTANTÂNEA
              </span>

              <h2 className="hero-economy-title">
                Calcule em 5 segundos
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

          <form
            className="hero-quick"
            onSubmit={(event) => {
              event.preventDefault();
              sendBillToSimulator(value);
            }}
          >
            <label htmlFor="hero-bill">Quanto você paga de luz por mês?</label>
            <div className="hero-quick-input">
              <span>R$</span>
              <input
                id="hero-bill"
                inputMode="numeric"
                value={value ? formatNumber(value) : ""}
                onChange={(event) =>
                  setBill(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="650"
              />
            </div>
          </form>

          <div className="hero-economy-main">
            <small>CONTA ESTIMADA COM ENERGIA SOLAR</small>
            <div className="hero-economy-value">
              {result ? formatBRL(result.novaConta) : "R$ 0"}
            </div>
            <span className="hero-economy-month">/mês</span>
          </div>

          <div className="hero-economy-grid">
            <div className="hero-economy-item">
              <span>Conta atual</span>
              <strong>{formatBRL(value)}</strong>
            </div>
            <div className="hero-economy-item">
              <span>Economia estimada</span>
              <strong>{result ? formatBRL(result.economiaMensal) : "—"}</strong>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary hero-quick-button"
            onClick={() => sendBillToSimulator(value)}
          >
            <span>VER SIMULAÇÃO COMPLETA</span>
            <ArrowRight size={17} />
          </button>

          <p className="hero-economy-note">
            <strong>Apenas uma simulação.</strong> Valores estimados com
            base na tarifa da Equatorial Piauí e na irradiação de Teresina;
            o valor real é confirmado na visita técnica.
          </p>

        </motion.div>

      </div>

      {/* =====================================================
          PAINEL DE AÇÕES EM DESTAQUE — apenas no celular
          ===================================================== */}

      <motion.div
        className="hero-dock"
        initial={{ opacity: 0, y: 60 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-dock-head">
          <span className="hero-dock-live" aria-hidden="true" />
          Simulação grátis • resposta rápida
        </div>

        <a href="#simulador" className="btn btn-primary hero-dock-main">
          <Calculator size={19} />
          <span>CALCULAR MINHA ECONOMIA</span>
          <ArrowRight size={18} />
        </a>

        <button
          type="button"
          className="btn hero-dock-visit"
          onClick={() => openTechVisit("hero-mobile")}
        >
          <CalendarCheck size={18} />
          <span>AGENDAR VISITA TÉCNICA GRÁTIS</span>
        </button>
      </motion.div>

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