"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processStages } from "@/data/process";
import { cn } from "@/lib/cn";

/**
 * The eight building stages.
 *
 * Desktop: a two-column experience — a stage rail on the left drives the paired
 * photograph on the right, with a bronze progress indicator tracking position.
 * Selection follows click and keyboard focus, not hover: hover would swap the
 * stage under a stationary cursor every time the page scrolled.
 * Mobile: the same data collapses into a vertical timeline where every stage is
 * open at once, so nothing is hidden behind an interaction on a small screen.
 */
export function ProcessTimeline({
  headingLevel = "h2",
  showHeading = true,
}: {
  headingLevel?: "h1" | "h2";
  /** Off when the page header already carries this section's title. */
  showHeading?: boolean;
}) {
  const [active, setActive] = useState(0);
  const activeStage = processStages[active];
  const progress = ((active + 1) / processStages.length) * 100;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-charcoal-800 bg-black-950 py-20 lg:py-28"
    >
      <Container>
        {showHeading ? (
          <SectionHeading
            id="process-heading"
            eyebrow="Our building process"
            title={"From first idea\nto final detail."}
            intro="Eight stages, each one explained before it starts. You always know what is happening, what comes next and what it costs."
            as={headingLevel}
          />
        ) : (
          <h2 id="process-heading" className="sr-only">
            The eight stages of our building process
          </h2>
        )}

        {/* ---------------- Desktop: interactive rail + paired image ------- */}
        <div className="mt-4 hidden lg:mt-16 lg:grid lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <div className="relative h-px w-full bg-charcoal-800">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px bg-bronze-500 transition-[width] duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <ul className="mt-2">
              {processStages.map((stage, index) => {
                const isActive = index === active;
                return (
                  <li key={stage.slug} className="border-b border-charcoal-800">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-current={isActive ? "step" : undefined}
                      className="group flex w-full items-start gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-xl font-bold tabular-nums transition-colors duration-300",
                          isActive ? "text-bronze-500" : "text-concrete-400",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1">
                        <span
                          className={cn(
                            "type-h4 block uppercase transition-colors duration-300",
                            isActive
                              ? "text-white"
                              : "text-concrete-400 group-hover:text-concrete-300",
                          )}
                        >
                          {stage.title}
                        </span>
                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                            isActive
                              ? "mt-3 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-[46ch] text-concrete-300">
                              {stage.description}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="sticky top-32 aspect-4/5 overflow-hidden bg-charcoal-850">
              {processStages.map((stage, index) => (
                <div
                  key={stage.slug}
                  aria-hidden={index !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Media
                    src={stage.image}
                    alt={stage.imageAlt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ))}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black-950/80 via-transparent to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="type-eyebrow text-bronze-400">
                  Stage {String(active + 1).padStart(2, "0")} of{" "}
                  {processStages.length}
                </p>
                <p className="type-h3 mt-3 text-white uppercase">
                  {activeStage.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Mobile / tablet: vertical timeline ------------- */}
        <ol className="mt-14 lg:hidden">
          {processStages.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.slug}
              delay={index * 40}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-bronze-500 font-display text-xs font-bold text-bronze-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < processStages.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="mt-2 w-px flex-1 bg-charcoal-800"
                  />
                ) : null}
              </div>

              <div className="flex-1 pb-2">
                <h3 className="type-h4 text-white uppercase">{stage.title}</h3>
                <p className="mt-3 text-concrete-300">{stage.description}</p>
                <div className="relative mt-5 aspect-16/10 overflow-hidden">
                  <Media
                    src={stage.image}
                    alt={stage.imageAlt}
                    sizes="(min-width: 640px) 60vw, 92vw"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
