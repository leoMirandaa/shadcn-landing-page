import {
  Card,
  CardFooter,
  CardHeader, CardLink,
  CardTitle,
} from "@/components/ui/card";
import image1 from "../img/Certification-Responsive-Web-Design.jpg";
import image2 from "../img/Frontend certification Torsten Jamin.jpeg";
import image3 from "../img/Low-Code Academy Certifacation.png";

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

const classNames = [
  'text-ember-color',
  'text-galaxy-color',
  'text-rose-color',
  'text-phantom-color',
  'text-turquoise-color',
  'text-ocean-color',
  'text-sunshine-color',
  'text-plumber-color',
  'text-nature-color',
  ''
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
          {certifications.map(({title, image, link, linkName}, index ) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardFooter>
                  <img
                      src={image}
                      alt="About feature"
                      className=" object-center h-[200px] lg:h-[300px] mx-auto"
                  />
                </CardFooter>
                <CardLink>
                  <a
                      rel="noreferrer noopener"
                      href={link}
                      target="_blank"
                      className={`snes-link text-wrap ${classNames[index % classNames.length]}`}
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
