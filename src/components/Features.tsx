import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";
import OrbitingCircles from "@/components/magicui/orbiting-circles";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Responsive Design 📱",
    description:
      "Our app adapts seamlessly to any device, ensuring a smooth experience whether you're on mobile, tablet, or desktop.",
    image: image4,
  },
  {
    title: "Intuitive User Interface 🖱️",
    description:
      "Navigate with ease through our user-friendly interface, designed for quick access to critical safety information.",
    image: image3,
  },
  {
    title: "AI-Powered Insights 🤖",
    description:
      "Leverage cutting-edge artificial intelligence to analyze patterns and predict potential safety concerns in your area.",
    image: image,
  },
];

const featureList: string[] = [
  "Real-time community insights 🔍",
  "Anonymous witness reporting 🕵️",
  "Incident prevention and resolution 🛡️",
  "Situational awareness updates 🚨",
  "Smart routing of information 🧠",
  "Machine learning threat analysis 🤖",
  "WhatsApp integration 📱",
  "Voice note reporting 🎙️",
  "Predictive crime prevention 🔮",
  "Community-powered safety network 🤝",
];

export const Features = () => {
  return null; // This will render nothing
};
