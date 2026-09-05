import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services — Custom Homes, Development & Construction",
  description:
    "Property development, custom home building, project management, architects and engineers, costing, construction and interior finishes across Gauteng.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything you need to build with confidence."
        intro="Seven services covering the whole build — one accountable team from the first sketch to the final finish."
        image="detail-arches.webp"
        imageAlt="Repeating architectural arches lit from above"
      />

      <section className="bg-black-950 py-20 lg:py-28">
        <Container>
          <ul className="grid gap-px border border-charcoal-800 bg-charcoal-800">
            {services.map((service, index) => (
              <Reveal
                as="li"
                key={service.slug}
                id={service.slug}
                delay={(index % 2) * 80}
                className="scroll-mt-32 bg-black-950"
              >
                <div className="grid gap-8 p-8 lg:grid-cols-[auto_1fr_1.2fr] lg:items-start lg:gap-14 lg:p-12">
                  <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
                    <span className="font-display text-2xl font-bold text-bronze-500 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ServiceIcon
                      name={service.icon}
                      className="h-10 w-10 text-bronze-500"
                    />
                  </div>

                  <h2 className="type-h3 text-white uppercase lg:max-w-[16ch]">
                    {service.title}
                  </h2>

                  <p className="type-body-lg text-concrete-300">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-col gap-5 border border-charcoal-800 bg-charcoal-900 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-12">
              <p className="type-h4 max-w-[34ch] text-white uppercase">
                Not sure which of these you need yet?
              </p>
              <ButtonLink href="/contact" size="lg">
                Talk it through with us
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
