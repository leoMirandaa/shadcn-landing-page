import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is the Rent-to-Purchase ratio?",
    answer:
      "Rent-to-Purchase ratio is (estimated monthly rent ÷ listing price). The larger the ratio, the higher cash flow potential, because you can charge more rental income relative to the cost to purchase the property.",
    value: "item-1",
  },
  {
    question: "What properties and neighborhoods are supported?",
    answer:
      "We support analyzing properties that are listed on Zillow. As long as the area you want to analyze has property results on a Zillow map, we can analyze those properties and that map area for you.",
    value: "item-2",
  },
  {
    question: "Where does the data come from?",
    answer:
      "All of the data is pulled directly from Zillow.com including but not limited to the listing price, zestimate, and rental estimate.",
    value: "item-3",
  },
  {
    question: "This is not financial advice. Do you own due diligence.",
    answer:
      "We do not guarantee that you will find a great deal. We provide a set of metrics and tools to find the best deals on the market but you must do you own due diligence to ensure the data and estimates are correct. The estimates are not financial advice. Do you own due diligence.",
    value: "item-4",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
