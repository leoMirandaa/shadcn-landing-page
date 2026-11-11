import { Button } from "./ui/button";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./BrandIcons";
import { useI18n } from "@/lib/i18n";

export const FinalCta = () => {
  const { t } = useI18n();

  return (
    <section className="pb-32 pt-8 md:pb-40">
      <div className="container">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[32px] border border-primary/25 bg-gradient-to-br from-primary/[0.12] via-card/80 to-brand-soft/[0.12] px-6 py-16 text-center backdrop-blur-xl sm:px-12">
            {/* Two drifting glows, offset in time so the wash never looks
                like a single pulsing blob. */}
            <span
              className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 animate-aurora rounded-full bg-primary/25 blur-3xl"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -bottom-28 -right-10 h-72 w-72 animate-aurora rounded-full bg-brand-soft/25 blur-3xl [animation-delay:-9s]"
              aria-hidden="true"
            />

            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-whatsapp/15 text-[#0d8a45] dark:text-whatsapp">
              <WhatsAppIcon className="h-7 w-7" />
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.6rem]">
              {t("final.title")}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("final.body")}
            </p>

            <Button
              asChild
              size="lg"
              className="mt-9 rounded-xl px-9 py-3.5 text-base font-semibold shadow-xl shadow-primary/30 transition-transform hover:-translate-y-1"
            >
              <a href="#pricing">{t("final.cta")}</a>
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">{t("hero.proof_1")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
