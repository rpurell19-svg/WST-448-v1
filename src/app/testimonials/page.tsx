import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Testimonials — What Our Clients Say",
  description:
    "Client feedback on building with Westside Trading 448, a Gauteng property development and construction company.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client feedback"
        title="What our clients say"
        intro="Real client testimonials will be published here as they are supplied. Nothing on this page has been invented."
        image="interior-lounge.webp"
        imageAlt="Contemporary living area with a timber feature wall"
      />
      <Testimonials showHeading={false} />
      <CtaBand />
    </>
  );
}
