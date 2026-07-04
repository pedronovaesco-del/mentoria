import type { ReactNode } from "react";

const VARIANTS = {
  red: {
    bg: "bg-[#EF4444]/5 border-[#EF4444]/15",
    bar: "from-[#EF4444] to-[#F97316]",
    title: "",
    hl: "",
  },
  orange: {
    bg: "bg-[#F97316]/5 border-[#F97316]/15",
    bar: "from-[#F97316] to-[#F59E0B]",
    title: "",
    hl: "[&_.hl]:text-[#FDBA74]",
  },
  yellow: {
    bg: "bg-[#F59E0B]/5 border-[#F59E0B]/15",
    bar: "from-[#F59E0B] to-[#EAB308]",
    title: "text-[#FCD34D]",
    hl: "",
  },
  green: {
    bg: "bg-[#10B981]/5 border-[#10B981]/15",
    bar: "from-[#10B981] to-[#34D399]",
    title: "text-[#6EE7B7]",
    hl: "",
  },
  blue: {
    bg: "bg-blue/6 border-blue/20",
    bar: "from-blue to-blue-light",
    title: "text-blue-light",
    hl: "",
  },
} as const;

export function PasBlock({
  variant,
  title,
  children,
}: {
  variant: keyof typeof VARIANTS;
  title: string;
  children: ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <div className={`relative mb-6 overflow-hidden rounded-lg border p-9 ${v.bg} ${v.hl}`}>
      <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${v.bar}`} />
      <h3 className={`mb-3 font-grotesk text-lg font-bold ${v.title}`}>{title}</h3>
      <div className="space-y-3 text-body-color" style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}>
        {children}
      </div>
    </div>
  );
}
