import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { reasons } from "@/data/company";

/** Full-bleed architectural statement with the five reasons to build with Westside. */
export function WhyChoose() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden bg-black-950 py-24 lg:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <Media
          src="why-choose.webp"
          alt=""
          sizes="100vw"
          className="scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black-950/82" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black-950 via-transparent to-black-950"
        />
      </div>

      <Container>
        <Reveal>
          <span aria-hidden="true" className="block h-px w-12 bg-bronze-500" />
        </Reveal>
        <Reveal delay={60}>
          <p className="type-eyebrow mt-6 text-bronze-400">Why Westside</p>
        </Reveal>
        <Reveal delay={120}>
          <h2
            id="why-heading"
            className="type-display-2 mt-5 max-w-[18ch] text-white uppercase"
          >
            Why build with Westside Trading 448?
          </h2>
        </Reveal>

        <dl className="mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              delay={(index % 3) * 80}
              className="bg-black-950/70 p-8 backdrop-blur-[2px] lg:p-10"
            >
              <span className="type-eyebrow text-concrete-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <dt className="type-h4 mt-4 text-white uppercase">
                {reason.title}
              </dt>
              <dd className="mt-3 text-concrete-300">{reason.description}</dd>
            </Reveal>
          ))}

          <Reveal
            delay={240}
            className="bg-bronze-500/95 p-8 lg:p-10"
          >
            <dt className="type-h4 text-black-950 uppercase">
              Build with us
            </dt>
            <dd className="mt-3">
              <Link
                href="/contact"
                className="type-label inline-flex items-center gap-3 text-black-950 underline-offset-4 hover:underline"
              >
                Start your project
                <ArrowRight />
              </Link>
            </dd>
          </Reveal>
        </dl>
      </Container>
    </section>
  );
}
