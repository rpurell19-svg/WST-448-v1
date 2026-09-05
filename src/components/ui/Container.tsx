import { cn } from "@/lib/cn";

/** The 1248px content measure from the Figma grid, with responsive margins. */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1248px] px-6 sm:px-10 lg:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
