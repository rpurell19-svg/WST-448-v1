import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { contact, seoKeywords, site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Westside Trading 448 | Premium Home Builders & Property Developers Gauteng",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: seoKeywords,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.url,
    siteName: site.name,
    title:
      "Westside Trading 448 | Premium Home Builders & Property Developers Gauteng",
    description: site.description,
    images: [
      {
        url: "/images/hero-home.webp",
        width: 2000,
        height: 1333,
        alt: "Contemporary Gauteng home built by Westside Trading 448 at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Westside Trading 448 | Premium Home Builders & Property Developers Gauteng",
    description: site.description,
    images: ["/images/hero-home.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "construction",
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

/** Organisation + local business structured data for search results. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: "Westside Trading 448 Property Developers & Home Builders",
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero-home.webp`,
  telephone: contact.phone.label,
  email: contact.email.label.replace(/^mailto:/, ""),
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsAbout: [
    "Property development",
    "Custom home building",
    "Construction project management",
    "Residential construction",
  ],
  slogan: "We build your vision into reality.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-bronze-500 focus:px-5 focus:py-4 focus:text-black-950"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />

        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
