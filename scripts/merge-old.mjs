// Copies the previous Vite site's build (old/dist, built with base=/old/) into
// the Next.js static export, so it is served at ansora.io/old (+ /old/en/).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const from = path.join(root, "old", "dist");
const to = path.join(root, "out", "old");

if (!fs.existsSync(path.join(from, "index.html"))) {
  throw new Error("merge-old: old/dist is missing — run `npm run build:old` first");
}
fs.rmSync(to, { recursive: true, force: true });
fs.cpSync(from, to, { recursive: true });
console.log("merged old/dist -> out/old");
