import { motion } from "framer-motion";
import { Code, Palette, Layout, Server, Plug, Wrench } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { services } from "../lib/data.js";

const icons = { Code, Palette, Layout, Server, Plug, Wrench };

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Services" title="What I Offer" description="From idea to launch — every layer of the modern web stack." center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative glass p-7 hover:border-primary/50 hover:-translate-y-1 transition overflow-hidden">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/30 transition" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center mb-5 group-hover:shadow-glow transition">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
