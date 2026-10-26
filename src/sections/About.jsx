import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TEXT =
  "I am a full-stack engineer who designs, builds and ships web applications from end to end. I work across the interface, the API and the database, and I care about clean code, performance and products that people enjoy using.";

const facts = [
  ["Frontend", "React, Next.js, Tailwind CSS"],
  ["Backend", "Node.js, Express, NestJS, REST APIs"],
  ["Data", "MongoDB, PostgreSQL, MySQL"],
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const words = TEXT.split(" ");

  return (
    <section id="about" ref={ref} className="px-6 py-32 md:px-9">
      <div className="mx-auto max-w-screen">
        <p className="eyebrow mb-6">About me</p>
        <p className="font-display text-2xl font-bold leading-[1.25] tracking-tight md:text-3xl lg:text-4xl">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <dl className="mt-20 grid gap-10 border-t border-fg/15 pt-10 sm:grid-cols-3">
          {facts.map(([title, stack]) => (
            <div key={title}>
              <dt className="font-display text-2xl font-extrabold text-primary md:text-3xl">{title}</dt>
              <dd className="mt-2 text-muted">{stack}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}