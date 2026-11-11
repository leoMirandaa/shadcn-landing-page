import { LANG_PATH, rememberLang, useI18n, type Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string; aria: string }[] = [
  // Each label is written in its own language: someone who can only read
  // Hebrew still recognises "עב", and "EN" is legible to everyone.
  { value: "he", label: "עב", aria: "עברית" },
  { value: "en", label: "EN", aria: "English" },
];

export const LanguageSelector = () => {
  const { lang, t } = useI18n();
  const index = OPTIONS.findIndex((o) => o.value === lang);

  return (
    <div
      className="relative inline-flex items-center rounded-full border border-border bg-card/70 p-0.5 backdrop-blur"
      role="group"
      aria-label={t("nav.language")}
    >
      {/* Sliding pill behind the labels. .pill-indicator negates its own travel
          in RTL, so the buttons can stay in reading order. */}
      <span
        className="pill-indicator absolute inset-y-0.5 start-0.5 w-9 rounded-full bg-primary shadow-sm"
        style={{ "--pill-i": index } as React.CSSProperties}
        aria-hidden="true"
      />
      {/* Real links rather than buttons: each language is its own page, and
          crawlers find the other version by following this. */}
      {OPTIONS.map(({ value, label, aria }) => (
        <a
          key={value}
          href={LANG_PATH[value]}
          hrefLang={value}
          lang={value}
          onClick={() => rememberLang(value)}
          aria-label={aria}
          aria-current={lang === value ? "page" : undefined}
          className={`relative z-10 w-9 rounded-full py-1 text-center text-xs font-bold transition-colors ${
            lang === value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </a>
      ))}
    </div>
  );
};

export type { Lang as Language };
