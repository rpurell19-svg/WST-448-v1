import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { headlineStat, trustMarkers, trustStatement } from "@/data/company";

/** Oversized statistic paired with an architectural grid of trust markers. */
export function TrustBar() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-charcoal-800 bg-black-950 py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="type-stat text-white">
              <CountUp
                value={headlineStat.value}
                suffix={headlineStat.suffix}
              />
            </p>
            <h2
              id="experience-heading"
              className="type-eyebrow mt-4 text-bronze-400"
            >
              {headlineStat.label}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="type-body-lg max-w-[52ch] text-concrete-300 lg:pb-3">
              {trustStatement}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 border-t border-charcoal-800 sm:grid-cols-2 lg:grid-cols-5 lg:border-l">
          {trustMarkers.map((marker, index) => (
            <Reveal
              as="li"
              key={marker}
              delay={index * 70}
              className="border-b border-charcoal-800 px-0 py-7 sm:px-6 lg:border-r lg:border-b-0 lg:px-7 lg:py-9 lg:first:pl-7"
            >
              <span className="type-eyebrow block text-concrete-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 block text-sm text-white uppercase">
                {marker}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
