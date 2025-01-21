import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-20"
    >
      <div className="bg-muted/50 border rounded-lg py-4">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="object-cover object-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between my-auto">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                me
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                I'm a Frontend Developer at bitExpert in Mannheim, passionate about building user-friendly and engaging web experiences.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                My journey into the world of coding began in 2023, a year of exciting new beginnings at 36. I initially explored the landscape of low-code platforms, eager to learn and experiment.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                Mid-2024 marked a significant turning point as I embarked on a dedicated JavaScript course. This immersive experience ignited my passion for frontend development and ultimately led to my current role at bitExpert.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                I'm eager to continue learning and growing as a developer, contributing to innovative and impactful projects.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
