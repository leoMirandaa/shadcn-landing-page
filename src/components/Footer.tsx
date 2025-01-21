import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            trstjmn
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow me</h3>
          <div>
            <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/trstnjmn"
                className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.instagram.com/jamintorsten/"
                className="opacity-60 hover:opacity-100"
            >
              Instagram
            </a>
          </div>
          <div>
            <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.linkedin.com/in/torsten-jamin-436200268/"
                className="opacity-60 hover:opacity-100"
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
              className="opacity-60 hover:opacity-100"
            >
              Maker World
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.printables.com/@trstn"
              className="opacity-60 hover:opacity-100"
            >
              Printables
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">My wife's store</h3>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.bilderbuchblume.de/"
              className="opacity-60 hover:opacity-100"
            >
              BilderBuchBlume
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.etsy.com/de/shop/Bilderbuchblume?ref=shop-header-name&listing_id=1592391844&from_page=listing"
              className="opacity-60 hover:opacity-100"
            >
              Etsy
            </a>
          </div>
        </div>

      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2025 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://github.com/trstnjmn"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Torsten Jamin
          </a>
        </h3>
      </section>
    </footer>
  );
};
