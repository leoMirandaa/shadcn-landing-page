import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { AnsoraMark } from "./BrandIcons";
import { PLANS, formatPrice } from "@/lib/plans";
import { registerUrl, useI18n } from "@/lib/i18n";
import { useScrolledPast } from "@/lib/motion";

/**
 * Persistent registration CTA: a bar pinned to the bottom of the viewport that
 * opens a sheet with the three plans.
 *
 * Bottom rather than a floating corner button because on a phone that is where
 * a thumb already is, and because the bar can carry a line of copy next to the
 * button instead of being a bare circle whose purpose you have to guess.
 *
 * It stays hidden until the visitor is past the hero — the hero has its own
 * large CTA directly above, and stacking a second one over it just covers the
 * product shot before anyone has a reason to convert.
 */
export const StickyCta = () => {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const visible = useScrolledPast(560);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Escape closes, and focus goes back to the button that opened it —
  // otherwise a keyboard user lands back at the top of the document.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (sheetRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Move initial focus to the first plan. Querying "a, button" instead landed
  // on the sheet's own close button, which is first in DOM order — technically
  // inside the sheet, but it hands someone who just asked to see the plans a
  // control that dismisses them.
  useEffect(() => {
    if (open) sheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [open]);

  return (
    <>
      {/* Scrim. Only rendered as a visual layer — the outside-click handler
          above does the dismissing, so this can stay pointer-transparent and
          never intercept a scroll on the page behind it. */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-swift ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="container pb-3 sm:pb-4">
          {/* ── Plan sheet ─────────────────────────────────────────────── */}
          <div
            ref={sheetRef}
            id="sticky-plans"
            role="dialog"
            aria-modal="false"
            aria-label={t("sticky.pick")}
            // `invisible` when collapsed is what keeps the plan links out of
            // the tab order; visibility is animatable, so the sheet still
            // fades rather than vanishing.
            className={`mx-auto mb-2.5 max-w-4xl origin-bottom overflow-hidden rounded-3xl border border-border/70 bg-card/95 shadow-[0_-16px_60px_-24px_rgba(2,6,23,0.5)] backdrop-blur-xl transition-all duration-300 ease-swift ${
              open
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "invisible pointer-events-none translate-y-4 scale-95 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
              <span className="text-sm font-bold">{t("sticky.pick")}</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label={t("sticky.close")}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {PLANS.map((plan, i) => (
                <a
                  key={plan.id}
                  href={registerUrl(plan.id)}
                  style={{ transitionDelay: open ? `${80 + i * 70}ms` : "0ms" }}
                  className={`group relative flex flex-col rounded-2xl border p-4 transition-all duration-400 hover:-translate-y-1 ${
                    plan.popular
                      ? "border-primary/50 bg-primary/[0.06]"
                      : "border-border/70 bg-background/60 hover:border-primary/40"
                  } ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 end-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      {t("pricing.popular")}
                    </span>
                  )}

                  <span className="text-sm font-bold">{t(plan.nameKey)}</span>

                  <span className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-xl font-bold tracking-tight sm:text-2xl">
                      {plan.monthly === null
                        ? t("pricing.custom")
                        : formatPrice(plan.monthly, lang)}
                    </span>
                    {!!plan.monthly && (
                      <span className="text-xs text-muted-foreground">
                        {t("pricing.per_month")}
                      </span>
                    )}
                  </span>

                  <span className="mt-2 text-xs leading-snug text-muted-foreground">
                    {t(plan.descKey)}
                  </span>

                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t(plan.ctaKey)}
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── The bar ────────────────────────────────────────────────── */}
          <div className="pointer-events-auto mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-border/70 bg-card/95 p-2.5 shadow-[0_-8px_40px_-16px_rgba(2,6,23,0.4)] backdrop-blur-xl sm:gap-4 sm:p-3">
            <AnsoraMark className="ms-1.5 hidden h-8 w-8 shrink-0 text-primary sm:block" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold sm:text-base">{t("sticky.headline")}</p>
              <p className="truncate text-xs text-muted-foreground">{t("sticky.sub")}</p>
            </div>

            <Button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="sticky-plans"
              size="lg"
              className="h-11 shrink-0 rounded-xl px-5 font-semibold shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              {t("sticky.cta")}
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
