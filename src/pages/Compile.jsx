import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Compile.css";

export default function Compile() {
  return (
    <main className="compile-page">

      {/* HERO */}
      <section className="compile-hero">
        <h1 className="compile-title">CASE STUDIES</h1>

        <div className="compile-row">
          <div className="compile-line" />
          <p className="compile-text">
            Words may inspire but only action creates change.
            <br />
            <br />
            This is Emprio’s action.
          </p>
        </div>

        {/* CTA */}
        <div className="compile-actions">
          <Link
            to="/case-study/nykaa-hk"
            className="compile-primary-link"
          >
            VIEW CASE STUDY →
          </Link>

          <a
            href="/brochure/emprio-brochure.pdf"
            download
            className="compile-secondary-link"
          >
            DOWNLOAD BROCHURE
          </a>
        </div>
      </section>

      {/* PREVIEW STRIP */}
      <section className="compile-preview">
        <div className="compile-preview-card">
          <p className="compile-preview-label">LATEST</p>
          <h3 className="compile-preview-title">
            Nykaa × Hong Kong Tourism
          </h3>

          <Link
            to="/case-study/nykaa"
            className="compile-preview-link"
          >
            OPEN →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}