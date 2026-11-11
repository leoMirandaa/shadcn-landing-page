// Turns the client build into one fully rendered HTML file per language:
// dist/index.html (Hebrew) and dist/en/index.html (English). Run by `npm run
// build` after the client build (dist/) and the SSR build (dist-ssr/).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, head, LANGS } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const replaceOnce = (html, pattern, replacement, what) => {
  if (!pattern.test(html)) throw new Error(`prerender: ${what} not found in dist/index.html`);
  return html.replace(pattern, () => replacement);
};

for (const lang of LANGS) {
  let html = template;
  html = replaceOnce(
    html,
    /<html[^>]*>/,
    `<html lang="${lang}" dir="${lang === "he" ? "rtl" : "ltr"}">`,
    "<html> tag",
  );
  html = replaceOnce(html, /<!--seo-->[\s\S]*?<!--\/seo-->/, head(lang), "seo markers");
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(lang)}</div>`, "#root");

  const outDir = lang === "he" ? dist : path.join(dist, lang);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${path.relative(root, path.join(outDir, "index.html"))}`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
