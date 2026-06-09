import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group glass overflow-hidden hover:-translate-y-2 hover:shadow-glow transition-all duration-500"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={project.img} alt={project.title} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      </div>
      <div className="p-8">
        <h3 className="font-display text-xl mb-2">{project.title}</h3>
        <p className="text-sm text-muted mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">{t}</span>)}
        </div>
        <div className="flex gap-4">
          <a href="#" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ExternalLink className="h-4 w-4" /> Live</a>
          <a href="#" className="inline-flex items-center gap-1 text-sm hover:text-primary"><Github className="h-4 w-4" /> Code</a>
        </div>
      </div>
    </motion.div>
  );
}
