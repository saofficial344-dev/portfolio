import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import { skills } from "../lib/data.js";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Skills" title="Tools of the Trade" center />
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {skills.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }} className="glass p-6">
              <div className="flex justify-between mb-3"><span className="font-medium">{s.name}</span><span className="text-primary">{s.level}%</span></div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.08 }} className="h-full bg-gradient-brand rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
