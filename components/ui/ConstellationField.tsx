"use client";

import { useEffect, useRef } from "react";
import { BACKGROUND_CONFIG } from "@/lib/motion/backgroundConfig";

const { rgb, dotOpacity, lineOpacity, linkDistance, maxSpeed, byBreakpoint } =
  BACKGROUND_CONFIG.particles;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function particleCountForWidth(width: number) {
  if (width >= byBreakpoint.desktop.minWidth) return byBreakpoint.desktop.count;
  if (width >= byBreakpoint.tablet.minWidth) return byBreakpoint.tablet.count;
  return byBreakpoint.mobile.count;
}

/**
 * Constellation de partículas em canvas: pontos conectados por linhas quando
 * próximos. Densidade cai por breakpoint, pausa quando a aba fica oculta,
 * e não roda nada se prefers-reduced-motion estiver ativo.
 */
export function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let rafId = 0;
    let paused = false;

    function makeParticles() {
      const count = particleCountForWidth(width);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * maxSpeed * 2,
        vy: (Math.random() - 0.5) * maxSpeed * 2,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    }

    function step() {
      if (paused) {
        rafId = requestAnimationFrame(step);
        return;
      }
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const alpha = lineOpacity * (1 - dist / linkDistance);
            ctx!.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = `rgba(${rgb}, ${dotOpacity})`;
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function handleVisibility() {
      paused = document.hidden;
    }

    resize();
    rafId = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}
