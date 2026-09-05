import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { FilterableProjects } from "@/components/projects/FilterableProjects";
import { CtaBand } from "@/components/sections/CtaBand";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Luxury Homes & Property Developments in Gauteng",
  description:
    "A portfolio of custom homes, luxury residences and property developments built by Westside Trading 448 across Pretoria, Johannesburg, Centurion and Midrand.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected projects"
        intro="A selection of homes and developments brought to life by Westside Trading 448."
        image="project-concrete.webp"
        imageAlt="White rendered contemporary home with stacked geometric volumes"
      />

      <section
        aria-labelledby="all-projects-heading"
        className="bg-black-950 py-20 lg:py-28"
      >
        <Container>
          <h2 id="all-projects-heading" className="sr-only">
            All projects
          </h2>
          <p className="type-eyebrow mb-10 inline-block border border-bronze-500/40 px-4 py-3 text-bronze-400">
            Placeholder portfolio — real project photography to be added
          </p>
          <FilterableProjects projects={projects} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
