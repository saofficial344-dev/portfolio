import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

export default function Timeline({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });

  return (
    <ol ref={ref} className="relative mx-auto max-w-3xl pl-8">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-fg/15" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-primary"
      />
      {items.map((e) => (
        <li key={e.title + e.period} className="relative pb-14 last:pb-0">
          <motion.span
            initial={{ scale: 0.4, opacity: 0.3 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ amount: 0.8, margin: "0px 0px -35% 0px" }}
            transition={{ duration: 0.4 }}
            className="absolute -left-8 top-3 h-[15px] w-[15px] rounded-full bg-primary ring-4 ring-bg"
          />
          <div className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{e.period}</div>
          <h3 className="mt-3 text-xl font-bold">{e.title}</h3>
          <div className="text-secondary">{e.org}</div>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{e.desc}</p>
        </li>
      ))}
    </ol>
  );
}