import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import { Briefcase } from "lucide-react";

const experience = [
  {
    period: "2025 - Present",
    role: "MERN Stack Developer (Learning & Projects)",
    company: "Personal Projects",
    desc: "Building full-stack applications using MongoDB, Express, React, and Node.js. Focused on APIs, authentication, and responsive UI."
  },
  {
    period: "2024 - 2025",
    role: "Frontend Developer",
    company: "Freelance Practice",
    desc: "Created responsive UI projects using React.js, JavaScript, and Tailwind CSS. Improved component-based design skills."
  },
  {
    period: "2024",
    role: "Web Development Beginner",
    company: "Learning Phase",
    desc: "Started with HTML, CSS, and JavaScript. Built small projects like portfolio and to-do apps."
  }
];

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="py-24 px-6 md:px-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="max-w-screen mx-auto">

        <SectionHeading
          eyebrow="Journey"
          title="Learning & Experience"
          center
        />

        <div className="relative mt-16 ml-4">

          {/* timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-14 pb-12"
            >
              {/* icon */}
              <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/20 ring-2 ring-primary flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>

              {/* content */}
              <div className="glass p-8">
                <div className="text-xs text-primary font-display tracking-wider">
                  {e.period}
                </div>

                <h3 className="font-display text-xl mt-1">
                  {e.role}
                </h3>

                <div className="text-sm text-secondary mb-3">
                  {e.company}
                </div>

                <p className="text-sm text-muted">
                  {e.desc}
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </motion.section>
  );
}