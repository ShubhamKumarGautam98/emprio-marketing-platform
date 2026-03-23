import React from "react";
// Remove or comment out the styles import – it's not needed anymore
// import { styles } from "../data/careerStyles";  // <-- Delete or comment this line
import './CareerPage.css';  // This provides the responsive styles

export default function CareerHero() {
  return (
    <section className="hero">  {/* Changed from style={styles.hero} to className="hero" */}
      <div className="heroOverlay" />  {/* Changed from style={styles.heroOverlay} to className="heroOverlay" */}
      <h1 className="heroTitle">  {/* Changed from style={styles.heroTitle} to className="heroTitle" */}
        THE FUTURE MIGHT WORK AT THE SPEED OF{" "}
        <span className="breakWord">THOUGHT.</span>  {/* Changed from style={styles.breakWord} to className="breakWord" */}
      </h1>
    </section>
  );
}