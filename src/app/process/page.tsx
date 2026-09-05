import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Our Building Process — Eight Stages From Idea to Handover",
  description:
    "Consultation, land, architects and engineers, costing, drawings, briefing, construction and finishes — how Westside Trading 448 runs a build in Gauteng.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our building process"
        title="From first idea to final detail."
        intro="Eight stages, each one explained before it starts. You always know what is happening, what comes next and what it costs."
        image="process-07-construction.webp"
        imageAlt="Reinforced concrete structure under construction with the site team at work"
      />
      <ProcessTimeline showHeading={false} />
      <CtaBand />
    </>
  );
}
