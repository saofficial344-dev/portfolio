import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <SectionHeading
          eyebrow="Contact"
          title="Let’s Work Together"
          description="I'm open to freelance projects, collaborations, and full-time opportunities."
          center
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-14">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >

            {[
              {
                icon: Mail,
                label: "Email",
                value: "saofficial344@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+92 3435747254",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Islamabad, Pakistan",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="glass p-5 flex items-center gap-4 hover:border-primary/40 transition"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <div className="text-xs text-muted">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 space-y-4"
          >
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition"
            />

            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition"
            />

            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition resize-none"
            />

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-bg font-medium hover:shadow-glow transition"
            >
              {sent ? "Message Sent ✓" : <>Send Message <Send className="h-4 w-4" /></>}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}