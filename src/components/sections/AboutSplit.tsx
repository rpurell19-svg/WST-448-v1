import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

/** Split-screen introduction: architecture on the left, the argument on the right. */
export function AboutSplit() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-black-950 py-20 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="image" className="relative aspect-4/5 overflow-hidden">
            <Media
              src="about-build.webp"
              alt="Contemporary concrete and glass home at dusk, warmly lit from within"
              sizes="(min-width: 1024px) 45vw, 92vw"
            />
          </Reveal>

          <div>
            <Reveal>
              <span aria-hidden="true" className="block h-px w-12 bg-bronze-500" />
            </Reveal>
            <Reveal delay={60}>
              <p className="type-eyebrow mt-6 text-bronze-400">
                About Westside Trading 448
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2
                id="about-heading"
                className="type-display-2 mt-5 text-white uppercase"
              >
                Passionate about building people their new homes.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="type-body-lg mt-7 text-concrete-300">
                Building a home can feel complicated and stressful. Westside
                Trading 448 works closely with every client to make the process
                clearer, more professional and more enjoyable.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-5 text-concrete-300">
                With more than 100 homes built, the company brings practical
                experience, trusted professionals and a personal approach to
                every project.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9">
                <ButtonLink href="/about" variant="secondary" withArrow>
                  Learn more about us
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
