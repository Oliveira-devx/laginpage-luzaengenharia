import { ArrowRight, Award, Handshake, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";
import { createWhatsAppUrl } from "../config/whatsapp";

/*
  Ocupa o lugar da antiga seção de visita técnica.
  Reaproveita as classes "visit-cta-*" para manter o visual.
*/

const pilares = [
  { n: "01", title: "Atendimento personalizado", text: "Cada caso é analisado de forma única, do primeiro contato à entrega." },
  { n: "02", title: "6 anos de experiência", text: "Seis anos de mercado acumulando projetos e conhecimento técnico." },
  { n: "03", title: "Engenharia própria", text: "Projeto, homologação na Equatorial e acompanhamento do início ao fim." },
];

export default function Atendimento() {
  return (
    <section className="section visit-cta" id="atendimento">
      <div className="container">
        <ScrollReveal>
          <div className="visit-cta-card">
            <div className="visit-cta-glow" aria-hidden="true" />

            <div className="visit-cta-content">
              <span className="eyebrow">ATENDIMENTO PERSONALIZADO</span>
              <h2>
                Cada caso é único,
                <span> e 6 anos de mercado mostram como cuidar do seu.</span>
              </h2>

              <div className="visit-cta-perks">
                <span><Handshake size={16} /> Atendimento personalizado</span>
                <span><Award size={16} /> 6 anos de experiência</span>
                <span><ShieldCheck size={16} /> Sem compromisso</span>
              </div>

              <div className="visit-cta-actions">
                <motion.a
                  href="#residencial-comercial"
                  className="btn btn-primary"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>SOLICITAR MEU ORÇAMENTO</span>
                  <ArrowRight size={18} />
                </motion.a>
                <a
                  className="btn btn-outline-light"
                  href={createWhatsAppUrl("Olá! Vim pelo site e quero um atendimento personalizado da Luza Engenharia.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  <span>FALAR COM UM ESPECIALISTA</span>
                </a>
              </div>
            </div>

            <ol className="visit-cta-steps">
              {pilares.map((item) => (
                <li key={item.title}>
                  <b>{item.n}</b>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
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
