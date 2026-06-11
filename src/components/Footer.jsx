import { Github, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-black/10 px-6 py-12 dark:border-white/10 md:px-9">
      <div className="mx-auto flex max-w-screen flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-center text-sm text-slate-600 dark:text-white/55 md:text-left">
          © {new Date().getFullYear()} Shoaib Akhter — MERN Stack Developer
          <br className="md:hidden" />
          <span className="text-slate-500 dark:text-white/40">
            {" "}
            Building modern full-stack web applications
          </span>
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/saofficial344-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-700 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-700 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <a
            href="https://www.instagram.com/shoaibakhter073?igsh=ODc1bTJoZTN0azQ5"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-700 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
          >
            <Instagram className="h-4 w-4" />
          </a>

          <a
            href="https://www.facebook.com/share/18iTUmBX4T/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-slate-700 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}