import React from "react";
import App from "./App";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider, type Lang } from "@/lib/i18n";

/** The one tree both the browser (main.tsx) and the prerender (entry-server.tsx) render. */
export const Root = ({ lang }: { lang: Lang }) => (
  <React.StrictMode>
    <LangProvider lang={lang}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LangProvider>
  </React.StrictMode>
);
