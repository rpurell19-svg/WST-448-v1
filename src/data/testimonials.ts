/**
 * TESTIMONIALS — PLACEHOLDER ONLY.
 *
 * No testimonial has been invented. Every entry below is clearly marked as a
 * placeholder and the UI labels it as such, so nothing on the live site can be
 * mistaken for a real client quote.
 *
 * To publish real testimonials: replace the `quote`, `name`, `project` and
 * `location` fields with the supplied wording and set `placeholder: false`.
 * The section automatically drops the placeholder notice once every entry is
 * marked real.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  project: string;
  location: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Awaiting a client testimonial. This card shows the layout and typography reserved for a real quote about the planning and consultation stages of a build.",
    name: "Client name",
    project: "Custom home",
    location: "Gauteng",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "Awaiting a client testimonial. This card is reserved for a quote about workmanship, site management and how the build was run day to day.",
    name: "Client name",
    project: "Luxury home",
    location: "Pretoria",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "Awaiting a client testimonial. This card is reserved for a quote about the handover, the finishes and living in the completed home.",
    name: "Client name",
    project: "Property development",
    location: "Johannesburg",
    placeholder: true,
  },
];

/** True while any entry is still placeholder copy. */
export const hasPlaceholderTestimonials = testimonials.some((t) => t.placeholder);
