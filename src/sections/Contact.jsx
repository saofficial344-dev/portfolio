import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

const contactInfo = [
  { icon: Mail, label: "Email", value: "saofficial344@gmail.com", href: "mailto:saofficial344@gmail.com" },
  { icon: Phone, label: "Phone", value: "+92 3435747254", href: "tel:+923435747254" },
  { icon: MapPin, label: "Location", value: "Islamabad, Pakistan", href: null },
];

const projectTypes = [
  "Portfolio website", "Business website", "Landing page", "MERN web app",
  "E-commerce website", "Frontend development", "Backend API development",
  "Bug fixing or improvements", "Other",
];
const budgetOptions = ["Less than $100", "$100 - $300", "$300 - $500", "$500 - $1000", "$1000+"];

const field =
  "w-full rounded-xl border border-fg/15 bg-surface/80 px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/15";
const labelCls = "mb-1.5 block text-sm font-semibold";

const empty = { name: "", email: "", projectType: "", budget: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status.type === "sending") return;
    if (Object.values(form).some((v) => !v.trim())) {
      setStatus({ type: "error", text: "Please fill in every field before sending." });
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ type: "error", text: "The form is not connected yet. Please email me directly instead." });
      return;
    }
    setStatus({ type: "sending", text: "" });
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          project_type: form.projectType,
          budget: form.budget,
          message: form.message,
        },
        PUBLIC_KEY
      );
      setForm(empty);
      setStatus({ type: "ok", text: "Message sent. I will reply to your email soon." });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus({ type: "error", text: "The message could not be sent. Please try again or email me directly." });
    }
  };

  return (
    <section id="contact" className="px-6 py-24 md:px-9">
      <div className="mx-auto max-w-screen">
        <SectionHeading
          eyebrow="Contact"
          title="Tell me about your project"
          description="I am open to freelance work, collaborations and full-time roles."
          center
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <div className="glass flex items-center gap-4 p-5 transition hover:border-primary/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm text-muted">{label}</div>
                    <div className="break-words font-semibold">{value}</div>
                  </div>
                </div>
              );
              return href ? <a key={label} href={href} className="block">{body}</a> : <div key={label}>{body}</div>;
            })}
          </div>

          <form onSubmit={submit} className="glass space-y-5 p-6 md:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelCls}>Your name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} className={field} placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>Your email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} className={field} placeholder="you@example.com" autoComplete="email" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className={labelCls}>Project type</label>
                <select id="projectType" name="projectType" value={form.projectType} onChange={onChange} className={field}>
                  <option value="">Select a type</option>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className={labelCls}>Budget</label>
                <select id="budget" name="budget" value={form.budget} onChange={onChange} className={field}>
                  <option value="">Select a range</option>
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelCls}>Project details</label>
              <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} className={`${field} resize-none`} placeholder="What do you want to build, and by when?" />
            </div>

            <button
              type="submit"
              disabled={status.type === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-bg transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.type === "sending" ? "Sending..." : <>Send message <Send className="h-4 w-4" /></>}
            </button>

            <p role="status" aria-live="polite" className={`min-h-[1.25rem] text-sm ${status.type === "ok" ? "text-accent" : "text-secondary"}`}>
              {status.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}