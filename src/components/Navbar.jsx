import { Menu, MessageCircle, X, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigation = [
    {
      label: "Início",
      href: "#inicio",
    },
    {
      label: "Como funciona",
      href: "#como-funciona",
    },
    {
      label: "Sobre nós",
      href: "#sobre",
    },
    {
      label: "Serviços",
      href: "#servicos",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
  ];

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        <a
          href="#inicio"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="Luza Engenharia - Início"
        >
          <img
            src="/images/logo-branca.png"
            alt="Luza Engenharia"
          />
        </a>

        <nav
          className="navbar-links"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a
            href="#simulador"
            className="navbar-cta"
          >
            <Sun size={17} />
            <span>Simular economia</span>
          </a>

          <button
            type="button"
            className="navbar-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={
              menuOpen
                ? "Fechar menu"
                : "Abrir menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <div className="navbar-mobile-inner">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="navbar-mobile-link"
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                  <span>→</span>
                </a>
              ))}

              <a
                href="#simulador"
                className="navbar-mobile-cta"
                onClick={closeMenu}
              >
                <Sun size={18} />
                <span>Simular minha economia</span>
              </a>

              <a
                href="#contato"
                className="navbar-mobile-whatsapp"
                onClick={closeMenu}
              >
                <MessageCircle size={18} />
                <span>Falar com um especialista</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}