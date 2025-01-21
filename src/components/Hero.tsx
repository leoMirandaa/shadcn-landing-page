import { HeroCards } from "./HeroCards";

export const Hero = () => {
    return (
        <section className="container">
            <div className="grid md:grid-cols-2 gap-4 mt-20">
                <div className="text-5xl md:text-6xl font-bold ">
                    <h1 className="inline">Hi there</h1>
                    <h2>My name is</h2>
                    <h2>
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Torsten Jamin{" "}
            </span>
                    </h2>
                </div>
                <div className="mt-20 md:mt-0 place-items-end">
                    <HeroCards />
                </div>
            </div>

            {/* Shadow effect */}
            <div className="shadow"></div>
        </section>
    );
};