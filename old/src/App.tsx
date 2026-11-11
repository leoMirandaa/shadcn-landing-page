import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatIsAnsora } from "./components/WhatIsAnsora";
import { HowItWorks } from "./components/HowItWorks";
import { Anywhere } from "./components/Anywhere";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { StickyCta } from "./components/StickyCta";
import { useI18n } from "./lib/i18n";

function App() {
  const { lang, dir, t } = useI18n();

  // The prerendered pages already carry the right <html lang/dir> and title;
  // this only matters under `npm run dev`, where /en/ is served the Hebrew
  // index.html. dir lives on <html> so Tailwind's logical utilities and the
  // [dir="rtl"] rules in index.css all key off one source.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = t("meta.title");
  }, [lang, dir, t]);

  return (
    <>
      {/* WCAG 2.4.1, matching the frontend's own skip link. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:font-semibold focus:text-primary focus:shadow-lg focus:ring-2 focus:ring-primary"
      >
        {t("a11y.skip")}
      </a>

      <div id="top" />
      <Navbar />

      <main id="main">
        <Hero />
        <WhatIsAnsora />
        <HowItWorks />
        <Anywhere />
        <Features />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}

export default App;
