import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "bg-cyan-bright text-navy-900 hover:bg-white shadow-[0_8px_30px_-6px_rgba(0,212,255,0.5)] hover:shadow-[0_8px_40px_-4px_rgba(0,212,255,0.7)]",
  amber:
    "bg-amber-warm text-navy-900 hover:brightness-110 shadow-[0_8px_30px_-6px_rgba(255,176,32,0.5)]",
  outline:
    "border border-white/20 text-white hover:border-cyan-bright/60 hover:bg-white/5",
  ghost: "text-white hover:bg-white/5",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-bright focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}
