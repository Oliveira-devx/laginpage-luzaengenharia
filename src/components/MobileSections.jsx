import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/*
  Experiência "seção por seção" no celular:
  - cada seção ocupa a tela inteira e encaixa ao rolar (scroll-snap);
  - o conteúdo entra animado quando a seção aparece;
  - indicador lateral de pontos + etiqueta com o nome da seção.
*/

const LABELS = {
  inicio: "Início",
  simulador: "Calcule sua economia",
  autoridade: "Autoridade",
  solucoes: "Soluções",
  diferenciais: "Por que a Luza",
  projetos: "Projetos",
  "como-funciona": "Como funciona",
  servicos: "Serviços",
  "residencial-comercial": "Residencial e comercial",
  sobre: "Sobre a Luza",
  impacto: "Nosso impacto",
  essencia: "Nossa essência",
  "energia-limpa": "Energia limpa",
  depoimentos: "Depoimentos",
  faq: "Dúvidas frequentes",
  orcamento: "Próximo passo",
  contato: "Fale conosco",
};

const MOBILE_QUERY = "(max-width: 650px)";

export default function MobileSections() {
  const [isMobile, setIsMobile] = useState(false);
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const labelTimer = useRef(null);
  const firstChange = useRef(true);

  // Liga/desliga conforme a largura da tela
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (!isMobile) {
      root.classList.remove("mobile-sections");
      document
        .querySelectorAll("main > section.is-inview")
        .forEach((el) => el.classList.remove("is-inview"));
      setSections([]);
      return undefined;
    }

    const elements = Array.from(
      document.querySelectorAll("main > section[id]")
    ).filter((el) => LABELS[el.id]);

    root.classList.add("mobile-sections");
    setSections(elements.map((el) => ({ id: el.id, label: LABELS[el.id] })));

    // Revela cada seção quando entra na tela
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Detecta a seção que está no centro da tela
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(elements.indexOf(entry.target));
          }
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );

    elements.forEach((el) => {
      reveal.observe(el);
      spy.observe(el);
    });

    return () => {
      reveal.disconnect();
      spy.disconnect();
      root.classList.remove("mobile-sections");
    };
  }, [isMobile]);

  // Mostra a etiqueta por alguns segundos a cada troca de seção
  useEffect(() => {
    if (!isMobile) return;

    if (firstChange.current) {
      firstChange.current = false;
      return;
    }

    setShowLabel(true);
    clearTimeout(labelTimer.current);
    labelTimer.current = setTimeout(() => setShowLabel(false), 1800);
  }, [active, isMobile]);

  useEffect(() => () => clearTimeout(labelTimer.current), []);

  if (!isMobile || sections.length === 0) return null;

  const current = sections[active];

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="msec-dots" aria-label="Seções da página">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={index === active ? "is-active" : ""}
            onClick={() => goTo(section.id)}
            aria-label={`Ir para ${section.label}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </nav>

      <AnimatePresence>
        {showLabel && current && active > 0 && (
          <motion.div
            key={current.id}
            className="msec-label"
            initial={{ opacity: 0, y: -10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -8, x: "-50%" }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <b>{String(active + 1).padStart(2, "0")}</b>
            <span>/{String(sections.length).padStart(2, "0")}</span>
            <i />
            {current.label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
