import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { RevealGroup, SectionHeading } from "./Reveal";
import { useI18n } from "@/lib/i18n";
import { FAQ_ITEMS } from "@/lib/faq";

export const FAQ = () => {
  const { t } = useI18n();

  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />

        <RevealGroup stagger={70} className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map(({ q, a }) => (
              <AccordionItem
                key={q}
                value={q}
                data-reveal
                className="reveal reveal-up overflow-hidden rounded-2xl border border-border/70 bg-card/70 px-5 backdrop-blur transition-colors data-[state=open]:border-primary/40"
              >
                {/* text-start, not text-left: the trigger's label has to hug
                    the reading edge in both directions. */}
                <AccordionTrigger className="py-5 text-start text-base font-semibold hover:no-underline">
                  {t(q)}
                </AccordionTrigger>
                {/* forceMount keeps closed answers in the HTML (hidden via
                    CSS) so crawlers index them; unmounted, they don't exist. */}
                <AccordionContent
                  forceMount
                  className="pb-5 text-[15px] leading-relaxed text-muted-foreground"
                >
                  {t(a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealGroup>
      </div>
    </section>
  );
};
