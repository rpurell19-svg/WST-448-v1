"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Portfolio grid with working category filters.
 *
 * Filtering is client-side over data already on the page — no request, no
 * spinner. The result count is announced politely so the change is not silent
 * for screen-reader users.
 */
export function FilterableProjects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>("all");

  const visible = useMemo(() => {
    if (active === "all") return projects;
    if (active === "completed") {
      return projects.filter((project) => project.status === "Completed");
    }
    return projects.filter((project) =>
      project.categories.includes(active as Exclude<ProjectCategory, "all">),
    );
  }, [active, projects]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-3"
      >
        {projectCategories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              aria-pressed={isActive}
              className={cn(
                "type-label border px-5 py-3 transition-colors duration-300 ease-out",
                isActive
                  ? "border-bronze-500 bg-bronze-500 text-black-950"
                  : "border-concrete-700 text-concrete-300 hover:border-bronze-400 hover:text-white",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-concrete-400">
        Showing {visible.length}{" "}
        {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-12 text-concrete-300">
          No projects in this category yet.
        </p>
      ) : (
        <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={(index % 3) * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
