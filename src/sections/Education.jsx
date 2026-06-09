import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";

const education = [
  {
    period: "2019 - 2021",
    level: "Intermediate",
    institution: "Elysian Higher Secondary School & College, Chinar Bagh Gilgit",
    field: "Science / Computer",
    desc: "Foundation courses in mathematics, physics, and introductory computer science."
  },
  {
    period: "2022 - 2026",
    level: "University",
    institution: "SZABIST University Islamabad",
    field: "BS Software Engineering",
    desc: "Focused on software engineering, data structures, algorithms, and full-stack development."
  }
];

export default function Education() {
  return (
    <motion.section
      id="education"
      className="py-24 px-6 md:px-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="max-w-screen mx-auto">
        <SectionHeading eyebrow="Education" title="Academic Timeline" description="A short timeline of my formal education." center />

        <div className="relative mt-14 ml-4">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {education.map((e, i) => (
            <motion.div
              key={e.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-14 pb-8"
            >
              <div className="absolute left-0 top-2 h-8 w-8 rounded-full bg-primary/20 ring-2 ring-primary flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>

              <div className="glass p-6">
                <div className="text-xs text-primary font-display tracking-wider">{e.period}</div>
                <h3 className="font-display text-xl mt-1">{e.level} — {e.field}</h3>
                <div className="text-sm text-secondary mb-2">{e.institution}</div>
                <p className="text-sm text-muted">{e.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </motion.section>
  );
}
