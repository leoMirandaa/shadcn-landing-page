import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./BrandIcons";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const POINTS: TranslationKey[] = [
  "anywhere.point1",
  "anywhere.point2",
  "anywhere.point3",
  "anywhere.point4",
];

/**
 * The "phone and computer" half of the pitch: the same two screenshots as the
 * hero, but shown at full size and side by side so a visitor can actually read
 * the interface — the hero shot is a scene, this one is the evidence.
 */
export const Anywhere = () => {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div>
          <Reveal variant="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {t("anywhere.eyebrow")}
            </span>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.6rem]">
              {t("anywhere.title")}
            </h2>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("anywhere.body")}
            </p>
          </Reveal>

          <Reveal variant="up" delay={220}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {POINTS.map((key, i) => (
                <li
                  key={key}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/60 p-3.5 backdrop-blur transition-colors hover:border-primary/40"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.12] text-primary">
                    {i === 0 ? (
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                    ) : (
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium leading-snug">{t(key)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Devices ──────────────────────────────────────────────────── */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 animate-aurora rounded-full bg-[radial-gradient(circle_at_60%_40%,hsl(var(--primary)/0.3),transparent_65%)] blur-3xl"
            aria-hidden="true"
          />

          <Reveal variant="end" delay={100}>
            <figure className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_30px_70px_-35px_rgba(2,6,23,0.55)]">
              <img
                src={`${import.meta.env.BASE_URL}desktop.png`}
                alt={t("anywhere.caption_desktop")}
                width={1616}
                height={801}
                loading="lazy"
                className="block w-full"
              />
              <figcaption className="border-t border-border/60 px-4 py-2.5 text-xs font-medium text-muted-foreground">
                {t("anywhere.caption_desktop")}
              </figcaption>
            </figure>
          </Reveal>

          {/* Phone overlapping the desktop panel. Below sm it drops out of the
              overlap and sits inline underneath, where it stays readable. */}
          <Reveal
            variant="up"
            delay={280}
            className="mx-auto mt-6 w-40 sm:absolute sm:-bottom-12 sm:start-[-2rem] sm:mt-0 sm:w-44"
          >
            <figure className="animate-float overflow-hidden rounded-[1.6rem] border-[6px] border-slate-900 bg-slate-900 shadow-[0_26px_56px_-24px_rgba(2,6,23,0.7)] dark:border-slate-700">
              <img
                src={`${import.meta.env.BASE_URL}mobile.png`}
                alt={t("anywhere.caption_mobile")}
                width={492}
                height={737}
                loading="lazy"
                className="block w-full"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
