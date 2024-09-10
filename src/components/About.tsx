import { Statistics } from "./Statistics";
// import pilot from "../assets/pilot.png";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import Safari from "@/components/magicui/safari";
// import Iphone15Pro from "@/components/magicui/iphone-15-pro";

export const About = () => {

  return (
    <section
      id="about"
      className="container py-24 sm:py-32 z-20"
    >
      <div className="relative">
        <Card className="shadow-xl relative z-10">
          <CardContent className="px-6 py-12 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
            <div className="md:w-1/3 relative hidden md:block">
              <div className="absolute left-1/6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <img src="https://res.cloudinary.com/dkbn21xdu/image/upload/v1725988147/Enaibled_Logos_z8hksf.svg" alt="Image" className="w-100 h-100 lg:max-w-[200%] md:max-w-[150%] sm:max-w-[100%]" />
              </div>
            </div>
            <div className="flex flex-col justify-between md:w-2/3">
              <div className="pb-6">
                <CardHeader>
                  <CardTitle className="text-3xl md:text-3xl sm:text-2xl font-black mb-4">
                  Why we want to empower everyone to report what they see with Wolf 🐺
                </CardTitle>
                </CardHeader>
                <CardDescription className="text-md text-muted-foreground mt-4">
                  Wolf is a personal safety network that empowers you to protect yourself and the people and places you care about. Wolf enables its followers to be more situationally aware.
                </CardDescription>
                <CardDescription className="text-md text-muted-foreground mt-4">
                  Wolf not only gathers insights but also amplifies its impact, making every community member more informed and vigilant.
                </CardDescription>
                <CardDescription className="text-md text-muted-foreground mt-4">
                  Wolf is envisioned as an innovative safety tool that combines the strengths of response software and smart routing logic to provide a unified solution distributed through WhatsApp. By leveraging WhatsApp's widespread usage, Wolf enables users to send messages and voice notes reporting suspicious behaviour or incident witness statements. Utilising sophisticated machine learning technologies, Wolf focuses on prevention and avoidance, analysing data to predict and mitigate potential threats before they escalate, as well as coordinating responses after incidents occur.
                </CardDescription>
              </div>
              <Statistics />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
