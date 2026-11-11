"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "../_content/content";

const LAUNCH_ID = "launch";

/** Sticky top bar: logo, a tab per page section (highlighted while that section
    is on screen), the language switch and the launch-offer tab. */
export function NavTabs({ nav, arrow, lang }: { nav: Content["nav"]; arrow: string; lang: "he" | "en" }) {
  const [active, setActive] = useState<string | null>(null);
  const strip = useRef<HTMLDivElement>(null);

  // Scroll-spy: the active section is the one crossing the middle band of the viewport.
  useEffect(() => {
    const ids = [...nav.tabs.map((t) => t.id), LAUNCH_ID];
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    // Above the first section (the hero), nothing is active.
    const hero = document.querySelector(".lp-hero");
    const heroObserver = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [nav.tabs]);

  // On narrow screens the tabs are a horizontal strip: keep the active one in view.
  // Scrolls only the strip itself, never the page.
  useEffect(() => {
    const el = strip.current;
    if (!el || !active || el.scrollWidth <= el.clientWidth) return;
    const tab = el.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!tab) return;
    const t = tab.getBoundingClientRect();
    const s = el.getBoundingClientRect();
    el.scrollBy({ left: t.left + t.width / 2 - (s.left + s.width / 2), behavior: "smooth" });
  }, [active]);

  const current = (id: string) => (active === id ? ("location" as const) : undefined);

  return (
    <header className="lp-header">
      <div className="lp-wrap lp-nav">
        <a href="#top" dir="ltr" className="lp-logo" aria-label="Ansora">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/landing-assets/logo.png" alt="" className="lp-logo-mark" />
          <span>Ansora</span>
        </a>
        <nav className="lp-tabs" ref={strip} aria-label={lang === "he" ? "ניווט ראשי" : "Main"}>
          {nav.tabs.map((t) => (
            <a key={t.id} href={`#${t.id}`} aria-current={current(t.id)}>
              {t.label}
            </a>
          ))}
        </nav>
        <div className="lp-nav-end">
          <a href={nav.otherHref} hrefLang={lang === "he" ? "en" : "he"} className="lp-lang">
            {nav.other}
          </a>
          <a href={`#${LAUNCH_ID}`} className="lp-nav-cta" aria-current={current(LAUNCH_ID)}>
            {nav.launch} <span aria-hidden="true">{arrow}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
