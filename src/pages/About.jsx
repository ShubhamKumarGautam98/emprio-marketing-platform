import React, { useState, useEffect } from "react";
import AboutWhyChooseUs from "../components/AboutWhyChooseUs";
import AboutGrowthEngines from "../components/AboutGrowthEngines";
import Footer from "../components/Footer";
import "./About.css";

import aboutHero from "../assets/about-hero.webp";
import aboutHeroMobile from "../assets/Mobile 2.webp"; // Add this import for the mobile image
import meta from "../assets/meta.webp";
import google from "../assets/google.webp";
import hubspot from "../assets/hubspot.webp";
import semrush from "../assets/semrush.webp";
import CircleCapabilities from "../components/CircleCapabilities";

const partnerScaleMap = {
  meta: 2.3,
  google: 1.1,
  hubspot: 1.25,
  semrush: 2.35,
};

export default function AboutHero() {
  const [heroImage, setHeroImage] = useState(aboutHero);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setHeroImage(aboutHeroMobile);
      } else {
        setHeroImage(aboutHero);
      }
    };

    handleResize(); // Set initial image
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const partners = [
    { img: meta, alt: "Meta Business Partner", key: "meta" },
    { img: google, alt: "Google Partner", key: "google" },
    { img: hubspot, alt: "HubSpot Partner", key: "hubspot" },
    { img: semrush, alt: "SEMRush Partner", key: "semrush" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="about-hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <h1 className="about-hero-heading">
            A Creative Experiences Agency
          </h1>

          <p className="about-hero-text">
            Emprio is a creative execution agency built for brands that want more
            than surface-level marketing. We design, build, and scale ideas that
            live across platforms, touchpoints, and audiences — with purpose.
          </p>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="about-partner-section">
        <div className="about-partner-container">
          {partners.map((item, index) => (
            <div key={index} className="about-partner-circle">
              <img
                src={item.img}
                alt={item.alt}
                className="about-partner-logo"
                style={{ transform: "scale(" + (partnerScaleMap[item.key] || 1) + ")" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <AboutWhyChooseUs />
      <section className="home-section home-section-circles">
        <CircleCapabilities />
      </section>
      <AboutGrowthEngines />
      <Footer />
    </>
  );
}