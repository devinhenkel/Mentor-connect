import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:brightness-95 focus-visible:outline-primary"
      : variant === "secondary"
        ? "border border-border bg-card text-foreground hover:bg-surface-muted focus-visible:outline-border"
        : "text-foreground hover:bg-surface-muted focus-visible:outline-border";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:brightness-95 focus-visible:outline-primary"
      : variant === "secondary"
        ? "border border-border bg-card text-foreground hover:bg-surface-muted focus-visible:outline-border"
        : "text-foreground hover:bg-surface-muted focus-visible:outline-border";

  return <Link className={`${base} ${styles} ${className}`} {...props} />;
}
