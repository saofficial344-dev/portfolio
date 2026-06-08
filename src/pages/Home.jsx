import Navbar from "../components/Navbar.jsx";
import ParticleBg from "../components/ParticleBg.jsx";
import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import Projects from "../sections/Projects.jsx";
import Experience from "../sections/Experience.jsx";
import Services from "../sections/Services.jsx";
import Testimonials from "../sections/Testimonials.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleBg />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
