# Project Guidelines

## Code Style

- Keep this project JavaScript-first (no TypeScript migration unless explicitly requested).
- Follow existing Svelte 5 component style with `$props()` destructuring in component files.
- Reuse existing Tailwind + DaisyUI utility patterns from current components before adding custom CSS.
- Keep changes small and local; avoid broad refactors in this portfolio site unless requested.

## Architecture

- This is a SvelteKit static site deployed to GitHub Pages.
- Routing is simple and page content is composed in `src/routes/+page.svelte`.
- Global shell and page structure are defined in `src/routes/+layout.svelte`.
- Use component boundaries as organized today:
  - `src/lib/components/layout/`: page sections and structural layout.
  - `src/lib/components/features/`: reusable feature cards/widgets.
- Portfolio content is data-driven from `src/lib/data/data.js`.

## Build and Test

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build production output: `npm run build`
- Preview production output: `npm run preview`
- Deploy to GitHub Pages: `npm run deploy`
- There are currently no configured test or lint scripts. Do not assume they exist.

## Conventions

- Prefer editing data in `src/lib/data/data.js` for project/profile content changes instead of hardcoding new content in components.
- Keep UI consistent with existing spacing/container patterns used across layout components.
- Maintain print-related behavior (`print:*` classes) when updating section layouts.
- Preserve static deployment compatibility in `svelte.config.js` (adapter-static, `build` output, `fallback: "index.html"`, empty `paths.base`).

## Pitfalls

- `README.md` is mostly default Svelte template text and may not reflect actual project workflows.
- `ProfileCard.svelte` contains commented GSAP code; `gsap` is not currently in dependencies.
- Avoid introducing SSR-specific behavior that conflicts with static prerendered deployment.
