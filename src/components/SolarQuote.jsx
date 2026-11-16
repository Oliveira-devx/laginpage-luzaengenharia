import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  PlusCircle,
  ShieldCheck,
  Sun,
  Target,
  TrendingDown,
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";
import { createWhatsAppUrl } from "../config/whatsapp";

/*
  Orçamento residencial / comercial (substitui a antiga seção Industrial).
  Mantém as classes "industrial-*" para reaproveitar o CSS existente.
*/

const propertyTypes = [
  { value: "Residencial", icon: Home },
  { value: "Comercial", icon: Building2 },
];

const goals = [
  "Reduzir a conta de luz",
  "Ampliar meu sistema atual",
  "Me proteger dos reajustes",
  "Valorizar o imóvel",
];

const states = ["PI", "MA", "CE", "Outro"];

const initialForm = {
  type: "Residencial",
  name: "",
  business: "",
  hasSystem: "",
  currentPower: "",
  unit: "R$",
  consumption: "",
  city: "",
  state: "PI",
  goals: [],
};

const highlights = [
  { icon: TrendingDown, title: "Conta de luz menor", text: "para a sua casa ou para o seu negócio." },
  { icon: PlusCircle, title: "Ampliação de sistema", text: "já tem placas? Aumentamos sua geração com segurança." },
  { icon: ShieldCheck, title: "Engenharia própria", text: "projeto, homologação na Equatorial e acompanhamento." },
];

export default function SolarQuote() {
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

  const isCommercial = form.type === "Comercial";
  const expanding = form.hasSystem === "sim";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.hasSystem || !form.consumption.trim() || !form.city.trim()) {
      setError("Preencha seu nome, se já tem sistema solar, o consumo e a cidade.");
      return;
    }

    const consumo = form.unit === "R$"
      ? `R$ ${form.consumption} mensais`
      : `${form.consumption} kWh/mês`;

    const message = [
      "Olá, Luza Engenharia! ☀️",
      "",
      `*Solicitação de orçamento — Energia solar ${form.type.toLowerCase()}*`,
      "",
      `*Nome:* ${form.name.trim()}`,
      isCommercial && form.business.trim() ? `*Empresa:* ${form.business.trim()}` : null,
      `*Tipo de imóvel:* ${form.type}`,
      `*Já tem sistema solar?* ${expanding ? "Sim, quero aumentar" : "Não, seria o primeiro"}`,
      expanding && form.currentPower.trim() ? `*Sistema atual:* ${form.currentPower.trim()}` : null,
      `*Consumo / conta mensal:* ${consumo}`,
      `*Localização:* ${form.city.trim()} — ${form.state}`,
      form.goals.length ? `*Objetivo:* ${form.goals.join("; ")}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = createWhatsAppUrl(message);
    if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");

    window.gtag?.("event", "generate_lead", {
      lead_type: isCommercial ? "comercial" : "residencial",
      ampliacao: expanding,
    });
    setSent(true);
  };

  return (
    <section className="section industrial" id="residencial-comercial">
      <div className="container industrial-grid">
        <ScrollReveal direction="left">
          <div className="industrial-pitch">
            <span className="eyebrow">RESIDENCIAL E COMERCIAL</span>
            <h2>
              SUA CASA OU SEU NEGÓCIO
              <span> GASTANDO MENOS COM ENERGIA.</span>
            </h2>
            <p>
              Sistemas sob medida para residências, lojas, clínicas e
              escritórios. E se você já tem energia solar, a gente amplia o seu
              sistema para acompanhar o seu consumo.
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
              <div className="contact-form-icon"><Sun size={20} /></div>
              <div>
                <span>SOLICITE SEU ORÇAMENTO ☀️</span>
                <h3>Conte sobre o seu imóvel</h3>
              </div>
            </div>

            {/* 1 */}
            <fieldset className="industrial-step">
              <legend><b>1</b> Residencial ou comercial?</legend>
              <div className="segmented" role="group" aria-label="Tipo de imóvel">
                {propertyTypes.map(({ value, icon: Icon }) => (
                  <button key={value} type="button" className={form.type === value ? "is-active" : ""} onClick={() => set("type", value)}>
                    <Icon size={15} /> {value}
                  </button>
                ))}
              </div>
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="q-name">Seu nome</label>
                  <input id="q-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Como podemos te chamar?" autoComplete="name" />
                </div>
                {isCommercial && (
                  <div className="form-field">
                    <label htmlFor="q-business">Empresa (opcional)</label>
                    <input id="q-business" value={form.business} onChange={(e) => set("business", e.target.value)} placeholder="Nome do negócio" autoComplete="organization" />
                  </div>
                )}
              </div>
            </fieldset>

            {/* 2 */}
            <fieldset className="industrial-step">
              <legend><b>2</b> Você já tem sistema solar e quer aumentar?</legend>
              <div className="segmented" role="group" aria-label="Já tem sistema solar?">
                <button type="button" className={form.hasSystem === "sim" ? "is-active" : ""} onClick={() => set("hasSystem", "sim")} aria-pressed={form.hasSystem === "sim"}>
                  Sim, quero aumentar
                </button>
                <button type="button" className={form.hasSystem === "nao" ? "is-active" : ""} onClick={() => set("hasSystem", "nao")} aria-pressed={form.hasSystem === "nao"}>
                  Não, seria o primeiro
                </button>
              </div>
              {expanding && (
                <div className="form-field">
                  <label htmlFor="q-power">Quantas placas ou kWp você tem hoje? (opcional)</label>
                  <input id="q-power" value={form.currentPower} onChange={(e) => set("currentPower", e.target.value)} placeholder="Ex.: 8 placas ou 4,5 kWp" />
                </div>
              )}
            </fieldset>

            {/* 3 */}
            <fieldset className="industrial-step">
              <legend><b>3</b> Consumo ou valor mensal da conta</legend>
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
                    placeholder={form.unit === "R$" ? "Ex.: 450" : "Ex.: 380"}
                  />
                </div>
              </div>
            </fieldset>

            {/* 4 */}
            <fieldset className="industrial-step">
              <legend><b>4</b> Onde fica o imóvel?</legend>
              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="q-city">Cidade</label>
                  <input id="q-city" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Ex.: Teresina" autoComplete="address-level2" />
                </div>
                <div className="form-field">
                  <label htmlFor="q-state">Estado</label>
                  <select id="q-state" value={form.state} onChange={(e) => set("state", e.target.value)}>
                    {states.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* 5 */}
            <fieldset className="industrial-step">
              <legend><b>5</b> Principal objetivo (opcional)</legend>
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
              {isCommercial ? <Building2 size={18} /> : <Home size={18} />}
              <span>SOLICITAR MEU ORÇAMENTO</span>
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
