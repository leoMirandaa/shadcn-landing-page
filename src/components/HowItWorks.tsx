import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

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
      "With 28 million WhatsApp users in South Africa, Wolf leverages an app you already have. No new downloads or logins required - just send a message to contribute.",
  },
  {
    icon: "🗺️",
    title: "Community-Driven Safety 🤝",
    description:
      "Empower your community by sharing incident reports. Your contributions help create a decentralized safety network, benefiting everyone.",
  },
  {
    icon: "✈️",
    title: "Virtual Police Statements 🚔",
    description:
      "Submit detailed witness statements via text or voice notes. Wolf stores and analyzes this data, creating a valuable resource for law enforcement.",
  },
  {
    icon: "🎁",
    title: "Enhanced Security Patrols 🛡️",
    description:
      "Security companies benefit from targeted patrol routing based on community data, improving response times and overall safety.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <Card className="shadow-xl p-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          No logins required. No tracking. No ads. Just tell Wolf what's happening. 📢
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Wolf simplifies community safety reporting. Just send a message to contribute valuable information. Your input helps create a safer environment for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps, index) => (
            <Card
              key={title}
              className={`shadow-xl bg-black text-white`}
            >
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {/* {icon} */}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
};
