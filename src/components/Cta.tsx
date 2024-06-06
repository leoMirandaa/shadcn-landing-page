import { Button } from "./ui/button";

interface CtaProps {
  showGoogleScheduling: boolean;
  setShowGoogleScheduling: (showGoogleScheduling: boolean) => void;
}

export const Cta = (props: CtaProps) => {
  const { showGoogleScheduling, setShowGoogleScheduling } = props;

  const toggleGoogleScheduling = () => {
    setShowGoogleScheduling(!showGoogleScheduling);
    setTimeout(() => {
      window.location.href = "#GoogleScheduling";
    }, 100);
  };

  return (
    <section id="cta" className="bg-muted/50 py-16">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Solving the #2 challenge in real estate investing
            </span>
            <br />
            Finding the deal
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            A Bigger Pockets survey revealed that the #2 biggest challenge in
            real estate investing is finding a deal. Investors get frustrated
            spending hours analyzing dozens of properties before giving up.
          </p>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Market Master showcases properties with the highest cash on cash
            return potential so you can focus on analyzing the best deals.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button
            onClick={toggleGoogleScheduling}
            className="w-full md:mr-4 md:w-auto"
          >
            {showGoogleScheduling ? "close appointment window" : "Invest now"}
          </Button>
        </div>
      </div>
    </section>
  );
};
