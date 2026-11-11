import type { Metadata } from "next";
import { CONTENT, SITE_URL, type Lang } from "./content";

const PATH: Record<Lang, string> = { he: "/", en: "/en/" };

export function pageMetadata(lang: Lang): Metadata {
  const { title, description } = CONTENT[lang].meta;
  const url = SITE_URL + PATH[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: { icon: "/landing-assets/icon.png" },
    alternates: {
      canonical: url,
      languages: { he: SITE_URL + PATH.he, en: SITE_URL + PATH.en, "x-default": SITE_URL + PATH.he },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Ansora",
      title,
      description,
      locale: lang === "he" ? "he_IL" : "en_US",
      images: [{ url: "/landing-assets/workshop.png" }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
