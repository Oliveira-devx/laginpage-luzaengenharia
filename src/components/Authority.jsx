import { motion } from "framer-motion";
import { FileCheck2, HardHat, MapPinned } from "lucide-react";

import SectionHead from "./SectionHead";
import Counter from "./Counter";
import { FATOS, INDICADORES } from "../config/empresa";

const pilares = [
  { icon: HardHat, title: "Engenharia própria", text: "Projetos desenvolvidos pela nossa equipe técnica." },
  { icon: FileCheck2, title: "Homologação completa", text: "Cuidamos de todo o processo junto à concessionária." },
  { icon: MapPinned, title: "Atendimento local", text: "Equipe próxima, de Teresina para PI, MA e CE." },
];

export default function Authority() {
  // Só exibe indicadores preenchidos com dados reais (ver src/config/empresa.js)
  const indicadores = INDICADORES.filter((item) => typeof item.value === "number");
  const stats = [
    ...indicadores.map((i) => ({ value: i.value, label: i.label, prefix: i.prefix, suffix: i.suffix })),
    ...FATOS.map((f) => ({ value: f.value, label: f.label, detail: f.detail, pad: f.pad ?? true })),
  ];

  return (
    <section className="section rd-section authority" id="autoridade">
      <div className="container">
        <SectionHead
          eyebrow="AUTORIDADE EM ENERGIA SOLAR"
          title="ENGENHARIA QUE GERA"
          accent="CONFIANÇA."
          text="Cada sistema nasce de um projeto técnico, é instalado por profissionais e acompanhado de perto depois de ligado."
        />

        <div className={`authority-stats count-${stats.length}`}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="authority-stat glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <strong>
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} pad={stat.pad} />
              </strong>
              <span>{stat.label}</span>
              {stat.detail && <small>{stat.detail}</small>}
            </motion.div>
          ))}
        </div>

        <div className="authority-pillars">
          {pilares.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              className="authority-pillar"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
            >
              <div className="icon-tile"><Icon size={20} /></div>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
