import { contact, whatsappLink } from "@/data/site";

/**
 * Floating WhatsApp link. Fixed bottom-right, sized above the 44px touch-target
 * minimum, and kept clear of the page edge so it never covers content.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat to Westside Trading 448 on WhatsApp — ${contact.whatsapp.label}`}
      className="group fixed right-5 bottom-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-black-950 shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out hover:scale-105 sm:right-8 sm:bottom-8 sm:h-15 sm:w-15"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="h-7 w-7 fill-white"
      >
        <path d="M16.03 4C9.4 4 4.02 9.37 4.02 16c0 2.11.55 4.17 1.6 5.99L4 28l6.16-1.6a12 12 0 0 0 5.87 1.5h.01c6.63 0 12.01-5.37 12.01-12C28.05 9.37 22.66 4 16.03 4Zm0 21.83h-.01a10 10 0 0 1-5.08-1.39l-.36-.21-3.65.95.98-3.55-.24-.37a9.9 9.9 0 0 1-1.53-5.26c0-5.5 4.49-9.98 10-9.98a9.93 9.93 0 0 1 9.99 9.99c0 5.5-4.49 9.82-10.1 9.82Zm5.49-7.36c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49a9.1 9.1 0 0 1-1.68-2.08c-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}
