import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "type-label inline-flex items-center justify-center gap-3 rounded-none transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bronze-400 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-bronze-500 text-black-950 hover:bg-bronze-400 border border-bronze-500 hover:border-bronze-400",
  secondary:
    "border border-concrete-500/70 text-white hover:border-bronze-400 hover:text-bronze-400 bg-transparent",
  ghost:
    "text-white hover:text-bronze-400 px-0 border-0 bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-4",
  lg: "px-8 py-5",
};

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 12"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M0 6h15M9.5 1 15 6l-5.5 5" />
    </svg>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

/** Anchor-flavoured button. Internal hrefs route through next/link. */
export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  withArrow,
  className,
  children,
  ...rest
}: ButtonLinkProps & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className" | "children">) {
  const classes = cn(
    base,
    variants[variant],
    variant === "ghost" ? "py-2" : sizes[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
        {withArrow ? <ArrowRight /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {withArrow ? <ArrowRight /> : null}
    </Link>
  );
}

/** Real <button> for form submits and in-page controls. */
export function Button({
  variant = "primary",
  size = "md",
  withArrow,
  className,
  children,
  ...rest
}: CommonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        variant === "ghost" ? "py-2" : sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
      {withArrow ? <ArrowRight /> : null}
    </button>
  );
}
