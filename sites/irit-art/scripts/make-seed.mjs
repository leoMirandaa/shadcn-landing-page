// Generates the placeholder "dream" paintings in public/seed/ (replaced by real artwork via /manage).
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "..", "public", "seed");
fs.mkdirSync(out, { recursive: true });

const sets = [
  { w: 800, h: 1000, a: "#2a1450", b: "#e0559a", c: "#f2c94c", shape: "moon" },
  { w: 1000, h: 800, a: "#10294f", b: "#4fc3d9", c: "#8e5bd6", shape: "waves" },
  { w: 800, h: 800, a: "#3a1650", b: "#e0559a", c: "#e3b25c", shape: "lotus" },
  { w: 800, h: 1100, a: "#241047", b: "#f2c94c", c: "#e0559a", shape: "cloud" },
  { w: 1100, h: 800, a: "#4a2160", b: "#f59e6b", c: "#4fc3d9", shape: "sunrise" },
  { w: 800, h: 900, a: "#1a1b4b", b: "#8e5bd6", c: "#4fc3d9", shape: "world" },
];

function art({ w, h, a, b, c, shape }, n) {
  const cx = w / 2, cy = h / 2, m = Math.min(w, h);
  let s = "";
  if (shape === "moon") s = `<circle cx="${cx}" cy="${h * .36}" r="${m * .2}" fill="${c}" filter="url(#g)"/><circle cx="${cx + m * .07}" cy="${h * .34}" r="${m * .19}" fill="${a}"/><path d="M0 ${h * .78} Q${w * .3} ${h * .66} ${w * .55} ${h * .78} T${w} ${h * .74} V${h} H0Z" fill="${b}" opacity=".55"/>`;
  if (shape === "waves") for (let i = 0; i < 5; i++) s += `<path d="M0 ${h * (.4 + i * .11)} Q${w * .25} ${h * (.3 + i * .11)} ${w * .5} ${h * (.4 + i * .11)} T${w} ${h * (.4 + i * .11)} V${h} H0Z" fill="${i % 2 ? c : b}" opacity=".35"/>`;
  if (shape === "lotus") for (let i = 0; i < 8; i++) s += `<ellipse cx="${cx}" cy="${cy - m * .16}" rx="${m * .08}" ry="${m * .26}" fill="${i % 2 ? b : c}" opacity=".55" transform="rotate(${i * 45} ${cx} ${cy})"/>`;
  if (shape === "cloud") s = `<g fill="${b}" opacity=".7" filter="url(#g)"><circle cx="${w * .35}" cy="${h * .45}" r="${m * .17}"/><circle cx="${w * .55}" cy="${h * .4}" r="${m * .22}"/><circle cx="${w * .72}" cy="${h * .48}" r="${m * .15}"/></g><circle cx="${w * .5}" cy="${h * .78}" r="${m * .09}" fill="${c}"/>`;
  if (shape === "sunrise") s = `<circle cx="${cx}" cy="${h * .66}" r="${m * .3}" fill="${b}" filter="url(#g)"/><rect y="${h * .66}" width="${w}" height="${h * .34}" fill="${a}" opacity=".85"/><path d="M0 ${h * .72} Q${w * .5} ${h * .62} ${w} ${h * .72}" stroke="${c}" stroke-width="6" fill="none" opacity=".8"/>`;
  if (shape === "world") s = `<circle cx="${cx}" cy="${cy}" r="${m * .3}" fill="${b}" filter="url(#g)"/><circle cx="${cx}" cy="${cy}" r="${m * .3}" fill="none" stroke="${c}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${m * .4}" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="4 10"/>`;
  let stars = "";
  for (let i = 0; i < 40; i++) stars += `<circle cx="${((i * 97 + n * 53) % 100) * w / 100}" cy="${((i * 61 + n * 29) % 100) * h / 100}" r="${1 + (i % 3)}" fill="#fff" opacity="${.3 + (i % 5) * .13}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="#150a24"/></linearGradient><filter id="g"><feGaussianBlur stdDeviation="${m * .018}"/></filter></defs><rect width="${w}" height="${h}" fill="url(#bg)"/>${stars}${s}</svg>`;
}

sets.forEach((s, i) => fs.writeFileSync(path.join(out, `dream-${i + 1}.svg`), art(s, i + 1)));
console.log("wrote", sets.length, "seed images");
