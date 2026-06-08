import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import { Briefcase } from "lucide-react";
import { experience } from "../lib/data.js";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Experience" title="Career Timeline" center />
        <div className="relative mt-14 ml-4">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
          {experience.map((e, i) => (
            <motion.div key={e.role} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="relative pl-14 pb-10">
              <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/20 ring-2 ring-primary flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div className="glass p-6">
                <div className="text-xs text-primary font-display tracking-wider">{e.period}</div>
                <h3 className="font-display text-xl mt-1">{e.role}</h3>
                <div className="text-sm text-secondary mb-2">{e.company}</div>
                <p className="text-sm text-muted">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
