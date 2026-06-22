import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowDown, Download } from "lucide-react";
import { titles } from "../lib/data.js";

export default function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = titles[idx];
    const t = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setDel(true), 1500);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === "") {
          setDel(false);
          setIdx((idx + 1) % titles.length);
        }
      }
    }, del ? 40 : 90);

    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 px-6 md:px-9"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/20 blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-screen mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >

          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Available for freelance / internships
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Hi, I'm{" "}
            <span className="gradient-text glow-text">Shoaib Akhter</span>
          </h1>

          <div className="text-xl md:text-2xl text-muted font-display h-9">
            <span className="text-primary">{">"}</span> {text}
            <span className="inline-block w-[2px] h-6 bg-primary ml-1 animate-pulse align-middle" />
          </div>

          <p className="text-muted max-w-lg leading-relaxed">
            I am a MERN Stack Developer passionate about building modern,
            responsive and scalable full-stack web applications using
            MongoDB, Express.js, React and Node.js.
          </p>

          <div className="flex flex-wrap gap-5 pt-3">

            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-bg font-medium hover:shadow-glow transition"
            >
              View Projects{" "}
              <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-primary/40 transition"
            >
              <Download className="h-4 w-4" />
              Contact Me
            </a>

          </div>

          {/* ✅ FIXED SOCIAL SECTION (NO LOOP, NO DUPLICATE) */}
          <div className="flex items-center gap-4 pt-4">

            <a
              href="https://github.com/saofficial344-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full glass flex items-center justify-center hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/shoaib-akhter-dev?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full glass flex items-center justify-center hover:text-[#0A66C2] hover:-translate-y-1 transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href="https://x.com/akhter_shoaib07"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 w-11 rounded-full glass flex items-center justify-center hover:text-sky-400 hover:-translate-y-1 transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>

          </div>

        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-gradient-brand blur-3xl opacity-40 animate-pulse" />
            <div className="absolute -inset-4 rounded-full border border-primary/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-10 rounded-full border border-secondary/20 animate-[spin_30s_linear_infinite_reverse]" />

            <div className="relative h-72 w-72 md:h-96 md:w-96 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-glow">
              <img src="self.jpeg" alt="profile" className="h-full w-full object-cover" />
            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}