import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedEmail = email.trim();

    if (!isEmailValid(cleanedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    console.log("Subscribed!", cleanedEmail);

    const myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const urlencoded = new URLSearchParams();
    urlencoded.append("entry.1828206471", cleanedEmail);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const formUrl =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd2sPIGYECw7OIqNepSW-s9pcnEwTobrpiGf6yP5NRNUq9_3A/formResponse";
    fetch(formUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error("Error posting form:", error));
  };

  return (
    <section id="product-updates" className="bg-muted/50">
      <hr className="w-11/12 mx-auto" />
      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Sign up for{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            product updates
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          No Spam! Only product updates.
        </p>
        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Enter your email"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button>Subscribe</Button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
      <hr className="w-11/12 mx-auto" />
    </section>
  );
};

export default Newsletter;
