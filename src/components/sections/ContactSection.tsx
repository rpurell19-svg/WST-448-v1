import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { contact, site, whatsappLink } from "@/data/site";

const details = [
  { label: "Phone", value: contact.phone.label, href: contact.phone.href },
  {
    label: "WhatsApp",
    value: contact.whatsapp.label,
    href: whatsappLink,
    external: true,
  },
  { label: "Email", value: contact.email.label, href: contact.email.href },
];

export function ContactSection({
  headingLevel = "h2",
  showHeading = true,
}: {
  headingLevel?: "h1" | "h2";
  /** Off when the page header already carries this section's title. */
  showHeading?: boolean;
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-charcoal-800 bg-black-950 py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            {showHeading ? (
              <SectionHeading
                id="contact-heading"
                eyebrow="Contact"
                title={"Let's build\nsomething great."}
                intro="Tell us about your project and we'll come back to you with the next practical step."
                as={headingLevel}
              />
            ) : (
              <h2 id="contact-heading" className="type-h3 text-white uppercase">
                How to reach us
              </h2>
            )}

            <dl className="mt-14 border-t border-charcoal-800">
              {details.map((detail, index) => (
                <Reveal
                  key={detail.label}
                  delay={index * 80}
                  className="border-b border-charcoal-800 py-6"
                >
                  <dt className="type-eyebrow text-bronze-400">
                    {detail.label}
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={detail.href}
                      {...(detail.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="type-h4 break-words text-white transition-colors duration-300 hover:text-bronze-400"
                    >
                      {detail.value}
                    </a>
                  </dd>
                </Reveal>
              ))}
              <Reveal delay={240} className="border-b border-charcoal-800 py-6">
                <dt className="type-eyebrow text-bronze-400">Where we build</dt>
                <dd className="mt-3 text-concrete-300">
                  {site.areaServed.join(" · ")}
                </dd>
              </Reveal>
            </dl>
          </div>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
