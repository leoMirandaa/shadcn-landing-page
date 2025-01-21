import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Skills {
  image: string;
  name: string;
}

const skills: Skills[] = [
  {
    image: "https://img.icons8.com/color/48/000000/javascript.png",
    name: "JavaScript",
  },
  {
    image: "https://img.icons8.com/color/48/000000/react-native.png",
    name: "React",
  },
  {
    image: "https://img.icons8.com/color/48/000000/typescript.png",
    name: "TypeScript",
  },
  {
    image: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000",
    name: "Tailwindcss",
  },
  {
    image: "https://img.icons8.com/color/48/000000/html-5.png",
    name: "HTML",
  },
  {
    image: "https://img.icons8.com/color/48/000000/css3.png",
    name: "CSS",
  },
  {
    image: "https://img.icons8.com/color/48/000000/sass.png",
    name: "SCSS",
  },
  {
    image: "https://img.icons8.com/?size=100&id=ZuXFb1SM6KMo&format=png&color=000000",
    name: "Grav",
  },
  {
    image: "https://learn.plantanapp.com/img/pap-logo.png",
    name: "Plant an App",
  },
  {
    image: "https://brandlrainer.info/wp-content/uploads/2022/05/hcl-domino-volt_color_icon_300-1.png",
    name: "HCL",
  },
  {
    image: "https://img.icons8.com/color/48/000000/internet.png",
    name: "Intrexx",
  },
];

export const Skills = () => {
  return (
      <section
          id="skills"
          className="container py-20"
      >
        <h2 className="snes-container-title has-ocean-underline mb-8">
          Skills
        </h2>
        <h3 className="mb-8">
          These are some of the skills I have acquired
        </h3>

        <div className="flex flex-wrap md:justify-center gap-4">
          {skills.map(({image, name}: Skills) => (
              <div key={name} >
                <blockquote className="flex felx-row my-auto snes-blockquote has-plumber-bg">
                  <Avatar>
                    <AvatarImage alt={name} src={image}/>
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <p className="my-auto ml-4">{name}</p>
                </blockquote>
              </div>
          ))}
        </div>
      </section>
  );
};
