import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

/**
 * Homepage portfolio. An editorial grid rather than a uniform one — the first
 * project runs tall so the block reads as a magazine spread, not a catalogue.
 */
export function ProjectsShowcase() {
  const featured = projects.slice(0, 4);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-charcoal-800 bg-black-950 py-20 lg:py-28"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-heading"
            eyebrow="Portfolio"
            title="Selected projects"
            intro="A selection of homes and developments brought to life by Westside Trading 448."
          />
          <Reveal delay={200} className="shrink-0">
            <ButtonLink href="/projects" variant="secondary" withArrow>
              All projects
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={(index % 2) * 100}
              className={index % 3 === 0 ? "md:mt-0" : "md:mt-16"}
            >
              <ProjectCard
                project={project}
                aspect={index % 3 === 0 ? "aspect-4/5" : "aspect-3/4"}
                sizes="(min-width: 768px) 46vw, 92vw"
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
