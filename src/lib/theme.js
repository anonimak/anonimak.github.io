// Registry of the portfolio's design styles. A random one is picked on
// every load (see routes/+page.svelte) so the site's whole look — layout,
// typography, color, motion — reshuffles each visit.
export const THEMES = [
  {
    id: "minimalist",
    name: "Minimalist",
    tagline: "Less, but better.",
  },
  {
    id: "swiss",
    name: "Swiss Design",
    tagline: "International Typographic Style.",
  },
  {
    id: "y2k",
    name: "Y2K",
    tagline: "Chrome, bubbles & the future of 2000.",
  },
  {
    id: "cybercore",
    name: "Cybercore",
    tagline: "Neon circuits & terminal glow.",
  },
  {
    id: "surrealism",
    name: "Surrealism",
    tagline: "Dreamlike logic, impossible space.",
  },
];

export function pickRandomTheme(excludeId) {
  const pool = excludeId
    ? THEMES.filter((t) => t.id !== excludeId)
    : THEMES;
  return pool[Math.floor(Math.random() * pool.length)].id;
}

export function themeById(id) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
