import { ArrowUpRight, Github } from "lucide-react";

// each project gets its own cover so the three do not look like one template
const COVERS = [
  "radial-gradient(circle at 80% 20%, rgb(var(--primary) / .45), transparent 55%), radial-gradient(circle at 10% 90%, rgb(var(--secondary) / .35), transparent 50%)",
  "repeating-linear-gradient(135deg, rgb(var(--primary) / .20) 0 14px, transparent 14px 28px)",
  "conic-gradient(from 210deg at 70% 60%, rgb(var(--secondary) / .45), rgb(var(--primary) / .35), rgb(var(--secondary) / .45))",
];

function Cover({ project, index }) {
  if (project.img) {
    return <img src={project.img} alt={`${project.title} screenshot`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />;
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface" style={{ backgroundImage: COVERS[index % COVERS.length] }}>
      <span className="absolute inset-x-6 bottom-4 font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
        {project.title}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const hasLinks = project.live || project.code;
  return (
    <article
      className={`group glass overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 ${
        project.featured ? "md:col-span-2 md:grid md:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${project.featured ? "h-60 md:h-full md:min-h-[340px]" : "h-48"}`}>
        <Cover project={project} index={index} />
      </div>

      <div className="flex flex-col p-7 md:p-9">
        <div className="mb-3 flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {project.status}
          </span>
          <span className="text-muted">{project.kind}, {project.year}</span>
        </div>

        <h3 className="font-display text-2xl font-bold">{project.title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{project.desc}</p>

        <ul className="mt-4 space-y-1.5 text-sm">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" /><span>{h}</span></li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full bg-fg/5 px-3 py-1 text-xs font-medium text-muted">{t}</span>
          ))}
        </div>

        {hasLinks && (
          <div className="mt-6 flex gap-5 pt-1">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                Visit site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Github className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}