import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";

interface HeroProps {
  activateGoogleScheduling: () => void;
}

export const Hero = (props: HeroProps) => {
  const { activateGoogleScheduling } = props;
  return (
    <section
      id="home"
      className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10"
    >
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            Uncover{" "}
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              cash flowing
            </span>{" "}
            real estate properties
          </h1>{" "}
          in{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              seconds
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Analyze 500+ properties in any neighborhood to find listings with the
          lowest purchase price and highest estimated rent.
        </p>
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Maximize your cash flow and invest confidently with data driven
          investments. Save hours of frustration from analyzing bad investments.
        </p>
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Find the highest Rent-to-Purchase ratio in your neighborhood today!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:w-1/3"
            onClick={activateGoogleScheduling}
          >
            Invest now
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
