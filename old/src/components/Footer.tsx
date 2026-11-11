import { AnsoraMark, CHANNELS } from "./BrandIcons";
import { LOGIN_URL, REGISTER_URL, useI18n, type TranslationKey } from "@/lib/i18n";

const PRODUCT_LINKS: { href: string; key: TranslationKey }[] = [
  { href: "#what", key: "nav.what" },
  { href: "#how", key: "nav.how" },
  { href: "#features", key: "nav.features" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#faq", key: "nav.faq" },
];

export const Footer = () => {
  const { t } = useI18n();

  return (
    // pb clears the sticky CTA bar, which otherwise covers the bottom row.
    <footer className="border-t border-border/60 bg-card/50 pb-28 pt-16 backdrop-blur sm:pb-32">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="inline-flex items-center gap-2.5 font-bold">
              <AnsoraMark className="h-7 w-7 text-primary" />
              <span className="text-xl tracking-tight">Ansora</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {CHANNELS.map(({ key, label, Icon }) => (
                <li key={key}>
                  <span
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav>
            <h3 className="text-sm font-bold tracking-tight">{t("footer.product")}</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h3 className="text-sm font-bold tracking-tight">{t("footer.company")}</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={REGISTER_URL}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("nav.register")}
                </a>
              </li>
              <li>
                <a
                  href={LOGIN_URL}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("nav.login")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.app.ansora.io/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@ansora.io"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ansora. {t("footer.rights")}
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            {t("footer.back_to_top")}
          </a>
        </div>
      </div>
    </footer>
  );
};
