import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import OrbitingCircles from "@/components/magicui/orbiting-circles"

export const Cta = () => {
  return (
    <section id="cta" className="py-16 my-24 sm:my-32 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-[600px] h-[600px]">
          <OrbitingCircles
            reverse={false}
            duration={60}
            delay={9}
            radius={600}
            path={true}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-red-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🚨</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={true}
            duration={35}
            delay={1}
            radius={300}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">👮‍♂️</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={true}
            duration={120}
            delay={8}
            radius={700}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-red-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🚨</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={false}
            duration={90}
            delay={5}
            radius={450}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-red-500 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🚨</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={true}
            duration={60}
            delay={15}
            radius={900}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-zinc-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🐺</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={false}
            duration={35}
            delay={10}
            radius={300}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-zinc-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🐺</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={true}
            duration={120}
            delay={2}
            radius={425}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-zinc-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🐺</span>
          </OrbitingCircles>
          <OrbitingCircles
            reverse={false}
            duration={90}
            delay={12}
            radius={615}
            path={false}
            className="bg-transparent border-none"
          >
            <span className="text-4xl border-white border-2 bg-zinc-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">🐺</span>
          </OrbitingCircles>
        </div>
      </div>
      <div className="relative z-10">
        <Card className="container">
          <CardContent className="p-6 lg:grid lg:grid-cols-2 place-items-center gap-8">
            <div className="lg:col-start-1">
              <CardHeader>
                <CardTitle className="text-3xl md:text-3xl font-bold">
                  Found Wolf too late? Don't worry, Wolf is able to process historical reports. 
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-muted-foreground text-md mt-4 mb-8 lg:mb-0">
                The more report data that Wolf has access to the stronger its predictive capabilities are. By contributing and sharing any historical incidents, you're helping to build a safer community for everyone.
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
      </div>
    </section>
  );
};
