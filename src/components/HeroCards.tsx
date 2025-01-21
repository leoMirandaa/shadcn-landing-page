import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardLink,
} from "@/components/ui/card";

export const HeroCards = () => {
  return (
          <Card className="flex flex-col justify-center items-center">
              <CardHeader >
                  <CardTitle className="text-center mb-2">Torsten Jamin</CardTitle>
                  <img
                      src="src/img/Pixel profile extra large.png"
                      alt="About feature"
                      className="object-cover object-center mx-auto mb-2"
                  />

                  <CardDescription className="text-center">
                      Frontend Developer
                  </CardDescription>
              </CardHeader>

              <CardLink className="text-center">
                  <a
                      rel="noreferrer noopener"
                      href="https://github.com/trstnjmn"
                      target="_blank"
                      className="snes-link  text-ocean-color"
                  >
                      GitHub
                  </a>
              </CardLink>
          </Card>
  );
};
