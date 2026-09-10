import {
  CircleDollarSign,
  Leaf,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const benefits = [
  {
    icon: CircleDollarSign,
    title: "Economia",
    description:
      "Reduza a dependência da energia da rede e tenha mais controle sobre seus custos de eletricidade.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description:
      "Utilize uma fonte de energia renovável e contribua para um futuro com menor impacto ambiental.",
  },
  {
    icon: TrendingUp,
    title: "Valorização",
    description:
      "Uma solução solar pode agregar valor ao imóvel e representar um investimento de longo prazo.",
  },
];

export default function CleanEnergy() {
  return (
    <section className="section clean-energy">
      <div className="container">
        <div className="clean-energy-grid">
          <ScrollReveal>
            <div className="clean-energy-content">
              <span className="eyebrow">
                ENERGIA LIMPA
              </span>

              <h2>
                ENERGIA LIMPA.
                <span> RESULTADOS QUE VOCÊ PODE SENTIR.</span>
              </h2>

              <p className="clean-energy-description">
                A energia solar une tecnologia,
                sustentabilidade e uma estratégia
                inteligente para transformar a maneira
                como você consome energia.
              </p>

              <a
                href="#simulador"
                className="clean-energy-link"
              >
                <span>
                  Descubra seu potencial de economia
                </span>

                <ArrowRight size={18} />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <motion.div
              className="clean-energy-visual"
              whileHover={{
                scale: 1.015,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <img
                src="/images/energia-limpa.jpg"
                alt="Painéis solares em uma residência durante um dia ensolarado"
                className="clean-energy-image"
                loading="lazy"
              />

              <div className="clean-energy-image-overlay" />

              <div className="clean-energy-visual-content">
                <span>
                  ENERGIA DO SOL
                </span>

                <strong>
                  Uma escolha inteligente
                  para o presente e o futuro.
                </strong>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        <div className="clean-energy-benefits">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <ScrollReveal
                key={benefit.title}
                delay={index * 0.1}
              >
                <motion.article
                  className="clean-energy-card"
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <div className="clean-energy-card-icon">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3>{benefit.title}</h3>

                    <p>
                      {benefit.description}
                    </p>
                  </div>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}