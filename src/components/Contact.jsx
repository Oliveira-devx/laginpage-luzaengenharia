import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { useState } from "react";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

import { createWhatsAppUrl } from "../config/whatsapp";

const initialForm = {
  name: "",
  city: "",
  state: "PI",
  projectType: "",
  billValue: "",
};

const projectOptions = [
  "Energia solar",
  "Instalação elétrica",
  "Limpeza e manutenção",
  "Projeto elétrico",
  "Projeto fotovoltaico",
  "Outro",
];

function formatCurrency(value) {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) {
    return "";
  }

  const amount = Number(numbers) / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "billValue") {
      updatedValue = formatCurrency(value);
    }

    setForm((current) => ({
      ...current,
      [name]: updatedValue,
    }));

    setSubmitted(false);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.city.trim() ||
      !form.state ||
      !form.projectType ||
      !form.billValue.trim()
    ) {
      setError(
        "Preencha todos os campos para continuar."
      );

      return;
    }

    const message = [
      "Olá, Luza Engenharia!",
      "",
      "Gostaria de solicitar um atendimento pelo site.",
      "",
      `Nome: ${form.name.trim()}`,
      `Cidade: ${form.city.trim()}`,
      `Estado: ${form.state}`,
      `Interesse: ${form.projectType}`,
      `Conta de energia: ${form.billValue}`,
      "",
      "Gostaria de saber mais sobre meu projeto e receber uma orientação.",
    ].join("\n");

    const whatsappUrl = createWhatsAppUrl(message);

    if (whatsappUrl === "#") {
      setError(
        "Configure o número de WhatsApp da Luza Engenharia antes de enviar."
      );

      return;
    }

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);
  };

  return (
    <section
      className="section contact"
      id="contato"
    >
      <div className="container">

        {/* INTRODUÇÃO */}
        <ScrollReveal>
          <div className="contact-intro">
            <span className="eyebrow">
              FALE COM A LUZA
            </span>

            <h2>
              O SOL JÁ ESTÁ AÍ.
              <span>
                {" "}
                POR QUE NÃO TRANSFORMÁ-LO EM ECONOMIA?
              </span>
            </h2>

            <p>
              Conte para nós o que você precisa.
              Nossa equipe pode entender seu projeto
              e orientar você sobre os próximos passos.
            </p>
          </div>
        </ScrollReveal>

        <div className="contact-grid">

          {/* INFORMAÇÕES */}
          <ScrollReveal>
            <div className="contact-info">

              <div className="contact-info-header">
                <span className="eyebrow">
                  VAMOS CONVERSAR
                </span>

                <h3>
                  Seu projeto começa com uma conversa.
                </h3>

                <p>
                  Preencha seus dados e fale diretamente
                  com a Luza Engenharia pelo WhatsApp.
                </p>
              </div>

              <div className="contact-details">

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <MessageCircle size={19} />
                  </div>

                  <div>
                    <span>WhatsApp</span>

                    <strong>
                      Atendimento personalizado
                    </strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <span>Base</span>

                    <strong>
                      Teresina — PI
                    </strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <Phone size={19} />
                  </div>

                  <div>
                    <span>Atendimento</span>

                    <strong>
                      PI • MA • CE
                    </strong>
                  </div>
                </div>

              </div>

              <div className="contact-promise">
                <CheckCircle2 size={18} />

                <span>
                  Atendimento próximo, transparente
                  e focado na sua necessidade.
                </span>
              </div>

            </div>
          </ScrollReveal>

          {/* FORMULÁRIO */}
          <ScrollReveal delay={0.12}>
            <motion.div
              className="contact-form-wrapper"
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.25,
              }}
            >

              <div className="contact-form-heading">

                <div className="contact-form-icon">
                  <Send size={20} />
                </div>

                <div>
                  <span>
                    SOLICITE UM ORÇAMENTO
                  </span>

                  <h3>
                    Vamos começar seu projeto
                  </h3>
                </div>

              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                {/* NOME */}
                <div className="contact-form-row">

                  <div className="form-field">
                    <label htmlFor="name">
                      Nome
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* CIDADE */}
                  <div className="form-field">
                    <label htmlFor="city">
                      Cidade
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Ex.: Teresina"
                      value={form.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                </div>

                {/* ESTADO + TIPO */}
                <div className="contact-form-row">

                  <div className="form-field">
                    <label htmlFor="state">
                      Estado
                    </label>

                    <select
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="PI">
                        Piauí — PI
                      </option>

                      <option value="MA">
                        Maranhão — MA
                      </option>

                      <option value="CE">
                        Ceará — CE
                      </option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="projectType">
                      Tipo de projeto
                    </label>

                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      required
                    >
                      <option
                        value=""
                        disabled
                      >
                        Selecione uma opção
                      </option>

                      {projectOptions.map(
                        (option) => (
                          <option
                            value={option}
                            key={option}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                </div>

                {/* CONTA DE ENERGIA */}
                <div className="form-field">
                  <label htmlFor="billValue">
                    Valor aproximado da conta de energia
                  </label>

                  <input
                    id="billValue"
                    name="billValue"
                    type="text"
                    inputMode="decimal"
                    placeholder="Ex.: R$ 650,00"
                    value={form.billValue}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ERRO */}
                {error && (
                  <motion.div
                    className="contact-form-message error"
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* SUCESSO */}
                {submitted && (
                  <motion.div
                    className="contact-form-message success"
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    <CheckCircle2 size={17} />

                    <span>
                      Solicitação preparada. O WhatsApp
                      foi aberto para continuar o
                      atendimento.
                    </span>
                  </motion.div>
                )}

                {/* BOTÃO */}
                <motion.button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <MessageCircle size={18} />

                  <span>
                    SOLICITAR ORÇAMENTO PELO WHATSAPP
                  </span>

                  <ArrowRight size={18} />
                </motion.button>

                {/* AVISO */}
                <p className="contact-form-note">
                  Ao continuar, o WhatsApp da Luza
                  Engenharia será aberto com as
                  informações preenchidas por você.
                </p>

              </form>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}