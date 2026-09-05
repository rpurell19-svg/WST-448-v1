# Figma file — what exists, and what is still outstanding

**File:** https://www.figma.com/design/eTjv0jzE5Ds6s49ePFgMKp
*(Westside Trading 448 — Website Design System)*

## Plan constraints that shaped the file

The Figma account this was built on is on the **Starter plan**, which imposed
two limits that changed the file's structure:

1. **Three pages maximum.** The brief asked for fourteen numbered pages
   (`01 — COVER` … `14 — PROTOTYPE`). Those fourteen groups are instead built as
   **named sections** spread across three pages, keeping the same numbering.
2. **A cap on MCP tool calls.** That cap was reached partway through the build.
   The foundations and the component library are complete; the assembled page
   frames are not. See "Outstanding" below.

## What is in the file

**Page A — FOUNDATIONS (01–03)**

- `01 — COVER / BRAND DIRECTION` — logo mark rebuilt as vectors, wordmark,
  positioning statement, palette strip
- `02 — DESIGN SYSTEM`
  - Colour tokens: every swatch with hex and usage note, grouped Foundation /
    Concrete / Accent & State
  - Typography: the full ramp, each style shown at size with its specification
  - Spacing, radius and motion specifications
  - Grid and layout: 1440 / 768 / 390 column definitions and section rhythm
- `03 — COMPONENTS` — published components, each with a usage description:
  - `Button` — variant set, Kind (Primary / Secondary / Ghost) × State (Default / Hover)
  - `Project Filter Chip` — variant set, Default / Active
  - `Form Input` — variant set, Default / Focus / Error
  - `Section Heading`, `Stat`, `WhatsApp Floating Button`
  - `Service Card`, `Process Step`, `Project Card`, `Testimonial Card`
  - `Navbar · Desktop`, `Mobile Nav · Closed`, `Mobile Nav · Open`, `Footer`

**Variables** — three collections, all scoped:

- `Colour` (17 variables), `Spacing` (15), `Radius` (4)

**Text styles** — 20, covering the desktop ramp and the mobile overrides.

**Pages B and C** are created and named, ready for the frames below.

## Outstanding

These were not reached before the tool-call cap:

| Section                       | Target page | Status  |
| ----------------------------- | ----------- | ------- |
| `04 — DESKTOP HOMEPAGE` (1440) | B          | To do   |
| `05 — MOBILE HOMEPAGE` (390)   | C          | To do   |
| `06 — ABOUT` … `12 — CONTACT` (1440) | B     | To do   |
| `13 — RESPONSIVE STATES` (768 tablet) | C     | To do   |
| `14 — PROTOTYPE / INTERACTIONS` | C          | To do   |

Also outstanding: syncing the three accessibility amendments
(`concrete/400`, `state/error`, `state/success`) from
[`design-system.md`](design-system.md) back into the Figma variables.

## Building the remaining frames

The frames are compositions of components that already exist, so each is an
assembly job rather than a design one. The implemented site is the reference —
every section is a faithful build of the system in this file, so the quickest
route is to screenshot the running site at 1440 / 768 / 390 and lay the frames
out from the existing component instances to match.

Order that keeps the work cheapest:

1. `04 — DESKTOP HOMEPAGE` at 1440 — Navbar → Hero → Trust → About split →
   Services grid → Process timeline → Projects → Why Westside → Testimonials →
   CTA → Footer.
2. `05 — MOBILE HOMEPAGE` at 390 — the same sections, but designed for mobile:
   single-column stacks, the process timeline as a vertical rail with all eight
   stages open, and the compact nav plus full-screen menu panel.
3. `13 — RESPONSIVE STATES` at 768 — two-column services and project grids.
4. `06`–`12` inner pages at 1440, each reusing the page-header pattern.
5. `14 — PROTOTYPE` — wire the nav links between frames and document the
   interaction specification already recorded in each component's description.
