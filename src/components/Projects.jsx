import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";

import SectionHead from "./SectionHead";
import { CarouselDots, useAutoCarousel } from "./AutoCarousel";
import { PROJETOS } from "../config/empresa";

function ProjectCard({ projeto, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallax discreto na imagem
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.figure
      ref={ref}
      className={`project-card ${projeto.destaque ? "is-featured" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={projeto.image}
        alt={projeto.titulo}
        loading="lazy"
        decoding="async"
        style={{ y }}
      />
      <figcaption>
        <span className="project-type">{projeto.tipo}</span>
        <strong>{projeto.titulo}</strong>
        {(projeto.cidade || projeto.potencia) && (
          <div className="project-meta">
            {projeto.cidade && <span><MapPin size={13} /> {projeto.cidade}</span>}
            {projeto.potencia && <span><Zap size={13} /> {projeto.potencia}</span>}
          </div>
        )}
      </figcaption>
    </motion.figure>
  );
}

export default function Projects() {
  // No celular, as fotos rolam sozinhas para o lado
  const carousel = useAutoCarousel(PROJETOS.length, { interval: 4000 });

  if (!PROJETOS.length) return null;

  return (
    <section className="section rd-section projects" id="projetos">
      <div className="container">
        <SectionHead
          eyebrow="PROJETOS E INSTALAÇÕES"
          title="ENGENHARIA QUE VOCÊ"
          accent="VÊ NO TELHADO."
          text="Cada instalação é planejada para durar décadas, com estrutura, cabeamento e acabamento feitos com rigor técnico."
        />

        <div className="projects-grid" {...carousel.trackProps}>
          {PROJETOS.map((projeto, index) => (
            <ProjectCard key={projeto.image + index} projeto={projeto} index={index} />
          ))}
        </div>

        <CarouselDots carousel={carousel} labels={PROJETOS.map((p) => p.titulo)} />
      </div>
    </section>
  );
}
