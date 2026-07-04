import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonBaseProps {
  children: ReactNode;
  /** Primário = destaque extra (pulse + shine); secundário = só hover/focus/active */
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

interface CTAButtonLinkProps extends CTAButtonBaseProps {
  href: string;
}

interface CTAButtonSubmitProps
  extends CTAButtonBaseProps,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  href?: undefined;
  type: "submit";
}

type CTAButtonProps = CTAButtonLinkProps | CTAButtonSubmitProps;

const base =
  "inline-flex items-center gap-2 min-h-11 rounded-pill font-grotesk font-semibold " +
  "text-white cursor-pointer select-none no-underline relative overflow-hidden " +
  "bg-gradient-to-b from-blue-light via-blue to-blue-deep " +
  "shadow-[0_1px_0_rgba(187,212,255,0.45)_inset,0_6px_0_var(--blue-dark),0_10px_24px_rgba(10,44,140,0.60),0_0_0_1px_rgba(187,212,255,0.15)] " +
  "transition-[transform,box-shadow] duration-200 ease-out " +
  "hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(187,212,255,0.45)_inset,0_8px_0_var(--blue-dark),0_16px_36px_rgba(10,44,140,0.65),0_0_0_1px_rgba(187,212,255,0.25)] " +
  "active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-light focus-visible:outline-offset-[3px]";

const primaryExtra =
  "motion-safe:animate-btn-pulse motion-safe:hover:animate-none motion-safe:focus-visible:animate-none motion-safe:active:animate-none " +
  "after:content-[''] after:absolute after:inset-0 after:pointer-events-none " +
  "after:bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] " +
  "after:-translate-x-[120%] motion-safe:after:animate-btn-shine";

/**
 * Único CTA "primário" por página deve ter variant="primary" (destaque
 * extra: pulse de escala + brilho periódico). Os demais ficam "secondary"
 * (mesmo visual base, sem idle animado) -- mantém a hierarquia sem
 * competir entre múltiplos CTAs que levam à mesma ação.
 */
export function CTAButton(props: CTAButtonProps) {
  const { children, variant = "secondary", className = "", onClick } = props;
  const classes = `${base} ${variant === "primary" ? primaryExtra : ""} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="submit"
      disabled={"disabled" in props ? props.disabled : undefined}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
