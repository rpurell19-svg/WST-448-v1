"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "@/components/ui/Button";
import { contact, navigation, primaryCta } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Full-screen mobile menu.
 *
 * Body scroll is locked while open, focus is trapped inside the panel, and
 * Escape closes it — the three things that most often get skipped.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on navigation. Adjusting state during render is React's recommended
  // pattern here — it avoids the extra paint an effect would cause.
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel so the next Tab stays inside it.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-mr-3 inline-flex h-12 w-12 items-center justify-center text-white xl:hidden"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="flex w-6 flex-col items-end gap-[7px]">
          <span
            className={cn(
              "h-px w-6 bg-current transition-transform duration-300 ease-out",
              open && "translate-y-1 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px bg-current transition-all duration-300 ease-out",
              open ? "w-6 -translate-y-1 -rotate-45" : "w-4",
            )}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black-950 xl:hidden"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Logo size="sm" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="type-label -mr-2 px-2 py-3 text-concrete-300 transition-colors hover:text-white"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="px-6 pt-4">
          <ul>
            {navigation.map((item, index) => (
              <li key={item.href} className="border-b border-charcoal-800">
                <Link
                  href={item.href}
                  style={
                    open
                      ? ({ "--reveal-delay": `${index * 45}ms` } as React.CSSProperties)
                      : undefined
                  }
                  data-reveal={open ? "visible" : "hidden"}
                  className="type-h3 flex items-center justify-between py-5 text-white uppercase"
                >
                  {item.label}
                  <ArrowRight className="text-bronze-500" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto px-6 pt-10 pb-12">
          <Link
            href={primaryCta.href}
            className="type-label flex w-full items-center justify-center bg-bronze-500 px-6 py-5 text-black-950"
          >
            {primaryCta.label}
          </Link>
          <div className="mt-6 flex flex-col gap-2">
            <a href={contact.phone.href} className="text-concrete-300 hover:text-white">
              {contact.phone.label}
            </a>
            <a href={contact.email.href} className="break-all text-concrete-300 hover:text-white">
              {contact.email.label}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
