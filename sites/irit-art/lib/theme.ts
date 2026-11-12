/**
 * Design tokens for the whole site. Change a value here and every surface re-derives
 * from it — the CSS only reads these as custom properties (see app/layout.tsx).
 *
 * Palette is taken from the artist's logo (brown + antique gold) on plain beige.
 */
export const theme = {
  bg: "#f1e7d6", // plain beige page background
  surface: "#fbf6ec", // cards / inputs
  text: "#3a2e22", // dark brown body text
  muted: "#7b6a57",
  accent: "#6b5238", // buttons, strong brown from the logo type
  gold: "#a9854e", // ornaments, highlights (from the logo's gold)
  line: "#d9c9ae", // borders
  overlay: "#2a2118", // lightbox backdrop
} as const;

export type Theme = typeof theme;

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

export function themeVars(t: Theme = theme): Record<string, string> {
  return Object.fromEntries(Object.entries(t).map(([k, v]) => [`--${kebab(k)}`, v]));
}
