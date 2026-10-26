import { Github, Linkedin, Instagram, Facebook } from "lucide-react";

const socials = [
  [Github, "https://github.com/saofficial344-dev", "GitHub"],
  [Linkedin, "https://www.linkedin.com/in/shoaib-akhter-dev", "LinkedIn"],
  [Instagram, "https://www.instagram.com/shoaibakhter073", "Instagram"],
  [Facebook, "https://www.facebook.com/share/18iTUmBX4T/", "Facebook"],
];

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-fg/10 px-6 pt-12 md:px-9">
      <div className="mx-auto flex max-w-screen flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-center text-sm text-muted md:text-left">
          © {new Date().getFullYear()} Shoaib Akhter, MERN stack developer in Islamabad.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(([Icon, href, name]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/15 text-muted transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-10 select-none whitespace-nowrap text-center font-display text-[8vw] font-extrabold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:2px_rgb(var(--primary)/0.55)]"
        style={{ marginBottom: "-0.1em" }}
      >
        Shoaib Akhter
      </div>
    </footer>
  );
}