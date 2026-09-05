import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

/**
 * Inner-page header. Shorter than the homepage hero so the content below stays
 * within reach, but built from the same materials.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[62svh] items-end overflow-hidden bg-black-950 pt-32 pb-16 lg:min-h-[68svh] lg:pt-40 lg:pb-20",
        className,
      )}
    >
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Media
            src={image}
            alt={imageAlt}
            priority
            sizes="100vw"
            className="scale-[1.03] animate-[hero-settle_2.4s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/75 to-black-950/40"
          />
        </div>
      ) : null}

      <Container>
        <p className="type-eyebrow animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)_0.1s_both] text-bronze-400">
          {eyebrow}
        </p>
        <h1 className="type-display-1 mt-6 max-w-[14ch] animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)_0.22s_both] text-white uppercase">
          {title}
        </h1>
        {intro ? (
          <p className="type-body-lg mt-7 max-w-[58ch] animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)_0.34s_both] text-concrete-300">
            {intro}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
