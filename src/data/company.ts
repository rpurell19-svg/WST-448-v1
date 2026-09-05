/** Company statistics and trust markers shown across the site. */

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export const headlineStat: Stat = {
  value: 100,
  suffix: "+",
  label: "Homes built",
};

export const trustMarkers = [
  "Professional project management",
  "Quality construction",
  "Custom-built homes",
  "Gauteng based",
  "Experienced construction network",
];

export const trustStatement =
  "Years of experience, skilled professionals and a commitment to building homes our clients are proud to call their own.";

export type Reason = {
  title: string;
  description: string;
};

export const reasons: Reason[] = [
  {
    title: "Experience",
    description: "Over 100 homes built.",
  },
  {
    title: "Quality",
    description:
      "A strong focus on professional workmanship and quality materials.",
  },
  {
    title: "Personal approach",
    description:
      "We work closely with every client to understand their vision.",
  },
  {
    title: "Professional network",
    description:
      "Collaboration with experienced project managers, architects, engineers and subcontractors.",
  },
  {
    title: "Complete process",
    description:
      "Support from the initial idea through construction and final finishes.",
  },
];

/** Options offered in the enquiry form. */
export const projectTypes = [
  "Custom home build",
  "Luxury home",
  "Property development",
  "Renovation or extension",
  "Project management only",
  "Something else",
];

export const budgetRanges = [
  "Under R1 million",
  "R1m – R2.5m",
  "R2.5m – R5m",
  "R5m – R10m",
  "R10m+",
  "Not sure yet",
];
