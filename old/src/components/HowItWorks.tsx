import { Reveal, RevealGroup, SectionHeading } from "./Reveal";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const STEPS: {
  labelKey: TranslationKey;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}[] = [
  { labelKey: "how.step1_label", titleKey: "how.step1_title", bodyKey: "how.step1_body" },
  { labelKey: "how.step2_label", titleKey: "how.step2_title", bodyKey: "how.step2_body" },
  { labelKey: "how.step3_label", titleKey: "how.step3_title", bodyKey: "how.step3_body" },
  { labelKey: "how.step4_label", titleKey: "how.step4_title", bodyKey: "how.step4_body" },
];

export const HowItWorks = () => {
  const { t } = useI18n();

  return (
    <section id="how" className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow={t("how.eyebrow")}
          title={t("how.title")}
          subtitle={t("how.subtitle")}
        />

        <RevealGroup stagger={140} className="relative mt-16 max-w-3xl md:mx-auto">
          {/* Spine connecting the steps. It sits on the reading-start side and
              stops short of the last marker so it doesn't dangle past it. */}
          <span
            className="absolute bottom-16 start-[1.4rem] top-4 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent"
            aria-hidden="true"
          />

          {STEPS.map(({ labelKey, titleKey, bodyKey }, i) => (
            <div
              key={titleKey}
              data-reveal
              className="reveal reveal-start group relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Marker */}
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card font-bold text-primary shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                {i + 1}
                <span
                  className="absolute inset-0 rounded-full border border-primary/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-ring-pulse"
                  aria-hidden="true"
                />
              </span>

              <div className="pt-1">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {t(labelKey)}
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                  {t(titleKey)}
                </h3>
                <p className="mt-2.5 max-w-xl leading-relaxed text-muted-foreground">
                  {t(bodyKey)}
                </p>
              </div>
            </div>
          ))}
        </RevealGroup>

        <Reveal variant="up" delay={120} className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-whatsapp" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-whatsapp" />
              </span>
              {t("hero.badge")}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};
