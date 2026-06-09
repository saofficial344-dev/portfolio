import { motion } from "framer-motion";
export default function SectionHeading({ eyebrow, title, description, center }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <div className="inline-flex items-center gap-2 text-xs font-display tracking-[0.3em] text-primary uppercase mb-3">
        <span className="h-px w-8 bg-primary" />{eyebrow}
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold"><span className="gradient-text">{title}</span></h2>
      {description && <p className="mt-5 text-muted">{description}</p>}
    </motion.div>
  );
}
