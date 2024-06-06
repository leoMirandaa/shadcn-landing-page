import { Cta } from "./components/Cta";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";
import { useState } from "react";
import { GoogleScheduling } from "./components/GoogleScheduling";

function App() {
  const [showGoogleScheduling, setShowGoogleScheduling] = useState(false);
  const activateGoogleScheduling = () => {
    setShowGoogleScheduling(true);
    setTimeout(() => {
      window.location.href = "#GoogleScheduling";
    }, 100);
  };
  return (
    <>
      <Navbar />
      <Hero activateGoogleScheduling={activateGoogleScheduling} />
      <Cta
        showGoogleScheduling={showGoogleScheduling}
        setShowGoogleScheduling={setShowGoogleScheduling}
      />
      <GoogleScheduling showScheduling={showGoogleScheduling} />
      <Pricing activateGoogleScheduling={activateGoogleScheduling} />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
