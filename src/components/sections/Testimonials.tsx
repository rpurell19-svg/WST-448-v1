"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Button";
import {
  hasPlaceholderTestimonials,
  testimonials,
} from "@/data/testimonials";
import { cn } from "@/lib/cn";

/**
 * Testimonial carousel.
 *
 * The quotes shipped with the build are labelled placeholders — no client
 * testimonial has been invented. The notice disappears on its own once every
 * entry in src/data/testimonials.ts is marked `placeholder: false`.
 */
export function Testimonials({
  headingLevel = "h2",
  showHeading = true,
}: {
  headingLevel?: "h1" | "h2";
  /** Off when the page header already carries this section's title. */
  showHeading?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const count = testimonials.length;

  const go = (direction: -1 | 1) =>
    setIndex((value) => (value + direction + count) % count);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-charcoal-800 bg-charcoal-900 py-20 lg:py-28"
    >
      <Container>
        {showHeading ? (
          <SectionHeading
            id="testimonials-heading"
            eyebrow="Client feedback"
            title="What our clients say"
            as={headingLevel}
          />
        ) : (
          <h2 id="testimonials-heading" className="sr-only">
            What our clients say
          </h2>
        )}

        {hasPlaceholderTestimonials ? (
          <Reveal delay={140}>
            <p className="type-eyebrow mt-8 inline-block border border-bronze-500/40 px-4 py-3 text-bronze-400">
              Placeholder content — real client testimonials to be added
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={180}>
          <figure className="relative mt-12 border border-charcoal-800 bg-charcoal-850 p-8 sm:p-12 lg:p-16">
            <span
              aria-hidden="true"
              className="font-display text-[5rem] leading-none text-bronze-500 select-none lg:text-[7rem]"
            >
              &ldquo;
            </span>

            <blockquote className="-mt-6 max-w-[58ch]">
              <p className="type-h4 text-white">{current.quote}</p>
            </blockquote>

            <span aria-hidden="true" className="mt-10 block h-px w-10 bg-bronze-500" />

            <figcaption className="mt-6">
              <span className="type-eyebrow block text-white">
                {current.name}
              </span>
              <span className="mt-2 block text-sm text-concrete-300">
                {current.project} · {current.location}
              </span>
            </figcaption>

            {count > 1 ? (
              <div className="mt-10 flex items-center justify-between gap-6 border-t border-charcoal-800 pt-8">
                <p className="type-eyebrow text-concrete-400">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="inline-flex h-12 w-12 items-center justify-center border border-concrete-700 text-white transition-colors duration-300 hover:border-bronze-400 hover:text-bronze-400"
                  >
                    <span className="sr-only">Previous testimonial</span>
                    <ArrowRight className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="inline-flex h-12 w-12 items-center justify-center border border-concrete-700 text-white transition-colors duration-300 hover:border-bronze-400 hover:text-bronze-400"
                  >
                    <span className="sr-only">Next testimonial</span>
                    <ArrowRight />
                  </button>
                </div>
              </div>
            ) : null}
          </figure>
        </Reveal>

        {count > 1 ? (
          <div className="mt-2 flex gap-2" role="tablist" aria-label="Testimonials">
            {testimonials.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                aria-label={`Testimonial ${itemIndex + 1}`}
                onClick={() => setIndex(itemIndex)}
                className="group flex h-11 w-16 items-center"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px w-full transition-colors duration-300",
                    itemIndex === index
                      ? "bg-bronze-500"
                      : "bg-charcoal-800 group-hover:bg-concrete-700",
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
