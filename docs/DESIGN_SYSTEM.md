# Novixa Design System & Brand Identity

## Brand Positioning
Novixa is a "Software Engineering & Digital Products Company". It builds scalable systems, architectures, and SaaS products. The brand must exude precision, scale, trust, and technical mastery.

## Visual Language
- **Theme**: "Precision Engineering" - High contrast, deep dark mode, mathematically precise layouts.
- **Avoid**: "AI Slop" generic features like excessive purple/blue gradients, massive glassmorphism glows, unstructured nested cards, and random 3-column generic grids.

## Color Palette
- **Base (Backgrounds)**: Deepest slates, almost black (`#030712`), to represent vastness and focus.
- **Surfaces**: Subtle elevations (`#0b1120`, `#0f172a`) with crisp 1px borders (`rgba(255, 255, 255, 0.07)`).
- **Accents**: 
  - Primary: Technical Blue (`#2563EB`) - Used sparingly for interactive elements, focus states, and primary CTAs.
  - Secondary/Success: Emerald (`#10B981`) - For operational status indicators (e.g. System 99.99%).
- **Text**: 
  - Headings: High contrast (`#FFFFFF`).
  - Body: Muted but legible (`#94A3B8` / slate-400).

## Typography (Math & Scale)
- **Fonts**:
  - Headings (Arabic): `Alexandria`
  - Body (Arabic): `IBM Plex Sans Arabic`
  - English: `Inter`
- **Scale (Perfect Fourth 1.333 for headings)**:
  - Base Body: `16px` (text-base), Line Height `1.65`
  - H1: `48px` or `64px` depending on viewport (text-5xl/text-6xl)
  - H2: `36px` (text-4xl)
  - H3: `24px` (text-2xl)
- **Constraints**: Line width constrained to max 65-75ch (`max-w-prose` or `max-w-3xl`) for readable paragraphs.

## Layout & Math Rules
- **Border Radius**: 
  - Standard Cards: 12px to 16px max (`rounded-xl` / `rounded-2xl`).
  - Buttons/Tags: Full pill (`rounded-full`) or matching 12px depending on component family.
  - No extreme 24px+ radius on large structural containers unless mathematically nested.
- **Nested Radii**: `Inside Corner Radius = Outside Corner Radius - Padding`.
- **Padding Math**: Button horizontal padding = 2x vertical (e.g. `px-6 py-3`). Outer container padding >= inner item spacing.

## Animation & Interactions
- **Micro-interactions**: Subtle `transform: translateY(-2px)` on hover, with a tight box shadow.
- **Transitions**: Fast and snappy, `0.2s` ease-out. No long floating animations or scroll-jacking.
