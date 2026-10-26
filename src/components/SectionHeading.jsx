export default function SectionHeading({ eyebrow, title, description, center }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-5 text-lg text-muted">{description}</p>}
    </div>
  );
}