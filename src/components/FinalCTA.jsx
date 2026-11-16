import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, MessageCircle } from "lucide-react";

import { SplitLines, Side } from "./SplitText";
import { createWhatsAppUrl } from "../config/whatsapp";

export default function FinalCTA() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section className="final-cta" id="orcamento" ref={ref}>
      <motion.div className="final-cta-bg" style={{ y }} aria-hidden="true">
        <img src="/images/energia-limpa.webp" alt="" loading="lazy" decoding="async" />
      </motion.div>
      <div className="final-cta-overlay" aria-hidden="true" />
      <div className="final-cta-sun" aria-hidden="true" />

      <div className="container final-cta-inner">
        <span className="eyebrow">O PRÓXIMO PASSO</span>

        <SplitLines
          className="final-cta-title"
          lines={[
            { text: "SEU PRÓXIMO INVESTIMENTO COMEÇA COM UMA" },
            { text: "ESCOLHA INTELIGENTE.", accent: true },
          ]}
        />

        <Side className="final-cta-text" from="right" delay={0.4}>
          Receba uma proposta técnica feita para o seu imóvel, sem compromisso.
        </Side>

        <motion.div
          className="final-cta-actions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <a href="#contato" className="btn btn-primary btn-lg">
            <FileText size={19} />
            <span>SOLICITAR ORÇAMENTO</span>
            <ArrowRight size={18} />
          </a>
          <a
            href={createWhatsAppUrl("Olá! Vim pelo site da Luza Engenharia e gostaria de falar com um especialista.")}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-lg"
          >
            <MessageCircle size={19} />
            <span>FALAR COM ESPECIALISTA</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
