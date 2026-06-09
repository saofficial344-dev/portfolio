import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { testimonials } from "../lib/data.js";

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      className="py-28 px-6 md:px-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="max-w-screen mx-auto">
        <SectionHeading eyebrow="Testimonials" title="Kind Words from Clients" center />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} className="glass p-8 hover:border-primary/40 transition relative">
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/20" />
              <div className="flex gap-1 mb-5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <p className="text-muted leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center font-display text-sm text-bg">
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs text-muted">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
