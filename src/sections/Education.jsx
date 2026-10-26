import SectionHeading from "../components/SectionHeading.jsx";
import Timeline from "../components/Timeline.jsx";

const items = [
  {
    period: "2019 to 2021",
    title: "Intermediate",
    org: "Elysian Higher Secondary School and College, Chinar Bagh, Gilgit",
    desc: "Foundation courses in mathematics, physics and introductory computer science.",
  },
  {
    period: "2022 to 2026",
    title: "BS Computer Science",
    org: "SZABIST University, Islamabad",
    desc: "Software engineering, data structures, algorithms and full-stack development.",
  },
];

export default function Education() {
  return (
    <section id="education" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading eyebrow="Education" title="Where I studied" center />
        <div className="mt-16"><Timeline items={items} /></div>
      </div>
    </section>
  );
}