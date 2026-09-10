import {
  Target,
  Eye,
  Heart,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const essenceItems = [
  {
    id: "01",
    icon: Target,
    title: "Nossa Missão",
    text:
      "Ajudar nossos clientes a economizar e investir em uma solução que gere retorno financeiro, oferecendo energia solar com qualidade, segurança e eficiência.",
  },
  {
    id: "02",
    icon: Eye,
    title: "Nossa Visão",
    text:
      "Ser referência em soluções de energia solar, reconhecida pela confiança, inovação e capacidade de gerar resultados que representem economia e retorno real.",
  },
  {
    id: "03",
    icon: Heart,
    title: "Nossos Valores",
    text:
      "Foco no cliente, compromisso, qualidade e sustentabilidade orientam cada decisão e cada projeto desenvolvido pela Luza Engenharia.",
  },
];

export default function Essence() {
  return (
    <section className="section essence">
      <div className="container">
        <ScrollReveal>
          <div className="essence-heading">
            <div>
              <span className="eyebrow">
                NOSSA ESSÊNCIA
              </span>

              <h2>
                O QUE MOVE A
                <span> LUZA.</span>
              </h2>
            </div>

            <p>
              Mais do que instalar sistemas solares,
              buscamos construir soluções que façam
              sentido para cada cliente e para o futuro.
            </p>
          </div>
        </ScrollReveal>

        <div className="essence-grid">
          {essenceItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.id}
                delay={index * 0.1}
              >
                <motion.article
                  className="essence-card"
                  whileHover={{
                    y: -7,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <div className="essence-card-top">
                    <span className="essence-number">
                      {item.id}
                    </span>

                    <div className="essence-icon">
                      <Icon size={22} />
                    </div>

                    <ArrowUpRight
                      className="essence-arrow"
                      size={20}
                    />
                  </div>

                  <div className="essence-card-content">
                    <h3>{item.title}</h3>

                    <p>{item.text}</p>
                  </div>

                  <div className="essence-card-line" />
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.25}>
          <div className="essence-slogan">
            <span>LUZA ENGENHARIA</span>

            <strong>
              Sua economia hoje, seu futuro melhor amanhã.
            </strong>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}