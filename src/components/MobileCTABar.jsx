import { useEffect, useState } from "react";
import { Calculator, MessageCircle, Sun } from "lucide-react";

import { createWhatsAppUrl } from "../config/whatsapp";

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Luza Engenharia e gostaria de saber mais sobre energia solar.";

/*
  Barra fixa do celular. Reúne simulação, orçamento e WhatsApp
  para que o botão flutuante não cubra o conteúdo.
*/
export default function MobileCTABar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-cta-bar ${show ? "is-visible" : ""}`}>
      <a href="#simulador">
        <Calculator size={17} /> Simular
      </a>
      <button
        type="button"
        onClick={() =>
          document.getElementById("residencial-comercial")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <Sun size={17} /> Orçamento grátis
      </button>
      <a
        className="mobile-cta-whatsapp"
        href={createWhatsAppUrl(WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Luza pelo WhatsApp"
      >
        <MessageCircle size={20} />
      </a>
    </div>
  );
}
