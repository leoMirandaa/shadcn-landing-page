import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: "🏅",
    title: "Easy Accessibility 📱",
    description:
      "With 28 million WhatsApp users in South Africa, Wolf leverages an app you already have. No need to download a new app or provide personal details - just send Wolf a message to contribute.",
  },
  {
    icon: "🗺️",
    title: "Community-Driven Safety 🤝",
    description:
      "Empower your community by sharing what you saw and where you saw it. Your contributions helps to create a stronger safety network, benefiting everyone.",
  },
  {
    icon: "✈️",
    title: "Virtual Witness Statements 🚔",
    description:
      "Submit detailed witness statements via a message or voice notes. Wolf stores and analyses this data, creating a valuable tool for public protectors.",
  },
  {
    icon: "🎁",
    title: "Precise Patrol Routes 🛡️",
    description:
      "Your local armed response teams will benefit from optimised patrol routing based on community reports, improving response times and overall safety.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <Card className="shadow-xl p-8">
        <h2 className="text-3xl md:text-3xl font-bold mb-4">
          No logins required. No tracking. No ads. Just tell Wolf what's happening. 📢
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-lg text-muted-foreground">
          Wolf simplifies incident reporting. Just send a message or voice note to contribute valuable information. Your reports help Wolf create a safer environment for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ title, description }: FeatureProps) => (
            <Card
              key={title}
              className={`shadow-xl bg-white text-black`}
            >
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center text-left">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
};
