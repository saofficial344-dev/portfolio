# Dev Portfolio — React + Vite

Premium dark-themed developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, and React Router.

## Folder Structure

```
dev-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React entry
    ├── App.jsx                 # Router + ThemeProvider
    ├── assets/                 # (your local images go here)
    ├── styles/
    │   └── index.css           # Tailwind + global styles
    ├── hooks/
    │   └── useTheme.jsx        # Dark/Light theme context
    ├── lib/
    │   └── data.js             # All content data
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ParticleBg.jsx
    │   ├── ProjectCard.jsx
    │   └── SectionHeading.jsx
    ├── sections/
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Projects.jsx
    │   ├── Experience.jsx
    │   ├── Services.jsx
    │   ├── Testimonials.jsx
    │   └── Contact.jsx
    └── pages/
        ├── Home.jsx
        └── NotFound.jsx
```

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Dependencies

**Runtime:** react, react-dom, react-router-dom, framer-motion, lucide-react
**Dev:** vite, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer

## Environment variables

None required. To replace placeholder images, drop files into `src/assets/` and import them in `src/lib/data.js`.

## Features

- Fully responsive (mobile-first)
- Dark / light theme toggle (persisted to localStorage)
- Framer Motion animations + scroll-triggered reveals
- Animated particle canvas background
- Glassmorphism + gradient brand system
- SEO meta tags in `index.html`
- React Router with 404 page
