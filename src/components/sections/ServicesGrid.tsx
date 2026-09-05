import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ArrowRight } from "@/components/ui/Button";
import { services } from "@/data/services";

/**
 * The seven services on an architectural grid. Each card links to the services
 * page anchored at its own section, so nothing here is a dead surface.
 */
export function ServicesGrid({
  heading = "Everything you need\nto build with confidence.",
  eyebrow = "Our services",
  intro,
  headingLevel = "h2",
}: {
  heading?: string;
  eyebrow?: string;
  intro?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-charcoal-800 bg-charcoal-900 py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
          as={headingLevel}
          className="max-w-[820px]"
        />

        <ul className="mt-16 grid gap-px border border-charcoal-800 bg-charcoal-800 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              as="li"
              key={service.slug}
              delay={(index % 3) * 80}
              className="bg-charcoal-900"
            >
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col p-8 transition-colors duration-500 ease-out hover:bg-charcoal-850 lg:p-10"
              >
                <div className="flex items-center gap-4">
                  <ServiceIcon
                    name={service.icon}
                    className="text-bronze-500 transition-colors duration-500 group-hover:text-bronze-400"
                  />
                  <span className="font-display text-sm font-bold tracking-[0.06em] text-bronze-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="type-h4 mt-8 text-white uppercase transition-transform duration-500 ease-out group-hover:translate-x-1">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 text-concrete-300">
                  {service.description}
                </p>

                <span className="type-label mt-8 inline-flex items-center gap-3 text-concrete-400 transition-colors duration-300 group-hover:text-bronze-400">
                  Learn more
                  <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </span>

                <span
                  aria-hidden="true"
                  className="mt-8 block h-px w-0 bg-bronze-500 transition-[width] duration-700 ease-out group-hover:w-full"
                />
              </Link>
            </Reveal>
          ))}

          {/* Fills the grid's last cell rather than leaving a dead square. */}
          <Reveal as="li" delay={160} className="bg-charcoal-900 xl:col-span-2">
            <Link
              href="/contact"
              className="group flex h-full flex-col justify-between p-8 transition-colors duration-500 ease-out hover:bg-charcoal-850 lg:p-10"
            >
              <span aria-hidden="true" className="block h-px w-12 bg-bronze-500" />
              <span className="mt-10 max-w-[42ch]">
                <span className="type-h4 block text-white uppercase">
                  Start your project
                </span>
                <span className="mt-4 block text-concrete-300">
                  Tell us what you have in mind and we&rsquo;ll set out the
                  practical next step.
                </span>
              </span>
              <span className="type-label mt-8 inline-flex items-center gap-3 text-bronze-400">
                Get in touch
                <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
