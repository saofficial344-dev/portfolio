import { Github, Linkedin, Twitter, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
        <p className="text-sm text-muted">© {new Date().getFullYear()} Alex Chen. Crafted with care.</p>
        <div className="flex gap-3">
          {[Github, Linkedin, Twitter, Mail].map((I, i) => (
            <a key={i} href="#" aria-label="social" className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary transition">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
