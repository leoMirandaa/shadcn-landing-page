import { useState } from "react";
import { Button } from "./ui/button";
import { Reveal, RevealGroup, SectionHeading } from "./Reveal";
import { PLANS, formatPrice } from "@/lib/plans";
import { registerUrl, useI18n } from "@/lib/i18n";

export const Pricing = () => {
  const { t, lang } = useI18n();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow={t("pricing.eyebrow")}
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
        />

        {/* ── Monthly / annual switch ───────────────────────────────────── */}
        <Reveal variant="up" delay={200}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <div
              className="relative inline-flex items-center rounded-full border border-border bg-card/70 p-1 backdrop-blur"
              role="group"
            >
              {/* .pill-indicator negates its travel in RTL, so the buttons keep
                  their natural reading order instead of being pinned to LTR. */}
              <span
                className="pill-indicator absolute inset-y-1 start-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-sm"
                style={{ "--pill-i": annual ? 1 : 0 } as React.CSSProperties}
                aria-hidden="true"
              />
              {([false, true] as const).map((isAnnual) => (
                <button
                  key={String(isAnnual)}
                  type="button"
                  onClick={() => setAnnual(isAnnual)}
                  aria-pressed={annual === isAnnual}
                  className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                    annual === isAnnual
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(isAnnual ? "pricing.annual" : "pricing.monthly")}
                </button>
              ))}
            </div>

            <span
              className={`text-sm font-semibold text-whatsapp transition-all duration-300 ${
                annual ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
            >
              {t("pricing.save")}
            </span>
          </div>
        </Reveal>

        {/* ── Plan cards ────────────────────────────────────────────────── */}
        <RevealGroup stagger={110} className="mt-12 grid items-start gap-6 mx-auto max-w-3xl lg:grid-cols-2">
          {PLANS.map((plan) => {
            const price = annual ? plan.annualMonthly : plan.monthly;

            return (
              <article
                key={plan.id}
                data-reveal
                className={`reveal reveal-up lift relative flex h-full flex-col rounded-[28px] border p-7 backdrop-blur transition-colors ${
                  plan.popular
                    ? "border-primary/50 bg-card shadow-[0_24px_60px_-28px_hsl(var(--primary)/0.6)] lg:-mt-4 lg:pb-10"
                    : "border-border/70 bg-card/70"
                }`}
              >
                {plan.popular && (
                  <>
                    {/* Sits on the border, centred, in both directions. */}
                    <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-primary-foreground shadow-md rtl:translate-x-1/2">
                      {t("pricing.popular")}
                    </span>
                    <span
                      className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-b from-primary/[0.08] to-transparent"
                      aria-hidden="true"
                    />
                  </>
                )}

                <h3 className="text-lg font-bold tracking-tight">{t(plan.nameKey)}</h3>
                <p className="mt-1.5 min-h-[2.75rem] text-sm leading-snug text-muted-foreground">
                  {t(plan.descKey)}
                </p>

                <div className="mt-5 flex min-h-[3.5rem] items-baseline gap-2">
                  {price === null ? (
                    <span className="text-3xl font-bold tracking-tight">
                      {t("pricing.custom")}
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight">
                        {formatPrice(price, lang)}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {t("pricing.per_month")}
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-1 min-h-[1.25rem] text-xs text-muted-foreground">
                  {annual && price ? t("pricing.billed_annually") : ""}
                </p>

                <Button
                  asChild
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  className="mt-6 h-11 w-full rounded-xl font-semibold transition-transform hover:-translate-y-0.5"
                >
                  <a href={registerUrl(plan.id)}>{t(plan.ctaKey)}</a>
                </Button>

                <ul className="mt-7 space-y-3 border-t border-border/60 pt-6">
                  {plan.featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
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
                      <span className="leading-snug">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </RevealGroup>

        <Reveal variant="up" delay={120}>
          <p className="mt-8 text-center text-sm font-medium text-muted-foreground">{t("pricing.vat_note")}</p>
        </Reveal>
      </div>
    </section>
  );
};
