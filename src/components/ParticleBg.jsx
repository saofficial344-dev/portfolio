import { useEffect, useRef } from "react";

export default function ParticleBg() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let particles = [];
    let meteors = [];
    let raf;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.4 + 0.2,
      }));
      meteors = [];
    };

    const spawnMeteor = () => {
      if (Math.random() > 0.992) {
        const startX = Math.random() * w * 0.7 + w * 0.15;
        const startY = Math.random() * h * 0.35 + h * 0.05;
        meteors.push({
          x: startX,
          y: startY,
          vx: 7 + Math.random() * 4,
          vy: 0.8 + Math.random() * 0.7,
          length: 80 + Math.random() * 60,
          alpha: 0.38 + Math.random() * 0.2,
          width: 1 + Math.random() * 0.8,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,160,${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(0,217,255,${1 - d / 120})`;
            ctx.lineWidth = 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      meteors = meteors.filter((meteor) => meteor.alpha > 0);
      meteors.forEach((meteor) => {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.alpha -= 0.007;
        ctx.strokeStyle = `rgba(255,255,255,${meteor.alpha})`;
        ctx.lineWidth = meteor.width;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx * meteor.length * 0.06, meteor.y - meteor.vy * meteor.length * 0.06);
        ctx.stroke();
      });

      spawnMeteor();
      raf = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}
