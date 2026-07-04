import type { ReactNode } from "react";

/** Cartão translúcido com blur, usado em stats, cards de "como funciona" etc. */
export function Glass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/12 bg-white/5 backdrop-blur-2xl
        before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]
        before:bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0)_50%,rgba(59,130,246,0.05)_100%)]
        ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Glass className="p-[22px] text-center">
      <span
        className="text-3d-gradient mb-1 block font-grotesk font-bold"
        style={{ fontSize: "clamp(26px,4vw,36px)" }}
      >
        {value}
      </span>
      <span className="text-xs tracking-wide text-white/45">{label}</span>
    </Glass>
  );
}
