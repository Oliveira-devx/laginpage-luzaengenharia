import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Simulator from "./components/Simulator";
import Authority from "./components/Authority";
import Solutions from "./components/Solutions";
import SolarQuote from "./components/SolarQuote";
import WhyLuza from "./components/WhyLuza";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Atendimento from "./components/Atendimento";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Preloader from "./components/Preloader";
import MobileCTABar from "./components/MobileCTABar";
import MobileSections from "./components/MobileSections";

/*
  Seções fora da página no redesign (arquivos mantidos para reuso):
  TrustBar, SolarProcess, Impact, Essence, CleanEnergy,
  Industrial e VisitCTA.
*/

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollProgress />

      <Navbar />

      <main>
        {/* 1. Impacto + economia instantânea */}
        <Hero />
        <Simulator />

        {/* 2. Credibilidade e soluções */}
        <Authority />
        <Solutions />
        <SolarQuote />
        <WhyLuza />
        <Projects />

        {/* 3. Processo e empresa */}
        <Timeline />
        <Services />
        <About />
        <Testimonials />
        <Atendimento />

        {/* 4. Objeções e conversão final */}
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
      <MobileSections />
    </>
  );
}
