import { useEffect, useRef } from "react";

interface CtaParticlesProps {
  reduceMotion?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  twinkle: number;
}

export default function CtaParticles({
  reduceMotion = false,
  className = "",
}: CtaParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let disposed = false;

    /* Pre-rendered glow sprite keeps the animation cheap. */
    const sprite = document.createElement("canvas");
    sprite.width = 64;
    sprite.height = 64;
    const spriteCtx = sprite.getContext("2d");
    if (spriteCtx) {
      const gradient = spriteCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(214, 236, 255, 1)");
      gradient.addColorStop(0.18, "rgba(128, 192, 255, 0.95)");
      gradient.addColorStop(0.46, "rgba(60, 140, 255, 0.32)");
      gradient.addColorStop(1, "rgba(40, 120, 240, 0)");
      spriteCtx.fillStyle = gradient;
      spriteCtx.fillRect(0, 0, 64, 64);
    }

    const seed = () => {
      const area = width * height;
      const count = Math.round(Math.max(26, Math.min(90, area / 15000)));
      particles = Array.from({ length: count }, () => {
        /* Bias the constellation toward the right, like the reference. */
        const bias = Math.pow(Math.random(), 0.62);
        return {
          x: width * (0.06 + 0.94 * bias),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          r: 0.8 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          twinkle: 0.5 + Math.random() * 1.4,
        };
      });
    };

    const draw = (time: number, animate: boolean) => {
      const dt = animate && lastTime ? Math.min((time - lastTime) / 16.667, 2) : 0;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const maxDist = Math.min(150, Math.max(90, width * 0.11));
      const maxDistSq = maxDist * maxDist;

      if (dt > 0) {
        for (const p of particles) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          if (p.x < -24) p.x = width + 24;
          else if (p.x > width + 24) p.x = -24;
          if (p.y < -24) p.y = height + 24;
          else if (p.y > height + 24) p.y = -24;
        }
      }

      /* Connections */
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > maxDistSq) continue;

          const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.3;
          ctx.strokeStyle = `rgba(86, 156, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      /* Glowing nodes */
      for (const p of particles) {
        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.0012 * p.twinkle + p.phase);
        const size = 10 + p.r * 12;

        ctx.globalAlpha = 0.35 + 0.55 * twinkle;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();
      if (reduceMotion) draw(performance.now(), false);
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const tick = (time: number) => {
      frame = 0;
      if (disposed || !visible || reduceMotion) return;
      draw(time, true);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || reduceMotion) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          stop();
          return;
        }
        if (reduceMotion) draw(performance.now(), false);
        else start();
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
