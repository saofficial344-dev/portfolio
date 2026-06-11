import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import AnimatedProgressBar from "../components/AnimatedProgressBar.jsx";

export default function Skills() {
  const skills = [
    {
      name: "HTML5",
      level: 90,
      icon: "HTML",
      image: "/skills/html.png",
      category: "Frontend",
      description: "Semantic and accessible layouts",
    },
    {
      name: "CSS3",
      level: 88,
      icon: "CSS",
      image: "/skills/css.png",
      category: "Frontend",
      description: "Responsive and clean styling",
    },
    {
      name: "JavaScript",
      level: 92,
      icon: "JS",
      image: "/skills/javascript.png",
      category: "Frontend",
      description: "Dynamic web functionality",
    },
    {
      name: "React",
      level: 90,
      icon: "React",
      image: "/skills/react.png",
      category: "Frontend",
      description: "Reusable UI components",
    },
    {
      name: "Next.js",
      level: 84,
      icon: "Next",
      image: "/skills/next.png",
      category: "Frontend",
      description: "Modern React applications",
    },
    {
      name: "Tailwind CSS",
      level: 85,
      icon: "TW",
      image: "/skills/tailwind.png",
      category: "Frontend",
      description: "Modern utility-first interfaces",
    },
    {
      name: "Framer Motion",
      level: 80,
      icon: "FM",
      image: "/skills/framer motion.png",
      category: "Frontend",
      description: "Smooth UI animations",
    },
    {
      name: "Node.js",
      level: 85,
      icon: "Node",
      image: "/skills/node.png",
      category: "Backend",
      description: "Server-side JavaScript",
    },
    {
      name: "Express.js",
      level: 82,
      icon: "EX",
      image: "/skills/express.png",
      category: "Backend",
      description: "Backend routing and APIs",
    },
    {
      name: "MongoDB",
      level: 85,
      icon: "DB",
      image: "/skills/mongodb.png",
      category: "Database",
      description: "NoSQL database handling",
    },
    {
      name: "MySQL",
      level: 78,
      icon: "SQL",
      image: "/skills/mysql.png",
      category: "Database",
      description: "Relational database design",
    },
    {
      name: "PostgreSQL",
      level: 76,
      icon: "PG",
      image: "/skills/postgresql.png",
      category: "Database",
      description: "Advanced SQL database",
    },
    {
      name: "Git & GitHub",
      level: 90,
      icon: "Git",
      image: "/skills/github.png",
      category: "Tools",
      description: "Version control workflow",
    },
    {
      name: "Postman",
      level: 85,
      icon: "PM",
      image: "/skills/postman.png",
      category: "Tools",
      description: "API testing and debugging",
    },
    {
      name: "VS Code",
      level: 95,
      icon: "VS",
      image: "/skills/vscode.png",
      category: "Tools",
      description: "Professional dev environment",
    },
    {
      name: "Vercel",
      level: 82,
      icon: "VC",
      image: "/skills/vercel.png",
      category: "Deployment",
      description: "Frontend deployment workflow",
    },
    {
      name: "Figma",
      level: 80,
      icon: "FIG",
      image: "/skills/figma.png",
      category: "Design",
      description: "UI design and prototyping",
    },
    {
      name: "Canva",
      level: 85,
      icon: "CV",
      image: "/skills/canva.png",
      category: "Design",
      description: "Creative design assets",
    },
  ];

  const movingSkills = [...skills, ...skills];

  return (
    <motion.section
      id="skills"
      className="relative overflow-hidden px-6 py-24 md:px-10"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* SOFT BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 -z-10 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Skills" title="Tools of the Trade" center />

        {/* TOP MOVING CIRCLE SKILLS */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-black/10 bg-white/70 px-2 py-8 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* Light + Dark compatible fade sides */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white via-white/90 to-transparent md:w-28 dark:from-[#0b0b0f] dark:via-[#0b0b0f]/90" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white via-white/90 to-transparent md:w-28 dark:from-[#0b0b0f] dark:via-[#0b0b0f]/90" />

          <motion.div
            className="flex w-max items-center gap-7 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 32,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {movingSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="group flex min-w-[92px] flex-col items-center gap-3"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10 p-3 shadow-lg shadow-primary/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 group-hover:border-primary/60 group-hover:bg-primary/15 md:h-20 md:w-20">
                  <span className="absolute inset-1 rounded-full border border-black/10 dark:border-white/10" />

                  <img
                    src={skill.image}
                    alt={`${skill.name} logo`}
                    className="relative h-full w-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = "block";
                    }}
                  />

                  <span className="relative hidden text-xs font-bold text-primary md:text-sm">
                    {skill.icon}
                  </span>
                </div>

                <div className="text-center">
                  <span className="block max-w-[96px] truncate text-xs font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-950 dark:text-white/75 dark:group-hover:text-white">
                    {skill.name}
                  </span>

                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-primary dark:text-white/35 dark:group-hover:text-primary">
                    {skill.category}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SKILLS CARDS */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.025, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/75 p-5 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 p-2 shadow-sm shadow-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                    <img
                      src={skill.image}
                      alt={`${skill.name} logo`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />

                    <span className="hidden text-xs font-bold text-primary">
                      {skill.icon}
                    </span>
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white/90">
                      {skill.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-white/45">
                      {skill.description}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {skill.category}
                </span>
              </div>

              <div className="relative">
                <AnimatedProgressBar label={skill.name} level={skill.level} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}