import type { ReactNode } from "react";
import Script from "next/script";
import { Heebo, Inter } from "next/font/google";
import type { Lang } from "../_content/content";
import "../landing.css";

const heebo = Heebo({ subsets: ["hebrew", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-heebo", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter", display: "swap" });

/** The <html> shell shared by the Hebrew (/) and English (/en/) root layouts. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} dir={lang === "he" ? "rtl" : "ltr"} className={`${heebo.variable} ${inter.variable}`}>
      <body>
        {children}
        {/* Umami analytics (self-hosted), same site id the previous landing used. */}
        <Script
          src="https://landing-umami.vercel.app/script.js"
          data-website-id="cc7b19db-5873-46cd-9c0a-66bc9de64e56"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
