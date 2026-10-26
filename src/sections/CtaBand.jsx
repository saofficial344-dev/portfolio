import { ArrowUpRight } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="overflow-hidden px-6 py-28 md:px-9">
      <div className="mx-auto max-w-screen">
        <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
          Have an idea?
          <br />
          Let us build it.
        </h2>
        <a
          href="mailto:saofficial344@gmail.com"
          className="group mt-10 inline-flex items-center gap-3 border-b-2 border-primary pb-1 text-xl font-semibold md:text-3xl"
        >
          saofficial344@gmail.com
          <ArrowUpRight className="h-6 w-6 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}