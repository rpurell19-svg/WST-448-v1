/** The eight stages of the Westside Trading 448 building process. */

export type ProcessStage = {
  slug: string;
  title: string;
  description: string;
  /** Filename inside /public/images — see src/data/image-meta.ts for dimensions. */
  image: string;
  imageAlt: string;
};

export const processStages: ProcessStage[] = [
  {
    slug: "consultation",
    title: "Consultation",
    description:
      "We meet with you to understand exactly what type of project you want to build.",
    image: "process-01-consultation.webp",
    imageAlt:
      "Clients and a project manager reviewing building plans across a table",
  },
  {
    slug: "secure-the-land",
    title: "Secure the Land",
    description:
      "Assistance with suitable property opportunities and securing the right land where applicable.",
    image: "process-02-land.webp",
    imageAlt: "Aerial view of a residential development and its surrounding stands",
  },
  {
    slug: "architects-and-engineers",
    title: "Architects & Structural Engineers",
    description:
      "Work with experienced architects and structural engineers to develop the project professionally.",
    image: "process-03-architects.webp",
    imageAlt: "Architect drawing structural details over a technical plan",
  },
  {
    slug: "full-costing",
    title: "Full Costing",
    description:
      "Detailed costing helps you understand the investment required for your project.",
    image: "process-04-costing.webp",
    imageAlt: "Detailed technical drawings and measurements laid out on a desk",
  },
  {
    slug: "drawings-and-design",
    title: "Drawings & Design",
    description:
      "Architectural drawings and designs are developed to bring your vision to life.",
    image: "process-05-drawings.webp",
    imageAlt: "Designer sketching a floor plan alongside a laptop",
  },
  {
    slug: "project-briefing",
    title: "Project Briefing",
    description:
      "Before construction begins, we clearly explain the project and the planned building process.",
    image: "process-06-briefing.webp",
    imageAlt: "Project team briefing around a table before construction begins",
  },
  {
    slug: "construction",
    title: "Construction",
    description:
      "The project becomes reality through professional construction and project management.",
    image: "process-07-construction.webp",
    imageAlt: "Reinforced concrete structure under construction with the site team at work",
  },
  {
    slug: "interior-design-and-finishes",
    title: "Interior Design & Finishes",
    description:
      "Complete the home with interior design, finishes and final details.",
    image: "process-08-finishes.webp",
    imageAlt: "Completed minimal kitchen with stone surfaces and integrated joinery",
  },
];
