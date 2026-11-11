import type { TranslationKey } from "./i18n";

/**
 * The two plans, defined once and rendered by both the pricing section and
 * the sticky CTA's plan sheet — so the two can never drift apart.
 *
 * NOTE FOR WHOEVER WIRES THIS UP: `id` is appended to the registration link as
 * ?plan=<id>. frontend/app/register/sb/page.tsx does not read that parameter
 * today, so the visitor's choice is currently only an attribution signal — it
 * does not pre-select anything on the form. Prices are placeholders pending a
 * real small-business price list; frontend/app/register/pricing/page.tsx
 * carries a different set (Free/Pro/Legend at $0/$29/$79) belonging to the
 * market-intelligence product, which is a separate funnel from this one.
 */
export interface Plan {
  id: "growth" | "pro";
  nameKey: TranslationKey;
  descKey: TranslationKey;
  ctaKey: TranslationKey;
  /** Monthly price in ILS. `null` renders as "talk to us" rather than a number. */
  monthly: number | null;
  /** Per-month price when paying for a year up front. */
  annualMonthly: number | null;
  featureKeys: TranslationKey[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "growth",
    nameKey: "plan.growth_name",
    descKey: "plan.growth_desc",
    ctaKey: "plan.growth_cta",
    monthly: 179,
    annualMonthly: 149,
    popular: true,
    featureKeys: [
      "plan.growth_f1",
      "plan.growth_f2",
      "plan.growth_f3",
      "plan.growth_f4",
      "plan.growth_f5",
      "plan.growth_f6",
      "plan.growth_f7",
    ],
  },
  {
    id: "pro",
    nameKey: "plan.pro_name",
    descKey: "plan.pro_desc",
    ctaKey: "plan.pro_cta",
    monthly: 199,
    annualMonthly: 166,
    featureKeys: [
      "plan.pro_f1",
      "plan.pro_f2",
      "plan.pro_f3",
    ],
  },
];

/**
 * Formats a plan price for display.
 *
 * The shekel sign is emitted through Intl rather than hard-coded, because in
 * Hebrew "₪199" and "199 ₪" are both wrong in the wrong context and Intl knows
 * which side the locale puts it on. maximumFractionDigits is 0 — these are
 * whole-shekel prices and "₪199.00" reads like a billing statement.
 */
export function formatPrice(amount: number, lang: "en" | "he"): string {
  return new Intl.NumberFormat(lang === "he" ? "he-IL" : "en-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
}
