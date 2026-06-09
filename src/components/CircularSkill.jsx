import { motion } from "framer-motion";

export default function CircularSkill({ label, level }) {
  const gradientId = `skill-gradient-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - level / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative flex flex-col items-center gap-3"
    >
      <div className="relative h-20 w-20">
        <div className="absolute -inset-2 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 84 84">
          <circle
            cx="42"
            cy="42"
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="42"
            cy="42"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: dashOffset }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F5A0" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-bg">
          {level}%
        </div>
      </div>
      <div className="text-center text-xs text-muted leading-tight">{label}</div>
    </motion.div>
  );
}
