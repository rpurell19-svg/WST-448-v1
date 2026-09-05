/**
 * Single source of truth for company details, navigation and SEO defaults.
 *
 * Everything a non-developer is likely to change lives in this folder. Swapping
 * these objects for a CMS or database response later requires no changes to any
 * component — the shapes below are the contract.
 */

export const site = {
  name: "Westside Trading 448",
  legalName: "Westside Trading 448",
  tagline: "Property Developers & Home Builders",
  /** Update this once the domain is live — it drives canonical URLs, sitemap and Open Graph. */
  url: "https://www.westsidetrading448.co.za",
  description:
    "Westside Trading 448 is a Gauteng-based property development and construction company specialising in custom homes, property development and professional construction from concept to completion.",
  region: "Gauteng, South Africa",
  areaServed: ["Gauteng", "Pretoria", "Johannesburg", "Centurion", "Midrand"],
  foundingClaim: "Over 100 homes built",
} as const;

export const contact = {
  phone: {
    label: "+27 82 526 9192",
    href: "tel:+27825269192",
  },
  whatsapp: {
    label: "+27 82 660 4306",
    /** International format, no plus sign or spaces — required by wa.me. */
    number: "27826604306",
    href: "https://wa.me/27826604306",
    message:
      "Hi Westside Trading 448, I'd like to talk about a building project.",
  },
  email: {
    label: "ronald@westsidetrading448.co.za",
    href: "mailto:ronald@westsidetrading448.co.za",
  },
} as const;

/** WhatsApp deep link with the enquiry message pre-filled. */
export const whatsappLink = `${contact.whatsapp.href}?text=${encodeURIComponent(
  contact.whatsapp.message,
)}`;

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Start your project", href: "/contact" };

/** Keyword focus used across page metadata. */
export const seoKeywords = [
  "home builders Gauteng",
  "property developers Gauteng",
  "custom home builders South Africa",
  "luxury home builders Gauteng",
  "construction companies Gauteng",
  "property development South Africa",
  "house builders Pretoria",
  "home builders Johannesburg",
];
