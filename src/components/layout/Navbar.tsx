"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";
import { navigation, primaryCta } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Sticky navigation.
 *
 * Transparent while the hero is under it, then it settles onto a near-black
 * translucent bar with a hairline. On routes without a full-bleed hero it is
 * solid from the first paint.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const transparentAtTop = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !transparentAtTop;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out",
        solid
          ? "border-b border-charcoal-800 bg-black-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="-ml-1 flex shrink-0 items-center py-4 lg:py-5"
          aria-label={`${"Westside Trading 448"} — home`}
        >
          {/* Wrapped rather than given conflicting display utilities — the
              stylesheet's ordering, not the class order, decides those. */}
          <span className="lg:hidden">
            <Logo size="sm" />
          </span>
          <span className="hidden lg:block">
            <Logo size="md" />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "type-label group relative inline-flex flex-col items-center gap-2 py-2 transition-colors duration-300",
                      active
                        ? "text-white"
                        : "text-concrete-300 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px bg-bronze-500 transition-all duration-300 ease-out",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={primaryCta.href}
            className="type-label hidden bg-bronze-500 px-6 py-4 text-black-950 transition-colors duration-300 hover:bg-bronze-400 xl:inline-flex"
          >
            {primaryCta.label}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
