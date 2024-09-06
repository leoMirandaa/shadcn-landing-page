import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
export const Cta = () => {
  return (
    <section id="cta" className="py-16 my-24 sm:my-32">
      <Card className="container">
        <CardContent className="p-6 lg:grid lg:grid-cols-2 place-items-center gap-8">
          <div className="lg:col-start-1">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Found Wolf too late? Don't worry, you can report past events on Wolf too. 
              </CardTitle>
            </CardHeader>
            <CardDescription className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
              We aim to gather all safety-related events on our platform, including past incidents. This comprehensive data collection allows us to analyze patterns and trends, enabling us to predict when and where future events might occur. By contributing your experiences, you're helping to build a safer community for everyone.
            </CardDescription>
          </div>
          {/* Image added above the buttons */}
          <div className="lg:col-start-2">
            <img
              src="https://res.cloudinary.com/dkbn21xdu/image/upload/v1725651459/Screenshot_2024-09-06_at_20.37.34_qdhzd6.png" // Replace with the actual path to your image
              alt="Wolf Safety Map"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4 lg:col-start-2">
            <Button 
              className="w-full md:mr-4 md:w-auto"
              onClick={() => window.open('https://wolfpack-seven.vercel.app/', '_blank')}
            >
              View Live Map 🗺️
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => window.location.href = '#faq'}
            >
              Learn More ❓
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
