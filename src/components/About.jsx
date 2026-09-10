import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

export default function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Qualidade e segurança",
      description:
        "Soluções pensadas para oferecer eficiência, segurança e confiabilidade em cada etapa.",
    },
    {
      icon: Target,
      title: "Projeto personalizado",
      description:
        "Cada sistema é dimensionado considerando o consumo e as necessidades específicas do cliente.",
    },
    {
      icon: Zap,
      title: "Tecnologia e eficiência",
      description:
        "Utilizamos engenharia e tecnologia para buscar o melhor aproveitamento da energia.",
    },
  ];

  return (
    <section
      className="section about"
      id="sobre"
    >
      <div className="container">
        <div className="about-grid">
          <ScrollReveal>
            <div className="about-visual">
              <div className="about-image-wrapper">
                <img
                  src="/images/sobre-luza.jpg"
                  alt="Profissional trabalhando em uma instalação de energia solar"
                  className="about-image"
                  loading="lazy"
                />

                <div className="about-image-overlay" />
              </div>

              <motion.div
                className="about-location-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
              >
                <div className="about-location-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <strong>
                    Teresina — PI
                  </strong>

                  <span>
                    Atendimento em PI • MA • CE
                  </span>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="about-content">
              <span className="eyebrow">
                SOBRE A LUZA
              </span>

              <h2>
                ENGENHARIA QUE
                <span> TRANSFORMA.</span>
              </h2>

              <p className="about-lead">
                A Luza Engenharia nasceu com o propósito
                de transformar a energia solar em uma
                solução inteligente para pessoas e
                empresas.
              </p>

              <p className="about-description">
                Atuamos com engenharia, tecnologia e
                transparência para desenvolver soluções
                que façam sentido para cada realidade.
                Nosso trabalho começa entendendo a
                necessidade do cliente e termina com uma
                solução projetada para buscar eficiência,
                segurança e qualidade.
              </p>

              <div className="about-features">
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon;

                  return (
                    <motion.div
                      className="about-feature"
                      key={feature.title}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.1,
                      }}
                    >
                      <div className="about-feature-icon">
                        <FeatureIcon size={19} />
                      </div>

                      <div>
                        <h3>
                          {feature.title}
                        </h3>

                        <p>
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <a
                href="#servicos"
                className="about-link"
              >
                <span>
                  Conheça nossas soluções
                </span>

                <ArrowRight size={18} />
              </a>

              <div className="about-trust">
                <CheckCircle2 size={17} />

                <span>
                  Engenharia, transparência e
                  compromisso em cada projeto.
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}