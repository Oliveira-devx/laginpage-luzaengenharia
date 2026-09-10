import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { createWhatsAppUrl } from "../config/whatsapp";

const message =
  "Olá! Vim pelo site da Luza Engenharia e gostaria de saber mais sobre energia solar.";

export default function FloatingWhatsApp() {
  const handleClick = (event) => {
    const url = createWhatsAppUrl(message);

    if (url === "#") {
      event.preventDefault();
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.a
      href={createWhatsAppUrl(message)}
      className="floating-whatsapp"
      aria-label="Falar com a Luza Engenharia pelo WhatsApp"
      title="Fale com a Luza Engenharia no WhatsApp"
      onClick={handleClick}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
    >
      <MessageCircle className="floating-whatsapp-bubble" size={31} strokeWidth={2.2} />
      <Phone className="floating-whatsapp-phone" size={14} strokeWidth={2.7} />
      <span className="floating-whatsapp-pulse" aria-hidden="true" />
    </motion.a>
  );
}
