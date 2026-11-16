import { motion } from "framer-motion";
import { Cpu, Headset, LineChart, PencilRuler, Wrench } from "lucide-react";

import SectionHead from "./SectionHead";

const diferenciais = [
  { icon: PencilRuler, title: "Projeto de engenharia", text: "Dimensionamento técnico a partir do seu consumo, do telhado e da irradiação local. Nada de kit genérico." },
  { icon: Cpu, title: "Equipamentos de qualidade", text: "Módulos e inversores de fabricantes reconhecidos, com garantia e certificação." },
  { icon: Wrench, title: "Instalação profissional", text: "Equipe qualificada, normas de segurança e acabamento cuidadoso." },
  { icon: LineChart, title: "Acompanhamento técnico", text: "Suporte e acompanhamento da geração depois que o sistema é ligado." },
  { icon: Headset, title: "Atendimento especializado", text: "Você fala com quem entende, do primeiro contato ao pós-venda." },
];

export default function WhyLuza() {
  return (
    <section className="section rd-section why" id="diferenciais">
      <div className="container why-grid">
        <SectionHead
          align="left"
          eyebrow="POR QUE A LUZA"
          title="O CUIDADO QUE O SEU INVESTIMENTO"
          accent="MERECE."
          text="Energia solar é um investimento de longo prazo. Por isso, cada etapa é feita com método, responsabilidade e transparência."
        />

        <div className="why-bento">
          {diferenciais.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              className={`why-card glass ${index === 0 ? "is-featured" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="why-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="icon-tile"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
