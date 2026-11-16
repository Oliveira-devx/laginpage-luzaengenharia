import { useEffect, useState } from "react";
import { CalendarCheck, Calculator, MessageCircle } from "lucide-react";

import { openTechVisit } from "../config/events";
import { createWhatsAppUrl } from "../config/whatsapp";

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Luza Engenharia e gostaria de saber mais sobre energia solar.";

/*
  Barra fixa do celular. Reúne simulação, visita técnica e WhatsApp
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
      <button type="button" onClick={() => openTechVisit("barra-mobile")}>
        <CalendarCheck size={17} /> Visita técnica grátis
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
