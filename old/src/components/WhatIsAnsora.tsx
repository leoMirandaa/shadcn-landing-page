import { Reveal, RevealGroup, SectionHeading } from "./Reveal";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const CARDS: {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  icon: JSX.Element;
}[] = [
  {
    titleKey: "what.card1_title",
    bodyKey: "what.card1_body",
    icon: (
      <>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </>
    ),
  },
  {
    titleKey: "what.card2_title",
    bodyKey: "what.card2_body",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
  },
  {
    titleKey: "what.card3_title",
    bodyKey: "what.card3_body",
    icon: (
      <>
        <path d="M12 19 7 22l1-6-4-4 6-1 2-5 2 5 6 1-4 4 1 6z" />
      </>
    ),
  },
];

export const WhatIsAnsora = () => {
  const { t } = useI18n();

  return (
    <section id="what" className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow={t("what.eyebrow")} title={t("what.title")} />

        <Reveal variant="up" delay={200}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            {t("what.body")}
          </p>
        </Reveal>

        <RevealGroup stagger={120} className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map(({ titleKey, bodyKey, icon }, i) => (
            <article
              key={titleKey}
              data-reveal
              className="reveal reveal-up lift card-premium group relative overflow-hidden p-7"
            >
              {/* Number watermark, drifting in from the far edge on hover. */}
              <span
                className="pointer-events-none absolute -top-4 end-3 text-7xl font-black text-primary/[0.07] transition-transform duration-500 group-hover:translate-y-1"
                aria-hidden="true"
              >
                {i + 1}
              </span>

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon}
                </svg>
              </span>

              <h3 className="mt-5 text-xl font-semibold tracking-tight">{t(titleKey)}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{t(bodyKey)}</p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
