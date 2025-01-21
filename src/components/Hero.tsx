import { HeroCards } from "./HeroCards";

export const Hero = () => {
    return (
        <section className="container w-200">
            <div className="mt-8 md:mt-32 grid md:grid-cols-3 gap-2  md:place-items-space-between">
                <div className="text-5xl lg:text-6xl my-auto col-span-2">
                    <h1>Hi there,</h1>
                    <h1>my name is</h1>
                    <h1 className="text-ocean-color">Torsten Jamin</h1>
                </div>
                <div className="mt-8 md:mt-0">
                    <HeroCards />
                </div>
            </div>
        </section>
    );
};