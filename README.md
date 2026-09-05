# Westside Trading 448 — Website

Premium marketing website for **Westside Trading 448**, a Gauteng-based property
development and construction company.

Designed first as a Figma design system, then implemented as a Next.js frontend
that reads its tokens, type ramp and components directly from that system.

- **Figma file:** https://www.figma.com/design/eTjv0jzE5Ds6s49ePFgMKp
- **Design system → code mapping:** [`docs/design-system.md`](docs/design-system.md)
- **Current state of the Figma file:** [`docs/figma.md`](docs/figma.md)

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint
```

Node 20+ is required (built and verified on Node 22).

---

## Stack

| Concern     | Choice                                                            |
| ----------- | ----------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, React 19, TypeScript)                     |
| Styling     | Tailwind CSS v4 with the design tokens declared in `@theme`        |
| Type        | Manrope (display) + Inter (body), self-hosted via `next/font`      |
| Images      | `next/image` over locally optimised WebP with generated LQIP blurs |
| Animation   | CSS transitions driven by one `IntersectionObserver` per element   |
| Dependencies| None beyond Next/React — no animation, icon or utility libraries   |

---

## Project layout

```
src/
  app/
    layout.tsx              root shell: fonts, metadata, JSON-LD, chrome
    page.tsx                home
    about|services|process|projects|testimonials|contact/
    projects/[slug]/        project detail (statically generated)
    api/enquiry/route.ts    enquiry endpoint — see "Contact form" below
    sitemap.ts robots.ts not-found.tsx
    globals.css             design tokens, type ramp, motion, a11y overrides
  components/
    layout/                 Navbar, MobileNav, Footer, WhatsAppButton
    sections/               Hero, TrustBar, AboutSplit, ServicesGrid,
                            ProcessTimeline, ProjectsShowcase, WhyChoose,
                            Testimonials, CtaBand, ContactSection, PageHero
    projects/               ProjectCard, FilterableProjects
    contact/                ContactForm
    ui/                     Button, Container, Logo, Media, Reveal,
                            SectionHeading, ServiceIcon, CountUp
  data/                     ← all editable content lives here
  lib/                      cn, enquiry validation (shared client + server)
scripts/
  generate-image-meta.py    regenerates image dimensions + blur placeholders
```

---

## Editing content

Everything a non-developer would want to change is in `src/data/`. No component
needs to be touched.

| File               | Controls                                                        |
| ------------------ | --------------------------------------------------------------- |
| `site.ts`          | Company name, URL, phone, WhatsApp, email, navigation, SEO terms |
| `company.ts`       | Headline statistic, trust markers, reasons, form dropdowns       |
| `services.ts`      | The seven services (order sets the numbering)                    |
| `process.ts`       | The eight building stages and their photography                  |
| `projects.ts`      | Portfolio entries, categories, galleries, detail-page copy       |
| `testimonials.ts`  | Client quotes                                                    |
| `image-meta.ts`    | Generated — do not edit by hand                                  |

These are plain typed objects, so a CMS or database can replace them later
without any change to the components that read them.

### Adding a project

1. Drop the photography into `public/images/` as `.webp`.
2. Run `pip install pillow && python3 scripts/generate-image-meta.py`.
3. Add an object to `projects` in `src/data/projects.ts`. The `slug` becomes its
   `/projects/<slug>` page, sitemap entry and metadata automatically.
4. Set `placeholder: false` so the "placeholder project" notice disappears.

### Publishing real testimonials

`src/data/testimonials.ts` ships clearly-labelled placeholders — **no client
testimonial has been invented**. Replace the text and set `placeholder: false`
on each entry; the "placeholder content" notice removes itself once none remain.

### Replacing the placeholder photography

The current images are licence-free Unsplash architectural photography, chosen
as stand-ins for Westside Trading 448's own project pictures. Replace the files
in `public/images/` (same filenames, or new names referenced from the data
files), then re-run `scripts/generate-image-meta.py`.

---

## Contact form

The form validates in the browser **and** on the server (both use
`src/lib/enquiry.ts`, so they cannot disagree), then posts to `/api/enquiry`.

Delivery is configuration, not code. Copy `.env.example` to `.env.local` and set
either:

- `ENQUIRY_WEBHOOK_URL` — Formspree, Zapier, Make, n8n, a CRM inbox, anything
  that accepts a JSON `POST`; or
- `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` + `ENQUIRY_FROM_EMAIL` for
  transactional email via [Resend](https://resend.com).

**Until one of those is set, the site does not pretend to have sent anything.**
A valid submission returns `delivered: false` and the form says so plainly,
offering the phone number and WhatsApp link instead. Once configured, the same
submission shows the success message: *"Thank you. Your enquiry has been
received. We'll be in touch soon."*

The form also carries a hidden honeypot field; submissions that fill it are
accepted silently and never delivered.

---

## Accessibility

- Semantic landmarks, one `<h1>` per page, no skipped heading levels
- Skip-to-content link, visible bronze focus rings on every interactive element
- Mobile menu traps focus, locks body scroll and closes on Escape
- Every image has alt text; decorative images use `alt=""`
- Every form control has a real `<label>`, with `aria-invalid` and
  `aria-describedby` wired to inline error messages
- Statistics expose their final value to screen readers even while animating
- All body text meets WCAG AA contrast on its surface (see
  [`docs/design-system.md`](docs/design-system.md) for the audited pairs)
- `prefers-reduced-motion` disables every transition, transform and reveal;
  a `scripting: none` rule keeps content visible without JavaScript

## Performance

- One priority image per page (the hero); everything else is lazy-loaded
- Locally optimised WebP with per-image blur placeholders and intrinsic
  dimensions, so nothing shifts as images arrive
- Animation is CSS-only, driven by one `IntersectionObserver` per revealed
  element, which disconnects after firing
- Only genuinely interactive components are client components; the rest are
  server-rendered

## SEO

- Per-page titles, descriptions and canonicals; Open Graph and Twitter cards
- `GeneralContractor` JSON-LD with contact details and areas served
- Generated `sitemap.xml` and `robots.txt` covering every route including
  project detail pages
- Copy and headings target: home builders Gauteng, property developers Gauteng,
  custom home builders South Africa, luxury home builders Gauteng, construction
  companies Gauteng, property development South Africa

---

## Verification performed

Checked in a headless Chromium at 390, 430, 768, 1024 and 1440 px:

- No horizontal overflow at any breakpoint
- No console errors and no failed requests on any route
- Every internal link and in-page anchor resolves (22 targets)
- Project filters return the expected counts; cards open their detail pages
- Mobile menu opens, locks scroll, traps focus, closes on Escape and on navigation
- Form validation: empty submit, invalid email, invalid phone, and a valid
  submission each behave correctly
- Process timeline switches stages; testimonial carousel advances
- Reduced-motion mode leaves all content visible
- `npm run build` and `npm run lint` both clean
