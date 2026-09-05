import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Editorial portfolio tile. The whole card is one link, so there is never a
 * second competing target for keyboard or screen-reader users.
 */
export function ProjectCard({
  project,
  className,
  aspect = "aspect-4/5",
  sizes = "(min-width: 1280px) 32vw, (min-width: 768px) 46vw, 92vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className={cn("relative overflow-hidden bg-charcoal-850", aspect)}>
          <Media
            src={project.image}
            alt={project.imageAlt}
            sizes={sizes}
            priority={priority}
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black-950/85 via-black-950/10 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
          />

          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <span className="type-label inline-flex items-center gap-3 text-white">
              View project
              <ArrowRight className="text-bronze-400" />
            </span>
          </div>

          {project.status === "Under construction" ? (
            <span className="type-eyebrow absolute top-5 left-5 bg-black-950/80 px-3 py-2 text-bronze-400 backdrop-blur-sm">
              Under construction
            </span>
          ) : null}
        </div>

        <div className="pt-6">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow text-bronze-400">{project.type}</span>
            <span aria-hidden="true" className="h-px w-4 bg-concrete-700" />
            <span className="type-eyebrow text-concrete-400">
              {project.year}
            </span>
          </div>

          <h3 className="type-h3 mt-3 text-white uppercase">{project.name}</h3>
          <p className="mt-2 text-sm text-concrete-300">{project.location}</p>
        </div>
      </Link>
    </article>
  );
}
