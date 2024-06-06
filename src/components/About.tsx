export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Solving the #2 challenge in real estate investing
                </span>
                <br />
                Finding the deal
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                A Bigger Pockets survey revealed that the #2 biggest challenge
                in real estate investing is finding a deal. Investors get
                frustrated spending hours analyzing dozens of properties before
                giving up.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                Market Master showcases properties with the highest cash on cash
                return potential so you can focus on analyzing the best deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
