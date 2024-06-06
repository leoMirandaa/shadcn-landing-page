import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingCardProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingCardProps[] = [
  {
    title: "Limited free beta.",
    popular: 1,
    price: 0,
    description: "Limited free beta while the product is under development.",
    buttonText: "Invest now",
    benefitList: [
      "FREE for a limited time",
      "Rent-to-Purchase ratio analysis",
      "Analyze 500+ properties",
      "Zillow integration",
      "1 year unlimited access",
      "product updates",
    ],
  },
  {
    title: "Individual plan - coming soon",
    popular: 0,
    price: 12.5,
    description: "Unlimited analysis for 1 account for 1 year.",
    buttonText: "Coming soon",
    benefitList: [
      "Rent-to-Purchase ratio analysis",
      "Analyze 500+ properties",
      "Zillow integration",
      "1 year unlimited access",
      "product updates",
    ],
  },
];

interface PricingProps {
  activateGoogleScheduling: () => void;
}

export const Pricing = (props: PricingProps) => {
  const { activateGoogleScheduling } = props;
  // Define the grid column setup based on the number of pricing options
  const gridColsClass =
    pricingList.length === 1
      ? "md:grid-cols-1"
      : pricingList.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <section id="pricing" className="container py-8 my-12 sm:my-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Maximize your cash flow and eliminate your frustration.
      </h3>
      <div className={`grid ${gridColsClass} gap-8 justify-center mx-auto`}>
        {pricingList.map((pricing: PricingCardProps) => (
          <Card
            key={pricing.title}
            className={`max-w-md mx-auto ${
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground">
                  {" "}
                  /month billed annually
                </span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full" onClick={activateGoogleScheduling}>
                {pricing.buttonText}
              </Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
