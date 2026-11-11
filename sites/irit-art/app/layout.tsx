import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import { theme, themeVars } from "@/lib/theme";
import "./globals.css";

const heebo = Heebo({ subsets: ["hebrew", "latin"], weight: ["300", "400", "500", "700"], variable: "--font-body", display: "swap" });
const frank = Frank_Ruhl_Libre({ subsets: ["hebrew", "latin"], weight: ["300", "400", "500", "700"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "אירית אברהמוב | פשר החלומות בציור",
  description: "גלריית ציורים של אירית אברהמוב — חלומות שהופכים לצבע.",
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = { themeColor: theme.bg };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frank.variable}`} style={themeVars() as CSSProperties}>
      <body>{children}</body>
    </html>
  );
}
