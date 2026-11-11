/**
 * Design tokens for the whole site. Change the purple here (or pass a different
 * object) and every surface, glow and gradient re-derives from it — the CSS only
 * ever reads these as custom properties (see app/layout.tsx).
 *
 * `bg` is sampled from the artist's logo background.
 */
export const theme = {
  bg: "#361d46", // base purple — keep in sync with the logo
  bgDeep: "#1f0f2c", // darkest edge of the vignette
  bgLift: "#5a2f74", // lighter dream-haze
  text: "#f7effc",
  muted: "#cdb8dd",
  gold: "#e3b25c", // the hamsa's gold
  glowA: "#e0559a", // pink splash
  glowB: "#4fc3d9", // teal splash
  glowC: "#f2c94c", // yellow splash
  glowD: "#8e5bd6", // violet
} as const;

export type Theme = typeof theme;

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());

export function themeVars(t: Theme = theme): Record<string, string> {
  return Object.fromEntries(Object.entries(t).map(([k, v]) => [`--${kebab(k)}`, v]));
}
