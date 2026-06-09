import { motion } from "framer-motion";

export default function AnimatedProgressBar({ label, level }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-medium text-muted">
        <span>{label}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-brand"
        />
      </div>
    </div>
  );
}
