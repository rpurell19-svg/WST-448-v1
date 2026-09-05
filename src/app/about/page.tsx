import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CtaBand } from "@/components/sections/CtaBand";
import { headlineStat, trustMarkers } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us — Gauteng Property Developers & Home Builders",
  description:
    "Westside Trading 448 has built over 100 homes across Gauteng. Meet the team, the approach and the professional network behind every project.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Westside Trading 448"
        title="Passionate about building people their new homes."
        intro="A Gauteng property development and construction company that works alongside its clients — from the first conversation to the last finish."
        image="about-build.webp"
        imageAlt="Contemporary concrete home at dusk, warmly lit from within"
      />

      <section className="bg-black-950 py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="type-h2 max-w-[20ch] text-white uppercase">
                  Building a home should feel clear, not complicated.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="type-body-lg mt-8 text-concrete-300">
                  Building a home can feel complicated and stressful. Westside
                  Trading 448 works closely with every client to make the
                  process clearer, more professional and more enjoyable.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-concrete-300">
                  With more than 100 homes built, the company brings practical
                  experience, trusted professionals and a personal approach to
                  every project. Work is planned and costed before it starts,
                  explained before it happens, and managed by people who are on
                  site rather than behind a desk.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-5 text-concrete-300">
                  The company works across Gauteng — Pretoria, Johannesburg,
                  Centurion and Midrand — on custom homes, luxury residences and
                  multi-unit property developments.
                </p>
              </Reveal>
            </div>

            <Reveal variant="image" className="relative aspect-3/4 overflow-hidden">
              <Media
                src="detail-facade.webp"
                alt="Detail of a modern facade with strong shadow lines"
                sizes="(min-width: 1024px) 40vw, 92vw"
              />
            </Reveal>
          </div>

          <div className="mt-20 grid gap-12 border-t border-charcoal-800 pt-16 lg:grid-cols-[auto_1fr] lg:gap-24">
            <Reveal>
              <p className="type-stat text-white">
                <CountUp value={headlineStat.value} suffix={headlineStat.suffix} />
              </p>
              <p className="type-eyebrow mt-4 text-bronze-400">
                {headlineStat.label}
              </p>
            </Reveal>

            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {trustMarkers.map((marker, index) => (
                <Reveal
                  as="li"
                  key={marker}
                  delay={index * 70}
                  className="flex items-start gap-4 border-b border-charcoal-800 pb-6"
                >
                  <span className="type-eyebrow mt-1 text-bronze-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white uppercase">{marker}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <WhyChoose />
      <CtaBand />
    </>
  );
}
