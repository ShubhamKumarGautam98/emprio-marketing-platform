import React, { useState, useEffect } from "react";
import logo from "../assets/emprio-logo.webp";
import ProcessTimeline from "../components/ProcessTimeline";
import ServicesHero from "../components/ServicesHero";
import CinematicServiceSection from "../components/CinematicServiceSection";
import Footer from "../components/Footer";

export default function Services() {
  const [hovered, setHovered] = useState(null);
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;
  const scale = Math.max(0.6, Math.min(1, vw / 1440)); // Scale for sizes

  const stages = [
    "STAGE 1: DISCOVERY",
    "STAGE 2: RESEARCH",
    "STAGE 3: STRATEGY",
    "STAGE 4: IDENTITY DESIGN",
    "STAGE 5: TOUCHPOINTS",
    "STAGE 6: ASSETS",
  ];

  return (
    <>
      {/* OUR APPROACH */}
      <section style={styles.wrapper(isMobile, isTablet, scale)}>

        <h1 style={styles.heading(isMobile, scale)}>
          OUR <span style={styles.bold}>APPROACH</span>
        </h1>

        <div style={styles.grid(isMobile, isTablet)}>
          {stages.map((text, index) => (
            <div
              key={index}
              style={{
                ...styles.box(isMobile, scale),
                ...(hovered === index ? styles.boxHover : {}),
              }}
              onMouseEnter={() => !isMobile && setHovered(index)} // Desktop only
              onMouseLeave={() => !isMobile && setHovered(null)}
              onTouchStart={() => isMobile && setHovered(index)} // Mobile touch
              onTouchEnd={() => isMobile && setHovered(null)}
            >
              {text}
            </div>
          ))}
        </div>
      </section>

      <ProcessTimeline />
      <ServicesHero />

      {/* COMPILE */}
      <CinematicServiceSection
        title="COMPILE"
        items={[
          "Websites & Microsites",
          "Marketplace Development",
          "Web Apps",
          "Mobile Apps (Android & iOS)",
          "Artificial Intelligence Solutions",
          "Mixed Reality Solutions",
          "Web3",
        ]}
      />

      {/* CONNECT */}
      <CinematicServiceSection
        title="CONNECT"
        items={[
          "Social Media Marketing",
          "Performance Marketing",
          "Search Engine Optimization",
          "Creative Campaigns",
          "Video Production",
          "Motion Graphics Production",
          "Moment Marketing",
          "Brand Activations",
          "Online Reputation Management & PR",
          "Influencer Collaborations",
        ]}
      />

      {/* CONSULT */}
      <CinematicServiceSection
        title="CONSULT"
        items={[
          "Market Research & Insights",
          "Strategy",
          "Brand Identity Design",
          "Brand Positioning",
          "Rebranding",
          "Communication Planning",
          "Artificial Intelligence Solutions",
          "Content & Platform Strategy",
          "Personal Branding",
        ]}
      />
      <Footer />
    </>
  );
}

/* ✅ STYLES — UPDATED FOR RESPONSIVENESS */
const styles = {
  wrapper: (isMobile, isTablet, scale) => ({
    minHeight: "20vh",
    background: "#a23030",
    color: "#000",
    paddingTop: isMobile ? 120 * scale : isTablet ? 150 * scale : 180 * scale, // Scaled padding
    paddingLeft: "8vw",
    paddingRight: "8vw",
    paddingBottom: isMobile ? 80 * scale : 120 * scale, // Scaled bottom padding
    position: "relative",
    overflow: "hidden", // Prevent overflow
  }),

  logo: (isMobile, scale) => ({
    position: "absolute",
    top: isMobile ? 20 * scale : 40 * scale, // Scaled and adjusted for mobile
    left: isMobile ? "50%" : 60 * scale, // Center on mobile, offset on larger
    transform: isMobile ? "translateX(-50%)" : "none", // Center horizontally on mobile
    height: isMobile ? 28 * scale : 34 * scale, // Scaled height
  }),

  heading: (isMobile, scale) => ({
    textAlign: "center",
    fontSize: isMobile
      ? `clamp(32px, 8vw, 64px)` // Smaller, responsive range on mobile
      : `clamp(48px, 6vw, 64px)`, // Adjusted for tablet/desktop
    fontWeight: 300,
    letterSpacing: isMobile ? "1px" : "2px", // Less spacing on mobile
    marginBottom: isMobile ? 40 * scale : 80 * scale, // Scaled margin
  }),

  bold: {
    fontWeight: 800,
  },

  grid: (isMobile, isTablet) => ({
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr" // 1 column on mobile
      : isTablet
      ? "repeat(2, 1fr)" // 2 columns on tablet
      : "repeat(3, 1fr)", // 3 columns on desktop
    gap: isMobile ? "16px" : "24px", // Smaller gap on mobile
    maxWidth: "1000px",
    margin: "0 auto",
  }),

  box: (isMobile, scale) => ({
    border: "2px solid #000",
    padding: isMobile ? `${16 * scale}px ${18 * scale}px` : "22px 24px", // Scaled padding
    textAlign: "center",
    fontSize: isMobile ? 12 * scale : 14, // Scaled font
    fontWeight: 700,
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    background: "#fff",
    color: "#000",
  }),

  boxHover: {
    background: "#000",
    color: "#fff",
  },
};