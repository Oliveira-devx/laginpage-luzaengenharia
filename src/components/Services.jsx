import {
  Sun,
  Cable,
  Wrench,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const services = [
  {
    number: "01",
    title: "ENERGIA SOLAR",
    subtitle: "Projetos e Instalações",
    description:
      "Sistemas fotovoltaicos dimensionados de acordo com o consumo e as necessidades de cada cliente.",
    image: "/images/servico-solar.jpg",
    icon: Sun,
  },
  {
    number: "02",
    title: "INSTALAÇÕES ELÉTRICAS",
    subtitle: "Residenciais, Comerciais e Industriais",
    description:
      "Soluções elétricas planejadas para diferentes tipos de ambientes, com foco em segurança e eficiência.",
    image: "/images/servico-eletrica.jpg",
    icon: Cable,
  },
  {
    number: "03",
    title: "LIMPEZA E MANUTENÇÃO",
    subtitle: "Painéis sempre limpos, energia sempre máxima",
    description:
      "Cuidados e manutenção para ajudar seu sistema fotovoltaico a manter um bom desempenho ao longo do tempo.",
    image: "/images/servico-manutencao.jpg",
    icon: Wrench,
  },
  {
    number: "04",
    title: "PROJETOS",
    subtitle: "Elétricos e Fotovoltaicos",
    description:
      "Projetos desenvolvidos com planejamento técnico para atender às características de cada instalação.",
    image: "/images/servico-projetos.jpg",
    icon: Ruler,
  },
];

export default function Services() {
  return (
    <section
      className="section services"
      id="servicos"
    >
      <div className="container">
        <ScrollReveal>
          <div className="services-heading">
            <div>
              <span className="eyebrow">
                NOSSOS SERVIÇOS
              </span>

              <h2>
                SOLUÇÕES PARA
                <span> CADA NECESSIDADE.</span>
              </h2>
            </div>

            <p>
              Da geração de energia aos projetos e
              instalações, reunimos soluções de
              engenharia para diferentes necessidades.
            </p>
          </div>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <ScrollReveal
                key={service.number}
                delay={index * 0.08}
              >
                <motion.article
                  className="service-card"
                  whileHover={{
                    y: -7,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  <div className="service-image-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-image"
                      loading="lazy"
                    />

                    <div className="service-image-overlay" />

                    <div className="service-number">
                      {service.number}
                    </div>

                    <motion.div
                      className="service-icon"
                      whileHover={{
                        rotate: 4,
                        scale: 1.05,
                      }}
                    >
                      <Icon size={22} />
                    </motion.div>
                  </div>

                  <div className="service-content">
                    <span className="service-subtitle">
                      {service.subtitle}
                    </span>

                    <h3>{service.title}</h3>

                    <p>
                      {service.description}
                    </p>

                    <a
                      href="#contato"
                      className="service-link"
                    >
                      <span>
                        Quero saber mais
                      </span>

                      <ArrowUpRight size={18} />
                    </a>
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