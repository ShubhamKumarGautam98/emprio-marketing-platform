import React from "react";
import { Link } from "react-router-dom";   // ✅ add this
import "./AboutWhyChooseUs.css";
import whyImage from "../assets/about-why.webp";

export default function AboutWhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-wrapper">
        {/* LEFT IMAGE */}
        <div className="why-image-wrap">
          <img src={whyImage} alt="Why Emprio" className="why-image" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="why-content">
          <h2 className="why-heading">
            We Build Clarity-Driven Marketing Systems Where Strategy, Tech &
            People Align.
          </h2>
          <div className="why-para">
            <h4 className="why-subheading">Why Brands Choose Emprio</h4>

            <p className="why-text">
              We launched Emprio to fix what most agencies get wrong: fragmented
              services, slow delivery, and zero ROI clarity. We believe
              marketing should perform like tech — agile, intelligent, and
              accountable. That's why we build growth systems, not vanity
              campaigns.
            </p>

            <p className="why-text">
              Our team includes strategists, creatives, developers, AI
              engineers, and media planners who move as one unit to deliver one
              thing: performance.
            </p>

            {/* ✅ BUTTON NOW ROUTES TO CONTACT PAGE */}
            <Link to="/contact" className="why-button">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}