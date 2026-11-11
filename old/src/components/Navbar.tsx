import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AnsoraMark } from "./BrandIcons";
import { LanguageSelector } from "./LanguageSelector";
import { ModeToggle } from "./mode-toggle";
import { LOGIN_URL, useI18n, type TranslationKey } from "@/lib/i18n";
import { useScrollProgress, useScrolledPast } from "@/lib/motion";

const LINKS: { href: string; key: TranslationKey }[] = [
  { href: "#what", key: "nav.what" },
  { href: "#how", key: "nav.how" },
  { href: "#features", key: "nav.features" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#faq", key: "nav.faq" },
];

export const Navbar = () => {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(40);
  const progress = useScrollProgress();

  // A menu left open across a resize into the desktop layout stays mounted but
  // invisible, trapping focus in links nobody can see.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "glass-strong shadow-[0_4px_24px_-12px_rgba(2,6,23,0.25)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container flex h-16 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5 font-bold" aria-label="Ansora">
            <AnsoraMark className="h-7 w-7 text-primary transition-transform duration-500 hover:rotate-[20deg]" />
            <span className="text-xl tracking-tight">Ansora</span>
          </a>

          {/* Desktop links. The underline grows from the reading-start edge. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map(({ href, key }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(key)}
                  <span className="absolute inset-x-3 bottom-1 h-0.5 origin-[left] scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 rtl:origin-[right]" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ModeToggle />

            <Button asChild variant="ghost" className="hidden text-sm font-medium sm:inline-flex">
              <a href={LOGIN_URL}>{t("nav.login")}</a>
            </Button>

            <Button
              asChild
              className="hidden rounded-xl px-5 font-semibold shadow-md shadow-primary/20 transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <a href="#pricing">{t("nav.register")}</a>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={t("nav.menu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 lg:hidden"
            >
              {/* The two bars cross into an X when open. */}
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute inset-x-0 h-0.5 rounded bg-foreground transition-all duration-300 ${
                    menuOpen ? "top-1/2 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-0.5 rounded bg-foreground transition-all duration-300 ${
                    menuOpen ? "top-1/2 -rotate-45" : "bottom-0.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Reading progress. scaleX is transform-only, so it can animate every
            frame without triggering layout. */}
        <div className="h-0.5 w-full bg-transparent">
          <div
            className="scroll-progress h-full bg-gradient-to-r from-primary to-brand-soft"
            style={{ transform: `scaleX(${progress})` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Mobile drawer — grid-template-rows animates to a height the content
          decides, which a max-height guess can't do without clipping. */}
      <div
        id="mobile-menu"
        className={`glass-strong grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 lg:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <ul className="container flex flex-col gap-1 py-4">
            {LINKS.map(({ href, key }, i) => (
              <li
                key={href}
                style={{ transitionDelay: menuOpen ? `${i * 45}ms` : "0ms" }}
                className={`transition-all duration-300 ${
                  menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {t(key)}
                </a>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <Button asChild variant="outline" className="flex-1 rounded-xl">
                <a href={LOGIN_URL}>{t("nav.login")}</a>
              </Button>
              <Button asChild className="flex-1 rounded-xl font-semibold">
                <a href="#pricing">{t("nav.register")}</a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
