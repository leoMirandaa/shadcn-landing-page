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
                All Your
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  {" "}
                  Ideas & Concepts{" "}
                </span>
                In One Interface
              </CardTitle>
            </CardHeader>
            <CardDescription className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
              sed!
            </CardDescription>
          </div>

          <div className="space-y-4 lg:col-start-2">
            <Button className="w-full md:mr-4 md:w-auto">Request a Demo</Button>
            <Button
              variant="outline"
              className="w-full md:w-auto"
            >
              View all features
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
