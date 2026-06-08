import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import { Sparkles, Zap, Target, Users } from "lucide-react";

const stats = [
  { icon: Sparkles, label: "Projects", value: "80+" },
  { icon: Zap, label: "Years Exp", value: "5+" },
  { icon: Target, label: "Clients", value: "40+" },
  { icon: Users, label: "Awards", value: "12" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <SectionHeading eyebrow="About Me" title="Crafting Digital Excellence" />
          <p className="mt-6 text-muted leading-relaxed">
            I'm a passionate developer with 5+ years of experience building modern web applications. I blend creative design with technical expertise to deliver memorable experiences.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            From startups to enterprise, I help teams ship products users love — fast, accessible, and beautiful.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="glass p-6 hover:border-primary/40 hover:-translate-y-1 transition">
              <s.icon className="h-7 w-7 text-primary mb-3" />
              <div className="font-display text-3xl gradient-text">{s.value}</div>
              <div className="text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
