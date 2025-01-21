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
                      src="https://media.licdn.com/dms/image/v2/D4E03AQHqo29qC6k3YQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1712223290173?e=1743033600&v=beta&t=jaaJWhXWFD5k42UWzfo2ivyKypY64BA38UFAincWblU"
                      alt="About feature"
                      className="object-cover object-center h-[200px] mx-auto mb-2"
                  />

                  <CardDescription className="">
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
