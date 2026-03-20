---
description: "Use when editing frontend Svelte components so prop handling, DaisyUI utilities, and responsive behavior stay aligned with the existing site patterns."
applyTo: "src/lib/components/**/*.svelte"
name: "Frontend Svelte Component Instructions"
---

# Frontend Svelte Component Instructions

- Destructure props via `$props()` at the top of the component, mirroring the existing style, and avoid introducing `export let` or other prop patterns that diverge from the Svelte 5 runes already in use.
- Reuse the established Tailwind + DaisyUI utilities (badges, mockup-browser framing, `btn`, `badge-info`, etc.) before adding new classes; keep color/tone decisions consistent with `HeroSection`, `ProjectCard`, and `ProfileCard`.
- Keep spacing/layout tied to the `container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-24` grid pattern and include responsive modifiers (`md:`, `lg:`, `print:`) so components collapse gracefully on smaller screens and print views.
- Prefer sourcing textual/link data from `src/lib/data/data.js` instead of hardcoding strings inside components; if a component needs unique copy, wrap it with `slot` content or concise inline values while preserving the shared design language.
- Before introducing custom CSS or scripts, evaluate whether existing utility classes already cover the interaction; only add new utilities when they are reusable and document the reason in this instruction file or a comment.
- Whenever components touch DaisyUI-specific structures (mockups, tooltips, cards), double-check that the markup matches prior examples so DaisyUI themes stay consistent and there are no stray `class` names that break the existing palette.
