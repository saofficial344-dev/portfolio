import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Contact() {
  // ================= STATE =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // ================= FUNCTION (same section) =================
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
      console.warn("VITE_EMAILJS_PUBLIC_KEY is not set. EmailJS may still work if the public key is passed on send().");
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
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
      alert("Email service not configured. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID.");
      setLoading(false);
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    };

    try {
      console.log("Sending email with EmailJS", {
        SERVICE_ID,
        TEMPLATE_ID,
        PUBLIC_KEY: PUBLIC_KEY ? "[set]" : "[missing]",
        templateParams,
      });

      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log("EmailJS send success", result);

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 2500);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      alert("Email failed to send. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <motion.section
      id="contact"
      className="py-24 px-6 md:px-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
    >
      <div className="max-w-screen mx-auto">

        <SectionHeading
          eyebrow="Contact"
          title="Let’s Work Together"
          description="I'm open to freelance projects, collaborations, and full-time opportunities."
          center
        />

        <div className="grid lg:grid-cols-2 gap-10 mt-16">

          {/* INFO */}
          <motion.div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "saofficial344@gmail.com" },
              { icon: Phone, label: "Phone", value: "+92 3435747254" },
              { icon: MapPin, label: "Location", value: "Islamabad, Pakistan" },
            ].map((c) => (
              <div key={c.label} className="glass p-6 flex items-center gap-4">
                <c.icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* FORM (same section) */}
          <motion.form
            onSubmit={submit}
            className="glass p-8 space-y-6"
          >
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border"
            />

            <textarea
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-bg"
            >
              {loading
                ? "Sending..."
                : sent
                ? "Message Sent ✓"
                : (
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