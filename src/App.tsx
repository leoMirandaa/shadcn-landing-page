import { About } from "./components/About";
import { Cta } from "./components/Cta";
import { FAQ } from "./components/FAQ";
// import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
// import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
import { Services } from "./components/Services";
// import { Team } from "./components/Team";
// import { Testimonials } from "./components/Testimonials";
import "./App.css";
import { useEffect } from 'react';

// TODOD

function App() {
  useEffect(() => {
    // Set light theme as default
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg">
      <Navbar />
      <Hero />
      <div className="mx-auto max-w-screen-lg">
        <About />
        <HowItWorks />
        {/* <Features /> */}
        <Services />
        <Cta />
        {/* <Testimonials /> */}
        {/* <Team /> */}
        {/* <Pricing /> */}
        {/* <Newsletter /> */}
        <FAQ />
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;
