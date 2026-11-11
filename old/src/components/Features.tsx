import { RevealGroup, SectionHeading } from "./Reveal";
import { useI18n, type TranslationKey } from "@/lib/i18n";

const FEATURES: {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  path: JSX.Element;
}[] = [
  {
    titleKey: "features.f1_title",
    bodyKey: "features.f1_body",
    path: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
      </>
    ),
  },
  {
    titleKey: "features.f2_title",
    bodyKey: "features.f2_body",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
  },
  {
    titleKey: "features.f3_title",
    bodyKey: "features.f3_body",
    path: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </>
    ),
  },
  {
    titleKey: "features.f4_title",
    bodyKey: "features.f4_body",
    path: (
      <>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9h4" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </>
    ),
  },
  {
    titleKey: "features.f5_title",
    bodyKey: "features.f5_body",
    path: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="M9.5 12l1.8 1.8 3.5-3.6" />
      </>
    ),
  },
  {
    titleKey: "features.f6_title",
    bodyKey: "features.f6_body",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
];

export const Features = () => {
  const { t } = useI18n();

  return (
    <section id="features" className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow={t("features.eyebrow")} title={t("features.title")} />

        <RevealGroup stagger={80} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ titleKey, bodyKey, path }) => (
            <article
              key={titleKey}
              data-reveal
              className="reveal reveal-blur lift group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur"
            >
              {/* Brand wash that fades up on hover, behind the content. */}
              <span
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {path}
                </svg>
              </span>

              <h3 className="mt-4 text-lg font-semibold tracking-tight">{t(titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(bodyKey)}</p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
