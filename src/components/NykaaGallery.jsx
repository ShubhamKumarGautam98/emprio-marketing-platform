import React from "react";
import Footer from "./Footer";
import "./NykaaGallery.css";

const images = [
  "/images/nykaa/nykaa-1.png",
  "/images/nykaa/nykaa-2.png",
  "/images/nykaa/nykaa-3.png",
  "/images/nykaa/nykaa-4.png",
];

export default function NykaaGallery() {
  return (
    <section className="nykaa-wrapper">
      {images.map((src, index) => (
        <div
          key={index}
          className={`nykaa-block ${index % 2 === 0 ? "left" : "right"}`}
        >
          <img
            src={src}
            alt={`Nykaa event ${index + 1}`}
            className="nykaa-image"
          />
        </div>
      ))}

      <Footer />
    </section>
  );
}