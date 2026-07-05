"use client";

import { useEffect, useRef } from "react";
import { BACKGROUND_CONFIG } from "@/lib/motion/backgroundConfig";

const { mouseStrengthPx, scrollStrength } = BACKGROUND_CONFIG.parallax;

/**
 * Blobs radiais (gradiente) + anéis geométricos, com parallax sutil reagindo
 * a mouse e scroll. O deslocamento é aplicado via custom properties CSS
 * (--mx/--my/--sy) atualizadas no máximo 1x por frame (rAF) — só `transform`
 * muda, nenhum React re-render por movimento de mouse/scroll.
 */
export function BlobField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0;
    let my = 0;
    let sy = 0;
    let rafPending = false;

    function applyVars() {
      root!.style.setProperty("--mx", `${mx}px`);
      root!.style.setProperty("--my", `${my}px`);
      root!.style.setProperty("--sy", `${sy}px`);
      rafPending = false;
    }
    function schedule() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(applyVars);
    }

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    function handlePointerMove(e: PointerEvent) {
      mx = ((e.clientX / window.innerWidth) * 2 - 1) * mouseStrengthPx;
      my = ((e.clientY / window.innerHeight) * 2 - 1) * mouseStrengthPx;
      schedule();
    }
    function handleScroll() {
      sy = window.scrollY * scrollStrength;
      schedule();
    }

    if (isFinePointer) window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <Layer depth={0.6}>
        <span
          className="absolute rounded-full motion-safe:animate-drift-a"
          style={{
            width: 620,
            height: 620,
            left: -160,
            top: "55%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18), transparent 70%)",
          }}
        />
      </Layer>

      <Layer depth={1} className="max-[640px]:hidden">
        <span
          className="absolute rounded-full motion-safe:animate-drift-b"
          style={{
            width: 520,
            height: 520,
            right: -140,
            top: "12%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15), transparent 70%)",
          }}
        />
      </Layer>

      <Layer depth={0.4}>
        <span
          className="absolute rounded-full motion-safe:animate-drift-c max-[640px]:w-[56vw] max-[640px]:h-[56vw]"
          style={{
            width: 420,
            height: 420,
            left: "38%",
            top: "82%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(26,86,255,0.14), transparent 70%)",
          }}
        />
      </Layer>

      {/* Formas geométricas — anéis finos girando devagar, ecoam os
          hero-rings do site original */}
      <Layer depth={1.3} className="max-[900px]:hidden">
        <span
          className="absolute rounded-full border motion-safe:animate-ring-spin"
          style={{
            width: 780,
            height: 780,
            right: "-18%",
            top: "-12%",
            borderColor: "rgba(187,212,255,var(--bg-ring-opacity))",
            borderWidth: 1,
          }}
        />
      </Layer>
      <Layer depth={0.8} className="max-[900px]:hidden">
        <span
          className="absolute rounded-full border motion-safe:animate-ring-spin-rev"
          style={{
            width: 560,
            height: 560,
            left: "-14%",
            bottom: "-10%",
            borderColor: "rgba(59,130,246,var(--bg-ring-opacity))",
            borderWidth: 1,
          }}
        />
      </Layer>
    </div>
  );
}

function Layer({
  depth,
  className = "",
  children,
}: {
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out ${className}`}
      style={
        {
          transform:
            "translate3d(calc(var(--mx, 0px) * var(--depth)), calc((var(--my, 0px) + var(--sy, 0px)) * var(--depth)), 0)",
          "--depth": depth,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
