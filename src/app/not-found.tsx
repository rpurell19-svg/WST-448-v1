import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-black-950 pt-32 pb-20">
      <Container>
        <p className="type-eyebrow text-bronze-400">Error 404</p>
        <h1 className="type-display-2 mt-6 max-w-[16ch] text-white uppercase">
          This page isn&rsquo;t part of the plan.
        </h1>
        <p className="type-body-lg mt-6 max-w-[52ch] text-concrete-300">
          The page you were looking for has moved or never existed. Head back to
          the homepage, or take a look at the projects.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/">Back to homepage</ButtonLink>
          <ButtonLink href="/projects" variant="secondary" withArrow>
            View our work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
