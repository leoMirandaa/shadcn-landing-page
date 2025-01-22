import {
  Card,
  CardFooter,
  CardHeader, CardLink,
  CardTitle,
} from "@/components/ui/card";
import image1 from "../img/Certification-Responsive-Web-Design.jpg";
import image2 from "../img/Frontend certification Torsten Jamin.jpeg";
import image3 from "../img/Low-Code Academy Certifacation.png";
import {getRandomSnesButtonColor} from "./utilities/snesRandomColors";

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
    linkName: "go to",
  },

  {
    title: "Frrontend Certification",
    image: image2,
    link: "https://www.freecodecamp.org/",
    linkName: "go to",
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
          className="container py-20"
      >
        <h2 className="snes-container-title has-ocean-underline mb-8">
          Certifications
        </h2>
        <h3 className="mb-8">
          Here are some of my certifications
        </h3>
        <div className="grid md:grid-cols-2 gap-8 text-center">
          {certifications.map(({title, image, link, linkName}) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardFooter>
                  <img
                      src={image}
                      alt="About feature"
                      className="object-cover object-center w-full mx-auto snes-image"
                  />
                </CardFooter>
                <CardLink>
                  <a
                      rel="noreferrer noopener"
                      href={link}
                      target="_blank"
                      className={`p-1 truncate ${getRandomSnesButtonColor()}`}
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
