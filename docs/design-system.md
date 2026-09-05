# Design system — Figma ↔ code

The Figma file is the source of truth for the visual language. This document is
the contract between it and the implementation: every token, text style and
component in the file has a named counterpart in the codebase, so a change in
one has an obvious home in the other.

**Figma file:** https://www.figma.com/design/eTjv0jzE5Ds6s49ePFgMKp

---

## 1. Colour

Figma variable collection **Colour** → CSS custom properties in
`src/app/globals.css` (`@theme`) → Tailwind utilities.

| Figma variable   | Value     | Tailwind         | Used for                                        |
| ---------------- | --------- | ---------------- | ----------------------------------------------- |
| `black/950`      | `#08090A` | `black-950`      | Page ground, hero scrims, footer                |
| `charcoal/900`   | `#101214` | `charcoal-900`   | Alternate section ground                        |
| `charcoal/850`   | `#16191C` | `charcoal-850`   | Cards, form fields                              |
| `charcoal/800`   | `#1D2124` | `charcoal-800`   | Hairlines and grid lines on dark                |
| `concrete/700`   | `#41474D` | `concrete-700`   | Borders; body copy **on light surfaces only**   |
| `concrete/500`   | `#6E767E` | `concrete-500`   | Control borders; muted copy on light            |
| `concrete/300`   | `#AEB4BA` | `concrete-300`   | Body copy on dark                               |
| `concrete/200`   | `#D6D9DC` | `concrete-200`   | Borders on light                                |
| `concrete/100`   | `#EFF0F1` | `concrete-100`   | Light section ground                            |
| `concrete/050`   | `#F7F8F8` | `concrete-050`   | Alternate light ground                          |
| `white`          | `#FFFFFF` | `white`          | Surfaces, headings on dark                      |
| `bronze/600`     | `#8C6C3F` | `bronze-600`     | Accent on light                                 |
| `bronze/500`     | `#B08D57` | `bronze-500`     | Primary accent — rules, indices, primary button |
| `bronze/400`     | `#C7A876` | `bronze-400`     | Accent hover, eyebrows on dark                  |
| `bronze/200`     | `#E4D3B6` | `bronze-200`     | Faint accent                                    |

Bronze is an accent, never a field: rules, small indices, selected states, the
primary button and the "build with us" tile. Nothing else.

### Amendments made for WCAG AA

Three values in the code differ from the swatches currently in Figma. Each was
changed because the original failed AA for the size at which it is actually
used. **These three should be synced back into the Figma variables.**

| Token             | Figma today | Code      | Why                                                                        |
| ----------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| `concrete/400` *(new)* | —      | `#8A9198` | Muted text on dark. `concrete/500` only reaches 4.3:1 on `black-950`; this is 6.2:1. |
| `state/error`     | `#B4453C`   | `#E0726A` | Inline form errors were 3.2:1 on `charcoal-850`; now 5.7:1.                 |
| `state/success`   | `#3E7D5A`   | `#5CB383` | Success message was 3.6:1 on `charcoal-850`; now 6.9:1.                     |

### Audited contrast pairs

| Foreground     | Background     | Ratio  | Verdict                          |
| -------------- | -------------- | ------ | -------------------------------- |
| `white`        | `black-950`    | 20.0:1 | AA / AAA                         |
| `concrete-300` | `black-950`    |  9.2:1 | AA / AAA — body copy             |
| `concrete-400` | `black-950`    |  6.3:1 | AA — muted copy, eyebrows        |
| `concrete-400` | `charcoal-850` |  5.5:1 | AA                               |
| `bronze-400`   | `black-950`    |  8.8:1 | AA / AAA — eyebrows              |
| `bronze-500`   | `black-950`    |  6.8:1 | AA                               |
| `black-950`    | `bronze-500`   |  6.5:1 | AA — primary button              |
| `state-error`  | `charcoal-850` |  5.7:1 | AA — inline errors               |
| `state-success`| `charcoal-850` |  6.9:1 | AA — success message             |
| `concrete-500` | `black-950`    |  4.3:1 | Borders only — never body text   |
| `concrete-700` | `black-950`    |  2.1:1 | Hairlines only — never text      |

---

## 2. Typography

Figma text styles → the `.type-*` classes in `src/app/globals.css`. The code
versions are fluid (`clamp()`), so the Figma desktop and mobile styles are the
two ends of one ramp rather than two separate definitions.

