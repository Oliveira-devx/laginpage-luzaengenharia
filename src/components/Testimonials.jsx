import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Quote, Star } from "lucide-react";

import SectionHead from "./SectionHead";
import { DEPOIMENTOS, INSTAGRAM_URL } from "../config/empresa";

/*
  Exibe apenas depoimentos reais cadastrados em src/config/empresa.js.
  Enquanto a lista estiver vazia, mostra um convite para acompanhar
  os projetos no Instagram — sem avaliações inventadas.
*/
export default function Testimonials() {
  const hasReviews = DEPOIMENTOS.length > 0;

  return (
    <section className="section rd-section testimonials" id="depoimentos">
      <div className="container">
        {hasReviews ? (
          <>
            <SectionHead
              eyebrow="DEPOIMENTOS"
              title="QUEM INSTALOU,"
              accent="RECOMENDA."
            />

            <div className="testimonials-track">
              {DEPOIMENTOS.map((item, index) => (
                <motion.blockquote
                  key={item.nome + index}
                  className="testimonial glass"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <Quote className="testimonial-quote" size={34} aria-hidden="true" />
                  {item.nota && (
                    <div className="testimonial-stars" aria-label={`Nota ${item.nota} de 5`}>
                      {Array.from({ length: item.nota }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                    </div>
                  )}
                  <p>“{item.texto}”</p>
                  <footer>
                    <span className="testimonial-avatar" aria-hidden="true">{item.nome.charAt(0)}</span>
                    <div>
                      <strong>{item.nome}</strong>
                      <small>{[item.tipo, item.cidade].filter(Boolean).join(" • ")}</small>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            className="testimonials-empty glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <div className="icon-tile icon-tile-lg"><Instagram size={28} /></div>
            <div>
              <span className="eyebrow">ACOMPANHE DE PERTO</span>
              <h2>Veja nossas obras e clientes no <span>Instagram.</span></h2>
              <p>Bastidores das instalações, sistemas entregues e o dia a dia da nossa equipe.</p>
            </div>
            <a className="btn btn-ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram size={18} /> @luza_engenhariasolar <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
