import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description:
    "Talk to Westside Trading 448 about a custom home, luxury residence or property development in Gauteng. Phone, WhatsApp, email or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something great."
        intro="Tell us about your project and we'll come back to you with the next practical step."
        image="interior-pool-view.webp"
        imageAlt="Interior living space opening onto a pool terrace"
      />
      <ContactSection showHeading={false} />
    </>
  );
}
