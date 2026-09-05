import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Container } from "@/components/ui/Container";

/**
 * Full-bleed cinematic hero. The photograph is the only priority image on the
 * page; everything else below the fold is lazy-loaded.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black-950">
      <div className="absolute inset-0">
        <Media
          src="hero-home.webp"
          alt="Contemporary Gauteng home at dusk, its living areas glowing through full-height glazing"
          priority
          sizes="100vw"
          className="scale-[1.03] animate-[hero-settle_2.4s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        />
        {/* Two-stop scrim: darkens the base for legibility, keeps the sky open. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/70 to-black-950/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black-950/70 via-transparent to-transparent"
        />
      </div>

      <Container className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <p className="type-eyebrow animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_both] text-bronze-400">
          Property Developers &amp; Home Builders · Gauteng
        </p>

        <h1 className="type-display-1 mt-7 max-w-[13ch] animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.3s_both] text-white uppercase">
          We build your vision into reality.
        </h1>

        <p className="type-body-lg mt-8 max-w-[52ch] animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.45s_both] text-concrete-300">
          From concept and design to construction and finishing, Westside
          Trading 448 works with you to create a home built around your vision.
        </p>

        <div className="mt-10 flex animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.6s_both] flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contact" size="lg">
            Start your project
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary" size="lg" withArrow>
            View our work
          </ButtonLink>
        </div>
      </Container>

      <a
        href="#experience"
        aria-label="Scroll to the next section"
        className="absolute right-6 bottom-32 z-10 hidden items-center gap-3 text-concrete-300 transition-colors duration-300 hover:text-white lg:right-12 lg:flex"
      >
        <span className="type-eyebrow">Scroll</span>
        <span
          aria-hidden="true"
          className="relative block h-14 w-px overflow-hidden bg-concrete-700"
        >
          <span className="absolute inset-x-0 top-0 block h-6 animate-[scroll-hint_2.2s_ease-in-out_infinite] bg-bronze-500" />
        </span>
      </a>
    </section>
  );
}
