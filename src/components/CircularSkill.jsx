import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import AnimatedProgressBar from "../components/AnimatedProgressBar.jsx";
import { skills } from "../lib/data.js";

export default function Skills() {
  // 🔥 REMOVE DUPLICATES BY NAME (IMPORTANT FIX)
  const uniqueSkills = Array.from(
    new Map(skills.map((item) => [item.name, item])).values()
  );

  return (
    <motion.section
      id="skills"
      className="py-24 px-6 md:px-10"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Skills"
          title="Tools of the Trade"
          center
        />

        {/* RECTANGLE GRID (NOW CLEAN - NO DUPLICATES) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {uniqueSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.03 }}
              className="glass p-5 rounded-xl border border-white/10"
            >
              {/* SINGLE NAME + % ONLY */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">{skill.name}</h3>
                <span className="text-xs text-primary font-semibold">
                  {skill.level}%
                </span>
              </div>

              <AnimatedProgressBar
                label={skill.name}
                level={skill.level}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}