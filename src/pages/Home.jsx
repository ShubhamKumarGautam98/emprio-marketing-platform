import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/emprio-logo.webp";        // Colored logo for dark backgrounds
import logoBlack from "../assets/emprio-logo1.webp"; // Black logo for light backgrounds
import CircleCapabilities from "../components/CircleCapabilities";
import ClientsSection from "../components/ClientsSection";
import CinematicImages from "../components/CinematicImages";
import IdeasSection from "../components/IdeasSection";
import Footer from "../components/Footer";
import { useBackgroundDetection } from "../hooks/useBackgroundDetection";
//import IntroSequence from "../components/IntroSequence";
import "./Home.css";

// Extracted constant for breakpoints to improve clarity
const BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 1024,
  MAX_WIDTH: 1440,
};

export default function Home({ scrolled, menuOpen }) {
  // ==========================================
  // STATE
  // ==========================================
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // ==========================================
  // REFS
  // ==========================================
  const heroLogoRef = useRef(null);

  // ==========================================
  // EFFECTS
  // ==========================================
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect background brightness behind the logo
  const isLightBackground = useBackgroundDetection(heroLogoRef, [scrolled]);
  
  // ==========================================
  // DEVICE DETECTION & CALCULATIONS
  // ==========================================
  const isMobile = windowWidth < BREAKPOINTS.TABLET;
  const isTablet = windowWidth >= BREAKPOINTS.TABLET && windowWidth < BREAKPOINTS.DESKTOP;
  
  // Calculate dynamic logo scale based on screen width
  const logoScale = Math.max(0.5, Math.min(1, windowWidth / BREAKPOINTS.MAX_WIDTH));

  // Choose appropriate logo image
  const currentLogoImage = isLightBackground ? logoBlack : logo;

  // ==========================================
  // CSS CLASSES & STYLES
  // ==========================================
  const homepageVisibilityClass = `homepage ${isIntroComplete ? "show" : "hide"}`;
  
  // Assemble dynamic classes cleanly
  const heroSectionClasses = [
    "home-hero",
    isMobile ? "mobile" : "",
    isTablet ? "tablet" : ""
  ].filter(Boolean).join(" ");
  
  const heroSectionStyle = { 
    minHeight: isMobile ? `${windowHeight - 120}px` : "100vh" 
  };

  const isLogoScrolled = scrolled || menuOpen;
  const logoClasses = [
    "hero-logo",
    isLogoScrolled ? "scrolled" : "",
    isMobile ? "mobile" : ""
  ].filter(Boolean).join(" ");

  const logoStyle = {
    "--logo-scale": logoScale,
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <main>
      {/* INTRO SEQUENCE */}
    

      {/* HOMEPAGE CONTAINER */}
      <div className={homepageVisibilityClass}></div>

      {/* HERO SECTION */}
      <section className={heroSectionClasses} style={heroSectionStyle}>
        <img
          ref={heroLogoRef}
          src={currentLogoImage}
          alt="Emprio"
          className={logoClasses}
          style={logoStyle}
        />
      </section>

      {/* OTHER SECTIONS */}
      <section className="home-section home-section-circles">
        <CircleCapabilities />
      </section>

      <section className="home-section">
        <ClientsSection />
      </section>

      <section className="home-section home-section-cinematic">
        <CinematicImages />
      </section>

      <section className="home-section">
        <IdeasSection />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}