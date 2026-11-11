import { Button } from "./ui/button";
import { HeroShowcase } from "./HeroShowcase";
import { CHANNELS, WhatsAppIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

const PROOF_KEYS = ["hero.proof_1", "hero.proof_2", "hero.proof_3"] as const;

export const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden pt-12 pb-28 md:pt-20 md:pb-36">
      <div className="container grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="text-center lg:text-start">
          <Reveal variant="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-1.5 text-sm font-semibold text-[#0d8a45] dark:text-whatsapp">
              <WhatsAppIcon className="h-4 w-4" />
              {t("hero.eyebrow")}
            </span>
          </Reveal>

          <Reveal variant="up" delay={90}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {t("hero.title_line1")}{" "}
              <span className="text-gradient">{t("hero.title_highlight")}</span>{" "}
              <span className="mt-2 block text-3xl font-semibold text-muted-foreground sm:text-4xl lg:text-[2.4rem]">
                {t("hero.title_line2")}
              </span>
            </h1>
          </Reveal>

          <Reveal variant="up" delay={180}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              {t("hero.subtitle")}
            </p>
          </Reveal>

          <Reveal variant="up" delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-xl px-7 text-base font-semibold shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
              >
                <a href="#pricing">
                  {t("hero.cta_primary")}
                  {/* Points along the reading direction: flipped in RTL. */}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-border bg-card/70 px-7 text-base font-semibold backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                <a href="#how">{t("hero.cta_secondary")}</a>
              </Button>
            </div>
          </Reveal>

          <Reveal variant="up" delay={340}>
            <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
              {PROOF_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t(key)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Product shot ─────────────────────────────────────────────── */}
        <Reveal variant="scale" delay={200} className="lg:pb-16">
          <HeroShowcase />
        </Reveal>
      </div>

      {/* ── Channel strip ────────────────────────────────────────────────
          Duplicated once and translated -50%, which is what makes the loop
          seamless; the copy is aria-hidden so it isn't announced twice. */}
      <Reveal variant="up" delay={120} className="mt-24 md:mt-32">
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t("hero.channels_label")}
          </p>
        </div>
        <div className="marquee-mask mt-6 overflow-hidden">
          <div className="marquee-track flex w-max gap-12 px-6" dir="ltr">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-12"
                aria-hidden={copy === 1 || undefined}
              >
                {CHANNELS.map(({ key, label, Icon }) => (
                  <span
                    key={key}
                    className="flex items-center gap-2.5 text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-base font-semibold">{label}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
