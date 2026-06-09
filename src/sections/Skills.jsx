import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import AnimatedProgressBar from "../components/AnimatedProgressBar.jsx";
import CircularSkill from "../components/CircularSkill.jsx";
import { skills } from "../lib/data.js";

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="py-24 px-6 md:px-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="max-w-screen mx-auto">
        <SectionHeading eyebrow="Skills" title="Tools of the Trade" center />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {skills.slice(0, 3).map((skill, i) => (
            <motion.div key={skill.name} whileHover={{ scale: 1.04 }} transition={{ duration: 0.35 }} className="flex items-center justify-center">
              <CircularSkill label={skill.name} level={skill.level} />
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: "easeOut" }}
              className="glass p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{s.name}</span>
                <span className="text-primary text-sm">{s.level}%</span>
              </div>
              <AnimatedProgressBar label={s.name} level={s.level} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
