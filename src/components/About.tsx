import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32 z-20"
    >
      <Card className="shadow-xl">
        <CardContent className="px-6 py-12 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt="Wolf pilot"
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl text-left font-bold">
                  Why we want to empower everyonreport what they see to Wolf 🐺
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-lg text-muted-foreground mt-4">
                Wolf is a personal safety network that empowers you to protect yourself and the people and places you care about. Wolf enables its followers to be more situationally aware.
              </CardDescription>
              <CardDescription className="text-lg text-muted-foreground mt-4">
                Wolf not only gathers insights but also amplifies its impact, making every community member more informed and vigilant.
              </CardDescription>
              <CardDescription className="text-lg text-muted-foreground mt-4">
                Wolf is envisioned as an innovative safety tool that combines the strengths of response software and smart routing logic to provide a unified solution distributed through WhatsApp. By leveraging WhatsApp's widespread usage, Wolf enables users to send messages and voice notes reporting suspicious behaviour or incident witness statements. Utilising sophisticated machine learning technologies, Wolf focuses on prevention and avoidance, analysing data to predict and mitigate potential threats before they escalate, as well as coordinating responses after incidents occur.
              </CardDescription>
            </div>
            <Statistics />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
