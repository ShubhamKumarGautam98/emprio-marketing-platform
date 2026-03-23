import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/emprio-logo.webp";
import logoBlack from "../assets/emprio-logo1.webp";
import { useBackgroundDetection } from "../hooks/useBackgroundDetection";
import "./Navbar.css";

export default function Navbar({ menuOpen, setMenuOpen })  {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  

  // Use custom hook for background detection
  const isLightBackground = useBackgroundDetection(navRef, [location.pathname]);

  /* Detect mobile */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
  setMenuOpen(false);
}, [location.pathname]);

  /* Close mobile menu on route change */
  useEffect(() => {
  if (!menuOpen) return;

  const handleClickOutside = (e) => {
    const clickedInsideNav = navRef.current?.contains(e.target);
    const clickedInsideMenu = menuRef.current?.contains(e.target);

    if (!clickedInsideNav && !clickedInsideMenu) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar 
          ${isMobile ? "mobile" : "desktop"} 
          ${isLightBackground ? "light-theme" : "dark-theme"}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* LOGO - Hidden on home page */}
        {!isHome && (
          <Link to="/" className="navbar-logo-link" aria-label="Emprio Home">
            <img
              src={isLightBackground ? logoBlack : logo}
              alt="Emprio"
              className={`navbar-logo ${isMobile ? "mobile" : "desktop"}`}
              loading="eager"
            />
          </Link>
        )}

        {/* DESKTOP LINKS */}
        {!isMobile && (
          <div className="navbar-right-links">
            <Link className="navbar-link" to="/services">Services</Link>
            <Link className="navbar-link" to="/work">Work</Link>
            <Link className="navbar-link" to="/about">About</Link>
            <Link className="navbar-link" to="/career">Careers</Link>
            <Link className="navbar-link" to="/contact">Contact</Link>
          </div>
        )}

        {/* MOBILE HAMBURGER */}
        {isMobile && (
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-bar ${menuOpen ? "open" : ""}`} />
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
  <div
    ref={menuRef}
    className={`mobile-menu ${isLightBackground ? "light-theme" : "dark-theme"}`}
    role="menu"
  >
     <Link className="mobile-menu-link" to="/">Home</Link>
    <Link className="mobile-menu-link" to="/services">Services</Link>
    <Link className="mobile-menu-link" to="/work">Work</Link>
    <Link className="mobile-menu-link" to="/about">About</Link>
    <Link className="mobile-menu-link" to="/career">Careers</Link>
    <Link className="mobile-menu-link" to="/contact">Contact</Link>
  </div>
)}
    </>
  );
}