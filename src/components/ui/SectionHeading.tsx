import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  /** Applied to the heading element so sections can use aria-labelledby. */
  id?: string;
  eyebrow?: string;
  /** Rendered as-is; use \n for the intended editorial line breaks. */
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** Heading level — keeps the document outline correct per page. */
  as?: "h1" | "h2" | "h3";
  size?: "display" | "heading";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  size = "display",
  tone = "dark",
  className,
}: Props) {
  const onDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span
          aria-hidden="true"
          className="block h-px w-12 bg-bronze-500"
        />
      </Reveal>

      {eyebrow ? (
        <Reveal delay={60}>
          <p
            className={cn(
              "type-eyebrow mt-6",
              onDark ? "text-bronze-400" : "text-bronze-600",
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={120}>
        <Tag
          id={id}
          className={cn(
            "mt-5 whitespace-pre-line uppercase",
            size === "display" ? "type-display-2" : "type-h2",
            onDark ? "text-white" : "text-charcoal-900",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {intro ? (
        <Reveal delay={180}>
          <p
            className={cn(
              "type-body-lg mt-6 max-w-[60ch]",
              onDark ? "text-concrete-300" : "text-concrete-700",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
