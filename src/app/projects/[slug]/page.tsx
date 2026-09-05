import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  const title = `${project.name} — ${project.type}, ${project.location}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: project.summary,
      images: [{ url: `/images/${project.image}`, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  const facts = [
    { label: "Location", value: project.location },
    { label: "Project type", value: project.type },
    { label: "Completed", value: String(project.year) },
    { label: "Status", value: project.status },
  ];

  return (
    <>
      <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-black-950 pt-32 pb-14 lg:min-h-[82svh] lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <Media
            src={project.image}
            alt={project.imageAlt}
            priority
            sizes="100vw"
            className="scale-[1.03] animate-[hero-settle_2.4s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/70 to-black-950/35"
          />
        </div>

        <Container>
          <Link
            href="/projects"
            className="type-label inline-flex items-center gap-3 text-concrete-300 transition-colors duration-300 hover:text-white"
          >
            <ArrowRight className="rotate-180" />
            All projects
          </Link>

          <p className="type-eyebrow mt-10 text-bronze-400">
            {project.type} · {project.year}
          </p>
          <h1 className="type-display-1 mt-5 max-w-[16ch] text-white uppercase">
            {project.name}
          </h1>
          <p className="type-body-lg mt-6 max-w-[52ch] text-concrete-300">
            {project.location}
          </p>
        </Container>
      </section>

      <section className="border-t border-charcoal-800 bg-black-950 py-16 lg:py-24">
        <Container>
          {project.placeholder ? (
            <p className="type-eyebrow mb-12 inline-block border border-bronze-500/40 px-4 py-3 text-bronze-400">
              Placeholder project — illustrative content and photography
            </p>
          ) : null}

          <dl className="grid gap-px border border-charcoal-800 bg-charcoal-800 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-black-950 p-7">
                <dt className="type-eyebrow text-concrete-400">{fact.label}</dt>
                <dd className="mt-3 text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="type-h2 max-w-[18ch] text-white uppercase">
                  About the project
                </h2>
              </Reveal>
              {project.description.map((paragraph, index) => (
                <Reveal key={paragraph} delay={80 + index * 60}>
                  <p className="type-body-lg mt-7 text-concrete-300">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal>
                <h2 className="type-eyebrow text-bronze-400">Key features</h2>
              </Reveal>
              <ul className="mt-7 border-t border-charcoal-800">
                {project.features.map((feature, index) => (
                  <Reveal
                    as="li"
                    key={feature}
                    delay={index * 60}
                    className="flex gap-4 border-b border-charcoal-800 py-4 text-concrete-300"
                  >
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-bronze-500" />
                    {feature}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {project.gallery.length > 0 ? (
            <div className="mt-20">
              <Reveal>
                <h2 className="type-eyebrow text-bronze-400">Gallery</h2>
              </Reveal>
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {project.gallery.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item.src}
                    variant="image"
                    delay={index * 90}
                    className={
                      index === 0
                        ? "relative aspect-16/10 overflow-hidden md:col-span-2"
                        : "relative aspect-4/3 overflow-hidden"
                    }
                  >
                    <Media
                      src={item.src}
                      alt={item.alt}
                      sizes={
                        index === 0
                          ? "(min-width: 768px) 92vw, 92vw"
                          : "(min-width: 768px) 46vw, 92vw"
                      }
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          ) : null}

          <Reveal delay={120}>
            <div className="mt-16 flex flex-col gap-5 border border-charcoal-800 bg-charcoal-900 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-12">
              <p className="type-h4 max-w-[32ch] text-white uppercase">
                Planning something similar?
              </p>
              <ButtonLink href="/contact" size="lg">
                Start your project
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {others.length > 0 ? (
        <section
          aria-labelledby="more-projects"
          className="border-t border-charcoal-800 bg-charcoal-900 py-20 lg:py-28"
        >
          <Container>
            <h2 id="more-projects" className="type-h2 text-white uppercase">
              More projects
            </h2>
            <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {others.map((item, index) => (
                <Reveal as="li" key={item.slug} delay={index * 90}>
                  <ProjectCard
                    project={item}
                    aspect="aspect-3/4"
                    sizes="(min-width: 768px) 30vw, 92vw"
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
