import {
  ArrowRight,
  Info,
  PlusCircle,
  LayoutGrid,
  MessageCircle,
  PiggyBank,
  Sun,
  TrendingDown,
  Zap,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";
import { SplitLines, Side } from "./SplitText";
import { createWhatsAppUrl } from "../config/whatsapp";
import { EVENTS } from "../config/events";
import {
  ENERGIA,
  calcularEconomia,
  formatBRL,
  formatNumber,
} from "../config/energia";

const MIN = 100;
const MAX = 5000;
const PRESETS = [250, 450, 700, 1200, 2500];

function toNumber(text) {
  return Number(String(text).replace(/\D/g, "")) || 0;
}

function AnimatedValue({ value, format }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={Math.round(value)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22 }}
      >
        {format(value)}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Simulator() {
  const [bill, setBill] = useState(650);
  const [text, setText] = useState("650");

  useEffect(() => {
    const handle = (event) => {
      const value = Math.min(Math.max(toNumber(event.detail?.value), MIN), 20000);
      setBill(value);
      setText(String(value));
    };

    window.addEventListener(EVENTS.SET_BILL, handle);
    return () => window.removeEventListener(EVENTS.SET_BILL, handle);
  }, []);

  const result = useMemo(() => calcularEconomia(bill), [bill]);

  const handleText = (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 6);
    setText(digits);
    setBill(toNumber(digits));
  };

  const handleRange = (event) => {
    const value = Number(event.target.value);
    setBill(value);
    setText(String(value));
  };

  const rangePercent = ((Math.min(Math.max(bill, MIN), MAX) - MIN) / (MAX - MIN)) * 100;

  const whatsappMessage = result
    ? [
        "Olá, Luza Engenharia! ☀️",
        "",
        "Fiz a simulação no site e quero uma proposta personalizada:",
        "",
        `*Conta atual:* ${formatBRL(result.conta)}/mês`,
        `*Consumo estimado:* ${formatNumber(result.consumo)} kWh/mês`,
        `*Sistema sugerido:* ${formatNumber(result.kwp, 2)} kWp (${result.modulos} módulos)`,
        `*Conta estimada com solar:* ${formatBRL(result.novaConta)}/mês`,
        `*Economia estimada:* ${formatBRL(result.economiaMensal)}/mês`,
        "",
        "(Valores de simulação — aguardo a análise técnica.)",
      ].join("\n")
    : "";

  return (
    <section className="section simulator" id="simulador">
      <div className="simulator-bg" aria-hidden="true" />

      <div className="container">
        <div className="simulator-heading">
            <span className="eyebrow">CALCULADORA SOLAR • EQUATORIAL PIAUÍ</span>
            <SplitLines
              lines={[
                { text: "QUANTO VOCÊ PAGA DE LUZ?" },
                { text: "VEJA QUANTO PODE ECONOMIZAR.", accent: true },
              ]}
            />
            <Side from="right" delay={0.45}>
              Digite o valor médio da sua conta. Calculamos na hora com base na
              tarifa da Equatorial Piauí, na irradiação solar de Teresina e nas
              regras da Lei 14.300.
            </Side>
          </div>

        <ScrollReveal delay={0.1}>
          <div className="calc">
            {/* ENTRADA */}
            <div className="calc-input">
              <span className="calc-step">1. SUA CONTA DE ENERGIA</span>

              <label htmlFor="bill" className="calc-label">
                Valor médio mensal
              </label>

              <div className="calc-money">
                <span>R$</span>
                <input
                  id="bill"
                  type="text"
                  inputMode="numeric"
                  value={text ? formatNumber(toNumber(text)) : ""}
                  onChange={handleText}
                  placeholder="650"
                  aria-describedby="bill-help"
                />
                <small>/mês</small>
              </div>

              <input
                className="calc-range"
                type="range"
                min={MIN}
                max={MAX}
                step={10}
                value={Math.min(Math.max(bill, MIN), MAX)}
                onChange={handleRange}
                style={{ "--range": `${rangePercent}%` }}
                aria-label="Ajustar valor da conta"
              />

              <div className="calc-range-labels">
                <span>{formatBRL(MIN)}</span>
                <span>{formatBRL(MAX)}+</span>
              </div>

              <div className="calc-presets" role="group" aria-label="Valores rápidos">
                {PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`chip ${bill === preset ? "is-active" : ""}`}
                    onClick={() => {
                      setBill(preset);
                      setText(String(preset));
                    }}
                  >
                    {formatBRL(preset)}
                  </button>
                ))}
              </div>

              <p id="bill-help" className="calc-help">
                Tarifa de referência: {formatBRL(ENERGIA.tarifaFinal, 2)}/kWh com
                impostos (B1 residencial — reajuste ANEEL dez/2025). Valores
                estimados; a proposta final depende da análise do engenheiro.
              </p>

              <a href="#residencial-comercial" className="calc-industrial-link">
                <PlusCircle size={18} />
                <span>
                  Você já tem sistema solar e quer aumentar?
                  <strong> Solicite sua ampliação</strong>
                </span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* RESULTADO */}
            <div className="calc-result" aria-live="polite">
              {!result ? (
                <div className="simulator-empty">
                  <div className="simulator-empty-icon">
                    <Zap size={30} />
                  </div>
                  <span>DIGITE O VALOR DA SUA CONTA</span>
                  <p>Informe um valor a partir de R$ 100 para ver sua economia.</p>
                </div>
              ) : (
                <>
                  <div className="calc-result-head">
                    <span className="calc-step calc-step-light">2. SUA CONTA COM ENERGIA SOLAR</span>
                    <span className="calc-sim-tag">
                      <Info size={13} /> SIMULAÇÃO
                    </span>
                  </div>

                  <div className="calc-hero-value">
                    <small>Valor estimado da sua conta de energia</small>
                    <strong>
                      <AnimatedValue value={result.novaConta} format={(v) => formatBRL(v)} />
                      <em>/mês</em>
                    </strong>
                    <div className="calc-hero-sub">
                      <span>Hoje você paga <s>{formatBRL(result.conta)}</s></span>
                      <div className="calc-badge">
                        <TrendingDown size={15} />
                        Economia estimada de {formatBRL(result.economiaMensal)}/mês ({formatNumber(result.percentual * 100)}%)
                      </div>
                    </div>
                  </div>

                  <div className="calc-disclaimer" role="note">
                    <Info size={16} />
                    <p>
                      <strong>Isto é apenas uma simulação.</strong> Os valores são estimativas
                      calculadas a partir de médias de tarifa e de irradiação solar e podem variar.
                      O valor real da conta e da economia só é confirmado após a análise do engenheiro e
                      do seu histórico de consumo.
                    </p>
                  </div>

                  <div className="calc-compare">
                    <div className="calc-bar">
                      <span>Hoje</span>
                      <div className="calc-bar-track">
                        <motion.div className="calc-bar-fill is-old" animate={{ width: "100%" }} />
                      </div>
                      <strong>{formatBRL(result.conta)}</strong>
                    </div>
                    <div className="calc-bar">
                      <span>Com solar</span>
                      <div className="calc-bar-track">
                        <motion.div
                          className="calc-bar-fill is-new"
                          animate={{ width: `${Math.max(6, (result.novaConta / result.conta) * 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <strong>{formatBRL(result.novaConta)}</strong>
                    </div>
                  </div>

                  <div className="calc-grid">
                    <div className="calc-card">
                      <PiggyBank size={18} />
                      <span>Economia em 1 ano</span>
                      <strong>{formatBRL(result.economiaAnual)}</strong>
                    </div>
                    <div className="calc-card">
                      <Sun size={18} />
                      <span>Economia em 25 anos</span>
                      <strong>{formatBRL(result.economiaVidaUtil)}</strong>
                    </div>
                    <div className="calc-card">
                      <Zap size={18} />
                      <span>Sistema sugerido</span>
                      <strong>{formatNumber(result.kwp, 2)} kWp</strong>
                      <small>{result.modulos} módulos • ~{formatNumber(result.area)} m²</small>
                    </div>
                    <div className="calc-card">
                      <LayoutGrid size={18} />
                      <span>Retorno estimado</span>
                      <strong>≈ {formatNumber(result.payback, 1)} anos</strong>
                      <small>Investimento ~{formatBRL(result.investimento)}</small>
                    </div>
                  </div>

                  <div className="calc-actions">
                    <a
                      href={createWhatsAppUrl(whatsappMessage)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      onClick={() => window.gtag?.("event", "generate_lead", { lead_type: "simulador", value: result.economiaMensal })}
                    >
                      <MessageCircle size={18} />
                      <span>RECEBER MINHA PROPOSTA</span>
                    </a>
                  </div>

                  <p className="calc-footnote">
                    Consumo estimado de {formatNumber(result.consumo)} kWh/mês • geração
                    prevista de {formatNumber(result.geracao)} kWh/mês. Considera custo de
                    disponibilidade, Fio B ({formatNumber(ENERGIA.percentualFioB * 100)}% em 2026)
                    e iluminação pública.
                  </p>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
