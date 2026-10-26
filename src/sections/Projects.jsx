import { useRef, useState } from "react";
import {
  motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import CoverArt from "../components/Covers.jsx";
import { projects } from "../lib/data.js";

/* a different picture for each project, so they never look like one template */
function Art({ index }) {
  if (index === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 via-surface to-secondary/20">
        <div className="w-[64%] animate-float">
          <div className="rounded-t-xl border border-fg/20 bg-bg p-3 shadow-glow">
            <div className="mb-3 flex gap-1.5">
              <i className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <i className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <i className="h-1.5 w-1.5 rounded-full bg-fg/30" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={`h-12 rounded-md ${n === 1 ? "bg-primary" : "bg-primary/20"}`} />
              ))}
            </div>
          </div>
          <div className="-mx-[6%] h-2.5 rounded-b-2xl bg-fg/35" />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-secondary/25 via-surface to-primary/25 p-6">
        <div className="grid w-full max-w-[22rem] grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`rounded-xl border border-fg/15 bg-bg p-2 ${n === 4 ? "ring-2 ring-primary" : ""}`}>
              <div className="mb-2 h-10 rounded-md bg-fg/10" />
              <div className="mb-1 h-1.5 w-4/5 rounded bg-fg/25" />
              <div className="h-1.5 w-1/2 rounded bg-primary/70" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-fg/90 to-fg/70 p-6">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/60 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/50 blur-3xl" />
      <div className="relative flex gap-4">
        {["Price post", "Specs post"].map((t, n) => (
          <div
            key={t}
            className={`flex h-44 w-32 flex-col justify-between rounded-2xl border border-white/20 bg-black/50 p-3 backdrop-blur ${n === 1 ? "mt-8" : "-mt-4"}`}
          >
            <span className="text-xs font-semibold text-white/80">{t}</span>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-white/30" />
              <div className="h-1.5 w-2/3 rounded bg-white/30" />
              <div className="h-5 w-1/2 rounded bg-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cover({ project, index }) {
  const [failed, setFailed] = useState(false);
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (failed) return <CoverArt slug={project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} />;
  return <img src={`/projects/${slug}.png`} alt={`${project.title} screenshot`} className="h-full w-full object-cover" onError={() => setFailed(true)} />;
}

function Tilt({ children }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const move = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <div style={{ perspective: 1000 }} onMouseMove={move} onMouseLeave={leave}>
      <motion.div style={{ rotateX: srx, rotateY: sry }}>{children}</motion.div>
    </div>
  );
}

function Card({ project, index, total, progress }) {
  const last = index === total - 1;
  const scale = useTransform(progress, [index / total, 1], [1, last ? 1 : 0.9]);
  const url = project.live ? project.live.replace("https://", "") : project.title.toLowerCase().replace(/\s/g, "");
  return (
    <div className="mb-8 md:sticky md:mb-16" style={{ top: `${92 + index * 20}px` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="grid gap-8 rounded-3xl border border-fg/10 bg-surface p-6 shadow-xl shadow-fg/5 md:grid-cols-[1fr_1.05fr] md:p-10"
      >
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {project.status}
            </span>
            <span className="text-muted">{project.kind}, {project.year}</span>
          </div>
          <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{project.desc}</p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-fg/5 px-3 py-1 text-xs font-medium text-muted">{t}</span>
            ))}
          </div>
          {(project.live || project.code) && (
            <div className="mt-6 flex gap-5">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  Visit site <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary">
                  <Github className="h-4 w-4" /> Code
                </a>
              )}
            </div>
          )}
        </div>

        <Tilt>
          <div className="overflow-hidden rounded-2xl border border-fg/15 bg-bg shadow-glow">
            <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-2.5">
              <i className="h-2.5 w-2.5 rounded-full bg-secondary" />
              <i className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <i className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="ml-3 truncate rounded-full bg-fg/5 px-3 py-0.5 text-xs text-muted">{url}</span>
            </div>
            <div className="aspect-[4/3]">
              {project.img ? (
                <img src={project.img} alt={`${project.title} screenshot`} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <CoverArt slug={project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} />
              )}
            </div>
          </div>
        </Tilt>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="projects" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading eyebrow="Projects" title="Things I have shipped" description="Live stores and deployed apps, not tutorials." center />
        <div ref={ref} className="mt-14">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}