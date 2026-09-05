import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { contact, navigation, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800 bg-black-950">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-7 max-w-[42ch] text-concrete-300">
              A Gauteng-based property development and construction company.
              Over 100 homes built — from first idea to final detail.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="type-eyebrow text-bronze-400">Navigate</h2>
            <ul className="mt-6 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1 text-sm text-concrete-300 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="type-eyebrow text-bronze-400">Contact</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={contact.phone.href}
                  className="inline-block py-1 text-concrete-300 transition-colors duration-300 hover:text-white"
                >
                  {contact.phone.label}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-concrete-300 transition-colors duration-300 hover:text-white"
                >
                  {contact.whatsapp.label}
                  <span className="text-concrete-400"> · WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.email.href}
                  className="inline-block break-all py-1 text-concrete-300 transition-colors duration-300 hover:text-white"
                >
                  {contact.email.label}
                </a>
              </li>
              <li className="text-concrete-400">{site.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-charcoal-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-concrete-400">
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p className="type-eyebrow text-concrete-400">
            Property Developers &amp; Home Builders · Gauteng
          </p>
        </div>
      </Container>
    </footer>
  );
}
