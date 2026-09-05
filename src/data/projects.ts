/**
 * PLACEHOLDER PORTFOLIO.
 *
 * These six entries are illustrative placeholders, not completed Westside
 * Trading 448 projects. Replace each object with a real project — the site
 * reads everything from this array, so no component needs to change.
 *
 * To add a project:
 *   1. drop the photography into /public/images
 *   2. run `python3 scripts/generate-image-meta.py`
 *   3. add an object below (a unique `slug` becomes its /projects/<slug> page)
 */

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "luxury-homes", label: "Luxury Homes" },
  { id: "custom-homes", label: "Custom Homes" },
  { id: "property-developments", label: "Property Developments" },
  { id: "completed", label: "Completed Projects" },
  { id: "construction", label: "Construction Projects" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

export type Project = {
  slug: string;
  name: string;
  location: string;
  /** Human-readable project type shown on the card and detail page. */
  type: string;
  year: number;
  /** Every category the project should appear under when filtering. */
  categories: Exclude<ProjectCategory, "all">[];
  status: "Completed" | "Under construction";
  summary: string;
  description: string[];
  features: string[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  /** Marks illustrative content so it is never presented as a real credential. */
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "the-cedar-residence",
    name: "The Cedar Residence",
    location: "Pretoria",
    type: "Luxury Custom Home",
    year: 2026,
    categories: ["luxury-homes", "custom-homes", "completed"],
    status: "Completed",
    summary:
      "A single-storey family home organised around a mature cedar, with deep overhangs and a long glazed living edge.",
    description: [
      "A custom home planned around an existing mature tree, with the living wing pushed to the northern boundary to hold onto afternoon light.",
      "Charred timber cladding and off-shutter concrete carry the exterior, while the interior keeps a restrained palette so the garden reads as the main event.",
    ],
    features: [
      "Four bedrooms, three en-suite",
      "Double-volume entrance hall",
      "Open-plan living with stacking glazing",
      "Off-shutter concrete and charred timber facade",
      "Covered patio and outdoor kitchen",
      "Solar-ready electrical reticulation",
    ],
    image: "project-cedar.webp",
    imageAlt: "Modern timber-clad home at dusk beside a mature tree",
    gallery: [
      { src: "interior-lounge.webp", alt: "Living area with timber feature wall and low-slung seating" },
      { src: "interior-kitchen.webp", alt: "Minimal kitchen with island and integrated appliances" },
      { src: "interior-living.webp", alt: "Double-volume living space with staircase and full-height glazing" },
    ],
    placeholder: true,
  },
  {
    slug: "the-modern-house",
    name: "The Modern House",
    location: "Centurion",
    type: "Custom Home",
    year: 2026,
    categories: ["custom-homes", "completed"],
    status: "Completed",
    summary:
      "A compact, efficient family home with a warm timber-clad street facade and a private courtyard garden.",
    description: [
      "A tight brief and a tight stand. The plan pulls all circulation to the southern wall so every habitable room gets a north-facing window.",
      "Materials were selected for low maintenance: face brick, powder-coated aluminium and a hardwood rain screen.",
    ],
    features: [
      "Three bedrooms",
      "North-facing living court",
      "Timber rain-screen facade",
      "Double garage with direct kitchen access",
      "Rainwater harvesting",
    ],
    image: "project-modern.webp",
    imageAlt: "Contemporary home with timber cladding and a landscaped entrance path",
    gallery: [
      { src: "interior-living.webp", alt: "Open living area with staircase and natural light" },
      { src: "interior-kitchen.webp", alt: "Kitchen with island seating and pendant lighting" },
    ],
    placeholder: true,
  },
  {
    slug: "the-ridge-development",
    name: "The Ridge Development",
    location: "Gauteng",
    type: "Property Development",
    year: 2025,
    categories: ["property-developments", "completed"],
    status: "Completed",
    summary:
      "A multi-unit residential development delivered from land acquisition through to occupation certificates.",
    description: [
      "A development project covering site assessment, town planning liaison, professional team appointment and construction management.",
      "Units were designed as a consistent family with three plan variations so the streetscape reads as one considered scheme.",
    ],
    features: [
      "Multi-unit residential scheme",
      "Three plan types",
      "Full professional team coordination",
      "Bulk services and civils management",
      "Handover and snagging programme",
    ],
    image: "project-ridge.webp",
    imageAlt: "Contemporary residential building with pool and landscaped terrace",
    gallery: [
      { src: "interior-pool-view.webp", alt: "Living space opening onto a pool terrace" },
      { src: "detail-facade.webp", alt: "Detail of a modern facade against a clear sky" },
    ],
    placeholder: true,
  },
  {
    slug: "the-concrete-residence",
    name: "The Concrete Residence",
    location: "Johannesburg",
    type: "Luxury Home",
    year: 2025,
    categories: ["luxury-homes", "completed"],
    status: "Completed",
    summary:
      "A white monolithic home of stacked volumes, deep reveals and a sheltered north-facing garden room.",
    description: [
      "The massing is a set of shifted rectangles, each one turned to frame a specific view or block a specific neighbour.",
      "Off-shutter concrete was cast in place and left raw internally in the stair core, giving the house a single honest structural gesture.",
    ],
    features: [
      "Five bedrooms",
      "In-situ off-shutter concrete stair core",
      "Roof terrace with city outlook",
      "Recessed glazing for solar control",
      "Staff accommodation and separate entrance",
    ],
    image: "project-concrete.webp",
    imageAlt: "White rendered contemporary home with stacked geometric volumes",
    gallery: [
      { src: "detail-arches.webp", alt: "Repeating white arches lit from above" },
      { src: "interior-living.webp", alt: "Bright interior living space with a staircase" },
    ],
    placeholder: true,
  },
  {
    slug: "the-willow-estate",
    name: "The Willow Estate",
    location: "Midrand",
    type: "Custom Home",
    year: 2024,
    categories: ["custom-homes", "luxury-homes", "completed"],
    status: "Completed",
    summary:
      "A two-storey estate home with a cantilevered upper level and a pool terrace running the full northern edge.",
    description: [
      "The upper floor cantilevers three metres to shade the terrace below, removing the need for a separate pergola structure.",
      "Finishes were specified with the client over a series of sample sessions before construction started, which kept the build free of late variation orders.",
    ],
    features: [
      "Cantilevered first floor",
      "Full-length pool terrace",
      "Fitted study and library",
      "Underfloor heating throughout",
      "Backup power and water",
    ],
    image: "project-willow.webp",
    imageAlt: "Two-storey modern house with cantilevered upper level beside a pool",
    gallery: [
      { src: "interior-pool-view.webp", alt: "Interior looking out to the pool terrace" },
      { src: "interior-kitchen.webp", alt: "Kitchen with stone island and integrated joinery" },
    ],
    placeholder: true,
  },
  {
    slug: "the-aloe-villa",
    name: "The Aloe Villa",
    location: "Pretoria East",
    type: "Luxury Home",
    year: 2024,
    categories: ["luxury-homes", "construction"],
    status: "Under construction",
    summary:
      "A courtyard villa currently in construction, with a shaded colonnade wrapping a central water feature.",
    description: [
      "Currently on site. The structure is complete and the project is moving into finishes and interior fit-out.",
      "The plan wraps around a central court so that every principal room looks onto water and planting rather than a boundary wall.",
    ],
    features: [
      "Central courtyard plan",
      "Shaded colonnade to all living rooms",
      "Six bedrooms",
      "Guest cottage",
      "Full landscaping and irrigation package",
    ],
    image: "project-aloe.webp",
    imageAlt: "White villa with a long swimming pool and covered terrace",
    gallery: [
      { src: "interior-pool-view.webp", alt: "Terrace and pool seen from inside the villa" },
      { src: "detail-facade.webp", alt: "Facade detail with strong shadow lines" },
    ],
    placeholder: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
