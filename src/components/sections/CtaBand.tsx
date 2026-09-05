import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { contact, whatsappLink } from "@/data/site";

/** Full-width closing call to action. */
export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Media src="cta-home.webp" alt="" sizes="100vw" />
        <div aria-hidden="true" className="absolute inset-0 bg-black-950/85" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black-950 via-transparent to-black-950"
        />
      </div>

      <Container className="py-24 text-center lg:py-32">
        <Reveal>
          <span
            aria-hidden="true"
            className="mx-auto block h-px w-12 bg-bronze-500"
          />
        </Reveal>
        <Reveal delay={80}>
          <h2
            id="cta-heading"
            className="type-display-2 mx-auto mt-8 max-w-[16ch] text-white uppercase"
          >
            Ready to build your dream home?
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="type-body-lg mx-auto mt-6 max-w-[52ch] text-concrete-300">
            Let&rsquo;s discuss your vision and take the first step towards
            turning it into reality.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Contact Westside Trading 448
            </ButtonLink>
            <ButtonLink
              href={whatsappLink}
              external
              variant="secondary"
              size="lg"
            >
              WhatsApp {contact.whatsapp.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
