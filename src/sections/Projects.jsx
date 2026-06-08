import SectionHeading from "../components/SectionHeading.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../lib/data.js";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Projects" title="Selected Work" description="A handful of products I've shipped recently." center />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
