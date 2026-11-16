import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  CheckCircle2,
  Factory,
  Gauge,
  MapPin,
  Target,
  TrendingDown,
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { createWhatsAppUrl } from "../config/whatsapp";

const segments = [
  "Indústria alimentícia",
  "Metalúrgica",
  "Fábrica / Manufatura",
  "Agronegócio",
  "Comércio / Varejo",
  "Hospital / Clínica",
  "Outro",
];

const goals = [
  "Reduzir custos com energia",
  "Atender à expansão industrial",
  "Aumentar a autonomia energética",
  "Instalar uma usina solar",
];

const states = ["PI", "MA", "CE", "Outro"];

const initialForm = {
  company: "",
  contact: "",
  segment: "",
  segmentOther: "",
  unit: "R$",
  consumption: "",
  city: "",
  address: "",
  state: "PI",
  goals: [],
};

const highlights = [
  { icon: TrendingDown, title: "Custo operacional menor", text: "a energia deixa de pesar na margem da sua empresa." },
  { icon: Gauge, title: "Do telhado à usina", text: "sistemas em telhado, solo, carport e geração remota." },
  { icon: BatteryCharging, title: "Autonomia energética", text: "proteção contra reajustes e bandeiras tarifárias." },
];

export default function Industrial() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setSent(false);
  };

  const toggleGoal = (goal) => {
    set(
      "goals",
      form.goals.includes(goal)
        ? form.goals.filter((g) => g !== goal)
        : [...form.goals, goal]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const segment = form.segment === "Outro" ? form.segmentOther.trim() : form.segment;

    if (!form.company.trim() || !segment || !form.consumption.trim() || !form.city.trim() || form.goals.length === 0) {
      setError("Preencha empresa, segmento, consumo, cidade e ao menos um objetivo.");
      return;
    }

    const consumo = form.unit === "R$"
      ? `R$ ${form.consumption} mensais`
      : `${form.consumption} kWh/mês`;

    const message = [
      "Olá, Luza Engenharia! 🏭☀️",
      "",
      "*Solicitação de orçamento — Energia solar industrial*",
      "",
      `*1. Empresa:* ${form.company.trim()}`,
      form.contact.trim() ? `*Responsável:* ${form.contact.trim()}` : null,
      `*Segmento:* ${segment}`,
      `*2. Consumo / conta mensal:* ${consumo}`,
      `*3. Localização:* ${[form.address.trim(), form.city.trim(), form.state].filter(Boolean).join(" — ")}`,
      `*4. Objetivo:* ${form.goals.join("; ")}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = createWhatsAppUrl(message);
    if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");

    window.gtag?.("event", "generate_lead", { lead_type: "industrial" });
    setSent(true);
  };

  return (
    <section className="section industrial" id="industrial">
      <div className="container industrial-grid">
        <ScrollReveal direction="left">
          <div className="industrial-pitch">
            <span className="eyebrow">ENERGIA SOLAR INDUSTRIAL</span>
            <h2>
              SUA INDÚSTRIA GASTANDO MENOS
              <span> E PRODUZINDO MAIS.</span>
            </h2>
            <p>
              Projetos de grande porte para indústrias, agronegócio e empresas
              de alto consumo. Engenharia própria, homologação junto à
              Equatorial e acompanhamento do início ao fim.
            </p>

            <ul className="industrial-highlights">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <div className="industrial-highlight-icon"><Icon size={20} /></div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1}>
          <form className="industrial-form" onSubmit={handleSubmit} noValidate>
            <div className="industrial-form-head">
              <div className="contact-form-icon"><Factory size={20} /></div>
              <div>
                <span>SOLICITE SEU ORÇAMENTO INDUSTRIAL ☀️</span>
                <h3>Conte sobre sua empresa</h3>
              </div>
            </div>

            {/* 1 */}
            <fieldset className="industrial-step">
              <legend><b>1</b> Empresa e segmento de atuação</legend>
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="i-company">Nome da empresa</label>
                  <input id="i-company" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Razão social ou nome fantasia" autoComplete="organization" />
                </div>
                <div className="form-field">
                  <label htmlFor="i-contact">Seu nome (opcional)</label>
                  <input id="i-contact" value={form.contact} onChange={(e) => set("contact", e.target.value)} placeholder="Responsável" autoComplete="name" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="i-segment">Segmento</label>
                <select id="i-segment" value={form.segment} onChange={(e) => set("segment", e.target.value)}>
                  <option value="" disabled>Selecione o segmento</option>
                  {segments.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              {form.segment === "Outro" && (
                <div className="form-field">
                  <label htmlFor="i-segment-other">Qual segmento?</label>
                  <input id="i-segment-other" value={form.segmentOther} onChange={(e) => set("segmentOther", e.target.value)} placeholder="Descreva a atividade" />
                </div>
              )}
            </fieldset>

            {/* 2 */}
            <fieldset className="industrial-step">
              <legend><b>2</b> Consumo ou valor mensal da conta</legend>
              <div className="industrial-consumption">
                <div className="segmented" role="group" aria-label="Unidade">
                  {["R$", "kWh"].map((u) => (
                    <button key={u} type="button" className={form.unit === u ? "is-active" : ""} onClick={() => set("unit", u)}>
                      {u === "R$" ? "R$ / mês" : "kWh / mês"}
                    </button>
                  ))}
                </div>
                <div className="form-field">
                  <input
                    aria-label="Consumo mensal"
                    inputMode="numeric"
                    value={form.consumption}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                      set("consumption", digits ? Number(digits).toLocaleString("pt-BR") : "");
                    }}
                    placeholder={form.unit === "R$" ? "Ex.: 8.000" : "Ex.: 15.000"}
                  />
                </div>
              </div>
            </fieldset>

            {/* 3 */}
            <fieldset className="industrial-step">
              <legend><b>3</b> Localização da instalação</legend>
              <div className="form-field">
                <label htmlFor="i-address">Endereço</label>
                <input id="i-address" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Rua, número, distrito industrial..." autoComplete="street-address" />
              </div>
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="i-city">Cidade</label>
                  <input id="i-city" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Ex.: Teresina" autoComplete="address-level2" />
                </div>
                <div className="form-field">
                  <label htmlFor="i-state">Estado</label>
                  <select id="i-state" value={form.state} onChange={(e) => set("state", e.target.value)}>
                    {states.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* 4 */}
            <fieldset className="industrial-step">
              <legend><b>4</b> Principal objetivo com a energia solar</legend>
              <div className="chip-group">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={`chip ${form.goals.includes(goal) ? "is-active" : ""}`}
                    onClick={() => toggleGoal(goal)}
                    aria-pressed={form.goals.includes(goal)}
                  >
                    <Target size={14} /> {goal}
                  </button>
                ))}
              </div>
            </fieldset>

            {error && <div className="contact-form-message error">{error}</div>}
            {sent && (
              <motion.div className="contact-form-message success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle2 size={17} />
                <span>Solicitação enviada! Um engenheiro retornará com sua proposta.</span>
              </motion.div>
            )}

            <button type="submit" className="btn btn-primary industrial-submit">
              <Building2 size={18} />
              <span>SOLICITAR ORÇAMENTO INDUSTRIAL</span>
              <ArrowRight size={18} />
            </button>

            <p className="contact-form-note">
              <MapPin size={12} /> Seus dados são enviados direto para o WhatsApp da Luza Engenharia.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
