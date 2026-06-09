import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import { Sparkles, Zap, Target, Users } from "lucide-react";

const stats = [
  { icon: Sparkles, label: "Projects Built", value: "05+" },
  { icon: Zap, label: "Learning Experience", value: "1+ Year" },
  { icon: Target, label: "Focused Stack", value: "MERN" },
  { icon: Users, label: "Goal", value: "Full Stack Dev" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="About Me"
            title="MERN Stack Developer"
          />

          <p className="mt-6 text-muted leading-relaxed">
            I'm <span className="text-white font-medium">Shoaib Akhter</span>, a passionate
            <span className="text-primary font-medium"> MERN Stack Developer</span> focused on building
            modern, responsive and scalable web applications using MongoDB, Express.js, React and Node.js.
          </p>

          <p className="mt-4 text-muted leading-relaxed">
            I enjoy creating clean UI, powerful backend systems and full-stack projects that solve real-world problems.
            My focus is always on performance, user experience and writing maintainable code.
          </p>

          <p className="mt-4 text-muted leading-relaxed">
            Currently, I am improving my full-stack skills by building real-world projects and continuously learning
            modern web development practices.
          </p>
        </motion.div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-5">

          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 hover:border-primary/40 hover:-translate-y-1 transition"
            >
              <s.icon className="h-7 w-7 text-primary mb-3" />
              <div className="font-display text-3xl gradient-text">
                {s.value}
              </div>
              <div className="text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}