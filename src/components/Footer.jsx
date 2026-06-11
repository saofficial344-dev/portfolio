import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-12 px-6 md:px-9 mt-16">
      <div className="max-w-screen mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">

        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Shoaib Akhter — MERN Stack Developer
          <br className="md:hidden" />
          <span className="opacity-70">
            {" "}Building modern full-stack web applications
          </span>
        </p>

        <div className="flex gap-3">

          <a
            href="https://github.com/saofficial344-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary transition"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <a
            href="mailto:your-email@gmail.com"
            aria-label="Email"
            className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary transition"
          >
            <Mail className="h-4 w-4" />
          </a>

        </div>
      </div>
    </footer>
  );
}