import SectionHeading from "../components/SectionHeading.jsx";
import Timeline from "../components/Timeline.jsx";

const items = [
  {
    period: "2025 to now",
    title: "MERN stack developer",
    org: "Laptop Hub, Warsi Computers, AMDHOUSE",
    desc: "Shipping Laptop Hub (Vercel, DigitalOcean and Neon), maintaining the Warsi Computers WooCommerce store and designing the AMDHOUSE brand.",
  },
  {
    period: "2024 to 2025",
    title: "Frontend developer",
    org: "Freelance practice",
    desc: "Built responsive interfaces with React, JavaScript and Tailwind CSS and got better at component-based design.",
  },
  {
    period: "2024",
    title: "Web development beginner",
    org: "Learning phase",
    desc: "Started with HTML, CSS and JavaScript. Built small projects like a portfolio and a to-do app.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading eyebrow="Experience" title="How I got here" center />
        <div className="mt-16"><Timeline items={items} /></div>
      </div>
    </section>
  );
}