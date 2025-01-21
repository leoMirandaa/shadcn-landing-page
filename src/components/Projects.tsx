import {
  Card,
  CardContent,
  CardFooter,
  CardHeader, CardLink,
  CardTitle,
} from "@/components/ui/card";
import whistleblower from "../img/Whistleblower.jpg";
import wachenheim from "../img/Wachenheim.jpeg";
import kinderkunstschule from "../img/Kinderkunstschule.jpeg";
import {buttonVariants} from "@/components/ui/button.tsx";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  link: string;
  linkName: string;
}

const projects: FeatureProps[] = [
  {
    title: "Whistleblower Tool",
    description:
      "The Whistleblower tool by bitExpert allows for the secure and anonymous reporting of misconduct, fraud, ethical violations, and other issues. This tool helps companies mitigate risks, increase employee satisfaction, and ensure compliance with legal regulations.",
    image: whistleblower,
    link: "https://www.bitexpert.de/de/produkte/whistleblower",
    linkName: "Whistleblower",
  },
  {
    title: "Website for SSV-Wachenheim",
    description:
      "I have set up a website for the Wachenheim Shooting Club. This site was only available in very old HTML and CSS code. First I started to rewrite the website in React. Then I decided to do it with GRAV so that the owner can easily edit the content of the site in a simple CMS.",
    image: wachenheim,
    link: "http://www.ssv-wachenheim.de/",
    linkName: "SSV-Wachenheim",
  },
  {
    title: "Website Kinderkunstschule Bad Homburg",
    description:
      "This page was created with Wix.com. The design is self-made. The children's art school is run by Ulrike Göhring. She also offers art therapy. The German slogan is : Kleine Künstler, große Ideen!",
    image: kinderkunstschule,
    link: "https://kinderkunstschule-hg.de/",
    linkName: "Kinderkunstschule Bad Homburg",
  },
];



export const Projects = () => {
  return (
    <section
      id="projects"
      className="container py-8 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold">
        A few{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          projects
        </span>
        I have done
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ title, description, image, link, linkName }: FeatureProps) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent>{description}</CardContent>

              <CardFooter>
                <img
                    src={image}
                    alt="About feature"
                    className="object-cover object-center h-[200px] lg:h-[300px] mx-auto"
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