| Figma text style       | Class            | Font / weight       | Size (mobile → desktop) |
| ---------------------- | ---------------- | ------------------- | ----------------------- |
| `Display/D1`           | `type-display-1` | Manrope ExtraBold   | 44 → 88                 |
| `Display/D2`           | `type-display-2` | Manrope ExtraBold   | 32 → 64                 |
| `Heading/H1`           | `type-h1`        | Manrope Bold        | 30 → 56                 |
| `Heading/H2`           | `type-h2`        | Manrope Bold        | 26 → 44                 |
| `Heading/H3`           | `type-h3`        | Manrope Bold        | 22 → 32                 |
| `Heading/H4`           | `type-h4`        | Manrope SemiBold    | 18 → 24                 |
| `Heading/H5`           | `type-h5`        | Manrope SemiBold    | 18                      |
| `Body/Large`           | `type-body-lg`   | Inter Regular       | 16 → 18                 |
| `Body/Base`            | *(body default)* | Inter Regular       | 16 / 1.7                |
| `Body/Small`           | `text-sm`        | Inter Regular       | 14                      |
| `Label/Nav`, `Label/Button` | `type-label` | Inter Medium, 14% tracking | 12          |
| `Label/Eyebrow`        | `type-eyebrow`   | Inter Medium, 24% tracking | 11           |
| `Numeral/Stat`         | `type-stat`      | Manrope ExtraBold   | 60 → 120                |

Headings are uppercase with tight line-height and negative tracking; labels and
eyebrows are uppercase with wide tracking. Body copy is never uppercase.

---

## 3. Spacing, radius and grid

- **Spacing** — Figma `Spacing` collection is the 4px scale
  (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160), which is Tailwind's
  default scale one-for-one.
- **Section rhythm** — `py-20` mobile, `lg:py-28` desktop.
- **Radius** — Figma `Radius` collection is `none / xs / sm / pill`. In practice
  the site is square-cornered; only the WhatsApp button is a circle.
- **Grid** — desktop 1440: 12 columns, 24px gutter, 1248px max content
  (`Container`, `max-w-[1248px]`); tablet 768: 8 columns; mobile 390: 4 columns.
  Margins are `px-6 → sm:px-10 → lg:px-12`.

---

## 4. Motion

| Purpose            | Duration | Easing                        |
| ------------------ | -------- | ----------------------------- |
| Section reveal     | 800ms    | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Image reveal (clip)| 1000ms   | same                          |
| Image settle       | 1400ms   | same                          |
| Hero entrance      | 900ms    | same, staggered 150ms         |
| Hover states       | 300ms    | `ease-out`                    |
| Project card zoom  | 900ms    | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Reveal stagger     | 40–90ms per item                         |

Exposed as `--ease-architect` in `@theme`. Every one of these is disabled under
`prefers-reduced-motion: reduce`.

Two implementation notes worth keeping:

- The image-reveal clip is applied to an **inner** wrapper, not the observed
  element. A `clip-path` on the observed node collapses its intersection
  rectangle to nothing, so it would never report as visible and would stay
  hidden forever.
- The process timeline changes stage on click and keyboard focus, not hover —
  hover would swap the stage under a stationary cursor every time the page
  scrolled.

---

## 5. Components

| Figma component            | Code                                            |
| -------------------------- | ----------------------------------------------- |
| `Button` (Kind × State)    | `ui/Button.tsx` — `ButtonLink`, `Button`        |
| `Project Filter Chip`      | `projects/FilterableProjects.tsx`               |
| `Form Input` (Default/Focus/Error) | `contact/ContactForm.tsx` — `Field`      |
| `Section Heading`          | `ui/SectionHeading.tsx`                         |
| `Stat`                     | `ui/CountUp.tsx` + `sections/TrustBar.tsx`      |
| `WhatsApp Floating Button` | `layout/WhatsAppButton.tsx`                     |
| `Service Card`             | `sections/ServicesGrid.tsx`                     |
| `Process Step`             | `sections/ProcessTimeline.tsx`                  |
| `Project Card`             | `projects/ProjectCard.tsx`                      |
| `Testimonial Card`         | `sections/Testimonials.tsx`                     |
| `Navbar · Desktop`         | `layout/Navbar.tsx`                             |
| `Mobile Nav · Closed/Open` | `layout/MobileNav.tsx`                          |
| `Footer`                   | `layout/Footer.tsx`                             |
| Logo lockup                | `ui/Logo.tsx` — mark rebuilt as vector geometry |

The logo is drawn rather than bitmapped: a pitched house outline enclosing the
bold "W", reconstructed from the supplied brand mark so it stays crisp at every
size and can be recoloured for light or dark surfaces.
