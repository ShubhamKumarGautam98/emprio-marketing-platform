import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footerWave from "../assets/footer-wave.webp";
import logo from "../assets/logo.webp";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ✅ Email state + navigation
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // ✅ Handle arrow click
  const handleSubmit = () => {
    if (!email.trim()) return;

    navigate("/contact", {
      state: { email },
    });
  };

  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `url(${footerWave})`,
      }}
    >
      {/* ===============================
          TOP AREA
      =============================== */}
      <div className="footer-top">
        <img
          src={logo}
          alt="Emprio logo"
          className="footer-logo"
        />

        <div className="footer-newsletter">
          <input
            type="email"
            placeholder="Your email"
            className="footer-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button className="footer-arrow" onClick={handleSubmit}>
            →
          </button>
        </div>
      </div>

      {/* ===============================
          BOTTOM CONTENT
      =============================== */}
      <div className="footer-bottom">
        {/* TAGLINE */}
        <p className="footer-tagline">
          Empowering businesses with innovation solutions.
          <Link to="/contact" className="footer-connect"> Connect</Link>
        </p>

        {/* COPYRIGHT CENTERED */}
        <p className="footer-copy">
          © {currentYear} Emprio. All rights reserved.
        </p>

        {/* SOCIAL ICONS RIGHT */}
        <div className="footer-row">
          <div className="footer-social">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedin />
          </div>
        </div>
      </div>
    </footer>
  );
}