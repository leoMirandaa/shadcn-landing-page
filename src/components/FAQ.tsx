import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is Wolf free?",
    answer: "Yes. Wolf's services are free. Simply send a WhatsApp message or voice note and Wolf will do the rest.",
    value: "item-1",
  },
  {
    question:
      "Where does Wolf operate?",
    answer:
      "Wolf is multi-lingual and has the ability to process reports around the world. Wolf is however most powerful where community engagement is highest.",
    value: "item-3",
  },
  {
    question: "Who started Wolf?",
    answer: "Wolf was built by South African's who want to leverage the power of artificial intelligence to aid in crime prevention. Wolf is on a mission to bring together the power of community vigilance and armed response teams to reduce criminal activity.",
    value: "item-4",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <Card className="shadow-xl">
        <CardContent className="px-6 py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions 🐺
          </h2>

          {/* Using the Accordion component from shadcn/ui */}
          <Accordion type="single" collapsible className="w-full">
            {FAQList.map(({ question, answer, value }: FAQProps) => (
              <AccordionItem key={value} value={value} className="border-b">
                <AccordionTrigger className="py-4 px-6">{question}</AccordionTrigger>
                <AccordionContent className="py-4 px-6">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </section>
  );
};
