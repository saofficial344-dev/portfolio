/**
 * REAL PROJECTS
 * live : public URL (khali "" ho to button nahi dikhega)
 * code : GitHub repo URL (khali "" ho to button nahi dikhega)
 * img  : screenshot, e.g. "/projects/laptophub.png" (file public/projects/ mein rakho)
 */
export const projects = [
  {
    title: "Laptop Hub",
    kind: "Full-stack web app",
    status: "Live",
    year: "2026",
    desc: "A laptop marketplace running in production. The React frontend is on Vercel, the API on DigitalOcean App Platform and the data in a serverless Neon PostgreSQL database.",
    highlights: ["Deployed across 3 cloud services", "REST API with PostgreSQL (Neon)"],
    tags: ["React", "Node.js", "PostgreSQL", "Neon", "DigitalOcean", "Vercel"],
    live: "",
    code: "",
    img: "",
    featured: true,
  },
  {
    title: "Warsi Computers",
    kind: "E-commerce store",
    status: "Live",
    year: "2025",
    desc: "A live laptop store at warsicomputers.com. WooCommerce catalogue with a custom Elementor front end, product pages and cross-browser (Safari) fixes.",
    highlights: ["Real customers, real orders", "Cross-browser debugging and performance"],
    tags: ["WordPress", "WooCommerce", "Elementor", "CSS"],
    live: "https://warsicomputers.com",
    code: "",
    img: "",
  },
  {
    title: "AMDHOUSE",
    kind: "Brand and store identity",
    status: "Ongoing",
    year: "2026",
    desc: "A PC gaming brand that sells complete custom builds. I design its visual identity and a social post template (price post and specs post) for every build.",
    highlights: ["Dark studio look with a neon accent", "Repeatable post system for each PC build"],
    tags: ["Branding", "Social design", "PC Gaming"],
    live: "",
    code: "",
    img: "",
  },
];

export const services = [
  { icon: "Store", title: "Business software", desc: "Custom point of sale and management systems for shops, gyms, schools and restaurants." },
  { icon: "Code", title: "Web development", desc: "Full-stack web apps with React, Node.js, Express and MongoDB or PostgreSQL." },
  { icon: "ShoppingCart", title: "E-commerce stores", desc: "WooCommerce and custom stores that are fast, mobile-first and easy to manage." },
  { icon: "Layout", title: "Frontend engineering", desc: "Responsive, accessible React and Tailwind interfaces with tasteful motion." },
  { icon: "Server", title: "Backend and APIs", desc: "REST APIs, authentication and database design that grow with your product." },
  { icon: "Palette", title: "UI and brand design", desc: "Clean layouts, social templates and brand looks for shops and startups." },
  { icon: "Rocket", title: "Deploy and maintain", desc: "Docker, CI/CD pipelines, Vercel, DigitalOcean and Neon setups, plus bug fixing on live sites." },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];