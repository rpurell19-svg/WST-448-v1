import { cn } from "@/lib/cn";

/**
 * The Westside Trading 448 mark, rebuilt as vector geometry: a pitched house
 * outline enclosing the bold "W". Drawn rather than bitmapped so it stays crisp
 * at every size and can be recoloured for light or dark surfaces.
 */
export function LogoMark({
  className,
  houseClassName = "stroke-concrete-300",
  letterClassName = "fill-white",
}: {
  className?: string;
  houseClassName?: string;
  letterClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M100 12 188 80v110H12V80Z"
        fill="none"
        strokeWidth="18"
        strokeLinejoin="miter"
        className={houseClassName}
      />
      <path
        transform="translate(53 84) scale(0.78)"
        d="M1.98 0 34.38 103.7 60 43.92 85.62 103.7 118.02 0H94.98L82.38 40.3 65.11 0H54.89L37.62 40.3 25.02 0Z"
        className={letterClassName}
      />
    </svg>
  );
}

type Props = {
  className?: string;
  /** Hides the wordmark, leaving the house mark only. */
  markOnly?: boolean;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
};

const markSize = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };
const nameSize = { sm: "text-[12.5px]", md: "text-[15px]", lg: "text-[17px]" };
const subSize = { sm: "text-[6px]", md: "text-[7.5px]", lg: "text-[8.5px]" };

export function Logo({
  className,
  markOnly = false,
  tone = "dark",
  size = "md",
}: Props) {
  const onDark = tone === "dark";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark
        className={markSize[size]}
        houseClassName={onDark ? "stroke-concrete-300" : "stroke-concrete-700"}
        letterClassName={onDark ? "fill-white" : "fill-charcoal-900"}
      />
      {markOnly ? null : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-bold tracking-[0.02em] whitespace-nowrap",
              nameSize[size],
              onDark ? "text-white" : "text-charcoal-900",
            )}
          >
            WESTSIDE TRADING 448
          </span>
          <span
            className={cn(
              "mt-1 font-medium tracking-[0.24em] whitespace-nowrap uppercase",
              subSize[size],
              onDark ? "text-concrete-400" : "text-concrete-700",
            )}
          >
            Property Developers &amp; Home Builders
          </span>
        </span>
      )}
    </span>
  );
}
