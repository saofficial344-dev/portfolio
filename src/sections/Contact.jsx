import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Wallet,
  MessageSquare,
  BriefcaseBusiness,
  Sparkles,
  Clock,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  useEffect(() => {
    console.log("EmailJS env values:", {
      SERVICE_ID: SERVICE_ID ? "[set]" : "[missing]",
      TEMPLATE_ID: TEMPLATE_ID ? "[set]" : "[missing]",
      PUBLIC_KEY: PUBLIC_KEY ? "[set]" : "[missing]",
    });

    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
        console.log("EmailJS initialized with PUBLIC_KEY");
      } catch (e) {
        console.error("EmailJS init error:", e);
      }
    } else {
      console.warn(
        "VITE_EMAILJS_PUBLIC_KEY is not set. EmailJS may still work if the public key is passed on send()."
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.projectType.trim() ||
      !form.budget.trim() ||
      !form.message.trim()
    ) {
      alert("Please fill in all fields before sending.");
      return;
    }

    setLoading(true);

    if (!SERVICE_ID || !TEMPLATE_ID) {
      console.error("Missing EmailJS configuration:", {
        SERVICE_ID,
        TEMPLATE_ID,
        PUBLIC_KEY,
      });

      alert(
        "Email service not configured. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID."
      );

      setLoading(false);
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      project_type: form.projectType,
      budget: form.budget,
      message: form.message,
    };

    try {
      console.log("Sending email with EmailJS", {
        SERVICE_ID,
        TEMPLATE_ID,
        PUBLIC_KEY: PUBLIC_KEY ? "[set]" : "[missing]",
        templateParams,
      });

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log("EmailJS send success", result);

      setSent(true);

      setForm({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });

      setTimeout(() => setSent(false), 2500);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      alert("Email failed to send. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "saofficial344@gmail.com",
      href: "mailto:saofficial344@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 3435747254",
      href: "tel:+923435747254",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Islamabad, Pakistan",
      href: null,
    },
  ];

  const projectTypes = [
    "Portfolio Website",
    "Business Website",
    "Landing Page",
    "MERN Web App",
    "E-commerce Website",
    "Frontend Development",
    "Backend API Development",
    "Bug Fixing / Improvements",
    "Other",
  ];

  const budgetOptions = [
    "Less than $100",
    "$100 - $300",
    "$300 - $500",
    "$500 - $1000",
    "$1000+",
  ];

  const inputClass =
    "w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary/45 focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/30 dark:focus:bg-white/[0.07]";

  const selectClass =
    "w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-primary/45 focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.07]";

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden px-6 py-24 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s Work Together"
          description="I'm open to freelance projects, collaborations, and full-time opportunities."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* CONTACT INFO */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-xl shadow-black/5 backdrop-blur-xl md:p-7 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />

              <div className="relative mb-8">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm shadow-primary/10">
                  <MessageSquare className="h-5 w-5" />
                </span>

                <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  Have a project in mind?
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/55">
                  Tell me about your idea, project type, budget, and timeline.
                  I’ll get back to you with a clear response.
                </p>
              </div>

              <div className="relative space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm shadow-black/5 transition-all duration-300 hover:border-primary/35 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                        <Icon className="h-5 w-5" />
                      </span>

                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-white/40">
                          {item.label}
                        </div>

                        <div className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-white/85">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              <div className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/[0.03]">
                  <Sparkles className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white/90">
                    Clean UI
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-white/45">
                    Modern, responsive and user-friendly interface.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-white/[0.03]">
                  <Clock className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white/90">
                    Quick Reply
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-white/45">
                    I usually respond with clear project direction.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.form
            onSubmit={submit}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-xl shadow-black/5 backdrop-blur-xl md:p-8 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/10"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-primary/15 blur-2xl" />

            <div className="relative mb-7">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm shadow-primary/10">
                <Send className="h-5 w-5" />
              </span>

              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                Send a Message
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-white/50">
                Share your requirements and I’ll help you plan the next step.
              </p>
            </div>

            <div className="relative grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/45">
                  Your Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/45">
                  Your Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="relative mt-5 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/45">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  Project Type
                </label>

                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="" className="bg-white text-slate-900 dark:bg-[#0b0b0f] dark:text-white">
                    Select project type
                  </option>

                  {projectTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-white text-slate-900 dark:bg-[#0b0b0f] dark:text-white"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/45">
                  <Wallet className="h-3.5 w-3.5" />
                  Project Budget
                </label>

                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="" className="bg-white text-slate-900 dark:bg-[#0b0b0f] dark:text-white">
                    Select your budget
                  </option>

                  {budgetOptions.map((budget) => (
                    <option
                      key={budget}
                      value={budget}
                      className="bg-white text-slate-900 dark:bg-[#0b0b0f] dark:text-white"
                    >
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative mt-5 space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/45">
                Project Details
              </label>

              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, goals, features, and timeline..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-bg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                "Sending..."
              ) : sent ? (
                "Message Sent ✓"
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}