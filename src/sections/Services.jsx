import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Layout, Server, ShoppingCart, Rocket, Store, Plus } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { services } from "../lib/data.js";

const icons = { Code, Palette, Layout, Server, ShoppingCart, Rocket, Store };

export default function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading eyebrow="Services" title="What I can build for you" center />
        <ul className="mt-14 divide-y divide-fg/15 border-y border-fg/15">
          {services.map((s, i) => {
            const open = active === i;
            const Icon = icons[s.icon];
            return (
              <li key={s.title}>
                <button
                  onClick={() => setActive(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className={`font-display text-2xl font-extrabold tracking-tight transition-colors md:text-3xl ${open ? "text-primary" : ""}`}>
                    {s.title}
                  </span>
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                      open ? "rotate-45 border-primary bg-primary text-bg" : "border-fg/25"
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-5 pb-8">
                        <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </span>
                        <p className="max-w-xl text-lg leading-relaxed text-muted">{s.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}