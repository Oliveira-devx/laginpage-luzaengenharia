import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  MessageCircle,
  MapPin,
  Phone,
  Sun,
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";

const navigationLinks = [
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

const serviceLinks = [
  {
    label: "Energia solar",
    href: "#servicos",
  },
  {
    label: "Instalações elétricas",
    href: "#servicos",
  },
  {
    label: "Limpeza e manutenção",
    href: "#servicos",
  },
  {
    label: "Projetos",
    href: "#servicos",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <ScrollReveal>
          <div className="footer-main">
            <div className="footer-brand">
              <a
                href="#inicio"
                className="footer-logo"
                aria-label="Luza Engenharia - Início"
              >
                <img
                  src="/images/logo-branca.png"
                  alt="Luza Engenharia"
                />
              </a>

              <p className="footer-tagline">
                Sua economia hoje,
                <br />
                seu futuro melhor amanhã.
              </p>

              <p className="footer-description">
                Soluções em engenharia, energia solar
                e instalações para transformar energia
                em eficiência e economia.
              </p>

              <a
                href="#simulador"
                className="footer-primary-link"
              >
                <Sun size={17} />

                <span>
                  Simular minha economia
                </span>

                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">
                NAVEGAÇÃO
              </span>

              <nav
                className="footer-links"
                aria-label="Navegação do rodapé"
              >
                {navigationLinks.map(
                  (link) => (
                    <a
                      href={link.href}
                      key={link.href}
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight size={14} />
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">
                SERVIÇOS
              </span>

              <nav
                className="footer-links"
                aria-label="Serviços"
              >
                {serviceLinks.map(
                  (link) => (
                    <a
                      href={link.href}
                      key={link.label}
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight size={14} />
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="footer-column footer-contact">
              <span className="footer-column-title">
                CONTATO
              </span>

              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <MapPin size={17} />

                  <div>
                    <span>Base</span>

                    <strong>
                      Teresina — PI
                    </strong>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <MessageCircle size={17} />

                  <div>
                    <span>Atendimento</span>

                    <strong>
                      PI • MA • CE
                    </strong>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <Phone size={17} />

                  <div>
                    <span>WhatsApp</span>

                    <strong>
                      Fale com nossa equipe
                    </strong>
                  </div>
                </div>
              </div>

              <a
                href="#contato"
                className="footer-contact-button"
              >
                <span>
                  Entrar em contato
                </span>

                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div className="footer-bottom">
          <div className="footer-dev-badge" style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            width: '100%'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              color: '#fff',
              fontWeight: '500',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#facc15' }}>✦</span>
              Desenvolvido por <strong style={{ color: '#facc15', fontWeight: '700' }}>InovaX Soluções</strong>
            </div>
          </div>

          <div className="footer-copyright">
            <span>
              © {currentYear} Luza Engenharia.
              Todos os direitos reservados.
            </span>
          </div>

          <div className="footer-social">
            <a
              href="#"
              aria-label="Instagram da Luza Engenharia"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn da Luza Engenharia"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="#contato"
              aria-label="WhatsApp da Luza Engenharia"
              title="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>

          <div className="footer-legal">
            <a href="#">
              Política de Privacidade
            </a>

            <span>•</span>

            <a href="#">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}