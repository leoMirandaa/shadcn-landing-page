import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Skills {
  image: string;
  name: string;
  comment: string;
}

const skills: Skills[] = [
  {
    image: "https://img.icons8.com/color/48/000000/javascript.png",
    name: "JavaScript",
    comment: "A versatile scripting language for web development.",
  },
  {
    image: "https://img.icons8.com/color/48/000000/react-native.png",
    name: "React",
    comment: "A JavaScript library for building user interfaces.",
  },
  {
    image: "https://img.icons8.com/color/48/000000/typescript.png",
    name: "TypeScript",
    comment: "A strongly typed superset of JavaScript.",
  },
  {
    image: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000",
    name: "Tailwindcss",
    comment: "A utility-first CSS framework for rapidly building custom user interfaces.",
  },
  {
    image: "https://img.icons8.com/color/48/000000/html-5.png",
    name: "HTML",
    comment: "The standard markup language for creating web pages.",
  },
  {
    image: "https://img.icons8.com/color/48/000000/css3.png",
    name: "CSS",
    comment: "A style sheet language used for describing the look and formatting of a document written in HTML.",
  },
  {
    image: "https://img.icons8.com/color/48/000000/sass.png",
    name: "SCSS",
    comment: "A preprocessor scripting language that is interpreted into CSS.",
  },
  {
    image: "https://img.icons8.com/?size=100&id=ZuXFb1SM6KMo&format=png&color=000000",
    name: "Grav",
    comment: "A modern open-source flat-file CMS.",
  },
  {
    image: "https://learn.plantanapp.com/img/pap-logo.png",
    name: "Plant an App",
    comment: "A low-code platform for building custom applications.",
  },
  {
    image: "https://brandlrainer.info/wp-content/uploads/2022/05/hcl-domino-volt_color_icon_300-1.png",
    name: "HCL",
    comment: "A global technology company providing hardware and software solutions.",
  },
  {
    image: "https://img.icons8.com/color/48/000000/internet.png",
    name: "Intrexx",
    comment: "A low-code platform for creating intranets and portals.",
  },
];


export const Skills = () => {
  return (
      <section id="skills" className="container py-8">
        <h2 className="text-3xl md:text-4xl font-bold pb-8">
          These are some of the
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
            skills{" "}
        </span>
          I have acquired
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map(({ image, name, comment }: Skills) => (
              <Card key={name} className="flex flex-col min-h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar>
                    <AvatarImage alt="" src={image} />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <CardTitle className="text-lg">{name}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">{comment}</CardContent>
              </Card>
          ))}
        </div>
      </section>
  );
};
