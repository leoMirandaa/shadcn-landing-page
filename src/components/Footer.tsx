
export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">

        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow me</h3>
          <div>
            <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/trstnjmn"
                className="snes-link text-galaxy-color"
            >
              Github
            </a>
          </div>

          <div>
            <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.instagram.com/jamintorsten/"
                className="snes-link text-rose-color"
            >
              Instagram
            </a>
          </div>
          <div>
            <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.linkedin.com/in/torsten-jamin-436200268/"
                className="snes-link text-phantom-color"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">3D print</h3>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://makerworld.com/en/@torstenjamin"
              className="snes-link text-turquoise-color"
            >
              Maker World
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.printables.com/@trstn"
              className="snes-link text-ocean-color"
            >
              Printables
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg">My wife's store</h3>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.bilderbuchblume.de/"
              className="snes-link text-sunshine-color"
            >
              BilderBuchBlume
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.etsy.com/de/shop/Bilderbuchblume?ref=shop-header-name&listing_id=1592391844&from_page=listing"
              className="snes-link text-plumber-color"
            >
              Etsy
            </a>
          </div>
        </div>

      </section>

      <section className="container pb-4 text-center">
        <h3>
          &copy; 2025 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://github.com/trstnjmn"
            className="snes-link text-nature-color"
          >
            Torsten Jamin
          </a>
        </h3>
      </section>
    </footer>
  );
};
