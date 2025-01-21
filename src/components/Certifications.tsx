import {
  Card,
  CardFooter,
  CardHeader, CardLink,
  CardTitle,
} from "@/components/ui/card";
import image1 from "../img/Certification-Responsive-Web-Design.jpg";
import image2 from "../img/Frontend certification Torsten Jamin.jpeg";
import image3 from "../img/Low-Code Academy Certifacation.png";
import {buttonVariants} from "@/components/ui/button.tsx";

interface FeatureProps {
  title: string;
  image: string;
  link: string;
  linkName: string;
}

const certifications: FeatureProps[] = [
  {
    title: "Responsive Web Design",
    image: image1,
    link: "https://www.freecodecamp.org/",
    linkName: "from freecodecamp.org",
  },

  {
    title: "Frrontend Certification",
    image: image2,
    link: "https://www.freecodecamp.org/",
    linkName: "from freecodecamp.org",
  },

  {
    title: "Responsive Web Design",
    image: image3,
    link: "https://academy.plantanapp.com/",
    linkName: "from Plant an App Low-Code Academy",
  },

];



export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="container py-8 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold">
        Here are some of my{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          certifications
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {certifications.map(({ title, image, link, linkName }: FeatureProps) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardFooter>
                <img
                    src={image}
                    alt="About feature"
                    className="object-cover object-center h-[200px] lg:w-[300px] mx-auto"
                />
              </CardFooter>
              <CardLink>
                <a
                    rel="noreferrer noopener"
                    href={link}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                >
                  {linkName}
                </a>
              </CardLink>
            </Card>

        ))}
      </div>
    </section>
  );
};
