import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Warehouse, Smartphone, Dumbbell, GraduationCap, UtensilsCrossed } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import CoverArt from "../components/Covers.jsx";

/* Edit the title and desc lines to match each system exactly. */

function MockCash() {
  return (
    <div className="grid h-full grid-cols-[1.4fr_1fr] gap-3 p-4">
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((n) => (
          <div key={n} className="flex items-center gap-3 rounded-lg bg-fg/5 p-2.5">
            <div className="h-8 w-8 rounded-md bg-primary/25" />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-fg/25" />
              <div className="h-1.5 w-1/3 rounded bg-fg/15" />
            </div>
            <div className="h-1.5 w-8 rounded bg-primary/60" />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-primary/10 p-3">
        <div className="space-y-2">
          {[0, 1, 2].map((n) => (
            <div key={n} className="flex justify-between">
              <div className="h-1.5 w-1/3 rounded bg-fg/25" />
              <div className="h-1.5 w-1/5 rounded bg-fg/25" />
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 h-3 w-1/2 rounded bg-fg/40" />
          <div className="h-9 rounded-lg bg-primary" />
        </div>
      </div>
    </div>
  );
}

function MockMobile() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-4">
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <div key={n} className={`flex flex-col items-center justify-between rounded-xl border border-fg/10 bg-fg/5 p-2 ${n === 1 ? "ring-2 ring-primary" : ""}`}>
          <div className="relative h-full w-[46%] min-h-[3.2rem] rounded-lg border-2 border-fg/40 bg-bg">
            <div className="absolute left-1/2 top-1 h-1 w-3 -translate-x-1/2 rounded bg-fg/40" />
            <div className="mx-auto mt-4 h-1/3 w-3/4 rounded bg-primary/30" />
          </div>
          <div className="mt-2 h-1.5 w-2/3 rounded bg-fg/25" />
          <div className="mt-1.5 h-1.5 w-1/3 rounded bg-primary/70" />
        </div>
      ))}
    </div>
  );
}

function MockGym() {
  const rings = [88, 62, 35, 74];
  return (
    <div className="space-y-2.5 p-4">
      {rings.map((p, n) => (
        <div key={n} className="flex items-center gap-4 rounded-xl bg-fg/5 p-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(rgb(var(--primary)) ${p}%, rgb(var(--fg) / 0.12) 0)` }}
          >
            <div className="h-9 w-9 rounded-full bg-surface" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-1/2 rounded bg-fg/35" />
            <div className="h-1.5 w-1/3 rounded bg-fg/20" />
          </div>
          <div className={`h-6 w-14 rounded-full ${p < 40 ? "bg-secondary/70" : "bg-primary/30"}`} />
        </div>
      ))}
    </div>
  );
}

function MockSchool() {
  const rows = [0, 1, 2, 3, 4];
  return (
    <div className="p-4">
      <div className="mb-3 flex gap-2">
        {[0, 1, 2].map((n) => (
          <div key={n} className={`h-6 w-16 rounded-full ${n === 0 ? "bg-primary" : "bg-fg/10"}`} />
        ))}
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r} className="flex items-center gap-3">
            <div className="h-6 w-6 shrink-0 rounded-full bg-fg/15" />
            <div className="h-1.5 w-16 shrink-0 rounded bg-fg/25" />
            <div className="grid flex-1 grid-cols-7 gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6].map((c) => {
                const k = (r * 7 + c) % 9;
                const cls = k === 0 ? "bg-secondary/70" : k === 4 ? "bg-fg/10" : "bg-primary/60";
                return <div key={c} className={`h-5 rounded ${cls}`} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockRestaurant() {
  const state = ["busy", "free", "busy", "free", "paying", "free", "busy", "free", "busy"];
  const color = { busy: "bg-primary/60", free: "bg-fg/10", paying: "bg-secondary/70" };
  return (
    <div className="grid h-full grid-cols-[1.3fr_1fr] gap-3 p-4">
      <div className="grid grid-cols-3 gap-3">
        {state.map((s, n) => (
          <div key={n} className={`flex items-center justify-center ${n % 2 ? "rounded-full" : "rounded-xl"} ${color[s]}`}>
            <div className="h-1.5 w-1/3 rounded bg-bg/70" />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between rounded-xl border border-dashed border-fg/30 bg-fg/5 p-3">
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="flex justify-between">
              <div className="h-1.5 w-1/2 rounded bg-fg/30" />
              <div className="h-1.5 w-1/5 rounded bg-fg/20" />
            </div>
          ))}
        </div>
        <div className="h-8 rounded-lg bg-primary" />
      </div>
    </div>
  );
}

const systems = [
  { icon: Warehouse, title: "Cash and Carry POS", desc: "Billing and stock management for a cash and carry store.", Mock: MockCash },
  { icon: Smartphone, title: "Mobile Shop POS", desc: "Point of sale and inventory for a mobile phone shop.", Mock: MockMobile },
  { icon: Dumbbell, title: "Gym POS", desc: "Membership and payment management for a gym.", Mock: MockGym },
  { icon: GraduationCap, title: "School Management System", desc: "Students, staff, classes and fees in one system.", Mock: MockSchool },
  { icon: UtensilsCrossed, title: "Restaurant POS", desc: "Orders, tables and bills for a restaurant.", Mock: MockRestaurant },
];

function Cover({ title, Mock }) {
  const [failed, setFailed] = useState(false);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (failed) return <CoverArt slug={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} />;
  return <img src={`/software/${slug}.png`} alt={`${title} screenshot`} className="h-full w-full object-cover" onError={() => setFailed(true)} />;
}

export default function Software() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % systems.length), 4500);
    return () => clearInterval(id);
  }, [hover, reduce]);

  const { Mock, title } = systems[active];

  return (
    <section id="software" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading
          eyebrow="Business software"
          title="Systems I have built"
          description="Point of sale and management software for shops, gyms, schools and restaurants."
          center
        />

        <div
          className="mt-14 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]"
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <div className="space-y-3">
            {systems.map((s, i) => {
              const on = i === active;
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                    on ? "border-primary bg-primary/10 shadow-glow" : "border-fg/10 hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                      on ? "bg-primary text-bg" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold md:text-xl">{s.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{s.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-fg/15 bg-bg shadow-glow">
            <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-2.5">
              <i className="h-2.5 w-2.5 rounded-full bg-secondary" />
              <i className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <i className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="ml-3 truncate rounded-full bg-fg/5 px-3 py-0.5 text-xs text-muted">{title}</span>
            </div>
            <div className="relative aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <CoverArt slug={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="border-t border-fg/10 px-4 py-2 text-xs text-muted">Interface sketch</p>
          </div>
        </div>
      </div>
    </section>
  );
}