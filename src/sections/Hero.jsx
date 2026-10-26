import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Scene3D from "../components/Scene3D.jsx";
import { useTheme } from "../hooks/useTheme.jsx";

const LABELS = [
  { id: "board", title: "APIs", stack: "REST, JWT auth", side: "l" },
  { id: "cooler", title: "Backend", stack: "Node.js, Express, NestJS", side: "r" },
  { id: "ram", title: "Data", stack: "MongoDB, PostgreSQL, Neon", side: "r" },
  { id: "gpu", title: "Frontend", stack: "React, Next.js, Tailwind", side: "r" },
  { id: "psu", title: "Deploy", stack: "Docker, CI/CD, Vercel, DigitalOcean", side: "l" },
];

function Chapter({ progress, range, children, className = "" }) {
  const [a, b, c, d] = range;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [28, 0, 0, -28]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.4 ? "auto" : "none"));
  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={`absolute inset-x-0 bottom-0 px-6 pb-10 pt-28 md:px-9 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:pb-0 md:pt-0 ${className}`}
    >
      <div className="mx-auto w-full max-w-screen">
        <div className="max-w-[34rem]">{children}</div>
      </div>
    </motion.div>
  );
}

const reveal = (i) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] },
});

export default function Hero() {
  const ref = useRef(null);
  const progressRef = useRef(0);
  const labelEls = useRef({});
  const { theme } = useTheme();
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => { progressRef.current = v; });

  const labelOpacity = useTransform(scrollYProgress, [0.22, 0.34, 0.74, 0.84], [0, 1, 1, 0]);
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className={`relative ${failed ? "h-[100svh]" : "h-[540vh]"}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />

        {!failed && (
          <Scene3D
            progressRef={progressRef}
            labelEls={labelEls}
            theme={theme}
            onFail={() => setFailed(true)}
          />
        )}

        {/* labels pinned to the parts of the machine */}
        {!failed && (
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {LABELS.map((l) => (
              <div
                key={l.id}
                ref={(el) => { labelEls.current[l.id] = el; }}
                className="absolute left-0 top-0 will-change-transform"
              >
                <motion.div style={{ opacity: labelOpacity }} className="relative">
                  <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/25" />
                  <div
                    className={`absolute top-0 flex items-center ${l.side === "l" ? "right-1 flex-row-reverse" : "left-1"}`}
                    style={{ transform: "translateY(-50%)" }}
                  >
                    <span className="h-px w-8 bg-primary/70 lg:w-12" />
                    <div className="glass whitespace-nowrap px-3 py-1.5">
                      <div className="text-sm font-bold leading-tight">{l.title}</div>
                      <div className="text-xs text-muted">{l.stack}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}

        {/* 1. intro */}
        <Chapter progress={scrollYProgress} range={[-0.2, 0, 0.17, 0.25]}>
          <motion.p {...reveal(0)} className="mb-5 text-sm font-semibold text-primary">
            Full-stack developer, Islamabad
          </motion.p>
          <motion.h1
            {...reveal(1)}
            className="font-display text-[clamp(2.6rem,6.5vw,5rem)] font-extrabold leading-[0.92] tracking-tight"
          >
            Shoaib
            <br />
            Akhter
          </motion.h1>
          <motion.p {...reveal(2)} className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            I build web apps and online stores, from the database to the
            deploy. Right now I run Laptop Hub, Warsi Computers and the AMDHOUSE brand.
          </motion.p>
          <motion.div {...reveal(3)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-primary px-6 py-3 font-semibold text-bg transition hover:shadow-glow"
            >
              See my projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-fg/20 px-6 py-3 font-semibold transition hover:border-primary hover:text-primary"
            >
              Contact me
            </a>
            <span className="ml-1 flex items-center gap-1">
              {[
                [Github, "https://github.com/saofficial344-dev", "GitHub"],
                [Linkedin, "https://www.linkedin.com/in/shoaib-akhter-dev", "LinkedIn"],
                [Twitter, "https://x.com/akhter_shoaib07", "X"],
              ].map(([Icon, href, name]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </span>
          </motion.div>
        </Chapter>

        {/* 2. the stack */}
        <Chapter progress={scrollYProgress} range={[0.24, 0.32, 0.5, 0.58]}>
          <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            One developer,
            <br />
            every layer.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Each part of this machine is a layer I work on: the interface, the
            API, the database and the place it all gets deployed.
          </p>
        </Chapter>

        {/* 3. production */}
        <Chapter progress={scrollYProgress} range={[0.6, 0.68, 0.84, 0.92]}>
          <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Running in production,
            <br />
            not only in a repo.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Laptop Hub is live on Vercel, DigitalOcean and Neon. Warsi Computers
            is a working WooCommerce store. AMDHOUSE sells complete PC builds.
          </p>
          <a
            href="#projects"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-bg transition hover:shadow-glow"
          >
            Look at the work
          </a>
        </Chapter>

        {/* scroll hint + progress rail */}
        {!failed && (
          <>
            <motion.div
              style={{ opacity: hintOpacity }}
              className="pointer-events-none absolute bottom-6 left-[64%] hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted md:flex"
            >
              Scroll to open the case
              <span className="h-10 w-px animate-scroll-hint bg-primary" />
            </motion.div>
            <div className="pointer-events-none absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-fg/15 md:block">
              <motion.div style={{ scaleY: rail }} className="h-full w-px origin-top bg-primary" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}