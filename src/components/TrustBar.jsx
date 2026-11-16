import { BadgeCheck, FileCheck2, HardHat, LineChart, Wrench } from "lucide-react";

const items = [
  { icon: HardHat, label: "Engenharia própria", text: "Projeto assinado por engenheiro" },
  { icon: FileCheck2, label: "Homologação inclusa", text: "Toda a burocracia com a Equatorial" },
  { icon: BadgeCheck, label: "Equipamentos Tier 1", text: "Módulos e inversores certificados" },
  { icon: LineChart, label: "Monitoramento", text: "Acompanhe sua geração pelo app" },
  { icon: Wrench, label: "Pós-venda local", text: "Manutenção e limpeza em Teresina" },
];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Diferenciais da Luza Engenharia">
      <div className="trustbar-track">
        {[...items, ...items].map(({ icon: Icon, label, text }, index) => (
          <div className="trustbar-item" key={`${label}-${index}`} aria-hidden={index >= items.length}>
            <div className="trustbar-icon"><Icon size={20} /></div>
            <div>
              <strong>{label}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
