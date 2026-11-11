import { renderToString } from "react-dom/server";
import { Root } from "./Root";
import { LANG_PATH, SITE_URL, translate, type Lang } from "@/lib/i18n";
import { FAQ_ITEMS } from "@/lib/faq";

/** Build-time only: scripts/prerender.mjs calls these once per language. */

export const LANGS: Lang[] = ["he", "en"];

export function render(lang: Lang): string {
  return renderToString(<Root lang={lang} />);
}

const OG_LOCALE: Record<Lang, string> = { he: "he_IL", en: "en_US" };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function head(lang: Lang): string {
  const t = (key: Parameters<typeof translate>[1]) => esc(translate(lang, key));
  const url = SITE_URL + LANG_PATH[lang];
  const other: Lang = lang === "he" ? "en" : "he";
  const image = `${SITE_URL}/old/desktop.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/old/#organization`,
        name: "Ansora",
        url: `${SITE_URL}/old/`,
        logo: `${SITE_URL}/old/logo_no_background.png`,
        description: translate(lang, "meta.org_description"),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/old/#website`,
        name: "Ansora",
        url: `${SITE_URL}/old/`,
        inLanguage: ["he", "en"],
        publisher: { "@id": `${SITE_URL}/old/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
          "@type": "Question",
          name: translate(lang, q),
          acceptedAnswer: { "@type": "Answer", text: translate(lang, a) },
        })),
      },
    ],
  };

  return [
    `<title>${t("meta.title")}</title>`,
    `<meta name="description" content="${t("meta.description")}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="he" href="${SITE_URL}${LANG_PATH.he}" />`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL}${LANG_PATH.en}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${LANG_PATH.he}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `<meta property="og:locale:alternate" content="${OG_LOCALE[other]}" />`,
    `<meta property="og:site_name" content="Ansora" />`,
    `<meta property="og:title" content="${t("meta.title")}" />`,
    `<meta property="og:description" content="${t("meta.share_description")}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1616" />`,
    `<meta property="og:image:height" content="801" />`,
    `<meta property="og:image:alt" content="${t("anywhere.caption_desktop")}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t("meta.title")}" />`,
    `<meta name="twitter:description" content="${t("meta.share_description")}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    // "<" escaped so answer text can never close the script tag early.
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n  ");
}
