import Image from "next/image";
import { imageMeta } from "@/data/image-meta";
import { cn } from "@/lib/cn";

type Props = {
  /** Filename inside /public/images, e.g. "hero-home.webp". */
  src: string;
  alt: string;
  className?: string;
  /** Passed to next/image; describes the rendered width so the right file is served. */
  sizes?: string;
  priority?: boolean;
  /** Applied to the <img> itself — useful for hover scale on cards. */
  imgClassName?: string;
};

/**
 * next/image wrapper that pulls intrinsic dimensions and a blur placeholder
 * from the generated manifest, so every photo reserves its space (no layout
 * shift) and fades in from an LQIP.
 */
export function Media({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  imgClassName,
}: Props) {
  const meta = imageMeta[src];

  if (!meta) {
    // A missing manifest entry means the image was added without re-running
    // scripts/generate-image-meta.py. Fail loudly in dev rather than silently
    // shipping a broken photo.
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `No image metadata for "${src}". Run: python3 scripts/generate-image-meta.py`,
      );
    }
    return null;
  }

  return (
    <Image
      src={`/images/${src}`}
      alt={alt}
      width={meta.width}
      height={meta.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      className={cn("h-full w-full object-cover", className, imgClassName)}
    />
  );
}
