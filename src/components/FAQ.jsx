import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const questions = [
  {
    question: "Quanto custa instalar energia solar?",
    answer:
      "O investimento depende principalmente do consumo de energia, do tamanho do sistema necessário, do imóvel e das características da instalação. Por isso, o ideal é fazer uma análise personalizada antes de definir o projeto.",
  },
  {
    question:
      "Quanto posso economizar na minha conta de energia?",
    answer:
      "A economia varia conforme o consumo, a tarifa de energia, a localização, o dimensionamento do sistema e as condições da instalação. Nossa simulação fornece uma estimativa inicial para ajudar você a entender esse potencial.",
  },
  {
    question:
      "O sistema funciona em dias nublados?",
    answer:
      "Sim. Mesmo com menor incidência de luz solar, os painéis continuam podendo gerar energia. A produção, porém, tende a ser menor do que em um dia com maior incidência solar.",
  },
  {
    question:
      "E durante a noite, como funciona?",
    answer:
      "Como os painéis precisam de luz solar para gerar energia, não há geração solar direta durante a noite. O imóvel utiliza a energia disponível conforme a configuração do sistema e as regras aplicáveis.",
  },
  {
    question:
      "Preciso pagar tudo de uma vez?",
    answer:
      "As condições de pagamento dependem do projeto e das opções disponíveis no momento da contratação. Durante o orçamento, podemos avaliar a alternativa mais adequada para cada situação.",
  },
  {
    question:
      "Quanto tempo leva para instalar?",
    answer:
      "O prazo depende do tamanho e da complexidade do projeto, das características do imóvel, da disponibilidade dos equipamentos e das etapas necessárias para a instalação e homologação.",
  },
  {
    question:
      "É necessário fazer manutenção nos painéis?",
    answer:
      "Sim. A manutenção e a limpeza ajudam a preservar o bom funcionamento do sistema. A frequência ideal depende das condições do local, da exposição à poeira e de outros fatores ambientais.",
  },
  {
    question:
      "A Luza atende quais regiões?",
    answer:
      "A Luza Engenharia tem base em Teresina, no Piauí, e trabalha com atendimento nos estados do Piauí, Maranhão e Ceará.",
  },
  {
    question:
      "Vocês cuidam da homologação junto à concessionária?",
    answer:
      "Sim. A homologação faz parte do processo de implantação de um sistema conectado à rede e deve seguir os procedimentos e requisitos da concessionária responsável pela região.",
  },
  {
    question:
      "Como faço para solicitar um orçamento?",
    answer:
      "Você pode utilizar nosso simulador para ter uma estimativa inicial ou entrar em contato diretamente com a Luza Engenharia. Nossa equipe poderá entender sua necessidade e orientar os próximos passos.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="faq-grid">
          <ScrollReveal>
            <div className="faq-intro">
              <div className="faq-intro-icon">
                <HelpCircle size={25} />
              </div>

              <span className="eyebrow">
                PERGUNTAS FREQUENTES
              </span>

              <h2>
                AINDA TEM
                <span> DÚVIDAS?</span>
              </h2>

              <p>
                Reunimos algumas das principais dúvidas
                sobre energia solar, instalação e nossos
                serviços.
              </p>

              <a
                href="#contato"
                className="faq-contact-link"
              >
                <span>
                  Fale com um especialista
                </span>

                <span aria-hidden="true">→</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="faq-list">
              {questions.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    className={`faq-item ${
                      isOpen ? "active" : ""
                    }`}
                    key={item.question}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() =>
                        toggleQuestion(index)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="faq-question-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="faq-question-text">
                        {item.question}
                      </span>

                      <span className="faq-chevron">
                        <motion.span
                          animate={{
                            rotate: isOpen ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                        >
                          <ChevronDown size={20} />
                        </motion.span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          className="faq-answer"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.28,
                            ease: "easeOut",
                          }}
                        >
                          <div className="faq-answer-inner">
                            <p>{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}