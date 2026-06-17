import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Menu, X, Sun, Moon } from "lucide-react";
import { navLinks } from "../lib/data.js";
import { useTheme } from "../hooks/useTheme.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-screen mx-auto px-9 flex items-center justify-between">

        {/* Logo / Brand */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 group-hover:shadow-glow transition">
            <Code2 className="h-5 w-5 text-primary" />
          </span>

          <span className="font-display tracking-wider">
            <span className="gradient-text">Shoaib </span>Akhterrrrr
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted hover:text-primary transition relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-10 w-10 rounded-full glass flex items-center justify-center hover:text-primary transition"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden lg:inline-flex px-5 py-2 rounded-full bg-primary text-bg text-sm font-medium hover:shadow-glow transition"
          >
            Let’s Work Together
          </a>

          {/* Mobile Menu Button */}
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden h-10 w-10 rounded-lg glass flex items-center justify-center"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass mt-3 mx-6 p-6"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-primary transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}