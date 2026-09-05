"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** "text" slides content up; "image" wipes the frame open and settles the photo. */
  variant?: "text" | "image";
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "figure" | "span";
  /** Forwarded to the wrapper — handy for in-page anchor targets. */
  id?: string;
};

/**
 * Scroll-triggered reveal.
 *
 * All visual work happens in CSS (see globals.css) so the JS here stays to a
 * single IntersectionObserver per element and nothing animates on the main
 * thread. Under `prefers-reduced-motion` — and with JavaScript disabled, via a
 * `scripting: none` rule — the CSS neutralises the transforms so the content is
 * always readable.
 *
 * The image variant clips an *inner* wrapper rather than the observed element:
 * a `clip-path` on the observed node collapses its intersection rectangle to
 * nothing, so it would never report as visible and would stay hidden forever.
 */
export function Reveal({
  children,
  variant = "text",
  delay = 0,
  className,
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const attr = variant === "image" ? "data-image-reveal" : "data-reveal";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Nothing to observe with — show the content immediately.
      node.setAttribute(attr, "visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [attr]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      {...{ [attr]: visible ? "visible" : "hidden" }}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {variant === "image" ? (
        <span className="block h-full w-full">{children}</span>
      ) : (
        children
      )}
    </Tag>
  );
}
