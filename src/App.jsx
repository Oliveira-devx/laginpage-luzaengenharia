import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SolarProcess from "./components/SolarProcess";
import About from "./components/About";
import Impact from "./components/Impact";
import Essence from "./components/Essence";
import CleanEnergy from "./components/CleanEnergy";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Simulator from "./components/Simulator";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <SolarProcess />
        <About />
        <Impact />
        <Essence />
        <CleanEnergy />
        <Services />
        <FAQ />
        <Simulator />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}