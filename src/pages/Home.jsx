import { motion, useScroll } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Cursor from "../components/Cursor.jsx";
import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Projects from "../sections/Projects.jsx";
import Software from "../sections/Software.jsx";
import Skills from "../sections/Skills.jsx";
import Experience from "../sections/Experience.jsx";
import Education from "../sections/Education.jsx";
import Services from "../sections/Services.jsx";
import CtaBand from "../sections/CtaBand.jsx";
import Contact from "../sections/Contact.jsx";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Software />
        <Skills />
        <Experience />
        <Education />
        <Services />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}