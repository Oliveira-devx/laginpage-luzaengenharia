import {
  MapPin,
  Building2,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const indicators = [
  {
    value: "03",
    label: "ESTADOS",
    description: "PI • MA • CE",
    icon: MapPin,
  },
  {
    value: "01",
    label: "BASE",
    description: "Teresina — PI",
    icon: Building2,
  },
  {
    value: "100%",
    label: "PERSONALIZADO",
    description: "Projetos para cada necessidade",
    icon: SlidersHorizontal,
  },
  {
    value: "01",
    label: "PROPÓSITO",
    description: "Energia como solução inteligente",
    icon: Sparkles,
  },
];

export default function Impact() {
  return (
    <section className="section impact">
      <div className="container">
        <ScrollReveal>
          <div className="impact-heading">
            <div>
              <span className="eyebrow">
                NOSSO IMPACTO
              </span>

              <h2>
                ENERGIA QUE GERA
                <span> TRANSFORMAÇÃO.</span>
              </h2>
            </div>

            <p>
              Uma atuação próxima, personalizada e
              orientada para transformar energia solar
              em soluções eficientes.
            </p>
          </div>
        </ScrollReveal>

        <div className="impact-grid">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;

            return (
              <ScrollReveal
                key={indicator.label}
                delay={index * 0.08}
              >
                <motion.article
                  className="impact-card"
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <div className="impact-card-top">
                    <div className="impact-icon">
                      <Icon size={20} />
                    </div>

                    <span className="impact-index">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="impact-value">
                    {indicator.value}
                  </div>

                  <h3>
                    {indicator.label}
                  </h3>

                  <p>
                    {indicator.description}
                  </p>

                  <div className="impact-line" />
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}