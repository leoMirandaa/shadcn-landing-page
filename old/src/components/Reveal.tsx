import type { ElementType, ReactNode } from "react";
import { useReveal, useStaggeredReveal } from "@/lib/motion";

type RevealVariant = "up" | "down" | "scale" | "blur" | "tilt" | "start" | "end";

interface RevealProps {
  children: ReactNode;
  /** Direction the element travels in from. `start`/`end` follow the reading
   *  direction, so they mirror automatically in Hebrew. */
  variant?: RevealVariant;
  /** ms to hold before this element animates, for hand-tuned sequences. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/** Wraps children in an element that animates the first time it scrolls into
 *  view. For lists, prefer <RevealGroup> so the stagger stays in step. */
export const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
};

interface RevealGroupProps {
  children: ReactNode;
  /** Gap between consecutive items, in ms. */
  stagger?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Staggers every `data-reveal` descendant. Children opt in by carrying
 * `data-reveal` plus their own `reveal reveal-*` classes — the delay is
 * assigned at runtime from their DOM order.
 */
export const RevealGroup = ({
  children,
  stagger = 90,
  className = "",
  as: Tag = "div",
}: RevealGroupProps) => {
  const ref = useStaggeredReveal<HTMLDivElement>(stagger);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) => (
  <div
    className={`${align === "center" ? "text-center mx-auto max-w-3xl" : "text-start max-w-2xl"} ${className}`}
  >
    {eyebrow && (
      <Reveal variant="down">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      </Reveal>
    )}
    <Reveal variant="up" delay={80}>
      <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal variant="up" delay={160}>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      </Reveal>
    )}
  </div>
);
