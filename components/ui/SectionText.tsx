import type { ElementType, ReactNode } from "react";

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="mb-[18px] block text-[11px] font-semibold uppercase tracking-[2.5px] text-blue-light">
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  as = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag
      className={`font-grotesk font-bold leading-[1.05] mb-5 ${className}`}
      style={{ fontSize: "var(--fs-h2)", letterSpacing: "var(--ls-h2)" }}
    >
      {children}
    </Tag>
  );
}

export function SectionBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-sans text-body-color font-normal max-w-[520px] ${className}`}
      style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
    >
      {children}
    </p>
  );
}

/** Destaque discreto de bullet-point disfarçado de prosa (era o "hook-box"). */
export function HookBox({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-10 max-w-(--prose-w) overflow-hidden rounded-lg border-[1.5px] border-blue/32 bg-blue/10 p-9 text-left shadow-[0_14px_36px_rgba(59,130,246,0.14)] [&_strong]:font-bold [&_strong]:text-blue-light">
      {children}
    </div>
  );
}
