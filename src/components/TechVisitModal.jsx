import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  HardHat,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";

import { createWhatsAppUrl } from "../config/whatsapp";
import { EVENTS } from "../config/events";

const initialForm = {
  name: "",
  phone: "",
  property: "Residência",
  address: "",
  city: "Teresina",
  date: "",
  period: "Manhã",
};

const propertyTypes = ["Residência", "Comércio", "Indústria", "Rural / Agro"];
const periods = ["Manhã", "Tarde"];

function formatPhone(value) {
  const n = value.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function TechVisitModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      setSent(false);
      setError("");
    };

    window.addEventListener(EVENTS.OPEN_VISIT, handleOpen);
    return () => window.removeEventListener(EVENTS.OPEN_VISIT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.documentElement.classList.add("modal-open");
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10 || !form.address.trim() || !form.city.trim()) {
      setError("Preencha nome, telefone, endereço e cidade para agendar.");
      return;
    }

    const dateLabel = form.date
      ? new Date(`${form.date}T12:00:00`).toLocaleDateString("pt-BR")
      : "A combinar";

    const message = [
      "Olá, Luza Engenharia! 👷‍♂️☀️",
      "",
      "Quero *agendar uma visita técnica* gratuita.",
      "",
      `*Nome:* ${form.name.trim()}`,
      `*Telefone:* ${form.phone}`,
      `*Tipo de imóvel:* ${form.property}`,
      `*Endereço:* ${form.address.trim()}`,
      `*Cidade:* ${form.city.trim()}`,
      `*Data preferida:* ${dateLabel}`,
      `*Período:* ${form.period}`,
    ].join("\n");

    const url = createWhatsAppUrl(message);
    if (url !== "#") window.open(url, "_blank", "noopener,noreferrer");

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { lead_type: "visita_tecnica" });
    }

    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="visit-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="visit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="visit-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="visit-close"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <aside className="visit-aside">
              <span className="eyebrow">VISITA TÉCNICA GRATUITA</span>
              <h3 id="visit-title">
                Um engenheiro no seu imóvel, <span>sem custo.</span>
              </h3>
              <p>
                Avaliamos telhado, padrão de entrada e sombreamento para entregar
                um projeto preciso — e uma proposta sem surpresas.
              </p>

              <ul className="visit-list">
                <li><HardHat size={18} /> Análise do telhado e estrutura</li>
                <li><ClipboardCheck size={18} /> Leitura do padrão e da conta</li>
                <li><ShieldCheck size={18} /> Proposta técnica sem compromisso</li>
              </ul>
            </aside>

            <div className="visit-body">
              {sent ? (
                <motion.div
                  className="visit-success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 size={46} />
                  <h4>Pedido enviado!</h4>
                  <p>
                    Abrimos o WhatsApp com seus dados. Nossa equipe confirma
                    o melhor horário com você em instantes.
                  </p>
                  <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
                    VOLTAR AO SITE
                  </button>
                </motion.div>
              ) : (
                <form className="visit-form" onSubmit={handleSubmit} noValidate>
                  <div className="visit-form-title">
                    <CalendarCheck size={20} />
                    <span>Agende em menos de 1 minuto</span>
                  </div>

                  <div className="contact-form-row">
                    <div className="form-field">
                      <label htmlFor="v-name">Nome</label>
                      <input id="v-name" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" autoComplete="name" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="v-phone">WhatsApp</label>
                      <input id="v-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="(86) 99999-9999" inputMode="tel" autoComplete="tel" />
                    </div>
                  </div>

                  <div className="form-field">
                    <span className="field-label">Tipo de imóvel</span>
                    <div className="chip-group">
                      {propertyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`chip ${form.property === type ? "is-active" : ""}`}
                          onClick={() => setForm((c) => ({ ...c, property: type }))}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="v-address">Endereço / bairro</label>
                    <input id="v-address" name="address" value={form.address} onChange={handleChange} placeholder="Rua, número e bairro" autoComplete="street-address" />
                  </div>

                  <div className="contact-form-row visit-row-3">
                    <div className="form-field">
                      <label htmlFor="v-city">Cidade</label>
                      <input id="v-city" name="city" value={form.city} onChange={handleChange} autoComplete="address-level2" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="v-date">Data preferida</label>
                      <input id="v-date" name="date" type="date" min={todayISO()} value={form.date} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="v-period">Período</label>
                      <select id="v-period" name="period" value={form.period} onChange={handleChange}>
                        {periods.map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  {error && <div className="contact-form-message error">{error}</div>}

                  <button type="submit" className="btn btn-primary visit-submit">
                    <MessageCircle size={18} />
                    <span>CONFIRMAR VISITA PELO WHATSAPP</span>
                  </button>

                  <p className="visit-note">Atendimento em Teresina e região • PI • MA • CE</p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
