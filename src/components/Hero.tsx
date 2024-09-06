import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export const Hero = () => {
  return (
    <>
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dkbn21xdu/image/upload/v1725627216/Screenshot_2024-09-06_at_13.53.30_lh6hl5.png')"
        }}
      ></div>

      <section className="container relative py-20 md:py-32">
        <div className="grid lg:grid-cols-2 place-items-center gap-10">
          

          <Card className="text-center lg:text-start space-y-6 p-6 w-full lg:order-1 lg:pr-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-5xl md:text-5xl font-black">
                We Are Predicting and Preventing Crime with Community Data 🔍
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-black md:w-10/12 mx-auto lg:mx-0">
                Wolf is a personal safety network that empowers you to protect yourself and the people and places you care about. Wolf enables its followers to be more situationally aware. 🐺
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">See Live Map 🗺️</Button>
            </CardFooter>
          </Card>
          
          <div className="z-10 lg:order-2 shadow-xl rounded-2xl">
            <Iphone15Pro src="https://res.cloudinary.com/dkbn21xdu/image/upload/v1725627146/Screenshot_2024-09-06_at_13.52.14_ffen79.png" />
          </div>
        </div>
      </section>
    </>
  );
};
