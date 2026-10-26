import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";

const layers = [
  {
    name: "Client",
    note: "What people see and touch",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    name: "API",
    note: "Where every request is checked and handled",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "JWT auth", "Postman"],
  },
  {
    name: "Data",
    note: "Where everything is stored",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Neon"],
  },
  {
    name: "Cloud",
    note: "Where it goes live",
    items: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Nginx", "Linux", "Vercel", "DigitalOcean", "Git and GitHub"],
  },
];

const extras = ["VS Code", "Figma", "Canva"];

function Layer({ layer, index, total, progress }) {
  const start = index / total;
  const opacity = useTransform(progress, [start - 0.08, start + 0.04], [0.28, 1]);
  const x = useTransform(progress, [start - 0.08, start + 0.04], [-14, 0]);
  const dot = useTransform(progress, [start - 0.08, start + 0.04], [0.5, 1]);
  return (
    <li className="relative pb-16 last:pb-0">
      <motion.span
        style={{ scale: dot, opacity }}
        className="absolute -left-10 top-4 h-[15px] w-[15px] rounded-full bg-primary ring-4 ring-bg"
      />
      <motion.div style={{ opacity, x }} className="grid gap-4 md:grid-cols-[13rem_1fr] md:gap-10">
        <div>
          <h3 className="font-display text-2xl font-extrabold md:text-3xl">{layer.name}</h3>
          <p className="mt-1 text-sm text-muted">{layer.note}</p>
        </div>
        <ul className="flex flex-wrap content-start gap-2.5">
          {layer.items.map((t) => (
            <li
              key={t}
              className="rounded-full border border-fg/15 bg-surface px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const packetTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="skills" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading
          eyebrow="Skills"
          title="Follow a request through my stack"
          description="From the browser to the database and back, these are the tools I use at each step."
          center
        />

        <ol ref={ref} className="relative mx-auto mt-16 max-w-4xl pl-10">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-fg/15" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-primary"
          />
          <motion.span
            aria-hidden="true"
            style={{ top: packetTop }}
            className="absolute left-[7px] -ml-1.5 h-3 w-3 rounded-full bg-secondary shadow-[0_0_18px_4px_rgb(var(--secondary)/0.6)]"
          />
          {layers.map((l, i) => (
            <Layer key={l.name} layer={l} index={i} total={layers.length} progress={scrollYProgress} />
          ))}
        </ol>

        <p className="mt-16 text-center text-sm text-muted">
          Also in my toolbox: {extras.join(", ")}
        </p>
      </div>
    </section>
  );
}