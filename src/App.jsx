import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Work from "./pages/Work";   
import Contact from "./pages/Contact";
import Compile from "./pages/Compile";
import CaseStudy from "./pages/CaseStudy";
import Career from "./pages/Career";
import ScrollToTop from "./components/ScrollToTop";
import CareerApply from "./components/CareerApply";
import "./style.css";

export default function App() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); // Track if user has scrolled down from top
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 120);

      // Set hasScrolled to true on first scroll down from top
      if (currentScrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      }
      // Reset to false only when back at the very top (adjusted threshold for reliability)
      if (currentScrollY <= 1) {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  return (
    <>
      <Navbar
  scrolled={scrolled}
  hasScrolled={hasScrolled}
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
/>
      <ScrollToTop />
      <Routes>
        <Route
  path="/"
  element={<Home scrolled={scrolled} menuOpen={menuOpen} />}
/>
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />  
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/compile" element={<Compile />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
        <Route path="/careers/apply" element={<CareerApply />} />
      </Routes>
    </>
  );
}