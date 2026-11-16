import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Home, PlusCircle } from "lucide-react";

import SectionHead from "./SectionHead";
import { CarouselDots, useAutoCarousel } from "./AutoCarousel";

const solucoes = [
  {
    icon: Home,
    tag: "RESIDENCIAL",
    title: "Energia solar para sua casa",
    text: "Reduza a conta de luz da família e valorize o seu imóvel com um sistema dimensionado para o seu consumo.",
    points: ["Projeto sob medida", "Homologação inclusa", "Instalação limpa e segura"],
    image: "/images/servico-solar.webp",
    href: "#simulador",
    cta: "Simular minha economia",
  },
  {
    icon: Building2,
    tag: "COMERCIAL",
    title: "Energia solar para empresas",
    text: "Transforme um custo fixo em economia previsível para lojas, clínicas, escritórios e comércios.",
    points: ["Menor custo operacional", "Retorno do investimento", "Proteção contra reajustes"],
    image: "/images/energia-limpa.webp",
    href: "#simulador",
    cta: "Calcular para minha empresa",
  },
  {
    icon: PlusCircle,
    tag: "AMPLIAÇÃO",
    title: "Já tem sistema solar e quer aumentar?",
    text: "Seu consumo cresceu? Ampliamos o seu sistema atual, residencial ou comercial, com projeto e homologação.",
    points: ["Análise do sistema atual", "Novas placas e inversor", "Homologação inclusa"],
    image: "/images/servico-projetos.webp",
    href: "#residencial-comercial",
    cta: "Quero ampliar meu sistema",
  },
];

export default function Solutions() {
  // No celular, as fotos rolam sozinhas para o lado
  const carousel = useAutoCarousel(solucoes.length, { interval: 4000 });

  return (
    <section className="section rd-section solutions" id="solucoes">
      <div className="container">
        <SectionHead
          eyebrow="SOLUÇÕES"
          title="UM SISTEMA PARA CADA"
          accent="NECESSIDADE."
          text="Da sua casa ao seu negócio, com a mesma engenharia — e ampliação para quem já tem solar."
        />

        <div className="solutions-track" {...carousel.trackProps}>
          {solucoes.map(({ icon: Icon, ...item }, index) => (
            <motion.a
              href={item.href}
              key={item.tag}
              className="solution-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="solution-media">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="solution-shade" aria-hidden="true" />

              <div className="solution-body">
                <span className="solution-tag">
                  <Icon size={15} /> {item.tag}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <span className="solution-cta">
                  {item.cta}
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <CarouselDots carousel={carousel} labels={solucoes.map((s) => s.title)} />
      </div>
    </section>
  );
}
