import { CalendarCheck, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";
import { openTechVisit } from "../config/events";
import { createWhatsAppUrl } from "../config/whatsapp";

const steps = [
  { n: "01", title: "Você agenda", text: "Escolha o melhor dia e período." },
  { n: "02", title: "Avaliamos no local", text: "Telhado, padrão de entrada e sombreamento." },
  { n: "03", title: "Proposta sob medida", text: "Projeto, prazo e investimento exatos." },
];

export default function VisitCTA() {
  return (
    <section className="section visit-cta" id="visita-tecnica">
      <div className="container">
        <ScrollReveal>
          <div className="visit-cta-card">
            <div className="visit-cta-glow" aria-hidden="true" />

            <div className="visit-cta-content">
              <span className="eyebrow">VISITA TÉCNICA GRATUITA</span>
              <h2>
                Receba um engenheiro no seu imóvel
                <span> e saiba exatamente quanto vai economizar.</span>
              </h2>

              <div className="visit-cta-perks">
                <span><ShieldCheck size={16} /> Sem compromisso</span>
                <span><Clock3 size={16} /> Agendamento rápido</span>
              </div>

              <div className="visit-cta-actions">
                <motion.button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openTechVisit("secao-visita")}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <CalendarCheck size={18} />
                  <span>AGENDAR VISITA TÉCNICA</span>
                </motion.button>
                <a
                  className="btn btn-outline-light"
                  href={createWhatsAppUrl("Olá! Tenho dúvidas sobre a visita técnica da Luza Engenharia.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  <span>TIRAR DÚVIDAS</span>
                </a>
              </div>
            </div>

            <ol className="visit-cta-steps">
              {steps.map((step) => (
                <li key={step.n}>
                  <b>{step.n}</b>
                  <div>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
