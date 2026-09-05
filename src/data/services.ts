/** The seven services. Order defines the numbering shown on the site. */

export type ServiceIcon =
  | "development"
  | "home"
  | "management"
  | "drafting"
  | "costing"
  | "construction"
  | "interior";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    slug: "property-development",
    title: "Property Development",
    description:
      "Complete support for property development projects from planning through completion.",
    icon: "development",
  },
  {
    slug: "custom-home-building",
    title: "Custom Home Building",
    description:
      "Homes designed and constructed around the client's individual requirements.",
    icon: "home",
  },
  {
    slug: "project-management",
    title: "Project Management",
    description:
      "Professional management and coordination throughout the building process.",
    icon: "management",
  },
  {
    slug: "architects-and-engineers",
    title: "Architects & Structural Engineers",
    description:
      "Access to experienced architects, engineers and construction professionals.",
    icon: "drafting",
  },
  {
    slug: "costing-and-planning",
    title: "Costing & Planning",
    description:
      "Clear planning and detailed costing before construction begins.",
    icon: "costing",
  },
  {
    slug: "construction",
    title: "Construction",
    description:
      "Professional construction focused on quality, timelines and excellent workmanship.",
    icon: "construction",
  },
  {
    slug: "interior-design-and-finishes",
    title: "Interior Design & Finishes",
    description:
      "Support with interior design and finishing touches to complete the home.",
    icon: "interior",
  },
];
