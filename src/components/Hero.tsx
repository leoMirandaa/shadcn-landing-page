import { Button } from "./ui/button";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import OrbitingCircles from "@/components/magicui/orbiting-circles"

export const Hero = () => {
  return (
    <>
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dkbn21xdu/image/upload/v1725627216/Screenshot_2024-09-06_at_13.53.30_lh6hl5.png')"
        }}
      ></div>

      <section className="container relative py-10 md:py-10 flex items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <div className="relative w-[600px] h-[600px]">
            <OrbitingCircles
              reverse={false}
              duration={60}
              delay={9}
              radius={600}
              path={true}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🚨</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={35}
              delay={1}
              radius={300}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">👮‍♂️</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={120}
              delay={8}
              radius={700}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🚨</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={90}
              delay={5}
              radius={900}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🚨</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={60}
              delay={15}
              radius={600}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🐺</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={35}
              delay={10}
              radius={300}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🐺</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={120}
              delay={2}
              radius={700}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🐺</span>
            </OrbitingCircles>
            <OrbitingCircles
              reverse={false}
              duration={90}
              delay={12}
              radius={900}
              path={false}
              className="bg-transparent border-none"
            >
              <span className="text-4xl">🐺</span>
            </OrbitingCircles>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 place-items-center gap-10 w-full max-w-4xl mx-auto z-10 relative">
          
          <Card className="text-center space-y-6 p-6 w-full lg:text-start lg:order-1 lg:pr-12 shadow-xl px-0">
            <CardHeader>
              <CardTitle className="text-5xl md:text-5xl sm:text-2xl font-black mb-4">
                Predicting and Preventing Crime with Community Data 🔍
              </CardTitle>
              <CardDescription>
                Wolf is a personal safety network that empowers you to protect yourself and the people and places you care about. Wolf enables its followers to be more situationally aware. 🐺
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
              variant="default" className="">See Live Map 🗺️</Button>
              <Button 
              variant="outline" 
              className="ml-4">
                Learn More 📚
              </Button>
            </CardFooter>
          </Card>
          
          <div className="z-10 lg:order-2 shadow-xl rounded-2xl w-full max-w-sm mx-auto hidden md:block rotate-12">
            <Iphone15Pro src="https://res.cloudinary.com/dkbn21xdu/image/upload/v1725627146/Screenshot_2024-09-06_at_13.52.14_ffen79.png" />
          </div>
        </div>
      </section>
    </>
  );
};
