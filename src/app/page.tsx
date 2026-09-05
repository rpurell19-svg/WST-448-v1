import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutSplit />
      <ServicesGrid />
      <ProcessTimeline />
      <ProjectsShowcase />
      <WhyChoose />
      <Testimonials />
      <CtaBand />
    </>
  );
}
