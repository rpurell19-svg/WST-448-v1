import type { ServiceIcon as IconName } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * Line icons drawn on a 32×32 grid with a single 1.5px weight — the same
 * drafting language as the rest of the site. No icon library needed.
 */
const paths: Record<IconName, React.ReactNode> = {
  development: (
    <>
      <path d="M3 29h26" />
      <path d="M6 29V13l7-5 7 5v16" />
      <path d="M20 29V17l6-4v16" />
      <path d="M10 19h6M10 24h6" />
    </>
  ),
  home: (
    <>
      <path d="M3 15 16 4l13 11" />
      <path d="M6.5 12.5V28h19V12.5" />
      <path d="M13 28v-8h6v8" />
    </>
  ),
  management: (
    <>
      <rect x="4" y="6" width="24" height="21" />
      <path d="M4 12h24M10 3v6M22 3v6" />
      <path d="m11 19 3 3 6-6" />
    </>
  ),
  drafting: (
    <>
      <path d="M5 27 16 4l11 23" />
      <path d="M9.5 18h13" />
      <path d="M3 29h26" />
      <circle cx="16" cy="12" r="1.6" />
    </>
  ),
  costing: (
    <>
      <rect x="6" y="3" width="20" height="26" />
      <path d="M11 10h10M11 16h10M11 22h5" />
      <path d="m20.5 22 2 2 3.5-3.5" />
    </>
  ),
  construction: (
    <>
      <path d="M3 21h26" />
      <path d="M6 21c0-6 4.5-10 10-10s10 4 10 10" />
      <path d="M16 11V5" />
      <path d="M3 21v5h26v-5" />
    </>
  ),
  interior: (
    <>
      <path d="M4 26V14a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v12" />
      <path d="M4 21h24" />
      <path d="M8 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" />
      <path d="M7 26v3M25 26v3" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={cn("h-8 w-8", className)}
    >
      {paths[name]}
    </svg>
  );
}
